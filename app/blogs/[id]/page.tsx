import type React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/app/helpers/file-helpers";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogHeader from "@/components/blog-header";
import ClientContent from "@/components/client-content";
import { extractHeadings } from "@/lib/mdx-utils";

// Custom components for MDX
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-4 mt-6 text-2xl font-bold" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mb-3 mt-5 text-xl font-bold" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mb-2 mt-4 text-lg font-bold" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 text-gray-500" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-blue-400 hover:underline" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 list-disc pl-5" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 list-decimal pl-5" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-1" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-gray-800"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-4 overflow-x-auto rounded-md bg-zinc-100 p-4 dark:bg-gray-800"
      {...props}
    />
  ),
};

export default async function ProjectDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const projectData = await loadBlogPost(id, `blogs`);

  if (!projectData) {
    return <div>Blog not found</div>;
  }

  const { frontmatter, content } = projectData;

  // Make sure extractHeadings returns the correct format for your TableOfContents
  // It should return an array of { id: string, title: string, level: number }
  const headings = extractHeadings(content);

  console.log(headings);

  return (
    <div className="mx-auto flex max-w-4xl flex-col pl-2 pt-8">
      <Link
        href="/blogs"
        className="mb-8 inline-flex items-center text-gray-400 hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Link>
      <div>
        <BlogHeader
          title={frontmatter.title}
          publishedOn={frontmatter.publishedOn}
          abstract={frontmatter.abstract}
          authorPict={frontmatter.authorPict}
        />
        <ClientContent headings={headings}>
          <MDXRemote source={content} components={components} />
        </ClientContent>
      </div>
      <footer className="h-1000"></footer>
    </div>
  );
}
