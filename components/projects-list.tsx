"use client";

import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import ProjectCard from "@/components/project-card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Project {
  slug: string;
  title: string;
  publishedOn: string;
  abstract: string;
  src: string;
  tags: string[];
}

interface ProjectsListProps {
  projects: Project[];
  route: string;
}

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags dynamically
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => {
      if (p.tags) p.tags.forEach((t) => tags.add(t));
    });
    return Array.from(tags).sort();
  }, [projects]);

  // Toggle selected tags
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Filter projects based on query and selected tags (matches all selected tags)
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesTags =
        selectedTags.length === 0 ||
        (p.tags && selectedTags.every((t) => p.tags.includes(t)));

      return matchesSearch && matchesTags;
    });
  }, [projects, searchQuery, selectedTags]);

  return (
    <div className="space-y-8">
      {/* Search & Tag filter layout */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative w-full">
          {/* z-10 and pointer-events-none overlay fixed the covered icon bug */}
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

        {/* Tags badges */}
        <div className="flex flex-wrap gap-2 items-center select-none">
          <button
            onClick={() => setSelectedTags([])}
            className={cn(
              "px-3 py-1 text-xs rounded-full border transition-[border-color,background-color,color] duration-150 ease-[var(--ease-smooth-out)] cursor-pointer",
              selectedTags.length === 0
                ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-950 font-medium"
                : "border-zinc-200 bg-white text-zinc-650 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-700"
            )}
          >
            All
          </button>
          {allTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "px-3 py-1 text-xs rounded-full border transition-[border-color,background-color,color] duration-150 ease-[var(--ease-smooth-out)] cursor-pointer",
                  isSelected
                    ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-950 font-medium"
                    : "border-zinc-200 bg-white text-zinc-650 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-700"
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Projects */}
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
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
          No projects found matching current queries. 🔍
        </motion.div>
      )}
    </div>
  );
}
