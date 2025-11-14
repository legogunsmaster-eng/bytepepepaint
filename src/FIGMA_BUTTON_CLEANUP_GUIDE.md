# Figma Button Cleanup Guide — BytePepe Paint

## 🎯 Objective
Make the "Clear" and "Create New Canvas" buttons work on the website without triggering ANY permission dialogs, pop-ups, or confirmation windows.

---

## 📋 Step-by-Step Instructions for Figma

### STEP 1: Remove ALL Prototype Interactions

For **EACH** button ("Clear" & "Create New Canvas"):

1. **Select the button** in Figma
2. **Open the Prototype panel** (right sidebar)
3. **Delete EVERY interaction** by clicking the "−" button:
   - ❌ Delete: On Click → Open Overlay
   - ❌ Delete: On Click → Open Link
   - ❌ Delete: On Click → Navigate To
   - ❌ Delete: On Click → Swap
   - ❌ Delete: On Click → Set Variable
   - ❌ Delete: On Click → Close Overlay
   - ❌ Delete: Any other interaction

4. **Verify**: The "Interactions" section should be **completely empty**

---

### STEP 2: Remove All Hidden Links

Still with the button selected:

1. **Check for embedded URLs**:
   - Look in the Prototype panel
   - Look for any blue prototype arrows
   - Check if there's a "🔗" link icon anywhere

2. **Delete all links**:
   - Click each link/arrow
   - Press `Delete` or click the "−" button
   - Remove ALL prototype connections

3. **Check nested layers**:
   - Expand the button component
   - Select each child layer (background, text, icon)
   - Check if ANY child has prototype interactions
   - Delete all child interactions too

---

### STEP 3: Remove Variables and Component Properties

1. **Select the button**
2. **Check the right sidebar** for:
   - Component properties with "Change to" actions → **DELETE**
   - Variables tied to interactions → **DELETE**
   - Boolean properties that trigger states → **DELETE**

3. **Keep ONLY visual properties**:
   - ✅ KEEP: Fill color
   - ✅ KEEP: Text content
   - ✅ KEEP: Border radius
   - ✅ KEEP: Padding/spacing
   - ✅ KEEP: Auto-layout settings
   - ❌ REMOVE: Everything else

---

### STEP 4: Ensure Clean Layer Structure

Each button should have this EXACT structure:

```
🔷 Button / Clear (Component)
  └─ 📦 Background (Rectangle)
  └─ 📝 Label (Text)
```

OR (if using auto-layout):

```
🔷 Button / Clear (Component with Auto-layout)
  └─ 🗑️ Icon (optional)
  └─ 📝 Label (Text)
```

**Remove any extra layers:**
- ❌ Hidden overlay frames
- ❌ Invisible hit-area rectangles (unless for padding)
- ❌ Nested components with behaviors
- ❌ Modal frames
- ❌ Transition frames

---

### STEP 5: Convert to Independent Components

For each button:

1. **Select the button frame**
2. **Right-click** → **Create Component**
3. **DO NOT** use "Create Component Set" (Variants)
4. **Rename the component** clearly:
   - `Button / Clear`
   - `Button / New Canvas`

**Important**: Each button must be a **separate, independent component**. Do NOT group them into variants.

---

### STEP 6: Verify No Overlays or Modals are Connected

1. **Check the entire Figma page** for:
   - Modal frames
   - Overlay frames
   - Dialog frames
   - Popup frames

2. **If these exist and are connected to the buttons**:
   - **Delete the prototype connection** (the blue arrow)
   - You can keep the modal frame design, but it must NOT be connected to the button

3. **Verify**: Click the button in Figma → Nothing should happen (no preview, no overlay)

---

### STEP 7: Remove Hover and Press States (if any)

1. **Select the button**
2. **Check if it has multiple states**:
   - Default
   - Hover
   - Pressed
   - Focused

3. **If states exist with interactions**:
   - Go to each state variant
   - Delete ALL prototype interactions in each state
   - OR: Just use the Default state only

---

### STEP 8: Final Verification Checklist

Before exporting, verify for EACH button:

- [ ] Prototype panel is completely empty
- [ ] No blue prototype arrows visible
- [ ] No "Open Link" actions
- [ ] No variables tied to interactions
- [ ] No nested components with behaviors
- [ ] Layer structure is clean (Background + Label only)
- [ ] Component is independent (not in a variant set)
- [ ] No modal/overlay connections
- [ ] Clicking the button in prototype mode does nothing

---

### STEP 9: Prepare for Export/Handoff

1. **Organize the components**:
   - Put both buttons in a dedicated "Components" page
   - Or in a "Buttons" section clearly labeled

2. **Name the layers clearly**:
   ```
   Button / Clear
     ├─ Background
     └─ Label
   
   Button / New Canvas
     ├─ Background
     └─ Label
   ```

3. **Add a note** in Figma:
   > "These buttons have NO interactions. All logic is handled by the website code."

---

## 🎨 Visual Design to Preserve

Keep these visual properties intact:

| Property | Value |
|----------|-------|
| Background Color | #0052ff (blue) or #dc2626 (red for destructive) |
| Text Color | #ffffff (white) |
| Border Radius | 10px |
| Padding | 16px horizontal, 8px vertical |
| Font | Medium weight |

---

## ⚠️ Common Mistakes to Avoid

### ❌ DON'T:
- Use "Open Overlay" for confirmations (handle in code)
- Add "On Click → Navigate To"
- Embed URLs in the button
- Use component properties that trigger actions
- Nest other interactive components
- Create variants with different behaviors

### ✅ DO:
- Make buttons purely visual
- Use auto-layout for responsive sizing
- Keep layer structure simple
- Name layers clearly
- Remove ALL interactions

---

## 🔍 Testing the Cleanup

After making changes:

1. **Enter Prototype mode** (▶️ button)
2. **Click each button**
3. **Expected result**: Nothing happens (no overlays, no navigation, no popups)
4. **If something happens**: Go back and remove that interaction

---

## 📤 Exporting for Developers

Once cleaned:

**Option 1: Dev Mode**
- Share the Figma link with dev mode enabled
- Developers will inspect and recreate in code

**Option 2: Export Assets**
- Select each button
- Export as SVG or PNG (for reference only)
- Include a note that logic is in code, not design

**Option 3: Code Export**
- Use Figma's "Copy as CSS" or similar
- Provide only the visual styles
- No behavior/interaction code

---

## 💻 How Buttons Will Work in Code

The website will implement the buttons like this:

```tsx
// Pure visual component - no internal logic
<PrimaryButton onClick={handleClearCanvas}>
  Clear
</PrimaryButton>

// Logic handled by parent component
function ParentComponent() {
  const handleClearCanvas = () => {
    if (confirm('Clear canvas?')) {
      // Clear logic here
    }
  };
  
  return <PrimaryButton onClick={handleClearCanvas}>Clear</PrimaryButton>;
}
```

**Key point**: The confirmation dialog appears because of the code's `confirm()`, NOT because of any Figma interaction.

---

## 📞 Questions?

If you're unsure about any step:

1. Check if the Prototype panel is empty
2. Try clicking the button in prototype mode
3. If nothing happens → you did it correctly ✅
4. If something happens → remove that interaction

---

## ✅ Success Criteria

You'll know you're done when:

- ✅ Both buttons are independent components
- ✅ Prototype panel shows no interactions
- ✅ No blue arrows connecting to other frames
- ✅ Clicking in prototype mode does nothing
- ✅ Layer structure is clean and simple
- ✅ Ready for developer handoff

---

## 🎯 Final Note

Remember: **The buttons are just visual designs**. All the actual functionality (clearing canvas, creating new, showing confirmations) happens in the website code, NOT in Figma.

Your job is to make sure Figma doesn't add ANY automatic behaviors that might interfere with the website's code.
