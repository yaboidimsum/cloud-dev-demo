import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/app/helpers/file-helpers";

import Link from "next/link";
// import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import BlogHeader from "@/components/blog-header";

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
  const projectData = await loadBlogPost(id, `projects`);

  if (!projectData) {
    return <div>Project not found</div>;
  }

  const { frontmatter, content } = projectData;

  return (
    <div className="mx-auto max-w-4xl pl-12 pt-8">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center text-gray-400 hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Link>

      <article>
        <BlogHeader
          title={frontmatter.title}
          publishedOn={frontmatter.publishedOn}
          abstract={frontmatter.abstract}
          authorPict={frontmatter.authorPict}
        />
        {/* <h1 className="mb-4 text-3xl font-bold">{frontmatter.title}</h1> */}
        <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white prose-code:text-white prose-pre:bg-gray-800">
          {" "}
          <MDXRemote source={content} components={components} />
        </div>
      </article>

      {/* <p className="mb-8 text-gray-400">
        A full-stack web application built with Next.js, TypeScript, and
        Tailwind CSS
      </p>

      <div className="relative mb-8 aspect-video overflow-hidden rounded-lg bg-gray-900">
        <Image
          src="/placeholder.svg?height=400&width=800"
          alt="Project screenshot"
          fill
          className="object-cover"
        />
      </div>

      <div className="mb-8 flex space-x-4">
        <Link
          href="#"
          className="flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
        >
          <Github className="mr-2 h-4 w-4" /> View Source
        </Link>
        <Link
          href="#"
          className="flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
        >
          <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">About the Project</h2>
        <p className="mb-4 text-gray-300">
          This is a detailed description of the project, explaining what it
          does, why it was built, and what problems it solves. This section
          would include information about the project's purpose, features, and
          any interesting challenges that were overcome during development.
        </p>
        <p className="text-gray-300">
          The project demonstrates skills in frontend development, backend
          integration, responsive design, and user experience considerations.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "React",
            "Node.js",
            "MongoDB",
          ].map((tech, i) => (
            <span key={i} className="rounded-md bg-gray-800 px-3 py-1 text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div> */}
    </div>
  );
}
