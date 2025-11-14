import { useState, useEffect, useCallback } from 'react';
import { TopBar } from './components/TopBar';
import { LeftToolbar } from './components/LeftToolbar';
import { Canvas } from './components/Canvas';
import { RightSidebar } from './components/RightSidebar';
import { BottomBar } from './components/BottomBar';
import { Toaster } from './components/ui/sonner';
import { Layer, Tool, HistoryState } from './types';
import { createDefaultPalette, exportProject, importProject, exportToPNG } from './lib/project-utils';
import { toast } from 'sonner@2.0.3';

function App() {
  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Canvas state
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: '1',
      name: 'Layer 1',
      visible: true,
      locked: false,
      opacity: 100,
      pixels: new Map(),
    },
  ]);
  const [activeLayerId, setActiveLayerId] = useState('1');
  const [tool, setTool] = useState<Tool>('pencil');
  
  // Colors
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#FFFFFF');
  const [palette, setPalette] = useState<string[]>(createDefaultPalette());
  const [recentColors, setRecentColors] = useState<string[]>([]);

  // Settings
  const [gridEnabled, setGridEnabled] = useState(true);
  const [gridColor, setGridColor] = useState('#00000033');
  const [gridSize, setGridSize] = useState(8);
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [zoom, setZoom] = useState(4);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // History
  const initialLayers = [
    {
      id: '1',
      name: 'Layer 1',
      visible: true,
      locked: false,
      opacity: 100,
      pixels: new Map(),
    },
  ];
  const [history, setHistory] = useState<HistoryState[]>([
    { layers: initialLayers, timestamp: Date.now() },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Cursor position
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Add to recent colors when primary color changes
  useEffect(() => {
    if (primaryColor && !recentColors.includes(primaryColor)) {
      setRecentColors(prev => [primaryColor, ...prev].slice(0, 10));
    }
  }, [primaryColor]);

  // Save history when layers change
  const saveToHistory = useCallback(() => {
    const newState: HistoryState = {
      layers: layers.map(layer => ({
        ...layer,
        pixels: new Map(layer.pixels),
      })),
      timestamp: Date.now(),
    };

    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, newState];
    });
    setHistoryIndex(prev => prev + 1);
  }, [layers, historyIndex]);

  // Auto-save to localStorage
  useEffect(() => {
    if (!autoSaveEnabled) return;

    const interval = setInterval(() => {
      const project = {
        name: 'Auto-saved Project',
        width: 128,
        height: 128,
        layers,
        palette,
        backgroundColor,
        gridEnabled,
        gridColor,
        gridSize,
      };
      localStorage.setItem('bytepepe-autosave', exportProject(project));
      toast.success('Project auto-saved');
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoSaveEnabled, layers, palette, backgroundColor, gridEnabled, gridColor, gridSize]);

  // Load auto-save on mount
  useEffect(() => {
    const saved = localStorage.getItem('bytepepe-autosave');
    if (saved) {
      try {
        const project = importProject(saved);
        setLayers(project.layers);
        setPalette(project.palette);
        setBackgroundColor(project.backgroundColor);
        setGridEnabled(project.gridEnabled);
        setGridColor(project.gridColor);
        setGridSize(project.gridSize);
        if (project.layers.length > 0) {
          setActiveLayerId(project.layers[0].id);
        }
        toast.success('Auto-saved project loaded');
      } catch (e) {
        console.error('Failed to load auto-save:', e);
      }
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tool shortcuts
      if (!e.ctrlKey && !e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b': setTool('pencil'); break;
          case 'e': setTool('eraser'); break;
          case 'g': setTool('fill'); break;
          case 'i': setTool('eyedropper'); break;
          case 'l': setTool('line'); break;
          case 'r': setTool('rectangle'); break;
          case 'c': setTool('ellipse'); break;
          case 'v': setTool('selection'); break;
        }
      }

      // Undo/Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      }

      // Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  const handleLayerUpdate = (layerId: string, pixels: Map<string, string>) => {
    setLayers(prev => {
      const newLayers = prev.map(layer =>
        layer.id === layerId ? { ...layer, pixels } : layer
      );
      return newLayers;
    });
    saveToHistory();
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const historyState = history[newIndex];
      if (historyState && historyState.layers) {
        setHistoryIndex(newIndex);
        setLayers(historyState.layers.map(layer => ({
          ...layer,
          pixels: new Map(layer.pixels),
        })));
        toast.info('Undo');
      }
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const historyState = history[newIndex];
      if (historyState && historyState.layers) {
        setHistoryIndex(newIndex);
        setLayers(historyState.layers.map(layer => ({
          ...layer,
          pixels: new Map(layer.pixels),
        })));
        toast.info('Redo');
      }
    }
  };

  const handleNewCanvas = () => {
    if (confirm('Create a new canvas? Current work will be lost unless saved.')) {
      setLayers([
        {
          id: Date.now().toString(),
          name: 'Layer 1',
          visible: true,
          locked: false,
          opacity: 100,
          pixels: new Map(),
        },
      ]);
      setActiveLayerId(Date.now().toString());
      setHistory([{ layers: [], timestamp: Date.now() }]);
      setHistoryIndex(0);
      toast.success('New canvas created');
    }
  };

  const handleClearCanvas = () => {
    if (confirm('Clear the current layer?')) {
      handleLayerUpdate(activeLayerId, new Map());
      toast.success('Canvas cleared');
    }
  };

  const handleExportPNG = () => {
    const dataUrl = exportToPNG(layers, 128, 128, backgroundColor);
    const link = document.createElement('a');
    link.download = 'bytepepe-artwork.png';
    link.href = dataUrl;
    link.click();
    toast.success('PNG exported');
  };

  const handleExportJSON = () => {
    const project = {
      name: 'BytePepe Paint Project',
      width: 128,
      height: 128,
      layers,
      palette,
      backgroundColor,
      gridEnabled,
      gridColor,
      gridSize,
    };
    const json = exportProject(project);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'project.json';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Project exported as JSON');
  };

  const handleSaveProject = () => {
    const project = {
      name: 'BytePepe Paint Project',
      width: 128,
      height: 128,
      layers,
      palette,
      backgroundColor,
      gridEnabled,
      gridColor,
      gridSize,
    };
    const json = exportProject(project);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'project.bpp';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Project saved as .bpp');
  };

  const handleLoadProject = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.bpp,.pforge,.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = e.target?.result as string;
            const project = importProject(json);
            setLayers(project.layers);
            setPalette(project.palette);
            setBackgroundColor(project.backgroundColor);
            setGridEnabled(project.gridEnabled);
            setGridColor(project.gridColor);
            setGridSize(project.gridSize);
            if (project.layers.length > 0) {
              setActiveLayerId(project.layers[0].id);
            }
            toast.success('Project loaded');
          } catch (err) {
            toast.error('Failed to load project');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleImportImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext('2d')!;
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, 128, 128);
            
            const imageData = ctx.getImageData(0, 0, 128, 128);
            const pixels = new Map<string, string>();
            
            for (let y = 0; y < 128; y++) {
              for (let x = 0; x < 128; x++) {
                const i = (y * 128 + x) * 4;
                const r = imageData.data[i];
                const g = imageData.data[i + 1];
                const b = imageData.data[i + 2];
                const a = imageData.data[i + 3];
                
                if (a > 0) {
                  const color = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
                  pixels.set(`${x},${y}`, color);
                }
              }
            }
            
            handleLayerUpdate(activeLayerId, pixels);
            toast.success('Image imported');
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleLayerAdd = () => {
    const newLayer: Layer = {
      id: Date.now().toString(),
      name: `Layer ${layers.length + 1}`,
      visible: true,
      locked: false,
      opacity: 100,
      pixels: new Map(),
    };
    setLayers(prev => [...prev, newLayer]);
    setActiveLayerId(newLayer.id);
    toast.success('Layer added');
  };

  const handleLayerDelete = (id: string) => {
    if (layers.length === 1) {
      toast.error('Cannot delete the last layer');
      return;
    }
    setLayers(prev => prev.filter(l => l.id !== id));
    if (activeLayerId === id) {
      setActiveLayerId(layers[0].id);
    }
    toast.success('Layer deleted');
  };

  const handleLayerToggleVisible = (id: string) => {
    setLayers(prev => prev.map(l =>
      l.id === id ? { ...l, visible: !l.visible } : l
    ));
  };

  const handleLayerToggleLock = (id: string) => {
    setLayers(prev => prev.map(l =>
      l.id === id ? { ...l, locked: !l.locked } : l
    ));
  };

  const handleLayerOpacityChange = (id: string, opacity: number) => {
    setLayers(prev => prev.map(l =>
      l.id === id ? { ...l, opacity } : l
    ));
  };

  const handleLayerMove = (id: string, direction: 'up' | 'down') => {
    setLayers(prev => {
      const index = prev.findIndex(l => l.id === id);
      if (index === -1) return prev;
      
      const newIndex = direction === 'up' ? index + 1 : index - 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newLayers = [...prev];
      [newLayers[index], newLayers[newIndex]] = [newLayers[newIndex], newLayers[index]];
      return newLayers;
    });
  };

  const handleLayerRename = (id: string, name: string) => {
    setLayers(prev => prev.map(l =>
      l.id === id ? { ...l, name } : l
    ));
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Toaster position="bottom-right" theme={theme} />
      <TopBar
        theme={theme}
        onThemeToggle={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        onNewCanvas={handleNewCanvas}
        onImportImage={handleImportImage}
        onExportPNG={handleExportPNG}
        onExportJSON={handleExportJSON}
        onSaveProject={handleSaveProject}
        onLoadProject={handleLoadProject}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClearCanvas={handleClearCanvas}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        autoSaveEnabled={autoSaveEnabled}
      />

      <div className="flex-1 flex overflow-hidden">
        <LeftToolbar
          activeTool={tool}
          onToolChange={setTool}
          onClearCanvas={handleClearCanvas}
        />

        <Canvas
          layers={layers}
          activeLayerId={activeLayerId}
          tool={tool}
          primaryColor={primaryColor}
          gridEnabled={gridEnabled}
          gridColor={gridColor}
          gridSize={gridSize}
          backgroundColor={backgroundColor}
          zoom={zoom}
          onLayerUpdate={handleLayerUpdate}
          onColorPick={setPrimaryColor}
        />

        <RightSidebar
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          palette={palette}
          recentColors={recentColors}
          onPrimaryColorChange={setPrimaryColor}
          onSecondaryColorChange={setSecondaryColor}
          onPaletteAdd={(color) => setPalette(prev => [...prev, color])}
          onPaletteRemove={(index) => setPalette(prev => prev.filter((_, i) => i !== index))}
          layers={layers}
          activeLayerId={activeLayerId}
          onLayerSelect={setActiveLayerId}
          onLayerAdd={handleLayerAdd}
          onLayerDelete={handleLayerDelete}
          onLayerToggleVisible={handleLayerToggleVisible}
          onLayerToggleLock={handleLayerToggleLock}
          onLayerOpacityChange={handleLayerOpacityChange}
          onLayerMove={handleLayerMove}
          onLayerRename={handleLayerRename}
          gridSize={gridSize}
          gridColor={gridColor}
          gridEnabled={gridEnabled}
          backgroundColor={backgroundColor}
          autoSaveEnabled={autoSaveEnabled}
          onGridSizeChange={setGridSize}
          onGridColorChange={setGridColor}
          onGridEnabledChange={setGridEnabled}
          onBackgroundColorChange={setBackgroundColor}
          onAutoSaveEnabledChange={setAutoSaveEnabled}
        />
      </div>

      <BottomBar
        zoom={zoom}
        onZoomChange={setZoom}
        currentTool={tool}
        cursorPosition={cursorPosition}
        historyPosition={{ current: historyIndex, total: history.length }}
      />
    </div>
  );
}

export default App;