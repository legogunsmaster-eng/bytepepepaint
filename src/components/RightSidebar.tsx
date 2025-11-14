import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ColorPicker } from './ColorPicker';
import { LayerPanel } from './LayerPanel';
import { SettingsPanel } from './SettingsPanel';
import { Layer } from '../types';

interface RightSidebarProps {
  primaryColor: string;
  secondaryColor: string;
  palette: string[];
  recentColors: string[];
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  onPaletteAdd: (color: string) => void;
  onPaletteRemove: (index: number) => void;
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

export function RightSidebar({
  primaryColor,
  secondaryColor,
  palette,
  recentColors,
  onPrimaryColorChange,
  onSecondaryColorChange,
  onPaletteAdd,
  onPaletteRemove,
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
}: RightSidebarProps) {
  return (
    <div className="w-80 border-l bg-card">
      <Tabs defaultValue="colors" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="layers">Layers</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors" className="flex-1 overflow-auto">
          <ColorPicker
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            palette={palette}
            recentColors={recentColors}
            onPrimaryColorChange={onPrimaryColorChange}
            onSecondaryColorChange={onSecondaryColorChange}
            onPaletteAdd={onPaletteAdd}
            onPaletteRemove={onPaletteRemove}
          />
        </TabsContent>
        
        <TabsContent value="layers" className="flex-1 overflow-auto">
          <LayerPanel
            layers={layers}
            activeLayerId={activeLayerId}
            onLayerSelect={onLayerSelect}
            onLayerAdd={onLayerAdd}
            onLayerDelete={onLayerDelete}
            onLayerToggleVisible={onLayerToggleVisible}
            onLayerToggleLock={onLayerToggleLock}
            onLayerOpacityChange={onLayerOpacityChange}
            onLayerMove={onLayerMove}
            onLayerRename={onLayerRename}
          />
        </TabsContent>
        
        <TabsContent value="settings" className="flex-1 overflow-auto">
          <SettingsPanel
            gridSize={gridSize}
            gridColor={gridColor}
            gridEnabled={gridEnabled}
            backgroundColor={backgroundColor}
            autoSaveEnabled={autoSaveEnabled}
            onGridSizeChange={onGridSizeChange}
            onGridColorChange={onGridColorChange}
            onGridEnabledChange={onGridEnabledChange}
            onBackgroundColorChange={onBackgroundColorChange}
            onAutoSaveEnabledChange={onAutoSaveEnabledChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
