import { useRef, useEffect, useState, useCallback } from 'react';
import { Layer, Tool } from '../types';

interface CanvasProps {
  layers: Layer[];
  activeLayerId: string;
  tool: Tool;
  primaryColor: string;
  gridEnabled: boolean;
  gridColor: string;
  gridSize: number;
  backgroundColor: string;
  zoom: number;
  onLayerUpdate: (layerId: string, pixels: Map<string, string>) => void;
  onColorPick: (color: string) => void;
}

export function Canvas({
  layers,
  activeLayerId,
  tool,
  primaryColor,
  gridEnabled,
  gridColor,
  gridSize,
  backgroundColor,
  zoom,
  onLayerUpdate,
  onColorPick,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  const activeLayer = layers.find(l => l.id === activeLayerId);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    if (backgroundColor && backgroundColor !== 'transparent') {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, 128, 128);
    }

    // Draw layers
    for (const layer of [...layers].reverse()) {
      if (!layer.visible) continue;
      
      ctx.globalAlpha = layer.opacity / 100;
      
      for (const [pos, color] of layer.pixels.entries()) {
        const [x, y] = pos.split(',').map(Number);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }

    ctx.globalAlpha = 1;

    // Draw grid
    if (gridEnabled) {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.05;
      
      for (let x = 0; x <= 128; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 128);
        ctx.stroke();
      }
      
      for (let y = 0; y <= 128; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(128, y);
        ctx.stroke();
      }
    }
  }, [layers, backgroundColor, gridEnabled, gridColor, gridSize]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const getPixelCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * 128);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * 128);

    if (x < 0 || x >= 128 || y < 0 || y >= 128) return null;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getPixelCoords(e);
    if (!pos || !activeLayer) return;

    if (tool === 'eyedropper') {
      const color = activeLayer.pixels.get(`${pos.x},${pos.y}`);
      if (color) onColorPick(color);
      return;
    }

    setIsDrawing(true);
    setStartPos(pos);

    if (tool === 'pencil' || tool === 'eraser') {
      const newPixels = new Map(activeLayer.pixels);
      if (tool === 'pencil') {
        newPixels.set(`${pos.x},${pos.y}`, primaryColor);
      } else {
        newPixels.delete(`${pos.x},${pos.y}`);
      }
      onLayerUpdate(activeLayerId, newPixels);
    } else if (tool === 'fill') {
      floodFill(pos.x, pos.y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !activeLayer) return;
    
    const pos = getPixelCoords(e);
    if (!pos) return;

    if (tool === 'pencil' || tool === 'eraser') {
      const newPixels = new Map(activeLayer.pixels);
      if (tool === 'pencil') {
        newPixels.set(`${pos.x},${pos.y}`, primaryColor);
      } else {
        newPixels.delete(`${pos.x},${pos.y}`);
      }
      onLayerUpdate(activeLayerId, newPixels);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos || !activeLayer) {
      setIsDrawing(false);
      setStartPos(null);
      return;
    }

    const pos = getPixelCoords(e);
    if (!pos) {
      setIsDrawing(false);
      setStartPos(null);
      return;
    }

    if (tool === 'line') {
      drawLine(startPos.x, startPos.y, pos.x, pos.y);
    } else if (tool === 'rectangle') {
      drawRectangle(startPos.x, startPos.y, pos.x, pos.y);
    } else if (tool === 'ellipse') {
      drawEllipse(startPos.x, startPos.y, pos.x, pos.y);
    }

    setIsDrawing(false);
    setStartPos(null);
  };

  const floodFill = (startX: number, startY: number) => {
    if (!activeLayer) return;

    const targetColor = activeLayer.pixels.get(`${startX},${startY}`) || null;
    if (targetColor === primaryColor) return;

    const newPixels = new Map(activeLayer.pixels);
    const stack: [number, number][] = [[startX, startY]];
    const visited = new Set<string>();

    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      const key = `${x},${y}`;

      if (x < 0 || x >= 128 || y < 0 || y >= 128) continue;
      if (visited.has(key)) continue;

      const currentColor = newPixels.get(key) || null;
      if (currentColor !== targetColor) continue;

      visited.add(key);
      newPixels.set(key, primaryColor);

      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    onLayerUpdate(activeLayerId, newPixels);
  };

  const drawLine = (x0: number, y0: number, x1: number, y1: number) => {
    if (!activeLayer) return;

    const newPixels = new Map(activeLayer.pixels);
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    let x = x0;
    let y = y0;

    while (true) {
      newPixels.set(`${x},${y}`, primaryColor);

      if (x === x1 && y === y1) break;

      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
    }

    onLayerUpdate(activeLayerId, newPixels);
  };

  const drawRectangle = (x0: number, y0: number, x1: number, y1: number) => {
    if (!activeLayer) return;

    const newPixels = new Map(activeLayer.pixels);
    const minX = Math.min(x0, x1);
    const maxX = Math.max(x0, x1);
    const minY = Math.min(y0, y1);
    const maxY = Math.max(y0, y1);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        newPixels.set(`${x},${y}`, primaryColor);
      }
    }

    onLayerUpdate(activeLayerId, newPixels);
  };

  const drawEllipse = (x0: number, y0: number, x1: number, y1: number) => {
    if (!activeLayer) return;

    const newPixels = new Map(activeLayer.pixels);
    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;
    const rx = Math.abs(x1 - x0) / 2;
    const ry = Math.abs(y1 - y0) / 2;

    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
        const dx = (x - cx) / rx;
        const dy = (y - cy) / ry;
        if (dx * dx + dy * dy <= 1) {
          if (x >= 0 && x < 128 && y >= 0 && y < 128) {
            newPixels.set(`${x},${y}`, primaryColor);
          }
        }
      }
    }

    onLayerUpdate(activeLayerId, newPixels);
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-muted/20 overflow-auto p-8">
      <div style={{ width: 128 * zoom, height: 128 * zoom }}>
        <canvas
          ref={canvasRef}
          width={128}
          height={128}
          className="border border-border"
          style={{
            width: '100%',
            height: '100%',
            imageRendering: 'pixelated',
            cursor: tool === 'eyedropper' ? 'crosshair' : 'default',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            setIsDrawing(false);
            setStartPos(null);
          }}
        />
      </div>
    </div>
  );
}
