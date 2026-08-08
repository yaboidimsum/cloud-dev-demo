"use client";

import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import ProjectCard from "@/components/project-card";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  slug: string;
  title: string;
  publishedOn: string;
  abstract: string;
  src: string;
  tags: string[];
  category?: string;
}

interface ProjectsListProps {
  projects: Project[];
  route: string;
}

const getCategoryLabel = (cat: string) => {
  switch (cat) {
    case "all":
      return "📚 All";
    case "software-engineer":
      return "💻 Software Engineer";
    case "web":
      return "🌐 Web";
    case "mobile":
      return "📱 Mobile";
    default:
      return cat;
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

export default function ProjectsList({ projects, route }: ProjectsListProps) {
  const [filter, setFilter] = useState<"all" | "software-engineer" | "web" | "mobile">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // 1. Category Matching Logic
      let matchesCategory = false;
      if (filter === "all") {
        matchesCategory = true;
      } else if (p.category === filter) {
        matchesCategory = true;
      } else {
        // Fallback matching by tags or keywords if explicit category is unassigned
        const pTags = (p.tags || []).map((t) => t.toLowerCase());
        if (filter === "software-engineer") {
          matchesCategory = pTags.some(
            (t) =>
              t.includes("software engineer") ||
              t.includes("computer vision") ||
              t.includes("generative ai") ||
              t.includes("research") ||
              t.includes("gin") ||
              t.includes("gorm") ||
              t.includes("backend") ||
              t.includes("mysql")
          );
        } else if (filter === "web") {
          matchesCategory =
            pTags.some(
              (t) =>
                t.includes("web") ||
                t.includes("frontend") ||
                t.includes("react") ||
                t.includes("nextjs") ||
                t.includes("ui/ux") ||
                t.includes("3d") ||
                t.includes("user experience") ||
                t.includes("user interface")
            ) || !p.category;
        } else if (filter === "mobile") {
          matchesCategory = pTags.some(
            (t) =>
              t.includes("mobile") ||
              t.includes("ios") ||
              t.includes("swift") ||
              t.includes("react native") ||
              t.includes("android") ||
              t.includes("flutter")
          );
        }
      }

      // 2. Search Query Matching Logic
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [projects, filter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-3.5 z-10 flex items-center text-zinc-400 pointer-events-none">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-10 pr-10 py-2.5 text-sm rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-[border-color,box-shadow,background-color] duration-150 ease-[var(--ease-smooth-out)] text-zinc-900 dark:text-zinc-50"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-3.5 z-10 flex items-center text-zinc-450 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Filter Buttons (Resources Style) */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {(["all", "software-engineer", "web", "mobile"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-all active:scale-[0.98] cursor-pointer ${
              filter === cat
                ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100/70 text-zinc-600 hover:bg-zinc-200/70 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      <motion.div
        key={filter}
        layout
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.slug}
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <ProjectCard route={route} {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty fallback */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-zinc-500 dark:text-zinc-400 font-sans"
        >
          No projects found matching current filter or search queries. 🔍
        </motion.div>
      )}
    </div>
  );
}
