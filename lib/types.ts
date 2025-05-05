export interface Heading {
  id: string;
  title: string;
  level: number;
}

export interface BlogFrontmatter {
  title: string;
  publishedOn: string;
  abstract: string;
  authorPict: string;
  [key: string]: string;
}

export interface BlogPost {
  frontmatter: BlogFrontmatter;
  content: string;
}
