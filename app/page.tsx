"use client";

import { Github, FileText, Linkedin, Mail } from "lucide-react";
import dynamic from "next/dynamic";
// import ProjectCard from "@/components/project-card";
import AvailabilityIndicator from "@/components/availability-indicator";
import { motion } from "framer-motion";
import AnimatedBeamDemoClient from "@/components/animated-beam-landing-client";
import Image from "next/image";
// import ProjectCard from "@/components/project-card";
// import { getBlogPostList } from "./helpers/file-helpers";
import ExperienceSection from "@/components/experience-section";
import { useTheme } from "@/context/theme-context";

const ContributionGraph = dynamic(
  () => import("@/components/contribution-graph"),
  { ssr: false }
);

export default function Home() {
  const { theme } = useTheme();

  const btnHoverShadow = theme === "dark"
    ? "0 0 0 1px rgba(255, 255, 255, 0.15)"
    : "0 2px 4px rgba(0,0,0,0.02), 0 8px 16px rgba(0,0,0,0.06)";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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

  return (
    <div className="mx-auto max-w-4xl pt-8 ">
      <div className="mb-12 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="mb-1 text-zinc-500  dark:text-zinc-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Hey! It&apos;s me 👋
          </motion.p>
          <motion.div
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950 flex items-center justify-center select-none">
              <Image src="/kumo.svg" alt="Kumo logo" width={48} height={48} className="h-full w-full object-contain rounded-full" />
            </div>
            <h1 className="text-3xl font-medium">
              Awan
            </h1>
          </motion.div>
          <motion.p
            className="mb-6  text-lg text-zinc-500 dark:text-zinc-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* @cloudimss */}
            Based in Surabaya, Indonesia 🇮🇩
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.p
            className="mb-2 text-zinc-400  dark:text-zinc-500"
          >
            Yup! I&apos;m a{" "}
            <span className="font-medium text-zinc-800  dark:text-zinc-50">
              Frontend Developer
            </span>
            . Big deal, right? But wait, there&apos;s more! I&apos;m not just a
            developer, I&apos;m a{" "}
            <span className="font-medium text-zinc-800  dark:text-zinc-50 ">
              Design Engineer
            </span>
            {/* . And if that wasn&apos;t enough, guess what? maybe{" "}
            <span className="font-medium">Freelancer</span>? Oh yeah,
            I&apos;ve got that badge too! */}
          </motion.p>

          <motion.p
            className="mb-6 text-zinc-400  dark:text-zinc-500"
          >
            I love both{" "}
            <span className="font-medium text-zinc-800  dark:text-zinc-50 ">
              Development
            </span>{" "}
            and{" "}
            <span className="font-medium text-zinc-800  dark:text-zinc-50 ">
              Design
            </span>
            , so. That means{" "}
            <span className="font-medium text-zinc-800  dark:text-zinc-50 ">
              I can create beautiful and functional websites
            </span>
            . I&apos;m always looking for new opportunities to learn and grow. Beyond engineering, I love exploring music (especially tweepop, dreampop, and midwest emo) and digital art.
          </motion.p>

          <motion.div variants={item} className="mb-12 flex flex-wrap gap-4">
            <AvailabilityIndicator available={true} />
            <motion.a
              href="mailto:dprihadisetiawan@gmail.com"
              className=" flex items-center rounded-md   px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100/10 dark:border-0 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              whileHover={{
                y: -5,
                boxShadow: btnHoverShadow,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                },
              }}
              whileTap={{ scale: 0.96 }}
            >
              <Mail className="mr-2 h-4 w-4" /> Email Me
            </motion.a>
            <motion.a
              target="_blank"
              href="https://github.com/yaboidimsum"
              className=" flex items-center rounded-md   px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100/10 dark:border-0 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              whileHover={{
                y: -5,
                boxShadow: btnHoverShadow,
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.96 }}
            >
              <Github className="mr-2 h-4 w-4" /> Github
            </motion.a>
            <motion.a
              target="_blank"
              href="https://www.linkedin.com/in/dimas-prihady-setyawan-47a66821a/"
              className=" flex items-center rounded-md   px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100/10 dark:border-0 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              whileHover={{
                y: -5,
                boxShadow: btnHoverShadow,
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.96 }}
            >
              <Linkedin className="mr-2 h-4 w-4" /> Linkedin
            </motion.a>
            <motion.a
              target="_blank"
              href="https://drive.google.com/file/d/13rLLhzWqK3bxZ6si2HfLw-zGffVKlMqn/view?usp=sharing"
              className=" flex items-center rounded-md   px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100/10 dark:border-0 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              whileHover={{
                y: -5,
                boxShadow: btnHoverShadow,
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.96 }}
            >
              <FileText className="mr-2 h-4 w-4" /> Resume
            </motion.a>
          </motion.div>
          <motion.div variants={item}>
            <AnimatedBeamDemoClient />
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <ExperienceSection />
          </motion.div>

          <motion.div
            variants={item}
            className="mb-12 w-full "
            whileInView={{
              opacity: [0, 1],
              y: [20, 0],
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            viewport={{ once: true }}
          >
            <ContributionGraph />
          </motion.div>

          <motion.div
            variants={item}
            className="mb-12"
            whileInView={{
              opacity: [0, 1],
              y: [20, 0],
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            viewport={{ once: true }}
          >
            {/* <Timeline /> */}
          </motion.div>

          {/* <motion.div variants={item}>
            <p className="mb-4">
              Still not sure? Check out my{" "}
              <Link href="/projects" className="text-blue-400 hover:underline">
                Projects
              </Link>
            </p> */}

          {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projectPosts.slice(0, 2).map(({ slug, ...delegated }) => (
                <ProjectCard
                  key={slug}
                  slug={slug}
                  route={routeProject}
                  {...delegated}
                />
              ))}
            </div> */}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-16"
          whileInView={{
            opacity: [0, 1],
            y: [20, 0],
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
          viewport={{ once: true }}
        >
          {/* <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
              <Link
                href="/blogs"
                className="flex items-center text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div> */}

          {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {blogPosts.slice(0, 2).map(({ slug, ...delegated }) => (
                <ProjectCard
                  key={slug}
                  slug={slug}
                  route={routeBlog}
                  {...delegated}
                />
              ))}
            </div> */}
          {/* </motion.div> */}
        </motion.div>
      </div>
    </div>
  );
}
