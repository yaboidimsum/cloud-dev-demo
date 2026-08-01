"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Eye, Heart } from "lucide-react";
import { useViewCounter } from "@/hooks/useViewCounter";
import { motion } from "framer-motion";

import { useTheme } from "@/context/theme-context";

interface ProjectCardProps {
  slug: string;
  title: string;
  publishedOn: string;
  abstract: string;
  src: string;
  route: string;
  tags: Array<string>;
}

export default function ProjectCard({
  slug,
  title,
  publishedOn,
  src,
  abstract,
  route,
  tags,
}: ProjectCardProps) {
  const href = `/${route}/${slug}/`;
  const { views } = useViewCounter(slug, "project");
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();

  const hoverShadow = theme === "dark"
    ? "0 0 0 1px rgba(255, 255, 255, 0.15)"
    : "0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 20px 25px -5px rgba(0, 0, 0, 0.08)";

  let humanizedDate = "Unknown date";
  const parsedDate = new Date(publishedOn);
  if (!isNaN(parsedDate.getTime())) {
    humanizedDate = format(parsedDate, "MMMM do, yyyy");
  }

  return (
    <Link prefetch={true} href={href} className="block group h-full">
      <motion.div
        whileHover={{
          y: -10,
          boxShadow: hoverShadow,
          transition: { type: "spring", stiffness: 300, damping: 15 },
        }}
        whileTap={{ scale: 0.98 }}
        className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground transition-[border-color] duration-250 ease-[var(--ease-smooth-out)] hover:border-zinc-400 dark:hover:border-zinc-700 h-full flex flex-col justify-between"
      >
        <div className={`relative aspect-video bg-zinc-100 dark:bg-zinc-900 border-b border-border flex items-center justify-center overflow-hidden t-skel ${isLoaded ? "is-revealed" : ""}`}>
          <div className="t-skel-skeleton is-pulsing bg-zinc-200 dark:bg-zinc-900 w-full h-full" />
          <div className="t-skel-content w-full h-full">
            <Image
              src={src}
              alt={title || "Project thumbnail"}
              fill
              onLoad={() => setIsLoaded(true)}
              className="object-cover -outline-offset-1 outline-1 outline-black/10 dark:outline-white/10"
            />
          </div>
        </div>
        <div className="p-5 flex-grow flex flex-col justify-between">
          <div>
            {/* Top Meta */}
            <div className="mb-4 flex items-center justify-between">
              <time
                className="text-[10px] font-medium  text-zinc-500"
                dateTime={publishedOn}
              >
                {humanizedDate}
              </time>
              <div className="flex items-center gap-1 text-[10px] font-medium  text-zinc-500 tabular-nums">
                <Eye size={10} />
                <span>{views !== null ? views : "…"}</span>
              </div>
            </div>

            {/* Title & Desc */}
            <h3 className="mb-1 text-base font-semibold text-zinc-900 group-hover:text-[#0066cc] dark:text-zinc-50 dark:group-hover:text-white transition-colors duration-150 flex items-center gap-1.5">
              {title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 pretty line-clamp-2" title={abstract}>
              {abstract}
            </p>
          </div>

          {/* Footer Tags */}
          <div className="mt-auto pt-2 flex flex-wrap gap-1.5">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100/50 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
