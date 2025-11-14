import { IconButton, PrimaryButton, DestructiveButton } from './buttons';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Plus, Trash2, Eye, EyeOff, Lock, Unlock, ChevronUp, ChevronDown } from 'lucide-react';
import { Layer } from '../types';
import { useState } from 'react';

interface LayerPanelProps {
  layers: Layer[];
  activeLayerId: string;
  onLayerSelect: (id: string) => void;
  onLayerAdd: () => void;
  onLayerDelete: (id: string) => void;
  onLayerToggleVisible: (id: string) => void;
  onLayerToggleLock: (id: string) => void;
  onLayerOpacityChange: (id: string, opacity: number) => void;
  onLayerMove: (id: string, direction: 'up' | 'down') => void;
  onLayerRename: (id: string, name: string) => void;
}

export function LayerPanel({
  layers,
  activeLayerId,
  onLayerSelect,
  onLayerAdd,
  onLayerDelete,
  onLayerToggleVisible,
  onLayerToggleLock,
  onLayerOpacityChange,
  onLayerMove,
  onLayerRename,
}: LayerPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleRename = (id: string) => {
    if (editName.trim()) {
      onLayerRename(id, editName.trim());
    }
    setEditingId(null);
    setEditName('');
  };

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h3>Layers</h3>
        <PrimaryButton onClick={onLayerAdd} className="px-3 py-1.5">
          <Plus className="size-4" />
        </PrimaryButton>
      </div>

      <div className="space-y-2">
        {layers.map((layer, index) => {
          const isActive = layer.id === activeLayerId;
          
          return (
            <div
              key={layer.id}
              className={`border rounded p-2 ${
                isActive ? 'border-primary bg-primary/10' : 'border-border'
              }`}
              onClick={() => onLayerSelect(layer.id)}
            >
              <div className="flex items-center gap-2">
                {editingId === layer.id ? (
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={() => handleRename(layer.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRename(layer.id);
                      if (e.key === 'Escape') {
                        setEditingId(null);
                        setEditName('');
                      }
                    }}
                    autoFocus
                    className="flex-1 h-6 text-sm"
                  />
                ) : (
                  <span
                    className="flex-1 text-sm cursor-pointer"
                    onDoubleClick={() => {
                      setEditingId(layer.id);
                      setEditName(layer.name);
                    }}
                  >
                    {layer.name}
                  </span>
                )}

                <IconButton
                  size="sm"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLayerToggleVisible(layer.id);
                  }}
                >
                  {layer.visible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeOff className="size-4" />
                  )}
                </IconButton>

                <IconButton
                  size="sm"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLayerToggleLock(layer.id);
                  }}
                >
                  {layer.locked ? (
                    <Lock className="size-4" />
                  ) : (
                    <Unlock className="size-4" />
                  )}
                </IconButton>

                <IconButton
                  size="sm"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLayerMove(layer.id, 'up');
                  }}
                  disabled={index === layers.length - 1}
                >
                  <ChevronUp className="size-4" />
                </IconButton>

                <IconButton
                  size="sm"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLayerMove(layer.id, 'down');
                  }}
                  disabled={index === 0}
                >
                  <ChevronDown className="size-4" />
                </IconButton>

                <IconButton
                  size="sm"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLayerDelete(layer.id);
                  }}
                >
                  <Trash2 className="size-4" />
                </IconButton>
              </div>

              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Opacity</span>
                  <Slider
                    value={[layer.opacity]}
                    onValueChange={([value]) => onLayerOpacityChange(layer.id, value)}
                    min={0}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-8">{layer.opacity}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}