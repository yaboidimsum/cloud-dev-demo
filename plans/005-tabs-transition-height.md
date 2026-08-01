# 005 — Tabs Transition and Height Layout Morphing

- **Status**: DONE
- **Commit**: 344d78a
- **Severity**: HIGH
- **Category**: Easing, Duration & Missed Opportunities
- **Estimated scope**: 1 file (`app/page.tsx`), moderate changes

## Problem

1. The Tab Triggers (Work History, Education) use `transition-all duration-300 ease-in-out` which is slow and animates layout properties.
2. The Tab Panels (`TabsContent`) transition via a slow `duration-500 ease-in-out` opacity fade. When switching tabs, this slow fade feels sluggish.
3. The height of the tab content jumps instantly because the height of the lists is different, causing a jarring layout shift of the footer/sidebar.

Verbatim code from `app/page.tsx:197-281`:

```tsx
            <Tabs defaultValue="work" className="w-full">
              <TabsList className="grid w-full grid-cols-2 border-zinc-400 bg-zinc-100/70  dark:bg-zinc-900">
                <TabsTrigger
                  value="work"
                  className=" transition-all duration-300  ease-in-out "
                >
                  Work History
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className=" transition-all duration-300  ease-in-out "
                >
                  Education
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="work"
                className="mt-4 transition-opacity duration-500 ease-in-out data-[state=active]:opacity-100 data-[state=inactive]:opacity-0"
              >
```

## Target

1. Triggers: Use snappy transitions focused only on color and box-shadow with a duration of `150ms`.
2. Content: Speed up the opacity fade to `200ms` with `ease-out`, and add a subtle upward translate entrance (`translate-y-1` to `translate-y-0`) to give the entering tab content a physical, floating lift.
3. Height: Wrap the `TabsContent` components in a `<motion.div layout>` wrapper with a spring transition, allowing Framer Motion to morph the height of the tabs block smoothly during tab switches.

```tsx
            <Tabs defaultValue="work" className="w-full">
              <TabsList className="grid w-full grid-cols-2 border-zinc-400 bg-zinc-100/70  dark:bg-zinc-900">
                <TabsTrigger
                  value="work"
                  className=" transition-[color,box-shadow,background-color] duration-150 ease-out"
                >
                  Work History
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className=" transition-[color,box-shadow,background-color] duration-150 ease-out"
                >
                  Education
                </TabsTrigger>
              </TabsList>
              <motion.div 
                layout="position" 
                className="overflow-hidden" 
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
              >
                <TabsContent
                  value="work"
                  className="mt-4 transition-[opacity,transform] duration-200 ease-out data-[state=active]:opacity-100 data-[state=active]:translate-y-0 data-[state=inactive]:opacity-0 data-[state=inactive]:translate-y-1"
                >
                  ...
                </TabsContent>
                <TabsContent
                  value="education"
                  className="mt-4 transition-[opacity,transform] duration-200 ease-out data-[state=active]:opacity-100 data-[state=active]:translate-y-0 data-[state=inactive]:opacity-0 data-[state=inactive]:translate-y-1"
                >
                  ...
                </TabsContent>
              </motion.div>
            </Tabs>
```

## Repo conventions to follow

- `framer-motion` imports are already present in `app/page.tsx:8`: `import { motion } from "framer-motion";`.
- Radix UI Tabs (`@radix-ui/react-tabs`) are fully customisable.

## Steps

1. In `app/page.tsx`, search for `<Tabs defaultValue="work" ...>`.
2. Locate the two `<TabsTrigger>` elements. Replace their `className` transitions `transition-all duration-300  ease-in-out` with `transition-[color,box-shadow,background-color] duration-150 ease-out`.
3. Wrap both `<TabsContent value="work">` and `<TabsContent value="education">` inside a `<motion.div layout="position" className="overflow-hidden" transition={{ type: "spring", stiffness: 350, damping: 35 }}>` block.
4. Update the `className` of the first `<TabsContent>` (work history) by replacing `transition-opacity duration-500 ease-in-out data-[state=active]:opacity-100 data-[state=inactive]:opacity-0` with `transition-[opacity,transform] duration-200 ease-out data-[state=active]:opacity-100 data-[state=active]:translate-y-0 data-[state=inactive]:opacity-0 data-[state=inactive]:translate-y-1`.
5. Update the `className` of the second `<TabsContent>` (education) with the exact same replacement class string.

## Boundaries

- Do NOT change the child data, rendering loop, or elements inside the tabs content lists.
- Do NOT add new third-party libraries; use the existing `framer-motion` library.

## Verification

- **Mechanical**: Verify typechecking passes with `npm run lint`.
- **Feel check**:
  - Run the dev server and click between the "Work History" and "Education" tabs.
  - The tab triggers should highlight and toggle instantly (150ms).
  - The tab list content should fade in and slide up slightly (4px) with a snappy 200ms transition.
  - The height change between the shorter and longer content tabs should animate smoothly via the spring layout morph instead of snapping.
- **Done when**: `app/page.tsx` uses layout height springs for the tabs content and snappy slide-fade transitions for the panel visibility.
