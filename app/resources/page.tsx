"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  SiThreedotjs,
  SiFramer,
  SiCss3,
  SiApple,
  SiTailwindcss,
  SiFigma,
  SiLinear,
} from "react-icons/si";
import type { IconType } from "react-icons";

interface Resource {
  title: string;
  description: string;
  url: string;
  category: "learn" | "use";
  tags: string[];
  icon: IconType;
  color: string;
}

const resources: Resource[] = [
  // Learn Resources
  {
    title: "Three.js Journey",
    description: "Bruno Simon's ultimate interactive course to learn WebGL, shaders, and 3D graphics using Three.js.",
    url: "https://threejs-journey.com/",
    category: "learn",
    tags: ["WebGL", "3D", "Three.js"],
    icon: SiThreedotjs,
    color: "#000000",
  },
  {
    title: "animations.dev",
    description: "Emil Kowalski's premium interactive course on crafting beautiful, performant web animations.",
    url: "https://animations.dev/",
    category: "learn",
    tags: ["Animations", "React", "Design-Engineer"],
    icon: SiFramer,
    color: "#FF00C5",
  },
  {
    title: "Apple Human Interface Guidelines",
    description: "Apple's official design system guidelines covering layouts, typography stacks, and accessibility rules.",
    url: "https://developer.apple.com/design/human-interface-guidelines/",
    category: "learn",
    tags: ["Design-System", "A11y", "Apple"],
    icon: SiApple,
    color: "#0066cc",
  },
  {
    title: "Refactoring UI",
    description: "Curated design rules and visual tactics to make developer interfaces look highly professional.",
    url: "https://www.refactoringui.com/",
    category: "learn",
    tags: ["UI-Design", "Aesthetics", "Colors"],
    icon: SiFigma,
    color: "#F6AD55",
  },
  {
    title: "The Linear Method",
    description: "Linear's playbook for building product pipelines, structuring issues, and managing developer execution.",
    url: "https://linear.app/method",
    category: "learn",
    tags: ["Productivity", "DX", "Execution"],
    icon: SiLinear,
    color: "#5E6AD2",
  },

  // Use Resources
  {
    title: "transitions.dev",
    description: "Production-ready transition timings, easing curves, and duration scales matching human intent.",
    url: "https://transitions.dev/",
    category: "use",
    tags: ["CSS", "Motion-Tokens", "Easing"],
    icon: SiCss3,
    color: "#00FF66",
  },
  {
    title: "Framer Motion Docs",
    description: "Official API reference and spring physics guides for declarative React animations.",
    url: "https://framer.com/motion/",
    category: "use",
    tags: ["React", "Spring-Physics", "Library"],
    icon: SiFramer,
    color: "#0055FF",
  },
  {
    title: "Tailwind CSS Reference",
    description: "Rapidly search utility classes, colors, spacing ratios, and custom configuration variables.",
    url: "https://tailwindcss.com/",
    category: "use",
    tags: ["CSS", "Framework", "Utility"],
    icon: SiTailwindcss,
    color: "#06B6D4",
  },
  {
    title: "SF Pro Typography Spec",
    description: "Apple's system font documentation, detailing size-tracking tables and layout behaviors.",
    url: "https://developer.apple.com/fonts/",
    category: "use",
    tags: ["Fonts", "Typography", "SF-Pro"],
    icon: SiApple,
    color: "#8E8E93",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
};

function ResourceCard({ res }: { res: Resource }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const IconComp = res.icon;

  return (
    <motion.a
      href={res.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      layout
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      whileTap={{ scale: 0.98 }}
      className="group block cursor-pointer h-full"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground transition-[border-color] duration-250 ease-[var(--ease-smooth-out)] hover:border-zinc-400 dark:hover:border-zinc-700 h-full flex flex-col justify-between">
        <div className={`relative aspect-video bg-zinc-100 dark:bg-zinc-900 border-b border-border flex items-center justify-center overflow-hidden t-skel ${isLoaded || hasError ? "is-revealed" : ""}`}>
          <div className="t-skel-skeleton is-pulsing bg-zinc-200 dark:bg-zinc-900 w-full h-full" />
          <div className="t-skel-content w-full h-full flex items-center justify-center">
            {!hasError ? (
              <Image
                src={`https://api.microlink.io/?url=${encodeURIComponent(res.url)}&screenshot=true&embed=screenshot.url`}
                alt={`${res.title} screenshot`}
                fill
                unoptimized
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-150"
              />
            ) : (
              <div 
                className="absolute inset-0 opacity-10 dark:opacity-20 transition-opacity duration-150 group-hover:opacity-20 dark:group-hover:opacity-35"
                style={{
                  background: `radial-gradient(circle at center, ${res.color}50 0%, transparent 70%)`
                }}
              />
            )}
          </div>
          {hasError && (
            <div className="z-10 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 gap-2">
              <IconComp 
                className="h-8 w-8" 
                style={{ color: res.color === "#000000" ? undefined : res.color }} 
              />
              <span className="text-[10px] uppercase tracking-wider font-semibold opacity-60">Preview unavailable</span>
            </div>
          )}
        </div>
        <div className="p-5 flex-grow flex flex-col justify-between">
          <div>
            {/* Top Meta & Icon */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
                <IconComp 
                  className="h-5 w-5 transition-colors duration-150" 
                  style={{ color: res.color === "#000000" ? undefined : res.color }} 
                />
              </div>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium capitalize tracking-tighter text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                {res.category}
              </span>
            </div>

            {/* Title & Desc */}
            <h3 className="mb-1 text-base font-semibold text-zinc-900 group-hover:text-[#0066cc] dark:text-zinc-50 dark:group-hover:text-white transition-colors duration-150 flex items-center gap-1.5">
              {res.title} <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
              {res.description}
            </p>
          </div>

          {/* Footer Tags */}
          <div className="mt-auto pt-2 flex flex-wrap gap-1.5">
            {res.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100/50 px-2 py-0.5 text-[10px] font-medium tracking-tighter text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function Resources() {
  const [filter, setFilter] = useState<"all" | "learn" | "use">("all");

  const filteredResources = resources.filter(
    (r) => filter === "all" || r.category === filter
  );

  return (
    <div className="pt-8">
      {/* Back button */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center tracking-tighter text-zinc-400 transition duration-150 ease-in-out hover:text-zinc-600 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>

      <div className="mb-12">
        <motion.h1
          className="mb-2 text-3xl font-medium tracking-tighter text-zinc-900 dark:text-zinc-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Resources
        </motion.h1>
        <motion.p
          className="mb-8 text-sm tracking-tighter text-zinc-500 dark:text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          A curated collection of design guidelines, courses, and utilities that I learn from and use in daily engineering work.
        </motion.p>

        {/* Filter buttons */}
        <div className="flex gap-2 mb-8">
          {(["all", "learn", "use"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium tracking-tighter capitalize transition-all active:scale-[0.98] cursor-pointer ${
                filter === cat
                  ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100/70 text-zinc-600 hover:bg-zinc-200/70 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {cat === "all" ? "All resources" : `${cat} section`}
            </button>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredResources.map((res) => (
              <ResourceCard res={res} key={res.title} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
