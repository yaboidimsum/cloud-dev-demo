import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/app/helpers/file-helpers";

import Link from "next/link";
// import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import BlogHeader from "@/components/blog-header";
import TableOfContents from "@/components/table-of-content";

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

  console.log(projectData);

  if (!projectData) {
    return <div>Blog not found</div>;
  }

  const { frontmatter, content } = projectData;

  return (
    <div className="mx-auto flex max-w-4xl flex-col pl-12 pt-8">
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
        {/* <h1 className="mb-4 text-3xl font-bold">{frontmatter.title}</h1> */}
        <div className="flex gap-16">
          <article className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white prose-code:text-white prose-pre:bg-gray-800">
            {" "}
            <MDXRemote source={content} components={components} />
          </article>
          {/* <TableOfContents headings={} contentRef={} key={} /> */}
        </div>
      </div>
    </div>
  );
}
