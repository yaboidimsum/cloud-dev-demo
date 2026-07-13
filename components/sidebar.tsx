"use client";

import {
  Home,
  Lightbulb,
  PencilRuler,
  IdCard,
  PaintBucket,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/projects", icon: PencilRuler },
    { name: "Cert", href: "/certificate", icon: IdCard },
    { name: "Arts", href: "/art", icon: PaintBucket },
    { name: "Skills", href: "/skills", icon: Lightbulb },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        className="flex items-center gap-1 rounded-full border border-zinc-200/50 bg-white/70 p-2 shadow-lg backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/70"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex h-11 w-16 flex-col items-center justify-center rounded-full text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500",
                isActive
                  ? "text-zinc-950 dark:text-zinc-50 font-semibold"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 z-[-1] rounded-full bg-zinc-100 dark:bg-zinc-900"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon className="h-4 w-4 mb-0.5" />
              <span className="scale-[0.9]">{item.name}</span>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
