export interface Heading {
  id: string;
  title: string;
  level: number;
}

export function extractHeadings(markdown: string): Heading[] {
  const headingRegex = /^(#{1,3})\s+(.*)$/gm;
  const headings: Heading[] = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
      .replace(/^-+|-+$/g, "");
    headings.push({ id, title, level });
  }
  return headings;
}
