import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";
import ArtCard from "@/components/art-card";
import ClipPathButton from "@/components/arts/clip-path-button";
import { Trash } from "lucide-react";

export default async function Arts() {

  return (
    <div className="mx-auto max-w-4xl pt-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center tracking-tighter text-zinc-400 transition duration-150 ease-in-out hover:text-zinc-600 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      <div className="mb-8 flex items-center gap-2">
        <h1 className="text-3xl font-medium tracking-tighter">Arts</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ArtCard
          publishedOn="2025-09-18T12:00:00-0400"
          title="Clip-path Animation using CSS"
          src={
            <ClipPathButton
              textBefore="Hold to Delete"
              textAfter="Deleting Stuffs!"
              logo={<Trash size={16} />}
              variant="danger"
            />
          }
          tags={["CSS", "clip-path"]}
        />
      </div>
    </div>
  );
}
