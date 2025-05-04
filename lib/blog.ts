// // This file contains functions for fetching and processing blog data

// // In a real application, this would fetch from a database, CMS, or file system
// // For this example, we'll use the sample data directly
// const blogPosts = [
//   {
//     id: 1,
//     title: "2024 Retrospective: A Year of Growth and Learning",
//     date: "Dec 31, 2024",
//     readTime: "5 min read",
//     slug: "2024-retrospective",
//     content: `
//   # 2024 Retrospective: A Year of Growth and Learning
  
//   ## Introduction
  
//   As the year comes to a close, I find myself reflecting on the journey I've taken as a developer over the past 12 months. 2024 has been a year of significant growth, challenges, and learning opportunities that have shaped both my technical skills and my approach to problem-solving.
  
//   ## Back to Coding
  
//   After a brief hiatus, I returned to coding with renewed energy and focus. The break gave me perspective on what I truly enjoy about development and helped me prioritize my learning goals.
  
//   ## I Got Covid
  
//   Unfortunately, I contracted COVID-19 in March, which put me out of commission for a few weeks. The silver lining was that it gave me time to catch up on reading and online courses while recovering.
  
//   ## Learning Journey
  
//   ### Next.js and React Server Components
  
//   This year, I dove deep into Next.js App Router and React Server Components. The mental model shift from client-side rendering to thinking in terms of server and client components was challenging but rewarding. I learned to:
  
//   - Optimize performance by leveraging server components
//   - Implement streaming and progressive rendering
//   - Build more accessible applications with improved SEO
  
//   ### TypeScript Mastery
  
//   I made a conscious effort to level up my TypeScript skills, moving beyond basic types to more advanced patterns:
  
//   - Generic types and constraints
//   - Utility types like Partial, Pick, and Omit
//   - Type narrowing and discriminated unions
//   - Writing custom type guards
  
//   ### Design Systems and UI
  
//   I spent time studying design systems and improving my UI implementation skills:
  
//   - Built a component library with Tailwind CSS and Radix UI
//   - Implemented complex animations with Framer Motion
//   - Focused on accessibility and responsive design
  
//   ## Challenges Faced
  
//   ### Balancing Learning and Building
  
//   One of the biggest challenges was finding the right balance between learning new technologies and actually building projects. It's easy to fall into the trap of endless tutorials without applying knowledge.
  
//   ### Staying Focused
  
//   With so many exciting technologies emerging, staying focused on mastering a core stack rather than jumping between frameworks was difficult but necessary.
  
//   ## Projects
  
//   This year I worked on several projects that helped me apply and solidify my knowledge.
  
//   ### Portfolio Website
  
//   I rebuilt my portfolio website using Next.js 13, Tailwind CSS, and Framer Motion. The project gave me hands-on experience with:
  
//   - App Router and nested layouts
//   - Server and Client Components
//   - Optimizing for Core Web Vitals
  
//   ### E-commerce Platform
  
//   I contributed to an e-commerce platform that taught me about:
  
//   - Payment gateway integration
//   - State management with Zustand
//   - Performance optimization for large catalogs
  
//   ### Open Source Contributions
  
//   I made my first meaningful contributions to open source projects:
  
//   - Fixed bugs in popular React libraries
//   - Improved documentation for beginners
//   - Participated in Hacktoberfest
  
//   ## Blog
  
//   Starting a technical blog was one of my goals for 2024, and I'm proud to have published 12 articles covering:
  
//   - React best practices
//   - TypeScript tips and tricks
//   - Web performance optimization
//   - Career advice for junior developers
  
//   ## Goals for 2025
  
//   Looking ahead to next year, I've set some clear goals:
  
//   1. Contribute more to open source projects
//   2. Write at least one technical blog post per month
//   3. Build and launch a SaaS product
//   4. Mentor junior developers
  
//   ## What's next for 2025
  
//   I'm excited about several emerging technologies and plan to explore:
  
//   - AI integration in web applications
//   - WebGPU for graphics-intensive web apps
//   - WebAssembly for performance-critical code
  
//   ## Conclusion
  
//   2024 was a transformative year for me as a developer. The challenges I faced pushed me to grow, and the skills I gained have opened new opportunities. I'm excited to see what 2025 brings and to continue this journey of continuous learning and improvement.
//       `,
//   },
//   {
//     id: 2,
//     title: "Building a Portfolio with Next.js and Framer Motion",
//     date: "Nov 15, 2024",
//     readTime: "8 min read",
//     slug: "building-portfolio-nextjs",
//     content: `
//   # Building a Portfolio with Next.js and Framer Motion
  
//   ## Introduction
  
//   Creating a personal portfolio is one of the best ways to showcase your skills and projects as a developer. In this post, I'll walk through how I built my portfolio using Next.js, Tailwind CSS, and Framer Motion.
  
//   ## Tech Stack
  
//   - **Next.js**: For server-side rendering and routing
//   - **Tailwind CSS**: For styling
//   - **Framer Motion**: For animations
//   - **MDX**: For blog content
  
//   ## Key Features
  
//   ### Responsive Design
  
//   The portfolio is fully responsive, adapting to different screen sizes from mobile to desktop. This was achieved using Tailwind's responsive modifiers:
  
//   \`\`\`jsx
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//     {/* Content */}
//   </div>
//   \`\`\`
  
//   ### Animations with Framer Motion
  
//   Framer Motion made it easy to add engaging animations:
  
//   \`\`\`jsx
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ type: "spring", stiffness: 300, damping: 20 }}
//   >
//     {/* Content */}
//   </motion.div>
//   \`\`\`
  
//   ### Dark Mode
  
//   Implementing dark mode with Tailwind was straightforward:
  
//   \`\`\`jsx
//   <html className={theme}>
//     <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
//       {/* Content */}
//     </body>
//   </html>
//   \`\`\`
  
//   ## Challenges and Solutions
  
//   ### Animation Performance
  
//   Initially, I noticed some performance issues with animations on mobile devices. I solved this by:
  
//   1. Using the \`whileTap\` and \`whileHover\` props instead of \`animate\` for interactive elements
//   2. Setting \`layout="position"\` to prevent layout shifts
//   3. Using the \`useReducedMotion\` hook to respect user preferences
  
//   ### Image Optimization
  
//   Next.js's Image component helped optimize images:
  
//   \`\`\`jsx
//   import Image from 'next/image';
  
//   <Image
//     src="/profile.jpg"
//     alt="Profile"
//     width={400}
//     height={400}
//     priority
//     className="rounded-full"
//   />
//   \`\`\`
  
//   ## Conclusion
  
//   Building a portfolio with Next.js and Framer Motion was a rewarding experience. The combination of server-side rendering, utility-first CSS, and declarative animations made it possible to create a fast, responsive, and engaging website.
  
//   If you're considering building your own portfolio, I highly recommend this tech stack for its flexibility and developer experience.
//       `,
//   },
// ];

// // Type definitions for blog posts
// export interface BlogPost {
//   id: number;
//   title: string;
//   date: string;
//   readTime: string;
//   slug: string;
//   content: string;
//   excerpt?: string;
//   tags?: string[];
// }

// // Get all blog posts
// export async function getAllBlogPosts(): Promise<BlogPost[]> {
//   // In a real app, this would fetch from a database or CMS
//   return blogPosts;
// }

// // Get a single blog post by slug
// export async function getBlogPostBySlug(
//   slug: string
// ): Promise<BlogPost | null> {
//   // In a real app, this would fetch from a database or CMS
//   return blogPosts.find((post) => post.slug === slug) || null;
// }

// // Get all blog post slugs for static paths
// export async function getAllBlogSlugs(): Promise<string[]> {
//   // In a real app, this would fetch from a database or CMS
//   return blogPosts.map((post) => post.slug);
// }

// // Get adjacent posts (previous and next)
// export async function getAdjacentPosts(
//   slug: string
// ): Promise<{ prevPost: BlogPost | null; nextPost: BlogPost | null }> {
//   const currentIndex = blogPosts.findIndex((post) => post.slug === slug);

//   if (currentIndex === -1) {
//     return { prevPost: null, nextPost: null };
//   }

//   const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
//   const nextPost =
//     currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

//   return { prevPost, nextPost };
// }
