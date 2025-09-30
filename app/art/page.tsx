import Link from "next/link";
import { ArrowLeft, Trash } from "lucide-react";
import ArtCard from "@/components/art-card";
import {
  ClipPathButton,
  DivClipPathButton,
  TextReveal,
  CardPopHover,
  SmoothButton,
  Toaster,
  DynamicDrawer,
  // TrashAnimation,
  FeedbackPopOver,
  MultiStepCard,
} from "@/components/arts";

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
          title="Clip-path Animation"
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
          title="Text Reveal"
          src={<TextReveal text="tvcarchase94" placeholder="Animation" />}
          tags={["css", "keyframes"]}
        />
        <ArtCard
          publishedOn="2025-09-23T12:00:00-0400"
          title="Clip-path with Transform"
          src={<DivClipPathButton text="Peek a Boo! 👻" variant="primary" />}
          tags={["css", "clip-path"]}
        />
        <ArtCard
          publishedOn="2025-09-24T12:00:00-0400"
          title="Card Hover"
          src={<CardPopHover />}
          tags={["css", "transitions"]}
        />
        <ArtCard
          publishedOn="2025-09-25T12:00:00-0400"
          title="Smooth Toast"
          src={<Toaster />}
          tags={["css", "transitions"]}
        />
        <ArtCard
          publishedOn="2025-09-26T12:00:00-0400"
          title="Smooth Motion Button"
          src={<SmoothButton />}
          tags={["spring-animation", "framer-motion"]}
        />
        <ArtCard
          publishedOn="2025-09-27T12:00:00-0400"
          title="Dynamic Drawer"
          src={<DynamicDrawer />}
          tags={["spring-animation", "framer-motion"]}
        />
        <ArtCard
          publishedOn="2025-09-29T12:00:00-0400"
          title="Feedback Pop Over"
          src={<FeedbackPopOver />}
          tags={["spring-animation", "framer-motion", "animate-presence"]}
        />
        <ArtCard
          publishedOn="2025-09-30T12:00:00-0400"
          title="Dynamic Multi-Step"
          src={<MultiStepCard />}
          tags={["spring-animation", "framer-motion"]}
        />
        {/* <ArtCard
          publishedOn="2025-09-29T12:00:00-0400"
          title="Feedback Pop Over"
          src={<TrashAnimation />}
          tags={["spring-animation", "framer-motion", "animate-presence"]}
        /> */}
      </div>
    </div>
  );
}
