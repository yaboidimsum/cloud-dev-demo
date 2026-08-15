"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import experienceData from "@/data/experience.json";
import { cn } from "@/lib/utils";

export default function ExperienceSection() {
  const [showAllWork, setShowAllWork] = useState(false);
  const [expandedJobs, setExpandedJobs] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("work");
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabsPillRef = useRef<HTMLSpanElement>(null);

  const toggleJobExpand = (index: number) => {
    setExpandedJobs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    const updatePill = (isResize = false) => {
      const container = tabsContainerRef.current;
      const pill = tabsPillRef.current;
      if (!container || !pill) return;

      const activeTrigger = container.querySelector('[data-state="active"]') as HTMLElement;
      if (activeTrigger) {
        if (isResize) {
          pill.style.transition = "none";
          pill.style.transform = `translateX(${activeTrigger.offsetLeft}px)`;
          pill.style.width = `${activeTrigger.offsetWidth}px`;
          void pill.offsetHeight;
          pill.style.transition = "";
        } else {
          pill.style.transform = `translateX(${activeTrigger.offsetLeft}px)`;
          pill.style.width = `${activeTrigger.offsetWidth}px`;
        }
      }
    };

    const timer = setTimeout(() => updatePill(), 0);

    const handleResize = () => updatePill(true);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTab]);

  return (
    <motion.div variants={item} className="mt-8">
      <h2 className="mb-4 text-2xl font-medium">
        Experience
      </h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          ref={tabsContainerRef}
          className="relative flex w-full p-1 bg-zinc-100/70 dark:bg-zinc-900 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 select-none"
        >
          <span
            ref={tabsPillRef}
            className="absolute top-1 bottom-1 left-0 z-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm transition-[transform,width] duration-250 ease-[var(--ease-smooth-out)]"
          />
          <TabsTrigger
            value="work"
            className="relative z-10 flex-1 py-1.5 text-sm font-medium text-zinc-500 data-[state=active]:text-zinc-950 dark:text-zinc-400 dark:data-[state=active]:text-zinc-50 rounded-full transition-colors duration-150 focus-visible:outline-none"
          >
            Work History
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="relative z-10 flex-1 py-1.5 text-sm font-medium text-zinc-500 data-[state=active]:text-zinc-950 dark:text-zinc-400 dark:data-[state=active]:text-zinc-50 rounded-full transition-colors duration-150 focus-visible:outline-none"
          >
            Education
          </TabsTrigger>
        </TabsList>
        <motion.div
          layout="position"
          className="overflow-hidden"
          transition={{ type: "spring", stiffness: 350, damping: 35 }}
        >
          <TabsContent
            value="work"
            className="mt-4 transition-[opacity,transform] duration-250 ease-[var(--ease-smooth-out)] data-[state=active]:opacity-100 data-[state=active]:translate-y-0 data-[state=inactive]:opacity-0 data-[state=inactive]:translate-y-1"
          >
            <div className="space-y-4">
              {(showAllWork
                ? experienceData.workHistory
                : experienceData.workHistory.slice(0, 3)
              ).map((job, index) => {
                const isCompact = index >= 3;
                const isExpanded = expandedJobs.includes(index);
                return (
                  <div
                    key={index}
                    className={cn(
                      "rounded-lg border-[1.5px] border-zinc-50/100 bg-zinc-50/60 p-4 dark:border-zinc-900 dark:bg-zinc-950 transition-all duration-150 ease-[var(--ease-smooth-out)] select-none",
                      isCompact && "cursor-pointer hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-zinc-100/30 dark:hover:bg-zinc-900/40"
                    )}
                    onClick={isCompact ? () => toggleJobExpand(index) : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-medium">{job.title}</h3>
                        {isCompact && (
                          <span
                            className={cn(
                              "text-zinc-400 dark:text-zinc-600 transition-transform duration-150 ease-[var(--ease-smooth-out)] inline-block",
                              isExpanded ? "rotate-180" : "rotate-0"
                            )}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                      <span className="rounded-full px-2 py-1 text-xs font-medium text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                        {job.workType}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500">
                      {job.company} • {job.period}
                    </p>
                    <motion.div
                      initial={isCompact ? { height: 0, opacity: 0 } : false}
                      animate={
                        !isCompact || isExpanded
                          ? { height: "auto", opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-xs italic text-zinc-500">
                        {job.location}
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                        {job.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                );
              })}

              {experienceData.workHistory.length > 3 && (
                <button
                  onClick={() => setShowAllWork(!showAllWork)}
                  className="w-full py-2.5 mt-2 text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md border border-zinc-200/50 dark:border-zinc-800/50 transition-colors duration-150 ease-[var(--ease-smooth-out)] active:scale-[0.98] select-none cursor-pointer"
                >
                  {showAllWork ? "Show Less" : `Show More (${experienceData.workHistory.length - 3} older roles)`}
                </button>
              )}
            </div>
          </TabsContent>
          <TabsContent
            value="education"
            className="mt-4 transition-[opacity,transform] duration-250 ease-[var(--ease-smooth-out)] data-[state=active]:opacity-100 data-[state=active]:translate-y-0 data-[state=inactive]:opacity-0 data-[state=inactive]:translate-y-1"
          >
            <div className="space-y-4">
              {experienceData.education.map((edu, index) => (
                <div
                  key={index}
                  className="rounded-lg  border-[1.5px]  border-zinc-50/100 bg-zinc-50/60 p-4 dark:border-zinc-900 dark:bg-zinc-950"
                >
                  <h3 className="font-medium">{edu.institution}</h3>
                  <p className="text-sm text-zinc-500">
                    {edu.degree} • {edu.period}
                  </p>
                  <p className="text-xs italic text-zinc-500">
                    {edu.location}
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                    {edu.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TabsContent>
        </motion.div>
      </Tabs>
      <p className="mt-4 text-center text-sm text-zinc-500">
        You can see more here{" "}
        <a
          href="https://www.linkedin.com/in/dimas-prihady-setyawan-47a66821a/"
          target="_blank"
          className="font-medium text-blue-500 hover:text-blue-600 hover:underline"
        >
          tehee :3
        </a>
      </p>
    </motion.div>
  );
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};
