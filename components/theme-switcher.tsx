"use client";

import React from "react";
import { Moon, Sun, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/theme-context";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const id = React.useId();

  return (
    <motion.div
      className="light:bg-white fixed bottom-6 right-6 flex space-x-2 rounded-full bg-gray-800 p-2 shadow-lg dark:bg-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
      layoutId={id}
    >
      <motion.button
        className={`rounded-full p-2 ${
          theme === "light" ? "bg-amber-200 text-amber-800" : "text-gray-400"
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
          theme === "dark" ? "bg-gray-700 text-gray-200" : "text-gray-400"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setTheme("dark")}
        title="Dark Mode"
      >
        <Moon size={18} />
      </motion.button>

      {/* <motion.button
        className={`p-2 rounded-full ${theme === "dark-blue" ? "bg-blue-900 text-blue-200" : "text-gray-400"}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setTheme("dark-blue")}
        title="Twitter Dark Blue Mode"
      >
        <Twitter size={18} />
      </motion.button> */}
    </motion.div>
  );
}
