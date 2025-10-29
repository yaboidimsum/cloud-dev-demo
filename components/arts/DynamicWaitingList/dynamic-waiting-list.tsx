"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Spinner } from "./Spinner";
import { useOnClickOutside } from "usehooks-ts";
import FeedbackPopOverStyle from "./feedback-pop-over.module.css";

export default function DynamicWaitingList() {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState("idle");
  // const [feedback, setFeedback] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setOpen(false));

  function submit() {
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1500);

    setTimeout(() => {
      setOpen(false);
    }, 3300);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter" &&
        open &&
        formState === "idle"
      ) {
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, formState]);

  return (
    <div className={`flex h-[100px] w-full items-end justify-center`}>
      <motion.button
        layoutId="wrapper"
        onClick={() => {
          setOpen(true);
          setFormState("idle");
          // setFeedback("");
        }}
        key="button"
        className={`${FeedbackPopOverStyle.feedbackButton} cursor-pointer`}
        style={{ borderRadius: 8 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      >
        <motion.span
          layoutId="title"
          className="font-semibold tracking-tight text-zinc-800"
        >
          Join Early Access
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={ref}
            layoutId="wrapper"
            className={`w-120 absolute h-72 overflow-hidden bg-white p-4 outline-1 outline-zinc-200`}
            style={{ borderRadius: 12 }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.span
              key="title"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
              className={`${
                formState == "success" ? "absolute text-white" : "text-zinc-800"
              } pl-2 font-semibold tracking-tight`}
              layoutId="title"
            >
              Save Me a Spot
            </motion.span>

            <AnimatePresence mode="popLayout">
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: -25, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                  transition={{ type: "spring", duration: 0.35, bounce: 0 }}
                  className={`${FeedbackPopOverStyle.successWrapper}`}
                  key="success"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                      fill="#2090FF"
                      fillOpacity="0.16"
                    />
                    <path
                      d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                      stroke="#2090FF"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3>You&apos;re on the List 🎉</h3>
                  <p>We&apos;ll notify you as soon as Streamlitfy is ready.</p>
                  {/* <span className="text-xs scale-75 italic text-zinc-500">
                    Our Troubles (Sunday 1994)
                  </span> */}
                </motion.div>
              ) : (
                <motion.div
                  className="bg-white pt-6 font-medium text-zinc-400"
                  exit={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submit(); // your submit logic
                    }}
                    className="flex flex-col gap-6"
                  >
                    {/* From */}
                    <motion.div
                      className="flex items-center gap-2 pl-2"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <label
                        htmlFor="user-email"
                        className="text-md w-20 tracking-tight"
                      >
                        From
                      </label>
                      <input
                        type="email"
                        id="user-email"
                        name="user-email"
                        placeholder="you@company.com"
                        className="flex-1 border-none bg-transparent tracking-tight text-zinc-800 placeholder-zinc-400 focus:outline-none"
                      />
                    </motion.div>

                    {/* To */}
                    <motion.div
                      className="flex items-center gap-2 pl-2"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <label
                        htmlFor="company-email"
                        className="text-md w-20 tracking-tight"
                      >
                        To
                      </label>
                      <input
                        type="email"
                        id="company-email"
                        name="company-email"
                        defaultValue="awan@streamlitfy"
                        readOnly
                        className="flex-1 border-none bg-transparent font-medium tracking-tight text-zinc-900 focus:outline-none"
                      />
                    </motion.div>

                    {/* Subject */}
                    <motion.div
                      className="flex items-center gap-2 pl-2"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <label
                        htmlFor="subject"
                        className="text-md w-20 tracking-tight"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        defaultValue="Add me to the Streamlitfy waitlist!"
                        readOnly
                        className="flex-1 border-none bg-transparent font-medium tracking-tight text-zinc-900 focus:outline-none"
                      />
                    </motion.div>

                    {/* Actions row */}
                    <motion.div
                      className="flex w-full items-center justify-between pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.355, ease: "easeOut" }}
                    >
                      <button
                        type="button"
                        className={`ease relative flex
                        h-10 w-fit transform
                        cursor-pointer items-center justify-center
                        overflow-hidden rounded-md border border-[rgba(255,255,255,0.08)] px-2 text-sm font-semibold duration-150 active:scale-95`}
                        onClick={() => setOpen(false)}
                      >
                        <span className="text-zinc-400">Close</span>
                      </button>

                      <button
                        type="submit"
                        className={`
                        ease
                        flex h-[24px] w-[64px] max-w-[124px] transform cursor-pointer items-center 
                        justify-center overflow-hidden rounded-md bg-gradient-to-b 
                        from-[#1994ff] to-[#157cff] 
                    text-sm font-semibold text-white
                        shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.08),0_1px_1.5px_0_rgba(0,0,0,0.32),0_0_0_0.5px_#1a94ff]
                        duration-150 active:scale-95
  `}
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            transition={{
                              type: "spring",
                              duration: 0.35,
                              bounce: 0,
                            }}
                            initial={{ opacity: 0, y: -25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 25 }}
                            key={formState}
                          >
                            {formState === "loading" ? (
                              <Spinner
                                size={14}
                                color="rgba(255, 255, 255, 0.65)"
                              />
                            ) : (
                              <span>Send</span>
                            )}
                          </motion.span>
                        </AnimatePresence>
                      </button>
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
