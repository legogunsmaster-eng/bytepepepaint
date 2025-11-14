import { Button } from './ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Tool } from '../types';

interface BottomBarProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  currentTool: Tool;
  cursorPosition: { x: number; y: number } | null;
  historyPosition: { current: number; total: number };
}

export function BottomBar({
  zoom,
  onZoomChange,
  currentTool,
  cursorPosition,
  historyPosition,
}: BottomBarProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-2 border-t bg-card">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onZoomChange(Math.max(1, zoom - 1))}
          disabled={zoom <= 1}
        >
          <ZoomOut className="size-4" />
        </Button>
        <span className="text-sm min-w-12 text-center">{zoom}x</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onZoomChange(Math.min(16, zoom + 1))}
          disabled={zoom >= 16}
        >
          <ZoomIn className="size-4" />
        </Button>
      </div>

      <div className="w-px h-6 bg-border" />

      <div className="text-sm text-muted-foreground">
        Tool: <span className="text-foreground capitalize">{currentTool}</span>
      </div>

      {cursorPosition && (
        <>
          <div className="w-px h-6 bg-border" />
          <div className="text-sm text-muted-foreground">
            Pos: <span className="text-foreground">{cursorPosition.x}, {cursorPosition.y}</span>
          </div>
        </>
      )}

      <div className="w-px h-6 bg-border" />

      <div className="text-sm text-muted-foreground">
        History: <span className="text-foreground">{historyPosition.current}/{historyPosition.total - 1}</span>
      </div>
    </div>
  );
}
