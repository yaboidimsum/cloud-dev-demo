"use client";

import { useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useTheme } from "@/context/theme-context";

interface CertificateCardProps {
  title: string;
  publishedOn: string;
  src: string;
  slug: string;
  route: string;
  tags: Array<string>;
}

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
};

export function CertificateGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {children}
    </motion.div>
  );
}

export default function CertificateCard({
  title,
  publishedOn,
  src,
  tags,
}: CertificateCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  let humanizedDate = "Unknown date";
  const parsedDate = new Date(publishedOn);
  if (!isNaN(parsedDate.getTime())) {
    humanizedDate = format(parsedDate, "MMMM do, yyyy");
  }

  const { theme } = useTheme();
  const hoverShadow = theme === "dark"
    ? "0 0 0 1px rgba(255, 255, 255, 0.15)"
    : "0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 20px 25px -5px rgba(0, 0, 0, 0.08)";

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -10,
        boxShadow: hoverShadow,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer h-full"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground transition-[border-color] duration-250 ease-[var(--ease-smooth-out)] hover:border-zinc-400 dark:hover:border-zinc-700 h-full flex flex-col justify-between">
        <div className={`relative aspect-video bg-zinc-100 dark:bg-zinc-900 border-b border-border flex items-center justify-center overflow-hidden t-skel ${isLoaded ? "is-revealed" : ""}`}>
          <div className="t-skel-skeleton is-pulsing bg-zinc-200 dark:bg-zinc-900 w-full h-full" />
          <div className="t-skel-content w-full h-full">
            <Image
              src={src}
              alt={title || "Certificate thumbnail"}
              fill
              onLoad={() => setIsLoaded(true)}
              className="object-cover -outline-offset-1 outline-1 outline-black/10 dark:outline-white/10"
            />
          </div>
        </div>
        <div className="p-5 flex-grow flex flex-col justify-between">
          <div>
            {/* Top Meta */}
            <div className="mb-4 flex items-center justify-between">
              <time className="text-[10px] font-medium  text-zinc-500" dateTime={publishedOn}>
                {humanizedDate}
              </time>
            </div>

            {/* Title */}
            <h3 className="mb-1 text-base font-semibold text-zinc-900 group-hover:text-[#0066cc] dark:text-zinc-50 dark:group-hover:text-white transition-colors duration-150">
              {title}
            </h3>
          </div>

          {/* Footer Tags */}
          <div className="mt-auto pt-2 flex flex-wrap gap-1.5">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100/50 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
