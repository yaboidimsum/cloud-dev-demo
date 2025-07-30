import Link from "next/link";
import React from "react";
import { getBlogPostList } from "@/app/helpers/file-helpers";
import { ArrowLeft } from "lucide-react";
import ProjectCard from "@/components/project-card";

export default async function Certificates() {
  const route = `certificate`;
  const projectPost = await getBlogPostList(route);

  // console.log(projectPost);

  return (
    <div className="mx-auto max-w-4xl pt-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center text-gray-400 hover:text-zinc-600 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      <div className="mb-8 flex items-center gap-2">
        <h1 className="text-3xl font-bold">Certificates</h1>
        <span className="text-md text-zinc-400">(under construction 🚧🚨)</span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard /> */}

        {projectPost.map(({ slug, ...delegated }) => (
          <ProjectCard key={slug} slug={slug} route={route} {...delegated} />
        ))}
      </div>
    </div>
  );
}
