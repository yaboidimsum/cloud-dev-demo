"use client";

import { Home, Lightbulb, PencilRuler } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    // { name: "Arts", href: "/arts", icon: Palette },
    { name: "Projects", href: "/projects", icon: PencilRuler },
    // { name: "Blogs", href: "/blogs", icon: BookOpen },
    { name: "Skills", href: "/skills", icon: Lightbulb },
    // { name: "Blog", href: "/blog", icon: BookOpen },
  ];

  return (
    <motion.div
      className="dark-blue:bg-[#15202b] dark-blue:border-gray-800 fixed bottom-0 left-0 top-0 z-10 flex w-16 flex-col items-center border-r border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-black"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {navItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          whileHover={{
            scale: 1.1,
            transition: { type: "spring", stiffness: 300, damping: 10 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={item.href}
            className={cn(
              "mb-4 flex w-full flex-col items-center justify-center p-3 text-xs transition-colors",
              pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
                ? "dark-blue:text-white text-gray-900 dark:text-white"
                : "dark-blue:hover:text-gray-300 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            <item.icon className="mb-1 h-5 w-5" />
            {item.name}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
