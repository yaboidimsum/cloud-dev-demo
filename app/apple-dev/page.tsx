import Link from "next/link";
import React from "react";
// import { getBlogPostList } from "@/app/helpers/file-helpers";
import { ArrowLeft } from "lucide-react";
import ProjectCard from "@/components/project-card";

export default async function Projects() {
  // const route = `apple-dev`;
  // const projectPost = await getBlogPostList(route);

  // console.log(projectPost);

  return (
    <div className="mx-auto max-w-4xl pt-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center tracking-tighter text-gray-400 transition duration-150 ease-in-out hover:text-zinc-600 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4 tracking-tighter" /> Back to Home
      </Link>

      <h1 className="mb-8 text-3xl font-medium tracking-tighter">
        🍎 Apple Developer Academy Challenge (Cohort 2026)
      </h1>
      <p>
        Get ready! This section will highlight some of the new challenges
        I&apos;ll be facing in the academy next year. Stay tuned for more
        details.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard /> */}

        {/* {projectPost.map(({ slug, ...delegated }) => (
          <ProjectCard key={slug} slug={slug} route={route} {...delegated} />
        ))} */}
      </div>
    </div>
  );
}
