import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

interface Heading {
  id: string;
  title: string;
  level: number;
}

// Maximum length for heading titles before truncation
const MAX_HEADING_LENGTH = 25;

/**
 * Truncates text and adds ellipsis if it exceeds the maximum length
 */
function truncateWithEllipsis(
  text: string,
  maxLength: number = MAX_HEADING_LENGTH
): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Extracts headings from MDX content with proper formatting
 * - Truncates long headings with ellipsis
 * - Adds depth indicators based on heading level
 */
export function extractHeadings(content: string) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const rawTitle = match[2].trim();

    // Create ID from the original title (before any modifications)
    const id = rawTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    // Add depth indicators based on level and truncate if needed
    let displayTitle = rawTitle;
    if (level === 2) {
      displayTitle = "" + displayTitle;
    } else if (level === 3) {
      displayTitle = "" + displayTitle;
    }

    // Truncate title if it's too long
    const truncatedTitle = truncateWithEllipsis(displayTitle);

    headings.push({
      id,
      title: truncatedTitle,
      level,
    });
  }

  return headings;
}

// Alternative implementation using a proper MDX AST parser
// This would be more robust but requires additional dependencies
export async function extractHeadingsFromAST(mdxContent: any) {
  const headings: Heading[] = [];

  visit(mdxContent, "heading", (node) => {
    const title = toString(node);
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({
      id,
      title,
      level: node.depth,
    });
  });

  return headings;
}

/**
 * Renders markdown content (placeholder - implement based on your actual needs)
 */
export async function renderMarkdown(content: string) {
  // Implement based on your markdown rendering needs
  return content;
}
