"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

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
    <nav className="relative pl-1 select-none">
      {/* Header matching screenshot prefix list icon */}
      <div className="mb-3 flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        <List className="h-3.5 w-3.5" />
        <span>On this page</span>
      </div>

      {/* Left thin border track */}
      <div className="relative border-l border-zinc-200 dark:border-zinc-800/80">
        <ul className="space-y-3 text-xs">
          {headings.map((heading) => {
            const isActive = currentId === heading.id;
            const cleanTitle = heading.title.replace(/^(👉|--)\s*/, "").trim();

            // Indent based on depth (H2/H1 = pl-3, H3/H4 = pl-6)
            const pl = heading.level === 3 ? "pl-6" : "pl-3";

            return (
              <li
                key={heading.id}
                className={cn("relative flex items-center py-0.5", pl)}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTOC"
                    className="absolute -left-[1.5px] top-0 bottom-0 w-[2px] bg-zinc-900 dark:bg-zinc-100"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <a
                  href={`#${heading.id}`}
                  onClick={() => {
                    if (onItemClick) onItemClick();
                  }}
                  className={cn(
                    "block w-full py-0.5 transition-colors duration-200 truncate max-w-full text-left font-sans",
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
      </div>
    </nav>
  );
}
