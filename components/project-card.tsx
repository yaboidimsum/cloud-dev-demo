"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Eye,  Heart } from "lucide-react";
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
  maxLength?: number;
}

export const TextWithEllipsis = ({
  text,
  maxLength,
}: TextWithEllipsisProps) => {
  const textStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: maxLength ? `${maxLength}px` : "100%", // Optional: limit text width
  };
  return (
    <p style={textStyle} title={text}>
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
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={href}>
        <div className="dark-blue:border-gray-700 dark-blue:hover:border-gray-600 overflow-hidden rounded-lg border border-gray-200 transition-colors hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700">
          <div className="dark-blue:bg-[#192734] relative aspect-video bg-gray-100 dark:bg-gray-900">
            <Image
              src={src}
              alt="Project thumbnail"
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
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <></>
              )}
              <h3 className="mb-1 font-medium">{title}</h3>
            </div>
            <div className="mb-4">
              <time className="text-sm font-semibold" dateTime={publishedOn}>
                {" "}
                {humanizedDate}{" "}
              </time>
            </div>
            <div className="dark-blue:text-gray-400 text-sm text-gray-500 dark:text-gray-400">
              <TextWithEllipsis text={abstract} maxLength={10000} />
            </div>
            <div className="mt-2 flex flex-col gap-4">
              <hr className="text-zinc-800 dark:text-zinc-50" />
              <div className="dark-blue:text-gray-400 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex gap-8">
                  <div className="flex items-center gap-2 ">
                    <Eye size={12} />
                    <span className="text-sm"> {views !== null ? views : "..."} Views</span>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <Heart size={12} />
                    <span> 0 Likes</span>
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
