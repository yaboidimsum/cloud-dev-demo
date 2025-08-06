"use client";

import { Github, FileText, Linkedin } from "lucide-react";
import ContributionGraph from "@/components/contribution-graph";
// import ProjectCard from "@/components/project-card";
import AvailabilityIndicator from "@/components/availability-indicator";
import { motion } from "framer-motion";
import AnimatedBeamDemoClient from "@/components/animated-beam-landing-client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ProjectCard from "@/components/project-card";
// import { getBlogPostList } from "./helpers/file-helpers";
import experienceData from "@/data/experience.json";

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
            className="dark-blue:text-gray-400 mb-6 text-lg text-gray-500 dark:text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* @cloudimss */}
            Based in Surabaya, Indonesia{" "}
            <Image
              src="/indo-flag.png"
              alt="Indonesia"
              width={30}
              height={40}
              className="ml-1 inline-block"
            />
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
            <AvailabilityIndicator available={true} />
            <motion.a
              href="mailto:dprihadisetiawan@gmail.com"
              className=" flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">✉</span> Email Me
            </motion.a>
            <motion.a
              target="_blank"
              href="https://github.com/yaboidimsum"
              className=" flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="mr-2 h-4 w-4" /> Github
            </motion.a>
            <motion.a
              target="_blank"
              href="https://www.linkedin.com/in/dimas-prihady-setyawan-47a66821a/"
              className=" flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="mr-2 h-4 w-4" /> Linkedin
            </motion.a>
            <motion.a
              target="_blank"
              href="https://drive.google.com/file/d/13rLLhzWqK3bxZ6si2HfLw-zGffVKlMqn/view?usp=sharing"
              className=" flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="mr-2 h-4 w-4" /> Resume
            </motion.a>
          </motion.div>
          <motion.div variants={item}>
            <AnimatedBeamDemoClient />
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">Experience</h2>
            <Tabs defaultValue="work" className="w-full">
              <TabsList className="grid w-full grid-cols-2 dark:bg-zinc-900">
                <TabsTrigger
                  value="work"
                  className="transition-all duration-300 ease-in-out "
                >
                  Work History
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="transition-all duration-300 ease-in-out "
                >
                  Education
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="work"
                className="mt-4 transition-opacity duration-500 ease-in-out data-[state=active]:opacity-100 data-[state=inactive]:opacity-0"
              >
                <div className="space-y-4">
                  {experienceData.workHistory.map((job, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{job.title}</h3>
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-zinc-900 dark:text-gray-200">
                          {job.workType}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {job.company} • {job.period}
                      </p>
                      <p className="text-xs italic text-gray-500">
                        {job.location}
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                        {job.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent
                value="education"
                className="mt-4 transition-opacity duration-500 ease-in-out data-[state=active]:opacity-100 data-[state=inactive]:opacity-0"
              >
                <div className="space-y-4">
                  {experienceData.education.map((edu, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <h3 className="font-semibold">{edu.institution}</h3>
                      <p className="text-sm text-gray-500">
                        {edu.degree} • {edu.period}
                      </p>
                      <p className="text-xs italic text-gray-500">
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
            </Tabs>
            <p className="mt-4 text-center text-sm text-gray-500">
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
