"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { ReactNode } from "react";

interface ArtCardProps {
  title: string;
  publishedOn: string;
  src: ReactNode;
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

export default function ArtCard({
  title,
  publishedOn,
  src,
  tags,
}: ArtCardProps) {
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
      <div>
        <div className=" overflow-hidden rounded-lg border border-zinc-300 transition duration-150 ease-in-out hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700">
          <div className=" relative aspect-video bg-zinc-50/50 dark:bg-zinc-900">
            <div className="flex min-h-full items-center justify-center">
              {src}
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-col">
              {tags ? (
                <div className="mb-4 flex flex-wrap gap-2">
                  {tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-zinc-100/50 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
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
            <div className="">
              <time className="text-sm font-semibold" dateTime={publishedOn}>
                {" "}
                {humanizedDate}{" "}
              </time>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
