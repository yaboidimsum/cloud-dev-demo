# 004 — Optimize Card Hover and Active Transitions

- **Status**: DONE
- **Commit**: 344d78a
- **Severity**: HIGH
- **Category**: Performance & Physicality
- **Estimated scope**: 2 files (`components/project-card.tsx`, `components/certificate-card.tsx`), minor changes

## Problem

Both `ProjectCard` and `CertificateCard` use `transition-all duration-300` for hover translate and shadow transitions. This is inefficient as it triggers paint and composite passes for properties that do not need animation (such as layouts, borders, backgrounds) on every frame. Additionally, the active state (`active:scale-[0.98]`) is bound to the sluggish 300ms transition, making mouse click/press feedback feel slow and floaty.

Verbatim code from:
- `components/project-card.tsx:59`
- `components/certificate-card.tsx:35`

```tsx
<div className="overflow-hidden rounded-lg border border-zinc-300 bg-white transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:group-hover:border-zinc-700 active:scale-[0.98]">
```

## Target

Target optimized transition classes that focus only on `transform`, `box-shadow`, and `border-color`, while speeding up the transition duration to `160ms` with a responsive cubic-bezier (like `cubic-bezier(0.23, 1, 0.32, 1)` or standard `ease-out`).

```tsx
<div className="overflow-hidden rounded-lg border border-zinc-300 bg-white transition-[transform,box-shadow,border-color] duration-200 ease-out group-hover:-translate-y-1.5 group-hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:group-hover:border-zinc-700 active:scale-[0.98] active:duration-75">
```
*(Notice the addition of `active:duration-75` to make the click scaling feel instantaneous, returning smoothly on release).*

## Repo conventions to follow

- Hover styles are defined directly inline using Tailwind classes.
- Use standard Tailwind utility classes like `transition-[transform,box-shadow,border-color]` or add transitions custom style if preferred, though standard utility class strings are highly readable and preferred here.

## Steps

1. In `components/project-card.tsx:59`, locate the card wrapper outer `div` inside the `<Link>` component.
2. Replace `transition-all duration-300` with `transition-[transform,box-shadow,border-color] duration-200 ease-out active:duration-75`.
3. In `components/certificate-card.tsx:35`, locate the card wrapper outer `div` inside the `<motion.div>` wrapper.
4. Replace `transition-all duration-300` with `transition-[transform,box-shadow,border-color] duration-200 ease-out active:duration-75`.

## Boundaries

- Do NOT touch layout structures or other elements within the cards.
- Do NOT change the scaling factors or values (`-translate-y-1.5` or `scale-[0.98]`).

## Verification

- **Mechanical**: Run `npm run build` or `npm run lint` to verify that there are no compile/type issues.
- **Feel check**:
  - Open the homepage or Projects page.
  - Hover over a project card: the upward glide and shadow expansion should feel snappy and clean.
  - Click down on the card: the card should scale down instantly (`active:duration-75`).
  - Release the click: the card should glide back to hover height smoothly.
- **Done when**: `project-card.tsx` and `certificate-card.tsx` compile cleanly and utilize targeted GPU-accelerated transition properties instead of `transition-all`.
