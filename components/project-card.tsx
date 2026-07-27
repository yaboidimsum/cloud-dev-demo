"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Eye, Heart } from "lucide-react";
import { useViewCounter } from "@/hooks/useViewCounter";
import { motion } from "framer-motion";

interface ProjectCardProps {
  slug: string;
  title: string;
  publishedOn: string;
  abstract: string;
  src: string;
  route: string;
  tags: Array<string>;
}

interface TextWithEllipsisProps {
  text: string;
}

export const TextWithEllipsis = ({
  text,
}: TextWithEllipsisProps) => {
  return (
    <p className="line-clamp-2" title={text}>
      {text}
    </p>
  );
};

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
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          transition: { type: "spring", stiffness: 300, damping: 15 },
        }}
        whileTap={{ scale: 0.98 }}
        className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground transition-[border-color] duration-250 ease-[var(--ease-smooth-out)] hover:border-zinc-400 dark:hover:border-zinc-700 h-full flex flex-col"
      >
        <div className={`relative aspect-video bg-zinc-100 dark:bg-zinc-900 t-skel ${isLoaded ? "is-revealed" : ""}`}>
          <div className="t-skel-skeleton is-pulsing bg-zinc-200 dark:bg-zinc-900 w-full h-full" />
          <div className="t-skel-content w-full h-full">
            <Image
              src={src}
              alt={title || "Project thumbnail"}
              fill
              onLoad={() => setIsLoaded(true)}
              className="object-cover"
            />
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div className="flex-grow flex flex-col">
            {tags ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-zinc-100/50 px-2 py-0.5 text-xs font-medium tracking-tighter text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <h3 className="mb-1 font-medium tracking-tighter text-zinc-900 dark:text-zinc-50">{title}</h3>
            <div className="mb-4">
              <time
                className="text-sm font-medium tracking-tighter text-zinc-500"
                dateTime={publishedOn}
              >
                {humanizedDate}
              </time>
            </div>
            <div className="text-sm tracking-tighter text-zinc-500 dark:text-zinc-400 flex-grow">
              <TextWithEllipsis text={abstract} />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <hr className="border-border" />
            <div className="flex justify-between text-sm tracking-tighter text-zinc-500 dark:text-zinc-400">
              <div className="flex gap-8">
                <div className="flex items-center gap-2">
                  <Eye size={12} />
                  <span className="text-sm">
                    {views !== null ? views : "..."} Views
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={12} />
                  <span>0 Likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
