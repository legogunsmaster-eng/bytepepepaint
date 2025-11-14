import { IconButton, GhostButton } from './buttons';
import { Moon, Sun, FileText, FolderOpen, Save, Download, Upload, Image, Undo2, Redo2, Trash2 } from 'lucide-react';

interface TopBarProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onNewCanvas: () => void;
  onImportImage: () => void;
  onExportPNG: () => void;
  onExportJSON: () => void;
  onSaveProject: () => void;
  onLoadProject: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onClearCanvas: () => void;
  canUndo: boolean;
  canRedo: boolean;
  autoSaveEnabled: boolean;
}

export function TopBar({
  theme,
  onThemeToggle,
  onNewCanvas,
  onImportImage,
  onExportPNG,
  onExportJSON,
  onSaveProject,
  onLoadProject,
  onUndo,
  onRedo,
  onClearCanvas,
  canUndo,
  canRedo,
}: TopBarProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b bg-card">
      <h1 className="mr-4">BytePepe Paint</h1>
      
      <GhostButton onClick={onNewCanvas} className="gap-1.5 px-3 py-1.5">
        <FileText className="size-4" />
        New
      </GhostButton>
      
      <GhostButton onClick={onLoadProject} className="gap-1.5 px-3 py-1.5">
        <FolderOpen className="size-4" />
        Open
      </GhostButton>
      
      <GhostButton onClick={onSaveProject} className="gap-1.5 px-3 py-1.5">
        <Save className="size-4" />
        Save
      </GhostButton>
      
      <div className="w-px h-6 bg-border" />
      
      <GhostButton onClick={onImportImage} className="gap-1.5 px-3 py-1.5">
        <Upload className="size-4" />
        Import
      </GhostButton>
      
      <GhostButton onClick={onExportPNG} className="gap-1.5 px-3 py-1.5">
        <Image className="size-4" />
        PNG
      </GhostButton>
      
      <GhostButton onClick={onExportJSON} className="gap-1.5 px-3 py-1.5">
        <Download className="size-4" />
        JSON
      </GhostButton>
      
      <div className="w-px h-6 bg-border" />
      
      <IconButton onClick={onUndo} disabled={!canUndo} size="sm">
        <Undo2 className="size-4" />
      </IconButton>
      
      <IconButton onClick={onRedo} disabled={!canRedo} size="sm">
        <Redo2 className="size-4" />
      </IconButton>
      
      <IconButton onClick={onClearCanvas} size="sm">
        <Trash2 className="size-4" />
      </IconButton>
      
      <div className="flex-1" />
      
      <IconButton onClick={onThemeToggle} size="sm">
        {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </IconButton>
    </div>
  );
}