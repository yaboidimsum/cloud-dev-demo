"use client";

import type React from "react";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Sparkles } from "lucide-react";
import {
  SiTypescript,
  SiPytorch,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiGithub,
  SiNetlify,
  SiVercel,
  SiPostman,
  SiFigma,
  SiSwr,
  SiSwift,
  SiSketch,
} from "react-icons/si";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 15 },
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

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  const SkillBadge = ({
    icon,
    name,
  }: {
    icon: React.ReactNode;
    name: string;
  }) => {
    return (
      <motion.div
        className="mb-2 mr-2 inline-flex items-center space-x-1.5 rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
        variants={badgeVariants}
        whileHover={{
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          transition: { type: "spring", stiffness: 300, damping: 15 },
        }}
      >
        <span className="text-lg">{icon}</span>
        <span>{name}</span>
      </motion.div>
    );
  };

  const SectionTitle = ({ title }: { title: string }) => (
    <motion.div
      className="mb-3 mt-6 text-sm text-zinc-500 dark:text-zinc-400"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      &lt; {title} /&gt;
    </motion.div>
  );

  return (
    <div className="mx-auto max-w-4xl pt-8" ref={containerRef}>
      <div className="mb-12">
        <motion.h1
          className="mb-2 text-center text-3xl font-medium "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Skills
        </motion.h1>
        <motion.p
          className="mb-12 text-center text-sm text-zinc-500 dark:text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          which I use day-to-day
        </motion.p>

        <motion.div
          className="mb-8 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-zinc-700 dark:text-zinc-300">
            My main tech stack is{" "}
            <span className="mx-1 inline-flex items-center rounded-md bg-zinc-200 px-2 py-0.5 text-sm dark:bg-zinc-900">
              <SiNextdotjs className="mr-1 text-black dark:text-white" /> NextJs
            </span>{" "}
            framework with{" "}
            <span className="mx-1 inline-flex items-center rounded-md bg-zinc-200 px-2 py-0.5 text-sm dark:bg-zinc-900">
              <SiTailwindcss className="mr-1 text-[#06B6D4]" /> TailwindCSS
            </span>{" "}
            CSS as a styling library for Frontend works
          </p>

          <p className="mt-4 text-zinc-700 dark:text-zinc-300">
            I also into Deep Learning stuff, I use{" "}
            <span className="mx-1 inline-flex items-center rounded-md bg-zinc-200 px-2 py-0.5 text-sm dark:bg-zinc-900">
              <SiPytorch className="mr-1 text-[#EE4C2C]" /> Pytorch
            </span>{" "}
            framework for doing research. ❤️
          </p>
        </motion.div>

        <div>
          <SectionTitle title="LANGUAGES" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap"
          >
            <SkillBadge icon={<SiTypescript className="text-[#3178C6]" />} name="TypeScript" />
            <SkillBadge icon={<SiPython className="text-[#3776AB]" />} name="Python" />
            <SkillBadge icon={<SiSwift className="text-[#F05138]" />} name="SwiftUI" />
          </motion.div>

          <SectionTitle title="AI HARNESS TUI" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap"
          >
            <SkillBadge icon={<Terminal className="text-[#00FF66] h-4.5 w-4.5" />} name="OpenCode" />
            <SkillBadge icon={<Sparkles className="text-[#FF00C5] h-4.5 w-4.5" />} name="Antigravity" />
          </motion.div>

          <SectionTitle title="FRAMEWORKS" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap"
          >
            <SkillBadge icon={<SiNextdotjs className="text-black dark:text-white" />} name="NextJs" />
            <SkillBadge icon={<SiTailwindcss className="text-[#06B6D4]" />} name="TailwindCSS" />
            <SkillBadge icon={<SiPytorch className="text-[#EE4C2C]" />} name="Pytorch" />
          </motion.div>

          <SectionTitle title="LIBRARIES" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap"
          >
            <SkillBadge icon={<SiReact className="text-[#61DAFB] animate-[spin_20s_linear_infinite]" />} name="React" />
            <SkillBadge icon={<SiSwr className="text-[#0070F3]" />} name="SWR" />
          </motion.div>

          <SectionTitle title="TOOLS" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap"
          >
            <SkillBadge icon={<SiPostman className="text-[#FF6C37]" />} name="Postman" />
            <SkillBadge icon={<SiFramer className="text-[#0055FF] dark:text-[#FF00C5]" />} name="Framer Motion" />
            <SkillBadge icon={<SiFigma className="text-[#F24E1E]" />} name="Figma" />
            <SkillBadge icon={<SiSketch className="text-[#FDD231]" />} name="Sketch" />
          </motion.div>

          <SectionTitle title="PLATFORMS" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap"
          >
            <SkillBadge icon={<SiGithub className="text-[#181717] dark:text-white" />} name="Github" />
            <SkillBadge icon={<SiNetlify className="text-[#00C896]" />} name="Netlify" />
            <SkillBadge icon={<SiVercel className="text-black dark:text-white" />} name="Vercel" />
          </motion.div>

          <motion.p
            className="mt-8 text-sm text-zinc-500 dark:text-zinc-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Few more... but secret hehehe :3
          </motion.p>
        </div>
      </div>
    </div>
  );
}
