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
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [visibleHeadings, setVisibleHeadings] = useState<Set<string>>(
    new Set()
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const activeHeadingRef = useRef<string>(activeHeading);
  const headingsMapRef = useRef<Map<string, Heading>>(new Map());

  // Build a map of heading IDs to heading objects for quick lookup
  useEffect(() => {
    const map = new Map<string, Heading>();
    headings.forEach((heading) => {
      map.set(heading.id, heading);
    });
    headingsMapRef.current = map;
  }, [headings]);

  // Update ref when state changes
  useEffect(() => {
    activeHeadingRef.current = activeHeading;
  }, [activeHeading]);

  // Function to determine the most appropriate active heading
  const determineActiveHeading = useCallback(() => {
    if (visibleHeadings.size === 0) return;

    // Convert visible headings to array and filter to those that exist in our headings list
    const visibleHeadingsArray = Array.from(visibleHeadings)
      .filter((id) => headingsMapRef.current.has(id))
      .map((id) => headingsMapRef.current.get(id)!);

    // Sort visible headings by level and then by their order in the original headings array
    const orderedVisibleHeadings = visibleHeadingsArray.sort((a, b) => {
      // First sort by level (h1 before h2)
      if (a.level !== b.level) return a.level - b.level;

      // Then sort by position in the document (using the original headings array order)
      const aIndex = headings.findIndex((h) => h.id === a.id);
      const bIndex = headings.findIndex((h) => h.id === b.id);
      return aIndex - bIndex;
    });

    if (orderedVisibleHeadings.length > 0) {
      setActiveHeading(orderedVisibleHeadings[0].id);
    }
  }, [visibleHeadings, headings]);

  // Set up enhanced intersection observer
  useEffect(() => {
    if (!contentRef.current) return;

    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a new intersection observer with improved options
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Update the set of visible headings
        setVisibleHeadings((prev) => {
          const newVisibleHeadings = new Set(prev);

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              newVisibleHeadings.add(entry.target.id);
            } else {
              newVisibleHeadings.delete(entry.target.id);
            }
          });

          return newVisibleHeadings;
        });
      },
      {
        // These settings are optimized for MDX content with your specific structure
        rootMargin: "-10% 0px -70% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    // Find all heading elements in the MDX content by their IDs
    // This works with your existing MDX utils that add prefixes and truncate titles
    const findHeadingElements = () => {
      const elements: Element[] = [];

      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          elements.push(element);
        }
      });

      return elements;
    };

    // Observe all heading elements
    const headingElements = findHeadingElements();

    // Log for debugging
    console.log(
      `Found ${headingElements.length} heading elements out of ${headings.length} headings`
    );

    headingElements.forEach((element) => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [contentRef, headings]);

  // Update active heading when visible headings change
  useEffect(() => {
    determineActiveHeading();
  }, [visibleHeadings, determineActiveHeading]);

  // Scroll to heading when clicking on TOC item
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Set active heading immediately for better UX
      setActiveHeading(id);

      // Scroll to the element
      setTimeout(() => {
        const yOffset = -80; // Adjust offset to account for any fixed headers
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
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
                    className={`w-full truncate text-left text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 `}
                    title={heading.title}
                    // dangerouslySetInnerHTML={{ __html: heading.title }}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>

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
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={`w-full truncate text-left text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 `}
                    title={heading.title.replace(/👉\s|--\s/g, "")} // Remove prefixes for the tooltip
                  >
                    <span>{heading.title}</span>
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
