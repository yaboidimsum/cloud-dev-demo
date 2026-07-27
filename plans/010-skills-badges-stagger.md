# 010 — Staggered Skills Badges Mount

- **Status**: DONE
- **Commit**: 344d78a
- **Severity**: LOW
- **Category**: Cohesion & Tokens
- **Estimated scope**: 1 file (`app/skills/page.tsx`), moderate changes

## Problem

In `app/skills/page.tsx`, every `SkillBadge` is animated independently using a hardcoded `initial`/`animate` mount translation. As a result, when the page mounts, every badge across all tech categories animates in simultaneously, creating visual clutter and a less premium feel.

Verbatim code from `app/skills/page.tsx:29-52`:

```tsx
  const SkillBadge = ({
    icon,
    name,
  }: {
    icon: React.ReactNode;
    name: string;
  }) => {
    return (
      <motion.div
        className="mb-2 mr-2 inline-flex items-center space-x-1.5 rounded-md bg-zinc-300 px-3 py-1.5 text-sm tracking-tighter dark:bg-zinc-900"
        whileHover={{
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          transition: { type: "spring", stiffness: 300, damping: 15 },
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
```

## Target

Implement a parent stagger container and inherit the animation variants in individual `SkillBadge` children, allowing each section list (Languages, Frameworks, Libraries, Tools, Platforms) to cascade-mount sequentially.

```tsx
/* app/skills/page.tsx - Variants defined at the top */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

/* app/skills/page.tsx - SkillBadge update */
  const SkillBadge = ({
    icon,
    name,
  }: {
    icon: React.ReactNode;
    name: string;
  }) => {
    return (
      <motion.div
        className="mb-2 mr-2 inline-flex items-center space-x-1.5 rounded-md bg-zinc-300 px-3 py-1.5 text-sm tracking-tighter dark:bg-zinc-900"
        variants={badgeVariants}
        whileHover={{
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          transition: { type: "spring", stiffness: 300, damping: 15 },
        }}
      >
        <span className="text-lg">{icon}</span>
        <span>{name}</span>
      </motion.div>
    );
  };
```

And update category flex lists:
```tsx
          <SectionTitle title="LANGUAGES" />
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="show" 
            className="flex flex-wrap tracking-tighter"
          >
            <SkillBadge icon={<SiJavascript />} name="JavaScript" />
            ...
          </motion.div>
```

## Repo conventions to follow

- Standard Framer Motion variants declaration format.
- Stagger children timing should remain subtle (`40ms` interval) to avoid blocking content absorption.

## Steps

1. Open `app/skills/page.tsx`.
2. Define `containerVariants` and `badgeVariants` constants outside the `Skills` component definition.
3. Update `SkillBadge` definition (lines 29-52) by removing `initial`, `animate`, and `transition` props from `<motion.div>`. Add `variants={badgeVariants}` to inherit the animation sequence.
4. Locate the list containers under each `<SectionTitle>` category:
   - For **LANGUAGES** (line 114): change `<div className="flex flex-wrap tracking-tighter">` to `<motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-wrap tracking-tighter">`. Add corresponding closing `</motion.div>`.
   - For **FRAMEWORKS** (line 123): change `<div className="flex flex-wrap">` to `<motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-wrap">`. Add corresponding closing `</motion.div>`.
   - For **LIBRARIES** (line 130): change `<div className="flex flex-wrap">` to `<motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-wrap">`. Add corresponding closing `</motion.div>`.
   - For **TOOLS** (line 136): change `<div className="flex flex-wrap">` to `<motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-wrap">`. Add corresponding closing `</motion.div>`.
   - For **PLATFORMS** (line 143): change `<div className="flex flex-wrap">` to `<motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-wrap">`. Add corresponding closing `</motion.div>`.

## Boundaries

- Do NOT touch svg imports or lucide icon assets.
- Do NOT change structural flex wrappers or colors of badges.

## Verification

- **Mechanical**: Run compilation validation.
- **Feel check**:
  - Open the Skills page.
  - The badge sections should cascade in smoothly and sequentially, wave-by-wave, instead of a sudden pop.
  - The hover effect should remain springy and fast.
- **Done when**: `app/skills/page.tsx` utilizes coordinated parent variants to stagger the entrance layout of the badge grids.
