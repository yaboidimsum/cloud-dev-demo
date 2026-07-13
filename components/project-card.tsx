"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Eye, Heart } from "lucide-react";
import { useViewCounter } from "@/hooks/useViewCounter";

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

  let humanizedDate = "Unknown date";
  const parsedDate = new Date(publishedOn);
  if (!isNaN(parsedDate.getTime())) {
    humanizedDate = format(parsedDate, "MMMM do, yyyy");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link prefetch={true} href={href} className="block group">
        <div className="overflow-hidden rounded-lg border border-zinc-300 bg-white transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:group-hover:border-zinc-700 active:scale-[0.98]">
          <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={src}
              alt={title || "Project thumbnail"}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex flex-col">
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
              ) : (
                <></>
              )}
              <h3 className="mb-1 font-medium tracking-tighter text-zinc-900 dark:text-zinc-50">{title}</h3>
            </div>
            <div className="mb-4">
              <time
                className="text-sm font-medium tracking-tighter text-zinc-500"
                dateTime={publishedOn}
              >
                {humanizedDate}
              </time>
            </div>
            <div className="text-sm tracking-tighter text-zinc-500 dark:text-zinc-400">
              <TextWithEllipsis text={abstract} />
            </div>
            <div className="mt-2 flex flex-col gap-4">
              <hr className="border-zinc-200 dark:border-zinc-800" />
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
        </div>
      </Link>
    </motion.div>
  );
}
