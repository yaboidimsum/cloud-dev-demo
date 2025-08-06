"use client";

import type React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface Heading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  // contentRef: React.RefObject<HTMLDivElement>; // Keep if needed elsewhere, but not for highlighting logic here
  currentId?: string | null; // Add currentId prop (optional)
}

export default function TableOfContents({
  headings,
  currentId, // Receive the currentId
}: TableOfContentsProps) {
  // ... (useEffect for headingsMapRef can remain if needed for other features) ...
  // const headingsMapRef = useRef<Map<string, Heading>>(new Map());

  // Build a map of heading IDs to heading objects for quick lookup
  useEffect(() => {
    const map = new Map<string, Heading>();
    headings.forEach((heading) => {
      map.set(heading.id, heading);
    });
    // headingsMapRef.current = map;
  }, [headings]);

  // If no headings, don't render anything
  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop TOC */}
      <motion.div
        className=" lg:block" // Keep responsive class
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="rounded-lg border border-gray-200 bg-gray-100 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h4 className="mb-3 text-sm font-semibold text-zinc-500 dark:text-zinc-500">
            Table of Contents
          </h4>
          <nav
            className="overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 200px)" }} // Adjusted max height slightly
          >
            <ul className="space-y-2 text-sm">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={`${
                    heading.level === 1
                      ? ""
                      : heading.level === 2
                      ? "ml-3"
                      : "ml-6" // Indentation based on level
                  }`}
                >
                  <a
                    href={`#${heading.id}`}
                    // Apply conditional styling based on currentId
                    className={`block w-full truncate text-left transition-colors duration-200 ease-in-out ${
                      currentId === heading.id
                        ? "font-semibold text-blue-600 dark:text-blue-500" // Active state
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200" // Default state
                    }`}
                    title={heading.title.replace(/^(👉|--)\s*/, "").trim()} // Clean title for tooltip
                  >
                    {/* Clean title for display */}
                    <span>
                      {heading.title.replace(/^(👉|--)\s*/, "").trim()}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.div>
    </>
  );
}
