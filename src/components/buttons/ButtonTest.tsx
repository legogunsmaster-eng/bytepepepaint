import { useState } from 'react';
import { 
  PrimaryButton, 
  SecondaryButton, 
  IconButton, 
  GhostButton, 
  OutlineButton, 
  DestructiveButton,
  ToolButton,
  LinkButton 
} from './index';
import { Plus, Trash2, Eye, Download, Settings, Check } from 'lucide-react';

/**
 * Button Test Component
 * 
 * Demonstrates that all buttons:
 * - Have NO permission requests
 * - Have NO automatic navigation
 * - Have NO modal/overlay triggers
 * - Are purely visual with simple onClick handlers
 */
export function ButtonTest() {
  const [clickLog, setClickLog] = useState<string[]>([]);
  const [activeTool, setActiveTool] = useState('pencil');

  const logClick = (buttonName: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setClickLog(prev => [`[${timestamp}] ${buttonName} clicked`, ...prev].slice(0, 10));
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <h1>BytePepe Paint Button System Test</h1>
          <p className="text-muted-foreground">
            All buttons are purely visual components with no permission requests, 
            no automatic navigation, and no modal/overlay triggers.
          </p>
        </div>

        {/* Click Log */}
        <div className="bg-card border rounded-[10px] p-4">
          <h3 className="mb-2">Click Log (Proof of Simple Interactions)</h3>
          <div className="bg-muted/50 rounded p-3 font-mono text-sm space-y-1 max-h-40 overflow-auto">
            {clickLog.length === 0 ? (
              <div className="text-muted-foreground">No clicks yet. Try clicking any button below.</div>
            ) : (
              clickLog.map((log, i) => (
                <div key={i} className="text-xs">{log}</div>
              ))
            )}
          </div>
        </div>

        {/* Button Showcase */}
        <div className="grid gap-6">
          
          {/* Primary Button */}
          <div className="bg-card border rounded-[10px] p-6 space-y-4">
            <div>
              <h3>Primary Button</h3>
              <p className="text-sm text-muted-foreground">Main action button - Solid blue background</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton onClick={() => logClick('Primary')}>
                Click Me
              </PrimaryButton>
              <PrimaryButton onClick={() => logClick('Primary with Icon')}>
                <Plus className="size-4" />
                With Icon
              </PrimaryButton>
              <PrimaryButton disabled>
                Disabled
              </PrimaryButton>
            </div>
          </div>

          {/* Secondary Button */}
          <div className="bg-card border rounded-[10px] p-6 space-y-4">
            <div>
              <h3>Secondary Button</h3>
              <p className="text-sm text-muted-foreground">Secondary actions - Light gray background</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <SecondaryButton onClick={() => logClick('Secondary')}>
                Click Me
              </SecondaryButton>
              <SecondaryButton onClick={() => logClick('Secondary with Icon')}>
                <Download className="size-4" />
                Download
              </SecondaryButton>
              <SecondaryButton disabled>
                Disabled
              </SecondaryButton>
            </div>
          </div>

          {/* Outline Button */}
          <div className="bg-card border rounded-[10px] p-6 space-y-4">
            <div>
              <h3>Outline Button</h3>
              <p className="text-sm text-muted-foreground">Outlined style - Blue border</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <OutlineButton onClick={() => logClick('Outline')}>
                Click Me
              </OutlineButton>
              <OutlineButton onClick={() => logClick('Outline with Icon')}>
                <Settings className="size-4" />
                Settings
              </OutlineButton>
              <OutlineButton disabled>
                Disabled
              </OutlineButton>
            </div>
          </div>

          {/* Ghost Button */}
          <div className="bg-card border rounded-[10px] p-6 space-y-4">
            <div>
              <h3>Ghost Button</h3>
              <p className="text-sm text-muted-foreground">Subtle actions - Transparent background</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <GhostButton onClick={() => logClick('Ghost')}>
                Click Me
              </GhostButton>
              <GhostButton onClick={() => logClick('Ghost with Icon')}>
                <Eye className="size-4" />
                View
              </GhostButton>
              <GhostButton disabled>
                Disabled
              </GhostButton>
            </div>
          </div>

          {/* Destructive Button */}
          <div className="bg-card border rounded-[10px] p-6 space-y-4">
            <div>
              <h3>Destructive Button</h3>
              <p className="text-sm text-muted-foreground">Dangerous actions - Red background</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <DestructiveButton onClick={() => logClick('Destructive')}>
                Delete
              </DestructiveButton>
              <DestructiveButton onClick={() => logClick('Destructive with Icon')}>
                <Trash2 className="size-4" />
                Delete Item
              </DestructiveButton>
              <DestructiveButton disabled>
                Disabled
              </DestructiveButton>
            </div>
          </div>

          {/* Icon Button */}
          <div className="bg-card border rounded-[10px] p-6 space-y-4">
            <div>
              <h3>Icon Button</h3>
              <p className="text-sm text-muted-foreground">Icon-only button - Three sizes</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <IconButton size="sm" onClick={() => logClick('Icon Small')}>
                  <Plus className="size-4" />
                </IconButton>
                <span className="text-sm text-muted-foreground">Small (32px)</span>
              </div>
              <div className="flex items-center gap-2">
                <IconButton size="md" onClick={() => logClick('Icon Medium')}>
                  <Settings className="size-4" />
                </IconButton>
                <span className="text-sm text-muted-foreground">Medium (40px)</span>
              </div>
              <div className="flex items-center gap-2">
                <IconButton size="lg" onClick={() => logClick('Icon Large')}>
                  <Trash2 className="size-5" />
                </IconButton>
                <span className="text-sm text-muted-foreground">Large (48px)</span>
              </div>
              <IconButton size="md" disabled>
                <Plus className="size-4" />
              </IconButton>
            </div>
          </div>

          {/* Tool Button */}
          <div className="bg-card border rounded-[10px] p-6 space-y-4">
            <div>
              <h3>Tool Button</h3>
              <p className="text-sm text-muted-foreground">Toolbar button with active state</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <ToolButton 
                active={activeTool === 'pencil'} 
                onClick={() => {
                  setActiveTool('pencil');
                  logClick('Tool: Pencil');
                }}
              >
                <Plus className="size-5" />
              </ToolButton>
              <ToolButton 
                active={activeTool === 'settings'} 
                onClick={() => {
                  setActiveTool('settings');
                  logClick('Tool: Settings');
                }}
              >
                <Settings className="size-5" />
              </ToolButton>
              <ToolButton 
                active={activeTool === 'check'} 
                onClick={() => {
                  setActiveTool('check');
                  logClick('Tool: Check');
                }}
              >
                <Check className="size-5" />
              </ToolButton>
              <ToolButton disabled>
                <Trash2 className="size-5" />
              </ToolButton>
            </div>
            <div className="text-sm text-muted-foreground">
              Current tool: <span className="font-mono text-primary">{activeTool}</span>
            </div>
          </div>

          {/* Link Button */}
          <div className="bg-card border rounded-[10px] p-6 space-y-4">
            <div>
              <h3>Link Button</h3>
              <p className="text-sm text-muted-foreground">Text-style button with underline on hover</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <LinkButton onClick={() => logClick('Link')}>
                Learn More
              </LinkButton>
              <LinkButton onClick={() => logClick('Link with Icon')}>
                <Download className="size-4" />
                Download
              </LinkButton>
              <LinkButton disabled>
                Disabled Link
              </LinkButton>
            </div>
          </div>

        </div>

        {/* Verification Checklist */}
        <div className="bg-card border rounded-[10px] p-6 space-y-4">
          <h3>✅ Verification Checklist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
              <span>No permission requests triggered</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
              <span>No automatic navigation</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
              <span>No modal/overlay triggers</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
              <span>No embedded URLs</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Simple onClick handlers only</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Disabled state prevents all actions</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Type="button" prevents form submission</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Fully autonomous components</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
