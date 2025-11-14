import { useState } from 'react';
import { SecondaryButton, IconButton } from './buttons';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus, X } from 'lucide-react';

interface ColorPickerProps {
  primaryColor: string;
  secondaryColor: string;
  palette: string[];
  recentColors: string[];
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  onPaletteAdd: (color: string) => void;
  onPaletteRemove: (index: number) => void;
}

export function ColorPicker({
  primaryColor,
  secondaryColor,
  palette,
  recentColors,
  onPrimaryColorChange,
  onSecondaryColorChange,
  onPaletteAdd,
  onPaletteRemove,
}: ColorPickerProps) {
  const [newColor, setNewColor] = useState('#000000');

  return (
    <div className="p-4 space-y-4">
      <div>
        <Label>Primary Color</Label>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => onPrimaryColorChange(e.target.value)}
            className="w-12 h-12 border rounded cursor-pointer"
          />
          <Input
            value={primaryColor}
            onChange={(e) => onPrimaryColorChange(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label>Secondary Color</Label>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => onSecondaryColorChange(e.target.value)}
            className="w-12 h-12 border rounded cursor-pointer"
          />
          <Input
            value={secondaryColor}
            onChange={(e) => onSecondaryColorChange(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>

      {recentColors.length > 0 && (
        <div>
          <Label>Recent Colors</Label>
          <div className="grid grid-cols-8 gap-1 mt-2">
            {recentColors.map((color, i) => (
              <button
                key={i}
                className="w-8 h-8 border rounded cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => onPrimaryColorChange(color)}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <Label>Palette</Label>
        <div className="grid grid-cols-8 gap-1 mt-2">
          {palette.map((color, i) => (
            <div key={i} className="relative group">
              <button
                className="w-8 h-8 border rounded cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => onPrimaryColorChange(color)}
                title={color}
              />
              <IconButton
                size="sm"
                className="absolute -top-1 -right-1 size-4 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity p-0"
                onClick={() => onPaletteRemove(i)}
              >
                <X className="size-3" />
              </IconButton>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="w-10 h-10 border rounded cursor-pointer"
          />
          <SecondaryButton
            onClick={() => {
              onPaletteAdd(newColor);
              setNewColor('#000000');
            }}
            className="px-3 py-1.5 gap-1.5"
          >
            <Plus className="size-4" />
            Add to Palette
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}