# Button Implementation Examples — BytePepe Paint

This document shows how the "Clear" and "New Canvas" buttons are correctly implemented in code to avoid permission requests.

---

## ✅ Current Implementation (Correct)

### Clear Canvas Button

**Location**: `/components/TopBar.tsx` and `/components/LeftToolbar.tsx`

```tsx
// In TopBar.tsx
import { IconButton } from './buttons';
import { Trash2 } from 'lucide-react';

<IconButton onClick={onClearCanvas} size="sm">
  <Trash2 className="size-4" />
</IconButton>
```

**Logic handled in parent** (`/App.tsx`):

```tsx
const handleClearCanvas = () => {
  // This confirm() dialog is INTENTIONAL and controlled by our code
  if (confirm('Clear the current layer?')) {
    handleLayerUpdate(activeLayerId, new Map());
    toast.success('Canvas cleared');
  }
};

// Button receives the handler
<TopBar
  onClearCanvas={handleClearCanvas}
  // ... other props
/>
```

**Why this works**:
- ✅ `confirm()` is called by OUR code, not by Figma
- ✅ User must click the button first (user-initiated)
- ✅ No automatic triggers
- ✅ No permission requests

---

### New Canvas Button

**Location**: `/components/TopBar.tsx`

```tsx
import { GhostButton } from './buttons';
import { FileText } from 'lucide-react';

<GhostButton onClick={onNewCanvas} className="gap-1.5 px-3 py-1.5">
  <FileText className="size-4" />
  New
</GhostButton>
```

**Logic handled in parent** (`/App.tsx`):

```tsx
const handleNewCanvas = () => {
  // This confirm() dialog is INTENTIONAL and controlled by our code
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

// Button receives the handler
<TopBar
  onNewCanvas={handleNewCanvas}
  // ... other props
/>
```

**Why this works**:
- ✅ `confirm()` is our intentional UX choice
- ✅ No browser permission dialog
- ✅ User must click first (user-initiated)
- ✅ All logic in parent component

---

## 🔍 Button Component Implementation

The button components themselves have ZERO internal logic:

### PrimaryButton (example)

```tsx
// /components/buttons/PrimaryButton.tsx
export function PrimaryButton({ 
  children, 
  onClick, 
  disabled, 
  ...props 
}: PrimaryButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // ONLY execute the onClick passed from parent
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"  // Prevents form submission
      onClick={handleClick}
      disabled={disabled}
      className="..."
      {...props}
    >
      {children}
    </button>
  );
}
```

**Key points**:
- ✅ `type="button"` prevents form submission
- ✅ Only executes onClick from parent
- ✅ No internal state changes
- ✅ No automatic navigation
- ✅ No permission requests

---

## 🎯 Confirmation Dialogs Explained

### Browser's `confirm()` vs Permission Dialogs

**What we use (Safe)**:
```tsx
if (confirm('Are you sure?')) {
  // User clicked OK
}
```

This is:
- ✅ A standard JavaScript dialog
- ✅ User-initiated (only shows after button click)
- ✅ NOT a permission request
- ✅ Doesn't trigger browser security warnings

**What we DON'T use (Unsafe)**:
```tsx
// ❌ DON'T DO THIS
window.open('https://example.com'); // Permission request!
navigator.geolocation.getCurrentPosition(); // Permission request!
Notification.requestPermission(); // Permission request!
```

---

## 📋 Full Flow Diagram

### Clear Canvas Flow

```
User clicks button
       ↓
IconButton component receives click
       ↓
IconButton calls onClick prop (from parent)
       ↓
App.tsx handleClearCanvas() executes
       ↓
confirm() dialog shows (our code, user-initiated)
       ↓
User clicks OK or Cancel
       ↓
If OK: canvas cleared + toast shown
If Cancel: nothing happens
```

**No permission requests at any step** ✅

---

## 🚫 What Would Trigger Permission Requests

These actions would trigger browser permission dialogs:

### ❌ BAD Examples

```tsx
// DON'T DO THIS
<button onClick={() => {
  window.open('popup.html', 'popup'); // ⚠️ Popup blocker
}}>Open</button>

<button onClick={() => {
  window.location.href = 'tel:123456'; // ⚠️ "Allow to open Phone?"
}}>Call</button>

<button onClick={() => {
  navigator.clipboard.write(); // ⚠️ Clipboard permission
}}>Copy</button>

<button onClick={() => {
  navigator.share(); // ⚠️ Share permission
}}>Share</button>

// Prototype with Open Link
<Figma Prototype>
  On Click → Open Link (https://...) // ⚠️ "Allow to open external?"
</Figma Prototype>
```

### ✅ GOOD Examples (What we do)

```tsx
// Simple state update
<button onClick={() => setCount(count + 1)}>
  Increment
</button>

// Parent handler
<button onClick={handleSave}>
  Save
</button>

// Confirmation dialog (safe)
<button onClick={() => {
  if (confirm('Delete?')) {
    deleteItem();
  }
}}>Delete</button>

// File download (user-initiated)
<button onClick={() => {
  const blob = new Blob([data]);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'file.txt';
  a.click();
}}>Download</button>
```

---

## 🧪 Testing Checklist

To verify buttons don't trigger permission requests:

### Manual Testing

1. **Open the app** in browser
2. **Click "New Canvas" button**
   - ✅ Should show confirm dialog (our code)
   - ✅ Should NOT show "Allow website to..." dialog
3. **Click "Clear" button**
   - ✅ Should show confirm dialog (our code)
   - ✅ Should NOT show permission request
4. **Check browser console**
   - ✅ No permission errors
   - ✅ No blocked popup warnings
5. **Check browser address bar**
   - ✅ No permission icon appears

### Automated Testing

```tsx
// Test that button only calls onClick
test('Clear button calls handler', () => {
  const handleClear = jest.fn();
  render(<IconButton onClick={handleClear}>Clear</IconButton>);
  
  fireEvent.click(screen.getByText('Clear'));
  
  expect(handleClear).toHaveBeenCalledTimes(1);
  // No side effects
});

// Test disabled state blocks everything
test('Disabled button blocks all actions', () => {
  const handleClick = jest.fn();
  render(<IconButton onClick={handleClick} disabled>Clear</IconButton>);
  
  fireEvent.click(screen.getByText('Clear'));
  
  expect(handleClick).not.toHaveBeenCalled();
});
```

---

## 📝 Summary

### Current State (Correct) ✅

- **Buttons**: Pure visual components with simple onClick
- **Logic**: Handled in App.tsx parent component
- **Confirmations**: Using safe `confirm()` after user click
- **Permissions**: ZERO browser permission requests
- **Security**: All interactions are user-initiated

### What Figma Designer Needs to Do

1. Remove ALL prototype interactions from Figma buttons
2. Make buttons static visual components
3. No Open Overlay, Open Link, or Navigate actions
4. Clean layer structure: Background + Label only

### What Code Already Does (No Changes Needed)

1. ✅ Buttons are pure visual components
2. ✅ onClick handlers passed from parent
3. ✅ Confirmation dialogs handled in code
4. ✅ No permission requests
5. ✅ All interactions user-initiated

---

## 🎯 Conclusion

The **code implementation is already correct**. The buttons work perfectly without triggering any unwanted permission requests.

If you're getting permission dialogs, they're likely coming from:
1. ❌ Figma prototype interactions (needs designer cleanup)
2. ❌ Browser extensions interfering
3. ❌ Incorrect testing environment

The buttons in **our code** are safe and will never trigger permission requests on their own.
