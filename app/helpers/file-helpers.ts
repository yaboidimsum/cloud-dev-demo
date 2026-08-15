import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import React from "react";

type BlogPostFrontmatter = {
  id: number;
  title: string;
  abstract: string;
  publishedOn: string; // pakai `Date` juga bisa, tapi parsing manual
  readTime: string;
  // slug: string;
  src: string;
  authorPict: string;
  authorName: string;
  tags: Array<string>;
  category?: string;
};

type BlogPost = BlogPostFrontmatter & {
  slug: string;
};

const CONTENT_BASE = process.cwd();

function contentDirFor(route: string) {
  // Statically analyzable: literal joins, not interpolated paths.
  if (route === "blogs") return path.join(CONTENT_BASE, "content/blogs");
  if (route === "projects") return path.join(CONTENT_BASE, "content/projects");
  if (route === "certificate") return path.join(CONTENT_BASE, "content/certificate");
  return path.join(CONTENT_BASE, "content", route);
}

export const getBlogPostList = React.cache(async (route: string) => {
  const dir = contentDirFor(route);
  const fileNames = await fs.readdir(dir);

  const posts: BlogPost[] = await Promise.all(
    fileNames.map(async (fileName) => {
      const rawContent = await fs.readFile(path.join(dir, fileName), "utf8");
      const { data: frontmatter } = matter(rawContent);
      return {
        slug: fileName.replace(".mdx", ""),
        ...(frontmatter as BlogPostFrontmatter),
      };
    })
  );

  return posts.toSorted((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
});

export const loadBlogPost = React.cache(async (slug: string, route: string) => {
  let rawContent;

  try {
    rawContent = await fs.readFile(path.join(contentDirFor(route), `${slug}.mdx`), "utf8");
  } catch {
    return null;
  }

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
});

// export async function loadBlogPost(slug) {
//   const rawContent = await readFile(`/content/${slug}.mdx`);

//   const { data: frontmatter, content } = matter(rawContent);

//   return { frontmatter, content };
// }
