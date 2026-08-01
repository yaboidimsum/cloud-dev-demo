# 007 — Eliminate Inefficient transition-all Classes

- **Status**: DONE
- **Commit**: 344d78a
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 3 files (`components/ui/button.tsx`, `components/availability-indicator.tsx`, `components/projects-list.tsx`), minor changes

## Problem

Using Tailwind's `transition-all` causes the browser to animate and compute style/layout modifications for all possible CSS attributes, preventing the browser from offloading changes directly to the GPU compositor. In UI inputs, buttons, and badges, this triggers unnecessary layout calculations and paint stages when classes toggle.

Verbatim code from:
- `components/ui/button.tsx:8`
- `components/availability-indicator.tsx:14`
- `components/projects-list.tsx:74, 91, 106`

```tsx
/* button.tsx:8 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 ...",
  ...
)

/* availability-indicator.tsx:14 */
className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium  transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${ ... }`}

/* projects-list.tsx:74 */
className="... focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all text-zinc-900 dark:text-zinc-50"

/* projects-list.tsx:91 and 106 */
"px-3 py-1 text-xs rounded-full border transition-all cursor-pointer"
```

## Target

Replace broad `transition-all` classes with targeted GPU-friendly transition classes focusing only on the specific styling variables being updated (e.g. colors, borders, transform, shadows).

```tsx
/* button.tsx:8 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 ...",
  ...
)

/* availability-indicator.tsx:14 */
className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium  transition-[transform,box-shadow,background-color,color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm ${ ... }`}

/* projects-list.tsx:74 */
className="... focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-[border-color,box-shadow,background-color] duration-150 ease-out text-zinc-900 dark:text-zinc-50"

/* projects-list.tsx:91 and 106 */
"px-3 py-1 text-xs rounded-full border transition-[border-color,background-color,color] duration-150 ease-out cursor-pointer"
```

## Repo conventions to follow

- Declare explicit Tailwind transitions using standard CSS brackets syntax (e.g., `transition-[transform,opacity]`).

## Steps

1. Open `components/ui/button.tsx` and find `buttonVariants`. Replace the `transition-all` class within the base CVA class string with `transition-[color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow] duration-150 ease-out`.
2. Open `components/availability-indicator.tsx:14`. Replace `transition-all duration-200` with `transition-[transform,box-shadow,background-color,color] duration-200 ease-out`.
3. Open `components/projects-list.tsx`.
4. In the search `<input>` element (line 74), replace `transition-all` with `transition-[border-color,box-shadow,background-color] duration-150 ease-out`.
5. In the "All" tag button (line 91), replace `transition-all` with `transition-[border-color,background-color,color] duration-150 ease-out`.
6. In the individual tag map buttons (line 106), replace `transition-all` with `transition-[border-color,background-color,color] duration-150 ease-out`.

## Boundaries

- Do NOT touch layouts or interactive triggers in these components.
- Keep variables, hooks, state handling, and colors exactly identical.

## Verification

- **Mechanical**: Run `npm run build` to confirm there are no type or bundle compiler errors.
- **Feel check**:
  - Toggling theme modes, hovering buttons, focusing search inputs, and clicking tags should remain fully animated but render instantly on screen without frames dropping (no layout paint calculations).
- **Done when**: `button.tsx`, `availability-indicator.tsx`, and `projects-list.tsx` are free of `transition-all` class strings.
