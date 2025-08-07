"use client";

import type React from "react";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
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
} from "react-icons/si";

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
        className="mb-2 mr-2 inline-flex items-center space-x-1.5 rounded-md bg-zinc-200 px-3 py-1.5 text-sm tracking-tighter dark:bg-zinc-900"
        whileHover={{
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          transition: { type: "spring", stiffness: 300, damping: 15 },
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <span className="text-lg">{icon}</span>
        <span>{name}</span>
      </motion.div>
    );
  };

  const SectionTitle = ({ title }: { title: string }) => (
    <motion.div
      className="light:text-zinc-600 dark-blue:text-zinc-400 mb-3 mt-6 text-sm tracking-tighter text-zinc-500 dark:text-zinc-500"
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
          className="mb-2 text-center text-3xl font-bold tracking-tighter"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Skills
        </motion.h1>
        <motion.p
          className="light:text-zinc-600 dark-blue:text-zinc-400 mb-12 text-center text-sm tracking-tighter text-zinc-500 dark:text-zinc-500"
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
          <p className="light:text-zinc-700 dark-blue:text-zinc-300 tracking-tighter text-zinc-800 dark:text-zinc-300">
            My main Tech stack is{" "}
            <span className="light:bg-zinc-200 mx-1 inline-flex items-center rounded-md bg-zinc-200 px-2 py-0.5 text-sm dark:bg-zinc-900">
              <SiNextdotjs className="mr-1" /> NextJs
            </span>{" "}
            framework with{" "}
            <span className="light:bg-zinc-200 mx-1 inline-flex items-center rounded-md bg-zinc-200 px-2 py-0.5 text-sm dark:bg-zinc-900">
              <SiTailwindcss className="mr-1" /> TailwindCSS
            </span>{" "}
            CSS as a styling library for Frontend works
          </p>

          <p className="light:text-zinc-700 dark-blue:text-zinc-300 mt-4 tracking-tighter text-zinc-800 dark:text-zinc-300">
            I also into Deep Learning stuff, I use{" "}
            <span className="light:bg-zinc-200 mx-1 inline-flex items-center rounded-md bg-zinc-200 px-2 py-0.5 text-sm dark:bg-zinc-900">
              <SiPytorch className="mr-1" /> Pytorch
            </span>{" "}
            framework for doing research. ❤️
          </p>
        </motion.div>

        <div>
          <SectionTitle title="LANGUAGES" />
          <div className="flex flex-wrap tracking-tighter">
            <SkillBadge icon={<SiJavascript />} name="JavaScript" />
            <SkillBadge icon={<SiTypescript />} name="TypeScript" />
            <SkillBadge icon={<SiHtml5 />} name="HTML" />
            <SkillBadge icon={<SiCss3 />} name="CSS" />
            <SkillBadge icon={<SiPython />} name="Python" />
          </div>

          <SectionTitle title="FRAMEWORKS" />
          <div className="flex flex-wrap">
            <SkillBadge icon={<SiNextdotjs />} name="NextJs" />
            <SkillBadge icon={<SiTailwindcss />} name="TailwindCSS" />
            <SkillBadge icon={<SiPytorch />} name="Pytorch" />
          </div>

          <SectionTitle title="LIBRARIES" />
          <div className="flex flex-wrap">
            <SkillBadge icon={<SiReact />} name="React" />
            <SkillBadge icon={<SiSwr />} name="SWR" />
          </div>

          <SectionTitle title="TOOLS" />
          <div className="flex flex-wrap">
            <SkillBadge icon={<SiPostman />} name="Postman" />
            <SkillBadge icon={<SiFramer />} name="Framer Motion" />
            <SkillBadge icon={<SiFigma />} name="Figma" />
          </div>

          <SectionTitle title="PLATFORMS" />
          <div className="flex flex-wrap">
            <SkillBadge icon={<SiGithub />} name="Github" />
            <SkillBadge icon={<SiNetlify />} name="Netlify" />
            <SkillBadge icon={<SiVercel />} name="Vercel" />
          </div>

          <motion.p
            className="light:text-zinc-600 dark-blue:text-zinc-400 mt-8 text-sm text-zinc-500 dark:text-zinc-500"
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
