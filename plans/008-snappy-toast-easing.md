# 008 — Snappy Toast Notification Easing

- **Status**: DONE
- **Commit**: 344d78a
- **Severity**: MEDIUM
- **Category**: Easing & Duration
- **Estimated scope**: 1 file (`components/arts/ToastPop/toast-pop.module.css`), minor changes

## Problem

In the "Smooth Toast" demonstration component (`components/arts/ToastPop/toast-pop.module.css:16-17`), the transition is defined as:
```css
  transition-property: transform, opacity;
  transition: 400ms ease;
```
Since the `transition` shorthand overrides the preceding `transition-property`, this compiles to `transition: all 400ms ease;`. Furthermore, `400ms` is too slow for UI indicators, and the symmetric `ease` curve starts slow and ends slow, delaying the feedback the user is watching. A toast entrance should feel snappy and responsive (fast start, gradual settle).

## Target

Implement an explicit target property transition with a responsive ease-out curve (`cubic-bezier(0.23, 1, 0.32, 1)`) and a snappier duration budget (`250ms`).

```css
.toast {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px 13px;
  width: 100%;
  font-size: 13px;
  border-radius: 8px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.08),
    0px 1px 2px -1px rgba(0, 0, 0, 0.08), 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
  position: absolute;
  transform: translateY(100%);
  bottom: 0;
  opacity: 0;
  transition: transform 250ms cubic-bezier(0.23, 1, 0.32, 1), opacity 250ms cubic-bezier(0.23, 1, 0.32, 1);
}
```

## Repo conventions to follow

- Easing parameters are declared inline inside CSS files.
- The standard custom ease-out curve is `cubic-bezier(0.23, 1, 0.32, 1)`.

## Steps

1. Open `components/arts/ToastPop/toast-pop.module.css`.
2. Locate the `.toast` style block (lines 1-18).
3. Replace the lines:
   ```css
     transition-property: transform, opacity;
     transition: 400ms ease;
   ```
   with:
   ```css
     transition: transform 250ms cubic-bezier(0.23, 1, 0.32, 1), opacity 250ms cubic-bezier(0.23, 1, 0.32, 1);
   ```

## Boundaries

- Do NOT change other toast styles (sizing, spacing, borders, shadows).
- Do NOT change the `data-mounted` translations or calculations.

## Verification

- **Mechanical**: Verify css transitions compile cleanly (run `npm run build`).
- **Feel check**:
  - Open the Arts page and navigate to the "Smooth Toast" demonstration.
  - Click "Add toast".
  - The toast should slide up and pop in snappily and responsively (fast acceleration, smooth deceleration) rather than floating slowly.
- **Done when**: `toast-pop.module.css` explicitly targets `transform` and `opacity` with a snappy 250ms custom cubic-bezier curve.
