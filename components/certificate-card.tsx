"use client";

import { useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";

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

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer h-full"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground transition-[border-color] duration-250 ease-[var(--ease-smooth-out)] hover:border-zinc-400 dark:hover:border-zinc-700 h-full flex flex-col">
        <div className={`relative aspect-video bg-zinc-100 dark:bg-zinc-900 t-skel ${isLoaded ? "is-revealed" : ""}`}>
          <div className="t-skel-skeleton is-pulsing bg-zinc-200 dark:bg-zinc-900 w-full h-full" />
          <div className="t-skel-content w-full h-full">
            <Image
              src={src}
              alt={title || "Certificate thumbnail"}
              fill
              onLoad={() => setIsLoaded(true)}
              className="object-cover"
            />
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div className="flex flex-col">
            {tags ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-zinc-100/50 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <h3 className="mb-1 font-medium text-zinc-900 dark:text-zinc-50">{title}</h3>
          </div>
          <div className="mt-auto pt-2">
            <time className="text-sm font-semibold text-zinc-500" dateTime={publishedOn}>
              {humanizedDate}
            </time>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
