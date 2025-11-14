import { Label } from './ui/label';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';

interface SettingsPanelProps {
  gridSize: number;
  gridColor: string;
  gridEnabled: boolean;
  backgroundColor: string;
  autoSaveEnabled: boolean;
  onGridSizeChange: (size: number) => void;
  onGridColorChange: (color: string) => void;
  onGridEnabledChange: (enabled: boolean) => void;
  onBackgroundColorChange: (color: string) => void;
  onAutoSaveEnabledChange: (enabled: boolean) => void;
}

export function SettingsPanel({
  gridSize,
  gridColor,
  gridEnabled,
  backgroundColor,
  autoSaveEnabled,
  onGridSizeChange,
  onGridColorChange,
  onGridEnabledChange,
  onBackgroundColorChange,
  onAutoSaveEnabledChange,
}: SettingsPanelProps) {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="mb-4">Grid Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="grid-enabled">Show Grid</Label>
            <Switch
              id="grid-enabled"
              checked={gridEnabled}
              onCheckedChange={onGridEnabledChange}
            />
          </div>

          <div>
            <Label htmlFor="grid-size">Grid Size: {gridSize}px</Label>
            <Slider
              id="grid-size"
              value={[gridSize]}
              onValueChange={([value]) => onGridSizeChange(value)}
              min={1}
              max={32}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="grid-color">Grid Color</Label>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="color"
                id="grid-color"
                value={gridColor.slice(0, 7)}
                onChange={(e) => {
                  const hex = e.target.value;
                  const alpha = gridColor.slice(7) || '33';
                  onGridColorChange(hex + alpha);
                }}
                className="w-12 h-12 border rounded cursor-pointer"
              />
              <Input
                value={gridColor}
                onChange={(e) => onGridColorChange(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4">Canvas Settings</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="bg-color">Background Color</Label>
            <div className="flex items-center gap-2 mt-2">
              <Input
                id="bg-color"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                placeholder="transparent"
                className="flex-1"
              />
              <button
                className="w-12 h-12 border rounded cursor-pointer"
                style={{
                  backgroundColor: backgroundColor === 'transparent' ? 'transparent' : backgroundColor,
                  backgroundImage:
                    backgroundColor === 'transparent'
                      ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                      : 'none',
                  backgroundSize: '10px 10px',
                  backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
                }}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'color';
                  input.value = backgroundColor === 'transparent' ? '#ffffff' : backgroundColor;
                  input.onchange = (e) => {
                    onBackgroundColorChange((e.target as HTMLInputElement).value);
                  };
                  input.click();
                }}
              />
            </div>
            <button
              className="text-sm text-muted-foreground hover:text-foreground mt-2"
              onClick={() => onBackgroundColorChange('transparent')}
            >
              Set to transparent
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4">Other Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="autosave">Auto-save (every 30s)</Label>
            <Switch
              id="autosave"
              checked={autoSaveEnabled}
              onCheckedChange={onAutoSaveEnabledChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
