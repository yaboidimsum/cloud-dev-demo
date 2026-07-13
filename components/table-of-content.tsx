"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  currentId?: string | null;
  onItemClick?: () => void;
}

export default function TableOfContents({
  headings,
  currentId,
  onItemClick,
}: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav className="relative pl-1">
      <ul className="relative space-y-3 text-xs">
        {headings.map((heading) => {
          const isActive = currentId === heading.id;
          const cleanTitle = heading.title.replace(/^(👉|--)\s*/, "").trim();

          // Calculate indentation indentation based on heading levels (H1, H2, H3)
          const pl = heading.level === 1 ? "pl-3" : heading.level === 2 ? "pl-6" : "pl-9";

          return (
            <li
              key={heading.id}
              className={cn("relative flex items-center py-0.5", pl)}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTOC"
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-blue-500 dark:bg-blue-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <a
                href={`#${heading.id}`}
                onClick={() => {
                  if (onItemClick) onItemClick();
                }}
                className={cn(
                  "block w-full py-0.5 transition-colors duration-200 truncate max-w-full text-left font-sans select-none",
                  isActive
                    ? "text-zinc-950 dark:text-zinc-50 font-medium"
                    : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
                )}
                title={cleanTitle}
              >
                {cleanTitle}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
