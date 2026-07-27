# 011 — Staggered Certificates List Mount

- **Status**: DONE
- **Commit**: 344d78a
- **Severity**: LOW
- **Category**: Cohesion & Tokens
- **Estimated scope**: 2 files (`app/certificate/page.tsx`, `components/certificate-card.tsx`), minor changes

## Problem

When entering the Certificates page, all certificate cards animate on mount simultaneously. Since the cards load at the exact same moment, it creates a flat pop effect. Staggering card slide-ins will coordinate the entry sequences cleanly and align with the staggered entry designed for Projects.

Verbatim code from:
- `app/certificate/page.tsx:25-39`
- `components/certificate-card.tsx:29-34, 69`

```tsx
/* app/certificate/page.tsx:25-39 */
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {certificatePost.map(({ slug, ...delegated }) => (
          <CertificateCard
            key={slug}
            slug={slug}
            route={route}
            {...delegated}
          />
        ))}
      </div>

/* components/certificate-card.tsx:29-34 */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group"
    >
```

## Target

Coordinate the mount sequence. Define a stagger container parent variant in `app/certificate/page.tsx` and map a matching item transition variant in `components/certificate-card.tsx`.

```tsx
/* app/certificate/page.tsx - Variants defined at the top */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

/* app/certificate/page.tsx - Grid element update */
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {certificatePost.map(({ slug, ...delegated }) => (
          <CertificateCard
            key={slug}
            slug={slug}
            route={route}
            {...delegated}
          />
        ))}
      </motion.div>
```

```tsx
/* components/certificate-card.tsx - Variants defined at the top */
const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
};

/* components/certificate-card.tsx - Component return update */
  return (
    <motion.div
      variants={cardVariants}
      className="group"
    >
      ...
```

## Repo conventions to follow

- Parent container maps `variants`, `initial="hidden"`, and `animate="show"`.
- Child maps `variants` and inherits trigger state commands (`hidden`/`show`) automatically.

## Steps

1. Open `app/certificate/page.tsx`.
2. Import `motion` from `framer-motion`: `import { motion } from "framer-motion";`.
3. Define the `containerVariants` constant.
4. Replace the grid `<div className="grid grid-cols-1 gap-6 md:grid-cols-2">` (line 25) with `<motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 gap-6 md:grid-cols-2">` and match the closing tag to `</motion.div>`.
5. Open `components/certificate-card.tsx`.
6. Define the `cardVariants` constant outside the component definition.
7. Change the wrapper `<motion.div>` props from:
   ```tsx
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ type: "spring", stiffness: 300, damping: 20 }}
   ```
   to:
   ```tsx
   variants={cardVariants}
   ```

## Boundaries

- Do NOT touch content files or abstract string layout formatting.
- Ensure type parameters are respected.

## Verification

- **Mechanical**: Run compilation validation.
- **Feel check**:
  - Open the Certificates page. The cards should cascade sequentially using a smooth 50ms stagger list entrance.
- **Done when**: `app/certificate/page.tsx` utilizes parent/child spring stagger coordinates to load certificate card list blocks.
