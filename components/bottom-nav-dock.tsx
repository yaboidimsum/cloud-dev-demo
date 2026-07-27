"use client";

import {
  Home,
  Lightbulb,
  PencilRuler,
  IdCard,
  PaintBucket,
  Sun,
  Moon,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "@/context/theme-context";
import React, { useEffect, useRef } from "react";
import Cookie from "js-cookie";

export default function BottomNavDock() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const isFirstRender = useRef(true);

  // Sync DOM + cookie when theme changes
  useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    Cookie.set("color-theme", theme, { expires: 1000 });
  }, [theme]);

  // Wire up the transitions.dev sliding pill
  useEffect(() => {
    const updatePill = (isResize = false) => {
      const container = containerRef.current;
      const pill = pillRef.current;
      if (!container || !pill) return;

      const activeTab = container.querySelector('[aria-selected="true"]') as HTMLElement;
      if (activeTab) {
        if (isFirstRender.current || isResize) {
          pill.style.transition = "none";
          pill.style.transform = `translateX(${activeTab.offsetLeft}px)`;
          pill.style.width = `${activeTab.offsetWidth}px`;
          
          // Force a reflow to apply values immediately
          pill.offsetHeight;
          
          pill.style.transition = "";
          if (!isResize) {
            isFirstRender.current = false;
          }
        } else {
          pill.style.transform = `translateX(${activeTab.offsetLeft}px)`;
          pill.style.width = `${activeTab.offsetWidth}px`;
        }
      } else {
        pill.style.width = "0px";
      }
    };

    updatePill();

    const handleResize = () => updatePill(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/projects", icon: PencilRuler },
    { name: "Cert", href: "/certificate", icon: IdCard },
    { name: "Arts", href: "/art", icon: PaintBucket },
    { name: "Skills", href: "/skills", icon: Lightbulb },
    { name: "Resources", href: "/resources", icon: Bookmark },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        ref={containerRef}
        className="t-tabs border border-zinc-200/50 p-1 shadow-lg backdrop-blur-md dark:border-zinc-800/50 flex items-center"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        role="tablist"
      >
        <span 
          ref={pillRef} 
          className="t-tabs-pill" 
          aria-hidden="true" 
        />
        
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              role="tab"
              aria-selected={isActive}
              className={cn(
                "t-tab relative flex h-11 w-16 flex-col items-center justify-center rounded-full text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500",
                isActive
                  ? "text-zinc-950 dark:text-zinc-50 font-semibold"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              )}
            >
              <item.icon className="h-4 w-4 mb-0.5" />
              <span className="scale-[0.9]">{item.name}</span>
            </Link>
          );
        })}

        {/* Vertical Divider */}
        <div className="mx-2 h-6 w-[1.5px] bg-zinc-200/60 dark:bg-zinc-800/60 z-10" />

        {/* Unified Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500 cursor-pointer z-10"
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
          aria-label={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </button>
      </motion.div>
    </div>
  );
}
