"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import TableOfContents from "@/components/table-of-content";
import Giscus from "@giscus/react";
import { useTheme } from "@/context/theme-context";
import { motion } from "framer-motion";

interface Heading {
  id: string;
  title: string;
  level: number;
}

interface ClientBlogContentProps {
  children: React.ReactNode;
  headings: Heading[];
}

export default function ClientBlogContent({
  children,
  headings,
}: ClientBlogContentProps) {
  const { theme } = useTheme();

  const contentRef = useRef<HTMLDivElement>(null);
  const [currentId, setCurrentId] = useState<string | null>(
    headings.length > 0 ? headings[0].id : null
  ); // Initialize with the first heading ID or null
  const [showTOC, setShowTOC] = useState(false);

  // console.log(currentId);

  // Add IDs to headings if missing and observe them
  useEffect(() => {
    if (!contentRef.current) return;

    const headingElements =
      contentRef.current.querySelectorAll<HTMLHeadingElement>("h1, h2, h3");
    const headingMap = new Map<Element, string>(); // Map element to its ID

    // Ensure headings have IDs and populate the map
    headingElements.forEach((element) => {
      if (!element.id) {
        const headingText = element.textContent?.trim() || "";
        // Improved matching logic (case-insensitive, handles prefixes/suffixes better)
        const matchingHeading = headings.find((h) => {
          const cleanTitle = h.title
            .replace(/^(👉|--)\s*/, "")
            .replace(/\s*\.\.\.$/, "")
            .trim()
            .toLowerCase();
          const cleanText = headingText
            .replace(/^(👉|--)\s*/, "")
            .replace(/\s*\.\.\.$/, "")
            .trim()
            .toLowerCase();
          return (
            cleanTitle === cleanText ||
            cleanTitle.includes(cleanText) ||
            cleanText.includes(cleanTitle)
          );
        });

        if (matchingHeading) {
          element.id = matchingHeading.id;
          headingMap.set(element, matchingHeading.id);
        }
      } else {
        headingMap.set(element, element.id);
      }
    });

    // Intersection Observer setup
    const observerOptions = {
      rootMargin: "-100px 0px -66% 0px", // Adjust top/bottom margin: top offset, trigger when heading is ~1/3 down the screen
      threshold: 0, // Trigger as soon as the element enters the rootMargin bounds
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      let topmostVisibleId: string | null = null;
      let minTop = Infinity;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = headingMap.get(entry.target);
          const rect = entry.target.getBoundingClientRect();
          // Find the topmost visible heading within the intersection area
          if (id && rect.top >= 0 && rect.top < minTop) {
            minTop = rect.top;
            topmostVisibleId = id;
          }
        }
      });

      // Update state only if a new topmost heading is found
      if (topmostVisibleId) {
        setCurrentId(topmostVisibleId);
      } else {
        // Optional: If nothing is intersecting in the target zone, maybe revert to the first known ID or keep the last one?
        // For now, we keep the last known ID if nothing new is intersecting.
        // If you want it to clear when scrolling past the last heading, you might need additional logic.
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    headingElements.forEach((element) => {
      if (headingMap.has(element)) {
        // Only observe elements that have a corresponding ID
        observer.observe(element);
      }
    });

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [headings, children]); // Rerun if headings or children change

  return (
    <>
      <div className="flex w-full items-start gap-4">
        <article
          ref={contentRef}
          className="prose prose-invert max-w-none flex-1 prose-headings:scroll-mt-20 prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white prose-code:text-white prose-pre:bg-gray-800" // Added flex-1 and scroll-mt-20
        >
          {children}
        </article>
        {/* Ensure TOC only renders if there are headings */}
        {headings.length > 0 && (
          <>
            <div className="hidden w-56 lg:sticky lg:top-24 lg:mt-10 lg:block">
              {" "}
              {/* Adjusted top offset, hide on smaller screens */}
              <TableOfContents
                headings={headings}
                // contentRef={contentRef} // Keep contentRef if needed for other purposes, but not strictly for highlighting
                currentId={currentId} // Pass the current heading ID
              />
            </div>
            {showTOC ? (
              <div className="fixed bottom-32 right-6 lg:hidden">
                {" "}
                {/* Adjusted top offset, hide on smaller screens */}
                <TableOfContents
                  headings={headings}
                  // contentRef={contentRef} // Keep contentRef if needed for other purposes, but not strictly for highlighting
                  currentId={currentId} // Pass the current heading ID
                />
              </div>
            ) : null}
            <motion.button
              className="fixed bottom-20 right-6 flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 lg:hidden"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTOC(!showTOC)}
            >
              Table of Content
            </motion.button>
          </>
        )}
      </div>
      <Giscus
        id="comments"
        repo="yaboidimsum/cloud-dev-demo"
        repoId="R_kgDOOkIpzw"
        category="General"
        categoryId="DIC_kwDOOkIpz84CpzVS"
        mapping="pathname"
        strict="0"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme}
        lang="en"
        loading="lazy"
      />
      <div className="mb-32"></div>
    </>
  );
}
