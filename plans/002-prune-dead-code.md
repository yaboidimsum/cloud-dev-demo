# Plan 002: Prune Commented and Dead Code Components

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 08722f6..HEAD -- components/timeline.tsx components/view-counter-test.tsx app/page.tsx app/apple-dev/[id]/page.tsx app/projects/[id]/page.tsx`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `08722f6`, 2026-07-13

## Why this matters

The repository contains dead, commented-out components that bloat bundle sizes and create developer confusion. `timeline.tsx` is completely unused in the main layout and embeds over 50KB of inline static assets. `view-counter-test.tsx` was a utility test layout that is no longer required. Pruning them cleans code volume.

## Current state

- Relevant Files:
  - `components/timeline.tsx` — Unused SVG timeline view; dead code.
  - `components/view-counter-test.tsx` — Unused view test rendering; dead code.
  - `app/page.tsx` — Main landing layout; contains commented timeline markers.
  - `app/apple-dev/[id]/page.tsx` — Apple dev detail router; contains commented test component references.
  - `app/projects/[id]/page.tsx` — Project detail router; contains commented test component references.

## Commands you will need

| Purpose   | Command                  | Expected on success |
|-----------|--------------------------|---------------------|
| Install   | `bun install`            | exit 0              |
| Lint Check| `bun run lint`           | exit 0, no errors   |
| Build Check| `bun run build`         | exit 0, compiled successfully |

## Scope

**In scope** (modify or delete):
- `components/timeline.tsx` (DELETE)
- `components/view-counter-test.tsx` (DELETE)
- `app/page.tsx`
- `app/apple-dev/[id]/page.tsx`
- `app/projects/[id]/page.tsx`

**Out of scope**:
- `components/view-tracker.tsx` — Active production view component; do not delete.

## Git workflow

- Branch: `advisor/002-prune-dead-code`
- Commit message format: `chore(cleanup): remove unused timeline and view test components`

## Steps

### Step 1: Delete Unused Component Files
Delete the dead files `components/timeline.tsx` and `components/view-counter-test.tsx` from the project.

**Verify**: Check that both files are deleted from the disk using `git status`.

### Step 2: Clean app/page.tsx Timeline references
Open `app/page.tsx` and delete the commented-out references to the Timeline component.
- Remove `{/* <Timeline /> */}` on line 317 (or surrounding).

**Verify**: Run `bun run lint` to verify syntax.

### Step 3: Clean commented references in detail page routing templates
Open `app/apple-dev/[id]/page.tsx` and `app/projects/[id]/page.tsx`. Clean up commented imports and render nodes referencing `ViewCounterTest`.
- Delete: `// import ViewCounterTest from "@/components/view-counter-test";`
- Delete: `{/* <ViewCounterTest slug={id} type="project" /> */}` (or similar comment blocks).

**Verify**: Run `bun run build` to confirm everything compiles without missing references.

## Done criteria

- [ ] `components/timeline.tsx` and `components/view-counter-test.tsx` files are deleted.
- [ ] No imports or comments of both components remain in application templates.
- [ ] `bun run build` succeeds.
- [ ] `plans/README.md` status row updated to DONE.

## STOP conditions

- If compile builds fail.
- If any active references to `Timeline` or `ViewCounterTest` are found.
