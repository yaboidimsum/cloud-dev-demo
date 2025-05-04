"use client";

import type React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Heading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  contentRef: React.RefObject<HTMLDivElement>;
}

export default function TableOfContents({
  headings,
  contentRef,
}: TableOfContentsProps) {
  const headingsMapRef = useRef<Map<string, Heading>>(new Map());

  // Build a map of heading IDs to heading objects for quick lookup
  useEffect(() => {
    const map = new Map<string, Heading>();
    headings.forEach((heading) => {
      map.set(heading.id, heading);
    });
    headingsMapRef.current = map;
  }, [headings]);

  // If no headings, don't render anything
  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop TOC */}
      <motion.div
        className="hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="dark-blue:bg-[#192734] dark-blue:border-gray-700 rounded-lg border border-gray-200 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900">
          <h4 className="dark-blue:text-gray-400 mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
            Table of Contents (Experimental Feature)
          </h4>
          <nav
            className="overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 160px)" }}
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
                      : "ml-6"
                  }`}
                >
                  <a
                    // onClick={() => scrollToHeading(heading.id)}
                    href={`#${heading.id}`}
                    className={`w-full truncate text-left text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 `}
                    title={heading.title.replace(/👉\s|--\s/g, "")} // Remove prefixes for the tooltip
                  >
                    <span>{heading.title}</span>
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
