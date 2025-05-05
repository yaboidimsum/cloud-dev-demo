import Link from "next/link";
import React from "react";
import { getBlogPostList } from "@/app/helpers/file-helpers";
import { ArrowLeft } from "lucide-react";
import ProjectCard from "@/components/project-card";

export default async function Projects() {
  const route = `blogs`;
  const projectPost = await getBlogPostList(route);

  console.log(projectPost);

  return (
    <div className="mx-auto max-w-4xl pl-12 pt-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center text-gray-400 hover:text-zinc-600 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>

      <h1 className="mb-8 text-3xl font-bold">Blogs</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projectPost.map(({ slug, ...delegated }) => (
          <ProjectCard key={slug} slug={slug} route={route} {...delegated} />
        ))}
      </div>
    </div>
  );
}
