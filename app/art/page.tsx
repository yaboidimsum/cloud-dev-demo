import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";
import ArtCard from "@/components/art-card";
import ClipPathButton from "@/components/arts/clip-path-button";
import DivClipPathButton from "@/components/arts/div-transition";
import TextReveal from "@/components/arts/text-reveal";
import CardPopHover from "@/components/arts/card-pop-hover";
import SmoothButton from "@/components/arts/BasicFramerButton/basic-framer-button";
import { Trash } from "lucide-react";
import Toaster from "@/components/arts/toast-pop";

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
          tags={["css", "clip-path"]}
        />
        <ArtCard
          publishedOn="2025-09-23T12:00:00-0400"
          title="Text Reveal with CSS"
          src={<TextReveal text="tvcarchase94" placeholder="Animation" />}
          tags={["css", "keyframes"]}
        />
        <ArtCard
          publishedOn="2025-09-23T12:00:00-0400"
          title="Clip-path with Transform using CSS"
          src={<DivClipPathButton text="Peek a Boo! 👻" variant="primary" />}
          tags={["css", "clip-path"]}
        />
        <ArtCard
          publishedOn="2025-09-24T12:00:00-0400"
          title="Card Hover"
          src={<CardPopHover />}
          tags={["css", "transitions"]}
        />
        {/* <ArtCard
          publishedOn="2025-09-24T12:00:00-0400"
          title="Card Hover"
          src={<Toaster />}
          tags={["css", "transitions"]}
        />
        <ArtCard
          publishedOn="2025-09-24T12:00:00-0400"
          title="Button with Framer Motion"
          src={<SmoothButton />}
          tags={["spring-animation", "framer-motion"]}
        /> */}
      </div>
    </div>
  );
}
