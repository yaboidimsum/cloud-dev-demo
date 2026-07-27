# 009 — Stagger and Ease Filtering in Projects List

- **Status**: DONE
- **Commit**: 344d78a
- **Severity**: MEDIUM
- **Category**: Cohesion & Tokens
- **Estimated scope**: 2 files (`components/projects-list.tsx`, `components/project-card.tsx`), moderate changes

## Problem

1. When the Projects page mounts, all project cards animate in simultaneously with no stagger, which feels static.
2. There is a mount animation clash: `ProjectsList` wraps `ProjectCard` in a `<motion.div>` that scales from 0.9, while `ProjectCard` has its own wrapper `<motion.div>` that translates `y: 20`. This results in overlapping, discordant double animations.
3. During filtering, entering/exiting cards tween with standard, linear-feeling default durations (`duration: 0.2` with no easing specified).

Verbatim code:
- `components/projects-list.tsx:120-135`
- `components/project-card.tsx:53-57, 117`

```tsx
/* components/projects-list.tsx:120-135 */
      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard route={route} {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

/* components/project-card.tsx:53-57 */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
```

## Target

1. Move the card animation responsibility to the list wrapper. Eliminate the wrapper `<motion.div>` in `ProjectCard` and render a plain fragment or block.
2. Define a clean stagger parent variant and matching child item variants in `ProjectsList` that animate on spring timing:
   - Container stagger: `0.05s`
   - Child spring timing: `{ type: "spring", stiffness: 300, damping: 24 }`
   - Exiting timing: `{ duration: 0.15, ease: "easeIn" }`

```tsx
/* components/projects-list.tsx - Variants definition */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 15 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

/* components/projects-list.tsx - Rendering */
      <motion.div 
        layout 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.slug}
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <ProjectCard route={route} {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
```

## Repo conventions to follow

- Parent container and child items connect their variants via Framer Motion's `variants` object.

## Steps

1. Open `components/project-card.tsx`.
2. Locate the wrapper `<motion.div>` (lines 53-57 and line 117).
3. Remove the `<motion.div>` and `</motion.div>` wrapper tags, keeping the internal `<Link>` element as the root of the component. Remove `import { motion } from "framer-motion"` if it's no longer used.
4. Open `components/projects-list.tsx`.
5. Add `containerVariants` and `itemVariants` constants outside the component definition.
6. Replace the grid element `<motion.div layout className="...">` with:
   ```tsx
   <motion.div 
     layout 
     variants={containerVariants}
     initial="hidden"
     animate="show"
     className="grid grid-cols-1 gap-6 md:grid-cols-2"
   >
   ```
7. Inside the `.map(project)` loop, locate the card `<motion.div>` wrapper (lines 123-129). Replace its animation props (`initial`, `animate`, `exit`, `transition`) with `variants={itemVariants}`.

## Boundaries

- Do NOT touch tag badge filtering logic or layout designs.
- Ensure Certificates list does not break since `CertificateCard` might need a corresponding change. (Proceed to specify this in the next plan if required, or update `CertificateCard` wrapper list).

## Verification

- **Mechanical**: Run compilation checks.
- **Feel check**:
  - Open the Projects page. The card items should slide and fade up sequentially with a smooth 50ms stagger.
  - Type in the search input: filtered-out cards should shrink and fade out smoothly (`easeIn`, 150ms).
  - Remaining cards should animate layout recalculations dynamically and settle with a clean spring bounce.
- **Done when**: `projects-list.tsx` controls card animations using coordinated container stagger and item spring variants.
