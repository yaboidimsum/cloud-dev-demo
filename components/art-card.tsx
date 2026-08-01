"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ReactNode, useState } from "react";
import { Copy, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface ArtCardProps {
  title: string;
  publishedOn: string;
  src: ReactNode;
  tags?: Array<string>;
  promptText?: string;
  id?: string;
}

interface TextWithEllipsisProps {
  text: string;
  maxLength?: number;
}

export const TextWithEllipsis = ({
  text,
  maxLength,
}: TextWithEllipsisProps) => {
  const textStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: maxLength ? `${maxLength}px` : "100%", // Optional: limit text width
  };
  return (
    <p style={textStyle} title={text}>
      {text}
    </p>
  );
};

export default function ArtCard({
  title,
  publishedOn,
  src,
  promptText,
  id,
}: ArtCardProps) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  let humanizedDate = "Unknown date";
  const parsedDate = new Date(publishedOn);
  if (!isNaN(parsedDate.getTime())) {
    humanizedDate = format(parsedDate, "MMM d, yyyy");
  }

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!promptText) return;
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!id) return;
    
    // Check if the click target is interactive
    const target = e.target as HTMLElement;
    const isInteractive = target.closest("button, a, input, select, textarea, canvas, [role='button']");
    
    if (isInteractive) {
      return;
    }
    
    router.push(`/art/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="w-full animate-fade-in"
    >
      <div 
        onClick={handleCardClick}
        className={`vault-card group block rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-2 transition-colors duration-150 ease-out hover:border-zinc-400 dark:hover:border-zinc-700 ${id ? 'cursor-pointer' : ''}`}
      >
        {/* Inner Preview Area */}
        <div className="mx-auto w-full overflow-hidden rounded-[12px] border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50 aspect-video flex items-center justify-center relative">
          {src}
          
          {promptText && (
            <div className="absolute right-3 top-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus-within:opacity-100">
              <motion.button
                type="button"
                onClick={handleCopy}
                animate={{ width: copied ? 84 : 160 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="inline-flex h-7 items-center justify-center gap-1.5 rounded-md border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-zinc-50 active:scale-[0.96] transition-[color,background-color,border-color,transform] duration-200 ease-out cursor-pointer shadow-sm backdrop-blur-md hover:scale-[1.02] active:scale-[0.97] hover:border-zinc-300 dark:hover:border-zinc-700 overflow-hidden whitespace-nowrap"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center justify-center gap-1.5 w-full shrink-0"
                    >
                      <Check className="h-3.5 w-3.5 text-green-500" />
                      <span className="text-green-600 dark:text-green-400">Copied!</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center justify-center gap-1.5 w-full shrink-0"
                    >
                      <Copy className="h-3 w-3" />
                      <span>Copy Prompt by Arlan</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          )}
        </div>
        
        {/* Metadata Footer */}
        <div className="flex items-center justify-between gap-3 px-1 pt-2.5 pb-1">
          <span className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
            {title}
          </span>
          <span className="shrink-0 text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
            {humanizedDate}
          </span>
        </div>
      </div>
    </motion.div>
  );
}


