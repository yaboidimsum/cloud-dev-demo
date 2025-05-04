"use client"

import Link from "next/link"
import { Copy, Twitter } from "lucide-react"
import { motion } from "framer-motion"

export default function Arts() {
  const artProjects = [
    {
      id: 1,
      title: "Database With REST API",
      description: "A Presentation of a Database with a REST API",
      hasDetails: true,
    },
    {
      id: 2,
      title: "ShadCn UI",
      description: "Installation design inspired by shadcn tweet.",
      hasDetails: false,
    },
    {
      id: 3,
      title: "Glowing Keyboard",
      description: "Keyboard which glows on hover",
      hasDetails: true,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
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
  }

  return (
    <div className="max-w-4xl mx-auto pt-8">
      <div className="mb-12">
        <motion.h1
          className="text-3xl font-bold tracking-wider mb-2 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          ARTs
        </motion.h1>
        <motion.p
          className="text-gray-500 dark:text-gray-500 light:text-gray-600 dark-blue:text-gray-400 text-sm mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          by LegionInDev
        </motion.p>

        <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
          {artProjects.map((project) => (
            <motion.div key={project.id} className="mb-8" variants={item}>
              <motion.div
                className="bg-gray-100 dark:bg-gray-900 dark-blue:bg-[#192734] rounded-lg overflow-hidden"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
              >
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 dark-blue:text-gray-400">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 dark-blue:hover:bg-[#1e2d3c] rounded"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Copy className="w-4 h-4" />
                    </motion.button>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="#"
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 dark-blue:hover:bg-[#1e2d3c] rounded flex items-center space-x-1"
                      >
                        <Twitter className="w-4 h-4" />
                        <span className="text-xs">View</span>
                      </Link>
                    </motion.div>
                  </div>
                </div>

                {project.id === 1 && (
                  <div className="p-4 pt-0">
                    <div className="flex flex-wrap justify-center space-x-2 space-y-2 sm:space-y-0 my-4">
                      <motion.div
                        className="bg-gray-200 dark:bg-gray-800 dark-blue:bg-[#1e2d3c] px-3 py-1 rounded-full text-xs"
                        whileHover={{
                          backgroundColor: "#2a2a2a",
                          scale: 1.05,
                          transition: { type: "spring", stiffness: 300, damping: 10 },
                        }}
                      >
                        user_list
                      </motion.div>
                      <motion.div
                        className="bg-gray-200 dark:bg-gray-800 dark-blue:bg-[#1e2d3c] px-3 py-1 rounded-full text-xs"
                        whileHover={{
                          backgroundColor: "#2a2a2a",
                          scale: 1.05,
                          transition: { type: "spring", stiffness: 300, damping: 10 },
                        }}
                      >
                        task_list
                      </motion.div>
                      <motion.div
                        className="bg-gray-200 dark:bg-gray-800 dark-blue:bg-[#1e2d3c] px-3 py-1 rounded-full text-xs"
                        whileHover={{
                          backgroundColor: "#2a2a2a",
                          scale: 1.05,
                          transition: { type: "spring", stiffness: 300, damping: 10 },
                        }}
                      >
                        backlogs
                      </motion.div>
                      <motion.div
                        className="bg-gray-200 dark:bg-gray-800 dark-blue:bg-[#1e2d3c] px-3 py-1 rounded-full text-xs"
                        whileHover={{
                          backgroundColor: "#2a2a2a",
                          scale: 1.05,
                          transition: { type: "spring", stiffness: 300, damping: 10 },
                        }}
                      >
                        misc
                      </motion.div>
                    </div>

                    <motion.div
                      className="border border-gray-200 dark:border-gray-800 dark-blue:border-gray-700 rounded-lg p-6 my-4"
                      whileHover={{
                        borderColor: "#2a2a2a",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div className="text-center mb-4 text-xs">
                        <motion.span
                          className="bg-gray-200 dark:bg-gray-800 dark-blue:bg-[#1e2d3c] px-2 py-1 rounded"
                          whileHover={{
                            backgroundColor: "#2a2a2a",
                            transition: { duration: 0.2 },
                          }}
                        >
                          Data exchange using a customized REST API
                        </motion.span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-full max-w-xs h-24 relative">
                          {/* Curved lines connecting nodes */}
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <div className="w-32 h-32 border-t border-gray-400 dark:border-gray-700 dark-blue:border-gray-600 rounded-full"></div>
                          </motion.div>

                          {/* Bottom node */}
                          <motion.div
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-gray-100 dark:bg-gray-900 dark-blue:bg-[#192734] px-2 py-1 rounded-full text-xs"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 20 }}
                            whileHover={{
                              scale: 1.1,
                              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                              transition: { type: "spring", stiffness: 300, damping: 10 },
                            }}
                          >
                            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span>LegionDev</span>
                          </motion.div>

                          {/* Top right node */}
                          <motion.div
                            className="absolute top-0 right-0 flex items-center space-x-2 bg-gray-100 dark:bg-gray-900 dark-blue:bg-[#192734] px-2 py-1 rounded-full text-xs"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 20 }}
                            whileHover={{
                              scale: 1.1,
                              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                              transition: { type: "spring", stiffness: 300, damping: 10 },
                            }}
                          >
                            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span>v2_updates</span>
                          </motion.div>
                        </div>
                        <motion.div
                          className="mt-4 text-xl"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 10 }}
                        >
                          L
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {project.id === 2 && (
                  <div className="p-4 pt-0">
                    <motion.div
                      className="text-center my-4 text-gray-500 dark:text-gray-500 dark-blue:text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Registry
                    </motion.div>
                  </div>
                )}

                {project.id === 3 && (
                  <div className="p-4 pt-0">
                    <div className="grid grid-cols-12 gap-1 mt-4">
                      {["ESC", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"].map(
                        (key, i) => (
                          <motion.div
                            key={key}
                            className={`${
                              i === 0 ? "col-span-1" : "col-span-1"
                            } bg-gray-200 dark:bg-gray-800 dark-blue:bg-[#1e2d3c] text-center py-2 rounded text-xs`}
                            whileHover={{
                              backgroundColor: "#2a2a2a",
                              y: -2,
                              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                              transition: { type: "spring", stiffness: 300, damping: 10 },
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                          >
                            {key}
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
