"use client";

import { motion } from "framer-motion";

interface AppleLocationProps {
  text: string;
}

export default function AppleLocation({ text }: AppleLocationProps) {
  return (
    <motion.a
      className="text-medium flex w-fit items-center rounded-md bg-yellow-100 px-4 py-2 text-sm tracking-tighter text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      whileHover={{
        y: -5,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      whileTap={{ scale: 0.95 }}
      href="https://developeracademy.apps.binus.ac.id/"
      target="blank"
    >
      🍎 {text}
    </motion.a>
  );
}
