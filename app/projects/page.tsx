import Link from "next/link";
import React from "react";
import { getBlogPostList } from "@/app/helpers/file-helpers";
import { ArrowLeft } from "lucide-react";
import ProjectsList from "@/components/projects-list";

export default async function Projects() {
  const route = `projects`;
  const projectPost = await getBlogPostList(route);

  return (
    <div className="pt-8">
      {/* Back button */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center text-zinc-400 transition duration-150 ease-in-out hover:text-zinc-600 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-medium text-zinc-900 dark:text-zinc-50">
          Projects
        </h1>
        <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
          A curated collection of web applications, mobile software, and engineering projects I&apos;ve built.
        </p>

        <ProjectsList projects={projectPost} route={route} />
      </div>
    </div>
  );
}
