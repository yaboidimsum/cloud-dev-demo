import Link from "next/link";
import { X, Trash } from "lucide-react";
import ArtCard from "@/components/art-card";
import ClipPathButton from "@/components/arts/ClipPathButton/clip-path-button";
import DivClipPathButton from "@/components/arts/DivTransition/div-transition";
import TextReveal from "@/components/arts/TextReveal/text-reveal";
import CardPopHover from "@/components/arts/CardPopHover/card-pop-hover";
import SmoothButton from "@/components/arts/BasicFramerButton/basic-framer-button";
import Toaster from "@/components/arts/ToastPop/toast-pop";
import DynamicDrawer from "@/components/arts/DynamicDrawer/dynamic-drawer";
import FeedbackPopOver from "@/components/arts/FeedbackPopOver/feedback-pop-over";
import MultiStepCard from "@/components/arts/MultiStepCard/multi-step-card";
import InteractiveGraphAlt from "@/components/arts/InteractiveGraph/interactive-graph-alt";
import TrashAnimation from "@/components/arts/TrashAnimation/trash-animation";
import VaulDrawer from "@/components/arts/VaulDrawer/vaul-drawer";
import DynamicIsland from "@/components/arts/WavelengthBar/dynamic-island";
import FireField from "@/components/arts/FireField/fire-field";
import NavSearchBar from "@/components/arts/NavSearchBar/nav-search-bar";

import { FIRE_FIELD_PROMPT } from "@/data/art-prompts";

export default async function Arts() {
  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-4 pt-12 pb-24">
      {/* Vault-style Header */}
      <header className="flex items-center justify-between gap-4 mb-8">
        <h1 className="font-semibold text-base text-zinc-900 dark:text-zinc-50">Arts</h1>
        <Link
          href="/"
          aria-label="Close"
          className="relative flex items-center justify-center rounded-md p-1.5 transition-[background-color,color,transform] duration-150 ease-out hover:bg-zinc-100 dark:hover:bg-zinc-900 active:scale-[0.96] text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <X className="h-4 w-4" />
        </Link>
      </header>

      {/* Single-Column Grid */}
      <div className="grid grid-cols-1 gap-y-6">
        <ArtCard
          id="minecraft-fire"
          publishedOn="2026-08-01T12:00:00-0400"
          title="Minecraft Fire Canvas"
          src={<FireField />}
          promptText={FIRE_FIELD_PROMPT}
        />
        <ArtCard
          id="clip-path-delete"
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
          id="text-reveal"
          publishedOn="2025-09-23T12:00:00-0400"
          title="Text Reveal"
          src={<TextReveal text="tvcarchase94" placeholder="Animation" />}
          tags={["css", "keyframes"]}
        />
        <ArtCard
          id="clip-path-transform"
          publishedOn="2025-09-23T12:00:00-0400"
          title="Clip-path with Transform"
          src={<DivClipPathButton text="Peek a Boo! 👻" variant="primary" />}
          tags={["css", "clip-path"]}
        />
        <ArtCard
          id="card-hover"
          publishedOn="2025-09-24T12:00:00-0400"
          title="Card Hover"
          src={<CardPopHover />}
          tags={["css", "transitions"]}
        />
        <ArtCard
          id="smooth-toast"
          publishedOn="2025-09-25T12:00:00-0400"
          title="Smooth Toast"
          src={<Toaster />}
          tags={["css", "transitions"]}
        />
        <ArtCard
          id="smooth-button"
          publishedOn="2025-09-26T12:00:00-0400"
          title="Smooth Motion Button"
          src={<SmoothButton />}
          tags={["spring-animation", "framer-motion"]}
        />
        <ArtCard
          id="dynamic-drawer"
          publishedOn="2025-09-27T12:00:00-0400"
          title="Dynamic Drawer"
          src={<DynamicDrawer />}
          tags={["spring-animation", "framer-motion"]}
        />
        <ArtCard
          id="feedback-popover"
          publishedOn="2025-09-29T12:00:00-0400"
          title="Feedback Pop Over"
          src={<FeedbackPopOver />}
          tags={["spring-animation", "framer-motion", "animate-presence"]}
        />
        <ArtCard
          id="multi-step-card"
          publishedOn="2025-09-30T12:00:00-0400"
          title="Dynamic Multi-Step"
          src={<MultiStepCard />}
          tags={["spring-animation", "framer-motion"]}
        />
        <ArtCard
          id="interactive-graph"
          publishedOn="2025-10-01T12:00:00-0400"
          title="Interactive Graph"
          src={<InteractiveGraphAlt />}
          tags={["clip-path", "framer-motion"]}
        />
        <ArtCard
          id="interactable-trash"
          publishedOn="2025-10-07T12:00:00-0400"
          title="Interactable Trash"
          src={<TrashAnimation />}
          tags={["spring-animation", "framer-motion"]}
        />
        <ArtCard
          id="vaul-drawer"
          publishedOn="2025-10-08T12:00:00-0400"
          title="Dynamic Drawer"
          src={<VaulDrawer />}
          tags={["spring-animation", "framer-motion"]}
        />
        <ArtCard
          id="dynamic-island"
          publishedOn="2025-10-29T12:00:00-0400"
          title="Dynamic Island"
          src={<DynamicIsland />}
          tags={["spring-animation", "framer-motion"]}
        />
        <ArtCard
          id="nav-searchbar"
          publishedOn="2025-10-29T12:00:00-0400"
          title="NavSearchBar"
          src={<NavSearchBar />}
          tags={["spring-animation", "framer-motion"]}
        />
      </div>
    </div>
  );
}
