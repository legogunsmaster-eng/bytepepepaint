# BytePepe Paint Button System

## Overview
This is a fully autonomous button component system with zero internal logic, no permission requests, and no automatic interactions.

## Design Principles

✅ **Purely Visual Components**
- Each button is a standalone visual component
- No variants or inheritance
- No internal logic or state management
- No automatic navigation or link opening

✅ **Zero Permission Requests**
- No `Open Overlay` / `Open Modal` / `Swap Overlay`
- No `Navigate To Frame`
- No `Open Link` actions
- No embedded URLs or mailto: links
- No `Set Variable` / `Insert Component` / `Delete Component`

✅ **Clean Implementation**
- `type="button"` prevents form submission
- Explicit onClick handlers with disabled state checks
- `preventDefault()` and `stopPropagation()` on disabled state
- No prototype connections or modal frame dependencies

## Color Scheme
- **Primary Blue**: `#0052ff`
- **Hover Blue**: `#0046dd`
- **Active Blue**: `#003bbb`
- **Background**: White `#ffffff`
- **Secondary Gray**: `#f5f7fa`
- **Border**: `#e5e7eb`
- **Text**: `#1a1a1a`
- **Destructive Red**: `#dc2626`

## Components

### PrimaryButton
Main action button with solid blue background.

```tsx
import { PrimaryButton } from './components/buttons';

<PrimaryButton onClick={handleSave}>
  Save Project
</PrimaryButton>
```

**States**: Default, Hover, Active, Disabled

---

### SecondaryButton
Secondary actions with light gray background.

```tsx
import { SecondaryButton } from './components/buttons';

<SecondaryButton onClick={handleCancel}>
  Cancel
</SecondaryButton>
```

**States**: Default, Hover, Active, Disabled

---

### IconButton
Icon-only button with three sizes.

```tsx
import { IconButton } from './components/buttons';
import { Plus } from 'lucide-react';

<IconButton size="md" onClick={handleAdd}>
  <Plus className="size-4" />
</IconButton>
```

**Sizes**: `sm` (32px), `md` (40px), `lg` (48px)
**States**: Default, Hover, Active, Disabled

---

### GhostButton
Transparent button for subtle actions.

```tsx
import { GhostButton } from './components/buttons';

<GhostButton onClick={handleEdit}>
  Edit
</GhostButton>
```

**States**: Default, Hover, Active, Disabled

---

### OutlineButton
Outlined button with blue border.

```tsx
import { OutlineButton } from './components/buttons';

<OutlineButton onClick={handleView}>
  View Details
</OutlineButton>
```

**States**: Default, Hover, Active, Disabled

---

### DestructiveButton
Red button for delete/dangerous actions.

```tsx
import { DestructiveButton } from './components/buttons';

<DestructiveButton onClick={handleDelete}>
  Delete
</DestructiveButton>
```

**States**: Default, Hover, Active, Disabled

---

### ToolButton
Special toolbar button with active state.

```tsx
import { ToolButton } from './components/buttons';
import { Pencil } from 'lucide-react';

<ToolButton 
  active={currentTool === 'pencil'} 
  onClick={() => setTool('pencil')}
>
  <Pencil className="size-5" />
</ToolButton>
```

**Props**: `active` (boolean)
**States**: Default, Active, Hover, Disabled

---

### LinkButton
Text-style button for inline links.

```tsx
import { LinkButton } from './components/buttons';

<LinkButton onClick={handleLearnMore}>
  Learn More
</LinkButton>
```

**States**: Default, Hover (with underline), Active, Disabled

---

## Usage Guidelines

### ✅ DO
- Use `onClick` prop for all interactions
- Handle logic in parent components
- Pass explicit handlers from parent
- Use `disabled` prop for inactive states
- Combine with icons using lucide-react

### ❌ DON'T
- Add internal navigation logic
- Embed URLs or mailto: links
- Create prototype connections
- Use variants with inherited behaviors
- Add modal/overlay triggers
- Include permission-requesting actions

## Example: Clear Canvas Flow

```tsx
// ❌ WRONG - Logic inside button
<Button onClick={() => {
  clearCanvas();
  resetState();
  navigate('/new');
}}>
  Clear
</Button>

// ✅ CORRECT - Logic in parent, button is purely visual
function ParentComponent() {
  const handleClear = () => {
    clearCanvas();
    resetState();
    // Parent handles all logic
  };

  return (
    <DestructiveButton onClick={handleClear}>
      Clear Canvas
    </DestructiveButton>
  );
}
```

## TypeScript Props

All buttons extend `ButtonHTMLAttributes<HTMLButtonElement>` and accept:
- `children: ReactNode` - Button content
- `className?: string` - Additional CSS classes
- `onClick?: (e: React.MouseEvent) => void` - Click handler
- `disabled?: boolean` - Disabled state
- All standard HTML button attributes

## Integration Checklist

When integrating these buttons:
- ✅ No prototype panel interactions
- ✅ No "Open Link" actions
- ✅ No modal/overlay connections
- ✅ No embedded URLs
- ✅ All logic handled by parent
- ✅ Clean visual-only component
- ✅ Independent and reusable
