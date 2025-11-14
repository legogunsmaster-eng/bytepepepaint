import { 
  PrimaryButton, 
  SecondaryButton, 
  IconButton, 
  GhostButton, 
  OutlineButton, 
  DestructiveButton,
  ToolButton,
  LinkButton 
} from './buttons';
import { Plus, Trash2, Eye, Download, Settings } from 'lucide-react';

export function ButtonShowcase() {
  return (
    <div className="p-8 space-y-8 bg-background">
      <div className="space-y-2">
        <h2>Primary Button</h2>
        <div className="flex items-center gap-4">
          <PrimaryButton>Click Me</PrimaryButton>
          <PrimaryButton>
            <Plus className="size-4" />
            With Icon
          </PrimaryButton>
          <PrimaryButton disabled>Disabled</PrimaryButton>
        </div>
      </div>

      <div className="space-y-2">
        <h2>Secondary Button</h2>
        <div className="flex items-center gap-4">
          <SecondaryButton>Click Me</SecondaryButton>
          <SecondaryButton>
            <Download className="size-4" />
            With Icon
          </SecondaryButton>
          <SecondaryButton disabled>Disabled</SecondaryButton>
        </div>
      </div>

      <div className="space-y-2">
        <h2>Outline Button</h2>
        <div className="flex items-center gap-4">
          <OutlineButton>Click Me</OutlineButton>
          <OutlineButton>
            <Settings className="size-4" />
            With Icon
          </OutlineButton>
          <OutlineButton disabled>Disabled</OutlineButton>
        </div>
      </div>

      <div className="space-y-2">
        <h2>Ghost Button</h2>
        <div className="flex items-center gap-4">
          <GhostButton>Click Me</GhostButton>
          <GhostButton>
            <Eye className="size-4" />
            With Icon
          </GhostButton>
          <GhostButton disabled>Disabled</GhostButton>
        </div>
      </div>

      <div className="space-y-2">
        <h2>Destructive Button</h2>
        <div className="flex items-center gap-4">
          <DestructiveButton>Delete</DestructiveButton>
          <DestructiveButton>
            <Trash2 className="size-4" />
            Delete Item
          </DestructiveButton>
          <DestructiveButton disabled>Disabled</DestructiveButton>
        </div>
      </div>

      <div className="space-y-2">
        <h2>Icon Button</h2>
        <div className="flex items-center gap-4">
          <IconButton size="sm">
            <Plus className="size-4" />
          </IconButton>
          <IconButton size="md">
            <Settings className="size-4" />
          </IconButton>
          <IconButton size="lg">
            <Trash2 className="size-5" />
          </IconButton>
          <IconButton size="md" disabled>
            <Plus className="size-4" />
          </IconButton>
        </div>
      </div>

      <div className="space-y-2">
        <h2>Tool Button</h2>
        <div className="flex items-center gap-4">
          <ToolButton>
            <Plus className="size-5" />
          </ToolButton>
          <ToolButton active>
            <Settings className="size-5" />
          </ToolButton>
          <ToolButton disabled>
            <Trash2 className="size-5" />
          </ToolButton>
        </div>
      </div>

      <div className="space-y-2">
        <h2>Link Button</h2>
        <div className="flex items-center gap-4">
          <LinkButton>Learn More</LinkButton>
          <LinkButton>
            <Download className="size-4" />
            Download
          </LinkButton>
          <LinkButton disabled>Disabled Link</LinkButton>
        </div>
      </div>
    </div>
  );
}
