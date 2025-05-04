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
  [key: string]: any;
}

export interface BlogPost {
  frontmatter: BlogFrontmatter;
  content: string;
}
