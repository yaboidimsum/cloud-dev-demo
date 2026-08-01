"use client";

import React, { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import hljs from "highlight.js";

interface CopyablePreProps extends React.HTMLAttributes<HTMLPreElement> {
  language?: string;
}

export default function CopyablePre({
  children,
  language,
  className = "",
  ...props
}: CopyablePreProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  // Recursively extract raw string content from React children
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.props.children) {
      return extractText(node.props.children);
    }
    return "";
  };

  const rawCode = extractText(children);

  // Highlight syntax using highlight.js
  const highlightedCode = React.useMemo(() => {
    if (!rawCode.trim()) return "";

    let targetLang = language;
    if (!targetLang) {
      const codeTrim = rawCode.trim();
      if (
        codeTrim.includes("export default") ||
        codeTrim.includes("import ") ||
        codeTrim.includes("return (") ||
        codeTrim.includes("<div") ||
        codeTrim.includes("interface ") ||
        codeTrim.includes("const ")
      ) {
        targetLang = "typescript";
      } else if (
        codeTrim.includes("{") &&
        (codeTrim.includes("clip-path") ||
          codeTrim.includes("margin") ||
          codeTrim.includes("transform:") ||
          codeTrim.includes("color:"))
      ) {
        targetLang = "css";
      }
    }

    try {
      const validLang =
        targetLang && hljs.getLanguage(targetLang) ? targetLang : null;
      if (validLang) {
        return hljs.highlight(rawCode.trim(), { language: validLang }).value;
      }
      return hljs.highlightAuto(rawCode.trim()).value;
    } catch {
      return rawCode.trim();
    }
  }, [rawCode, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="relative group my-4 w-full max-w-full min-w-0 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-[#f8f9fa] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-sm">
      <pre
        ref={preRef}
        className={`overflow-x-auto p-4 text-[13px] font-mono leading-relaxed whitespace-pre-wrap break-words hljs ${className}`}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        {...props}
      />
      <div className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus-within:opacity-100">
        <motion.button
          type="button"
          onClick={handleCopy}
          animate={{ width: copied ? 74 : 64 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="inline-flex h-7 items-center justify-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-800/90 bg-white/90 dark:bg-zinc-900/90 px-2.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 active:scale-[0.96] transition-[color,background-color,border-color] duration-150 ease-out cursor-pointer shadow-sm backdrop-blur-md overflow-hidden whitespace-nowrap"
          title="Copy code"
          aria-label="Copy code"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center gap-1 w-full shrink-0"
              >
                <Check className="h-3 w-3 text-green-400" />
                <span className="text-green-400">Copied</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center gap-1 w-full shrink-0"
              >
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
