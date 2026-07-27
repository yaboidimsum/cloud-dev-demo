"use client";

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
  hidden: { opacity: 0, y: 15 },
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
  let humanizedDate = "Unknown date";
  const parsedDate = new Date(publishedOn);
  if (!isNaN(parsedDate.getTime())) {
    humanizedDate = format(parsedDate, "MMMM do, yyyy");
  }

  return (
    <motion.div
      variants={cardVariants}
      className="group"
    >
      <div className="overflow-hidden rounded-lg border border-zinc-300 bg-white transition-[transform,box-shadow,border-color] duration-200 ease-out group-hover:-translate-y-1.5 group-hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:group-hover:border-zinc-700 active:scale-[0.98] active:duration-75">
        <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={src}
            alt={title || "Certificate thumbnail"}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
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
            ) : (
              <></>
            )}
            <h3 className="mb-1 font-medium text-zinc-900 dark:text-zinc-50">{title}</h3>
          </div>
          <div className="mb-1">
            <time className="text-sm font-semibold text-zinc-500" dateTime={publishedOn}>
              {humanizedDate}
            </time>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
