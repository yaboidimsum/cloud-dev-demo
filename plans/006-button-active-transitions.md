# 006 — Smooth Button Active Transitions

- **Status**: DONE
- **Commit**: 344d78a
- **Severity**: HIGH
- **Category**: Physicality & Origin
- **Estimated scope**: 2 files (`components/arts/BasicFramerButton/basic-framer-button.tsx`, `components/arts/ToastPop/toast-pop.tsx`), minor changes

## Problem

In multiple playground/art demonstration components, buttons are configured with press feedback scaling (`active:scale-97` or `active:scale-95`), `ease`, and `duration-150` classes, but they omit Tailwind's `transition` or `transition-transform` property class. Because of this omission, the active scale triggers instantly (a digital snap) with zero transition animation, making press feedback feel rigid and broken.

Verbatim code from:
- `components/arts/BasicFramerButton/basic-framer-button.tsx:28`
- `components/arts/ToastPop/toast-pop.tsx:26, 34`

```tsx
/* basic-framer-button.tsx:28 */
className={`${BasicFramerButton.blueButton} ease active:scale-97 transform cursor-pointer duration-150`}

/* toast-pop.tsx:26 and 34 */
className={`${ToastPop.button} ease transform cursor-pointer duration-150 active:scale-95 dark:text-zinc-800`}
```

## Target

Introduce Tailwind's `transition-transform` property class so that the `duration-150` and timing functions are applied to the active scale, yielding a smooth scale-down and springy recovery. Also, standardise the timing function to `ease-out`.

```tsx
/* basic-framer-button.tsx:28 */
className={`${BasicFramerButton.blueButton} transition-transform duration-150 ease-out active:scale-97 transform cursor-pointer`}

/* toast-pop.tsx:26 and 34 */
className={`${ToastPop.button} transition-transform duration-150 ease-out active:scale-95 dark:text-zinc-800 cursor-pointer`}
```

## Repo conventions to follow

- Hover and active states are declared inline via Tailwind utility classes.
- Use `transition-transform` for scaling animations.

## Steps

1. In `components/arts/BasicFramerButton/basic-framer-button.tsx:28`, locate the `<button>` element.
2. Replace `ease active:scale-97 transform cursor-pointer duration-150` with `transition-transform duration-150 ease-out active:scale-97 transform cursor-pointer`.
3. In `components/arts/ToastPop/toast-pop.tsx:25`, locate the first button ("Add toast").
4. Replace `ease transform cursor-pointer duration-150 active:scale-95 dark:text-zinc-800` with `transition-transform duration-150 ease-out active:scale-95 dark:text-zinc-800 cursor-pointer`.
5. In `components/arts/ToastPop/toast-pop.tsx:33`, locate the second button ("Restart").
6. Replace `ease transform cursor-pointer duration-150 active:scale-95 dark:text-zinc-800` with `transition-transform duration-150 ease-out active:scale-95 dark:text-zinc-800 cursor-pointer`.

## Boundaries

- Do NOT touch the state logic, timeouts, or CSS Module stylesheets.
- Do NOT touch other button classes or icons.

## Verification

- **Mechanical**: Run build/lint scripts.
- **Feel check**:
  - Open the Arts page and navigate to the "Smooth Motion Button" and "Smooth Toast" card demonstrations.
  - Press down on the buttons: they should shrink smoothly (`150ms` ease-out).
  - Release the click: they should expand back to original size smoothly.
- **Done when**: The playground buttons scale down smoothly on active press states using targeted `transition-transform` classes.
