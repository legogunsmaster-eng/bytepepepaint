import { ToolButton } from './buttons';
import { Tool } from '../types';
import { Pencil, Eraser, PaintBucket, Pipette, Minus, Square, Circle, MousePointer } from 'lucide-react';

interface LeftToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  onClearCanvas: () => void;
}

const tools: { name: Tool; icon: any; label: string }[] = [
  { name: 'pencil', icon: Pencil, label: 'Pencil (B)' },
  { name: 'eraser', icon: Eraser, label: 'Eraser (E)' },
  { name: 'fill', icon: PaintBucket, label: 'Fill (G)' },
  { name: 'eyedropper', icon: Pipette, label: 'Eyedropper (I)' },
  { name: 'line', icon: Minus, label: 'Line (L)' },
  { name: 'rectangle', icon: Square, label: 'Rectangle (R)' },
  { name: 'ellipse', icon: Circle, label: 'Ellipse (C)' },
  { name: 'selection', icon: MousePointer, label: 'Selection (V)' },
];

export function LeftToolbar({ activeTool, onToolChange }: LeftToolbarProps) {
  return (
    <div className="flex flex-col gap-1 p-2 border-r bg-card w-16">
      {tools.map(tool => {
        const Icon = tool.icon;
        return (
          <ToolButton
            key={tool.name}
            active={activeTool === tool.name}
            className="w-12 h-12"
            onClick={() => onToolChange(tool.name)}
            title={tool.label}
          >
            <Icon className="size-5" />
          </ToolButton>
        );
      })}
    </div>
  );
}