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
};

type BlogPost = BlogPostFrontmatter & {
  slug: string;
};

type Route = {
  route: string;
};

export async function getBlogPostList(route: string) {
  const fileNames = await readDirectory(`/content/${route}/`);

  const blogPosts: BlogPost[] = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(`/content/${route}/${fileName}`);

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace(".mdx", ""),
      ...(frontmatter as BlogPostFrontmatter),
    });
  }

  return blogPosts.sort((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
}

export const loadBlogPost = React.cache(async (slug: string, route: string) => {
  let rawContent;

  try {
    rawContent = await readFile(`/content/${route}/${slug}.mdx`);
  } catch (err) {
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

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
