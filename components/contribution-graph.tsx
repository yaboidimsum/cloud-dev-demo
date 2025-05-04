"use client";

import { useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";
import { useTheme } from "@/context/theme-context";

export default function ContributionGraph() {
  const { theme } = useTheme();
  const [username] = useState("grubersjoe"); // Replace with actual GitHub username

  // Define theme colors according to the expected structure
  const calendarTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  // Choose light or dark theme based on site theme
  const themeMode = theme === "light" ? "light" : "dark";

  return (
    <motion.div
      className="m w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className={theme === "dark-blue" ? "dark-blue-calendar" : " "}>
          <GitHubCalendar
            username={username}
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            colorScheme={themeMode}
            theme={calendarTheme}
            labels={{
              totalCount: "{{count}} contributions in the last year",
            }}
          />
        </div>
      </motion.div>

      <motion.p
        className="dark-blue:text-gray-400 mt-2 text-xs text-gray-500 dark:text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Total: 2068 contributions in lifetime
      </motion.p>
    </motion.div>
  );
}
