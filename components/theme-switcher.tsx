"use client";

import React, { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import Cookie from "js-cookie";

import { useTheme } from "@/context/theme-context";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const id = React.useId();

  // Sync DOM + cookie when theme changes
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;

    // Toggle Tailwind's dark mode class
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Store the theme in cookie
    Cookie.set("color-theme", theme, { expires: 1000 });
  }, [theme]);

  return (
    <motion.div
      className="fixed bottom-6 right-6 flex space-x-2 rounded-full p-2 shadow-lg dark:bg-zinc-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
      layoutId={id}
    >
      <motion.button
        className={`rounded-full p-2 ${
          theme === "light" ? "bg-amber-200 text-amber-800" : "text-zinc-400"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setTheme("light")}
        title="Light Mode"
      >
        <Sun size={18} />
      </motion.button>

      <motion.button
        className={`rounded-full p-2 ${
          theme === "dark" ? "bg-zinc-800 text-zinc-200" : "text-zinc-400"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setTheme("dark")}
        title="Dark Mode"
      >
        <Moon size={18} />
      </motion.button>
    </motion.div>
  );
}
