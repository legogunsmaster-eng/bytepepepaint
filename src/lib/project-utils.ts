import { Layer, Project } from '../types';

export function createDefaultPalette(): string[] {
  return [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FF8800', '#8800FF',
    '#00FF88', '#FF0088', '#88FF00', '#0088FF', '#888888',
    '#444444', '#CCCCCC', '#880000', '#008800', '#000088',
  ];
}

export function exportProject(project: Project): string {
  // Convert Map to array for serialization
  const serializable = {
    ...project,
    layers: project.layers.map(layer => ({
      ...layer,
      pixels: Array.from(layer.pixels.entries()),
    })),
  };
  return JSON.stringify(serializable, null, 2);
}

export function importProject(json: string): Project {
  const data = JSON.parse(json);
  
  // Convert array back to Map
  return {
    ...data,
    layers: data.layers.map((layer: any) => ({
      ...layer,
      pixels: new Map(layer.pixels || []),
    })),
  };
}

export function exportToPNG(
  layers: Layer[],
  width: number,
  height: number,
  backgroundColor: string
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  
  // Disable image smoothing for pixel-perfect rendering
  ctx.imageSmoothingEnabled = false;
  
  // Draw background
  if (backgroundColor && backgroundColor !== 'transparent') {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }
  
  // Draw layers from bottom to top
  for (const layer of [...layers].reverse()) {
    if (!layer.visible) continue;
    
    const opacity = layer.opacity / 100;
    ctx.globalAlpha = opacity;
    
    for (const [pos, color] of layer.pixels.entries()) {
      const [x, y] = pos.split(',').map(Number);
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
    
    ctx.globalAlpha = 1;
  }
  
  return canvas.toDataURL('image/png');
}
