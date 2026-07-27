"use client";

import { useState } from "react";
import { Github, FileText, Linkedin, ChevronDown } from "lucide-react";
import ContributionGraph from "@/components/contribution-graph";
// import ProjectCard from "@/components/project-card";
import AvailabilityIndicator from "@/components/availability-indicator";
import { motion } from "framer-motion";
import AnimatedBeamDemoClient from "@/components/animated-beam-landing-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ProjectCard from "@/components/project-card";
// import { getBlogPostList } from "./helpers/file-helpers";
import experienceData from "@/data/experience.json";
import { cn } from "@/lib/utils";

export default function Home() {
  const [showAllWork, setShowAllWork] = useState(false);
  const [expandedJobs, setExpandedJobs] = useState<number[]>([]);

  const toggleJobExpand = (index: number) => {
    setExpandedJobs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
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
            className="mb-1 tracking-tighter text-zinc-500  dark:text-zinc-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Hey! It&apos;s me 👋
          </motion.p>
          <motion.h1
            className="mb-2 text-3xl font-medium tracking-tighter"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            Awan
          </motion.h1>
          <motion.p
            className="mb-6  text-lg tracking-tighter text-zinc-500 dark:text-zinc-500"
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
            variants={item}
            className="mb-2 tracking-tighter text-zinc-400  dark:text-zinc-500"
          >
            Yup! I&apos;m a{" "}
            <span className="font-medium tracking-tighter text-zinc-800  dark:text-zinc-50">
              Frontend Developer
            </span>
            . Big deal, right? But wait, there&apos;s more! I&apos;m not just a
            developer, I&apos;m a{" "}
            <span className="font-medium tracking-tighter text-zinc-800  dark:text-zinc-50 ">
              Design Engineer
            </span>
            {/* . And if that wasn&apos;t enough, guess what? maybe{" "}
            <span className="font-medium">Freelancer</span>? Oh yeah,
            I&apos;ve got that badge too! */}
          </motion.p>

          <motion.p
            variants={item}
            className="mb-6 tracking-tighter text-zinc-400  dark:text-zinc-500"
          >
            I love both{" "}
            <span className="font-medium tracking-tighter text-zinc-800  dark:text-zinc-50 ">
              Development
            </span>{" "}
            and{" "}
            <span className="font-medium tracking-tighter text-zinc-800  dark:text-zinc-50 ">
              Design
            </span>
            , so. That means{" "}
            <span className="font-medium tracking-tighter text-zinc-800  dark:text-zinc-50 ">
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
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2 tracking-tighter">✉</span> Email Me
            </motion.a>
            <motion.a
              target="_blank"
              href="https://github.com/yaboidimsum"
              className=" flex items-center rounded-md   px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100/10 dark:border-0 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="mr-2 h-4 w-4  tracking-tighter" /> Github
            </motion.a>
            <motion.a
              target="_blank"
              href="https://www.linkedin.com/in/dimas-prihady-setyawan-47a66821a/"
              className=" flex items-center rounded-md   px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100/10 dark:border-0 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="mr-2 h-4 w-4  tracking-tighter" /> Linkedin
            </motion.a>
            <motion.a
              target="_blank"
              href="https://drive.google.com/file/d/13rLLhzWqK3bxZ6si2HfLw-zGffVKlMqn/view?usp=sharing"
              className=" flex items-center rounded-md   px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100/10 dark:border-0 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="mr-2 h-4 w-4  tracking-tighter" /> Resume
            </motion.a>
          </motion.div>
          <motion.div variants={item}>
            <AnimatedBeamDemoClient />
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <h2 className="mb-4 text-2xl font-medium  tracking-tighter">
              Experience
            </h2>
            <Tabs defaultValue="work" className="w-full">
              <TabsList className="grid w-full grid-cols-2 border-zinc-400 bg-zinc-100/70  dark:bg-zinc-900">
                <TabsTrigger
                  value="work"
                  className="tracking-tighter transition-[color,box-shadow,background-color] duration-150 ease-[var(--ease-smooth-out)]"
                >
                  Work History
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="tracking-tighter transition-[color,box-shadow,background-color] duration-150 ease-[var(--ease-smooth-out)]"
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
                            <span className="rounded-full px-2 py-1 text-xs font-medium tracking-tighter text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                              {job.workType}
                            </span>
                          </div>
                          <p className="text-sm tracking-tighter text-zinc-500">
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
                            <p className="mt-2 text-xs italic tracking-tighter text-zinc-500">
                              {job.location}
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm tracking-tighter">
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
                        className="w-full py-2.5 mt-2 text-xs font-medium tracking-tight text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md border border-zinc-200/50 dark:border-zinc-800/50 transition-colors duration-150 ease-[var(--ease-smooth-out)] active:scale-[0.98] select-none cursor-pointer"
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
            <p className="mt-4 text-center text-sm tracking-tighter text-zinc-500">
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
