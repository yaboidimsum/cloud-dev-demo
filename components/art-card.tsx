"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { ReactNode } from "react";
import { useTheme } from "@/context/theme-context";

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

  const { theme } = useTheme();
  const hoverShadow = theme === "dark"
    ? "0 0 0 1px rgba(255, 255, 255, 0.15)"
    : "0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 20px 25px -5px rgba(0, 0, 0, 0.08)";

  return (
    <motion.div
      whileHover={{
        y: -10,
        boxShadow: hoverShadow,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <div className="h-full">
        <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground transition-[border-color] duration-250 ease-[var(--ease-smooth-out)] hover:border-zinc-400 dark:hover:border-zinc-700 h-full flex flex-col justify-between">
          <div className="relative aspect-video bg-zinc-50/50 dark:bg-zinc-900 border-b border-border flex items-center justify-center overflow-hidden">
            {src}
          </div>
          <div className="p-5 flex-grow flex flex-col justify-between">
            <div>
              {/* Top Meta */}
              <div className="mb-4 flex items-center justify-between">
                <time className="text-[10px] font-medium  text-zinc-500" dateTime={publishedOn}>
                  {humanizedDate}
                </time>
              </div>

              {/* Title */}
              <h3 className="mb-1 text-base font-semibold text-zinc-900 group-hover:text-[#0066cc] dark:text-zinc-50 dark:group-hover:text-white transition-colors duration-150">
                {title}
              </h3>
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
        </div>
      </div>
    </motion.div>
  );
}
