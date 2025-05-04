// "use client";

// import type React from "react";
// import { useRef, useEffect, useState } from "react";
// import TableOfContents from "@/components/table-of-content";

// interface Heading {
//   id: string;
//   title: string;
//   level: number;
// }

// interface ClientBlogContentProps {
//   children: React.ReactNode;
//   headings: Heading[];
// }

// export default function ClientBlogContent({
//   children,
//   headings,
// }: ClientBlogContentProps) {
//   const contentRef = useRef<HTMLDivElement>(null);
//   const tocRef = useRef<HTMLDivElement>(null);
//   const [tocState, setTocState] = useState({
//     isFixed: false,
//     top: 0,
//     width: 0,
//   });

//   // Set up the scroll handling and TOC positioning
//   useEffect(() => {
//     if (!contentRef.current || !tocRef.current) return;

//     // Get the first heading to use as our trigger point
//     const firstHeading = contentRef.current.querySelector("h1, h2, h3");
//     if (!firstHeading) return;

//     // Store the TOC width for fixed positioning
//     const tocWidth = tocRef.current.offsetWidth;
//     setTocState((prev) => ({ ...prev, width: tocWidth }));

//     // Function to update TOC position based on scroll
//     const updateTocPosition = () => {
//       if (!firstHeading || !tocRef.current || !contentRef.current) return;

//       // Get positions
//       const firstHeadingRect = firstHeading.getBoundingClientRect();
//       const contentRect = contentRef.current.getBoundingClientRect();
//       const tocRect = tocRef.current.getBoundingClientRect();

//       // Check if we've scrolled to or past the first heading
//       if (firstHeadingRect.top <= 0) {
//         // Calculate the right position relative to the content
//         const rightPosition = window.innerWidth - contentRect.right + 16; // 16px for gap

//         // Check if we're near the bottom of the content
//         const contentBottom = contentRect.bottom;
//         const viewportHeight = window.innerHeight;

//         if (contentBottom <= viewportHeight) {
//           // We're at the bottom of the content, position TOC relative to content bottom
//           const bottomOffset = viewportHeight - contentBottom;
//           const newTop = Math.max(
//             8,
//             window.innerHeight - tocRect.height - bottomOffset - 16
//           );

//           setTocState({
//             isFixed: true,
//             top: newTop,
//             width: tocWidth,
//           });
//         } else {
//           // Normal fixed position when scrolling through content
//           setTocState({
//             isFixed: true,
//             top: 8, // 8px from top
//             width: tocWidth,
//           });
//         }
//       } else {
//         // Reset to normal flow before the first heading
//         setTocState({
//           isFixed: false,
//           top: 0,
//           width: tocWidth,
//         });
//       }
//     };

//     // Set up event listeners
//     window.addEventListener("scroll", updateTocPosition);
//     window.addEventListener("resize", updateTocPosition);

//     // Initial position check
//     updateTocPosition();

//     return () => {
//       window.removeEventListener("scroll", updateTocPosition);
//       window.removeEventListener("resize", updateTocPosition);
//     };
//   }, []);

//   // Add IDs to headings in the content if they don't already have them
//   useEffect(() => {
//     if (!contentRef.current) return;

//     // Find all heading elements
//     const headingElements = contentRef.current.querySelectorAll("h1, h2, h3");

//     // Check each heading
//     headingElements.forEach((element) => {
//       // If the heading doesn't have an ID, try to find a matching heading from our list
//       if (!element.id) {
//         const headingText = element.textContent?.trim() || "";
//         const matchingHeading = headings.find(
//           (h) =>
//             h.title.replace(/ - |-- |\.\.\.$/, "").includes(headingText) ||
//             headingText.includes(h.title.replace(/ - |-- |\.\.\.$/, ""))
//         );

//         if (matchingHeading) {
//           element.id = matchingHeading.id;
//         }
//       }
//     });
//   }, [headings]);

//   return (
//     <>
//       <div className="flex w-full items-start gap-4">
//         <article
//           ref={contentRef}
//           className="prose prose-invert max-w-none flex-1 prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white prose-code:text-white prose-pre:bg-gray-800"
//         >
//           {children}
//         </article>

//         {/* TOC container */}
//         <div ref={tocRef} className="sticky">
//           <TableOfContents headings={headings} contentRef={contentRef} />
//         </div>
//       </div>
//       {/* <footer className="h-1000">Big Footer</footer> */}
//     </>
//   );
// }

"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import TableOfContents from "@/components/table-of-content";

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
  const contentRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [tocState, setTocState] = useState({
    isFixed: false,
    top: 0,
    width: 0,
    reachedEnd: false,
  });

  // Detect current heading ID based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const headingElements =
        contentRef.current.querySelectorAll<HTMLHeadingElement>("h1, h2, h3");

      let current: string | null = null;
      const offset = 100;

      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset) {
          current = el.id;
        }
      });

      setCurrentId(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run initially

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add IDs to headings if missing
  useEffect(() => {
    if (!contentRef.current) return;

    const headingElements = contentRef.current.querySelectorAll("h1, h2, h3");

    headingElements.forEach((element) => {
      if (!element.id) {
        const headingText = element.textContent?.trim() || "";
        const matchingHeading = headings.find(
          (h) =>
            h.title.replace(/ - |-- |\.\.\.$/, "").includes(headingText) ||
            headingText.includes(h.title.replace(/ - |-- |\.\.\.$/, ""))
        );
        if (matchingHeading) {
          element.id = matchingHeading.id;
        }
      }
    });
  }, [headings]);

  return (
    <>
      <div className="flex w-full items-start gap-4">
        <article
          ref={contentRef}
          className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white prose-code:text-white prose-pre:bg-gray-800"
        >
          {children}
        </article>
        <div className="sticky top-8 mt-10 w-72">
          <TableOfContents
            headings={headings}
            contentRef={contentRef}
            currentId={currentId} // ✅ pass the current heading
          />
        </div>
      </div>
    </>
  );
}
