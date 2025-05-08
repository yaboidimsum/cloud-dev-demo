"use client";

import Link from "next/link";
import { Github, FileText, Linkedin } from "lucide-react";
import ContributionGraph from "@/components/contribution-graph";
// import ProjectCard from "@/components/project-card";
import AvailabilityIndicator from "@/components/availability-indicator";
import { motion } from "framer-motion";
import AnimatedBeamDemoClient from "@/components/animated-beam-landing-client";
// import ProjectCard from "@/components/project-card";
// import { getBlogPostList } from "./helpers/file-helpers";

export default function Home() {
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
            className="dark-blue:text-gray-400 mb-1 text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Hey! It&apos;s me 👋
          </motion.p>
          <motion.h1
            className="mb-2 text-3xl font-bold tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            Dimas/Awan/Kumo
          </motion.h1>
          <motion.p
            className="dark-blue:text-gray-400 mb-6 text-sm text-gray-500 dark:text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            @cloudimss
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.p
            variants={item}
            className="mb-2 text-zinc-400 dark:text-zinc-500"
          >
            Yup! I&apos;m a{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-50">
              Frontend Developer
            </span>
            . Big deal, right? But wait, there&apos;s more! I&apos;m not just a
            developer, I&apos;m a{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-50 ">
              Design Engineer
            </span>
            {/* . And if that wasn&apos;t enough, guess what? maybe{" "}
            <span className="font-semibold">Freelancer</span>? Oh yeah,
            I&apos;ve got that badge too! */}
          </motion.p>

          <motion.p
            variants={item}
            className="mb-6 text-zinc-400 dark:text-zinc-500"
          >
            I love both{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-50 ">
              Development
            </span>{" "}
            and{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-50 ">
              Design
            </span>
            , so. That means{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-50 ">
              I can create beautiful and functional websites
            </span>
            . I&apos;m always looking for new opportunities to learn and grow.
          </motion.p>

          <motion.div variants={item} className="mb-12 flex flex-wrap gap-4">
            <AvailabilityIndicator available={false} />
            <motion.a
              href="mailto:dprihadisetiawan@gmail.com"
              className="dark-blue:bg-[#1e2d3c] dark-blue:hover:bg-[#263c4e] dark-blue:text-white flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">✉</span> Email Me
            </motion.a>
          </motion.div>
          <motion.div variants={item}>
            <AnimatedBeamDemoClient />
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

          <motion.div variants={item} className="mb-12">
            <p className="mb-4">
              You can check these <span className="text-blue-400">links</span>{" "}
              if you wish to
            </p>

            <div className="flex flex-wrap gap-2">
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* <Link
                  href="#"
                  className="dark-blue:bg-[#1e2d3c] dark-blue:hover:bg-[#263c4e] dark-blue:text-white flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  <Twitter className="mr-2 h-4 w-4" /> Twitter
                </Link> */}
              </motion.div>
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  target="_blank"
                  href="https://github.com/yaboidimsum"
                  className="dark-blue:bg-[#1e2d3c] dark-blue:hover:bg-[#263c4e] dark-blue:text-white flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  <Github className="mr-2 h-4 w-4" /> Github
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/dimas-prihady-setyawan-47a66821a/"
                  className="dark-blue:bg-[#1e2d3c] dark-blue:hover:bg-[#263c4e] dark-blue:text-white flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  <Linkedin className="mr-2 h-4 w-4" /> Linkedin
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  target="_blank"
                  href="https://drive.google.com/file/d/18fWSuodXeFskMawdTBTcBlo3ICyi5CFr/view?usp=sharing"
                  className="dark-blue:bg-[#1e2d3c] dark-blue:hover:bg-[#263c4e] dark-blue:text-white flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  <FileText className="mr-2 h-4 w-4" /> Resume
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* <Link
                  href="#"
                  className="dark-blue:bg-[#1e2d3c] dark-blue:hover:bg-[#263c4e] dark-blue:text-white flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  <MessageSquare className="mr-2 h-4 w-4" /> Discord
                </Link> */}
              </motion.div>
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* <Link
                  href="#"
                  className="dark-blue:bg-[#1e2d3c] dark-blue:hover:bg-[#263c4e] dark-blue:text-white flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  <Send className="mr-2 h-4 w-4" /> Telegram
                </Link> */}
              </motion.div>
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* <Link
                  href="#"
                  className="dark-blue:bg-[#1e2d3c] dark-blue:hover:bg-[#263c4e] dark-blue:text-white flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  <Bookmark className="mr-2 h-4 w-4" /> Peerfist
                </Link> */}
              </motion.div>
            </div>
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
