# Plan 001: Fix Blog Views Tracking and Header Parameters

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 08722f6..HEAD -- app/blogs/[id]/page.tsx`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `08722f6`, 2026-07-13

## Why this matters

The blog post details template does not track user visits and displays incorrect header view counts. It calls `<BlogHeader>` with incorrect static mock parameters (`slug=""` and `type="project"`), and completely lacks the view tracker client script. Fixing this enables blog view logging, resolving the correctness error.

## Current state

- Relevant Files:
  - `app/blogs/[id]/page.tsx` — Blog post detailed router view; contains incorrect header data and missing tracker script.

- Excerpt of `app/blogs/[id]/page.tsx:112-120`:
  ```tsx
        {/* Blog header */}
        <BlogHeader
          title={frontmatter.title}
          publishedOn={frontmatter.publishedOn}
          abstract={frontmatter.abstract}
          authorPict={frontmatter.authorPict}
          slug={""}
          type={"project"}
        />
  ```

## Commands you will need

| Purpose   | Command                  | Expected on success |
|-----------|--------------------------|---------------------|
| Install   | `bun install`            | exit 0              |
| Lint Check| `bun run lint`           | exit 0, no errors   |
| Build Check| `bun run build`         | exit 0, compiled successfully |

## Scope

**In scope**:
- `app/blogs/[id]/page.tsx`

**Out of scope**:
- `components/view-tracker.tsx` — Custom view counter logger; do not touch.
- `app/api/views/route.ts` — API view logging endpoint; do not touch.

## Git workflow

- Branch: `advisor/001-fix-blog-views`
- Commit message format: `fix(blogs): track post views and correct header parameters`

## Steps

### Step 1: Import ViewTracker in Blog Page Template
Add the import for `ViewTracker` at the bottom of the import declarations block in `app/blogs/[id]/page.tsx`.

Target Code Shape:
```tsx
import ViewTracker from "@/components/view-tracker";
```

**Verify**: Run `bun run lint` to verify syntax is valid.

### Step 2: Inject ViewTracker in detail page layout
Render `<ViewTracker slug={id} type="blog" />` inside the wrapper container of the `ProjectDetail` component in `app/blogs/[id]/page.tsx`.

Target Code Shape:
```tsx
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto flex max-w-4xl flex-col pl-2 pt-8">
      <ViewTracker slug={id} type="blog" />
      <Link
        href="/blogs"
        className="mb-8 inline-flex items-center text-gray-400 hover:text-zinc-650 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
      </Link>
```

**Verify**: Run `bun run lint` to verify variables are correctly scoped.

### Step 3: Correct BlogHeader Props
Update the `BlogHeader` component invocation inside the `BlogContent` component in `app/blogs/[id]/page.tsx` to receive the live post id and corrected content type.

Target Code Shape:
```tsx
      {/* Blog header */}
      <BlogHeader
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
        abstract={frontmatter.abstract}
        authorPict={frontmatter.authorPict}
        slug={id}
        type="blog"
      />
```

**Verify**: Run `bun run build` to verify there are no compilation errors.

## Test plan

- Access any blog post detail page (e.g. `/blogs/react-and-css`) and verify that a network request is dispatched to `/api/views?slug=react-and-css&type=blog` to fetch and increment count views.

## Done criteria

- [ ] `bun run lint` exits with 0 errors.
- [ ] `bun run build` compiles successfully.
- [ ] `ViewTracker` is imported and invoked on `/blogs/[id]`.
- [ ] `BlogHeader` receives `type="blog"` and `slug={id}` in the blogs detail view.
- [ ] `plans/README.md` status row updated to DONE.

## STOP conditions

- If the blogs detail file does not match target line excerpts.
- If compile builds fail.

## Maintenance notes

- Any changes to view counting payload structure in projects will require matching updates in blogs.
