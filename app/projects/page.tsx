import Link from "next/link";
import React from "react";
import { getBlogPostList } from "@/app/helpers/file-helpers";
import { ArrowLeft } from "lucide-react";
import ProjectsList from "@/components/projects-list";

export default async function Projects() {
  const route = `projects`;
  const projectPost = await getBlogPostList(route);

  // console.log(projectPost);

  return (
    <div className="mx-auto max-w-4xl pt-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center tracking-tighter text-gray-400 transition duration-150 ease-in-out hover:text-zinc-650 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4 tracking-tighter" /> Back to Home
      </Link>

      <h1 className="mb-8 text-3xl font-medium tracking-tighter">Projects</h1>

      <ProjectsList projects={projectPost} route={route} />
    </div>
  );
}
