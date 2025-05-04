"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
  const [activeHeading, setActiveHeading] = useState<string>("");

  // Set up intersection observer to track which heading is in view
  useEffect(() => {
    if (!contentRef.current) return;

    // Create an intersection observer to detect which heading is currently in view
    const observer = new IntersectionObserver(
      (entries) => {
        // Get all entries that are intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        // If we have visible entries, update the active heading
        if (visibleEntries.length > 0) {
          // Sort by Y position to get the topmost visible heading
          const sortedEntries = visibleEntries.sort(
            (a, b) => a.boundingClientRect.y - b.boundingClientRect.y
          );
          setActiveHeading(sortedEntries[0].target.id);
        }
      },
      {
        // These settings help detect when a heading is properly in view
        rootMargin: "-80px 0px -70% 0px",
        threshold: [0, 0.2, 0.5, 1],
      }
    );

    // Observe all headings
    const headingElements = contentRef.current.querySelectorAll("h1, h2, h3");
    headingElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      headingElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [contentRef]);

  // Scroll to heading when clicking on TOC item
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Use a small timeout to ensure the DOM has updated
      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop - 80, // Adjust offset to account for any fixed headers
          behavior: "smooth",
        });

        // Set active heading manually to provide immediate feedback
        setActiveHeading(id);
      }, 10);
    }
  };

  // If no headings, don't render anything
  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile TOC (collapsible) */}
      <div className="mb-8 lg:hidden">
        <details className="dark-blue:bg-[#192734] dark-blue:border-gray-700 rounded-lg border border-gray-200 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900">
          <summary className="dark-blue:text-gray-300 cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300">
            Table of Contents
          </summary>
          <nav className="toc-container mt-3 max-h-[50vh] overflow-y-auto">
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
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={`w-full truncate text-left transition-colors hover:text-blue-500 dark:hover:text-blue-400 ${
                      activeHeading === heading.id
                        ? "font-medium text-blue-500 dark:text-blue-400"
                        : "dark-blue:text-gray-300 text-gray-700 dark:text-gray-300"
                    }`}
                    title={heading.title}
                  >
                    {heading.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>

      {/* Desktop TOC (sticky) */}
      <motion.div
        className="sticky top-24 hidden self-start lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="dark-blue:bg-[#192734] dark-blue:border-gray-700 toc-container max-h-[calc(100vh-140px)] overflow-y-auto rounded-lg border border-gray-200 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900">
          <h4 className="dark-blue:text-gray-400 mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
            Table of Contents
          </h4>
          <nav>
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
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={`w-full truncate text-left transition-colors hover:text-blue-500 dark:hover:text-blue-400 ${
                      activeHeading === heading.id
                        ? "font-medium text-blue-500 dark:text-blue-400"
                        : "dark-blue:text-gray-300 text-gray-700 dark:text-gray-300"
                    }`}
                    title={heading.title}
                  >
                    {heading.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.div>
    </>
  );
}
