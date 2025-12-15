"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { Check } from "lucide-react";
import Image from "next/image";

type ButtonState = "idle" | "loading" | "success";

export default function TwitterRefreshTimeline() {
  const [buttonState, setButtonState] = useState<ButtonState>("idle");

  const animations = {
    enter: { y: 20, opacity: 0, filter: "blur(4px)" },
    center: { y: 0, opacity: 1, filter: "blur(0px)" },
    exit: { y: -20, opacity: 0, filter: "blur(4px)" },
  };

  const buttonCopy: Record<ButtonState, React.ReactNode> = {
    idle: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="25"
        viewBox="0 0 19 25"
        fill="none"
        className="h-5 w-5"
      >
        <path
          d="M7.95483 23.25C7.95483 23.9404 8.51448 24.5 9.20483 24.5C9.89519 24.5 10.4548 23.9404 10.4548 23.25L9.20483 23.25L7.95483 23.25ZM10.0887 0.366116C9.60056 -0.122039 8.8091 -0.122039 8.32095 0.366117L0.365999 8.32107C-0.122157 8.80922 -0.122157 9.60068 0.365999 10.0888C0.854154 10.577 1.64561 10.577 2.13377 10.0888L9.20483 3.01777L16.2759 10.0888C16.7641 10.577 17.5555 10.577 18.0437 10.0888C18.5318 9.60068 18.5318 8.80922 18.0437 8.32107L10.0887 0.366116ZM9.20483 23.25L10.4548 23.25L10.4548 1.25L9.20483 1.25L7.95483 1.25L7.95483 23.25L9.20483 23.25Z"
          fill="white"
        />
      </svg>
    ),
    loading: <Spinner size={24} color="#fff" speed={0.35} />,
    success: <Check className="h-6 w-6 text-white" />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.button
        onMouseOver={() => {
          // This code is just a placeholder
          setButtonState("loading");

          setTimeout(() => {
            setButtonState("success");
          }, 1750);

          setTimeout(() => {
            setButtonState("idle");
          }, 3500);
        }}
      >
        <motion.div
          layout
          className={`flex w-[266.82px] items-center justify-center gap-4 rounded-full bg-[#1D9BF0] px-6 py-2 ${
            buttonState !== "idle" ? "h-16" : ""
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={buttonState}
              variants={animations}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", duration: 0.35, bounce: 0.3 }}
              className="h-6 w-6"
            >
              {buttonCopy[buttonState] || buttonCopy.idle}
            </motion.span>
          </AnimatePresence>

          <div className="flex items-center justify-center">
            <div className="flex -space-x-6">
              {buttonState !== "idle" ? (
                ""
              ) : (
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={"profile-1"}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative z-30 h-12 w-12 rounded-full ring-2 ring-[#1D9BF0]"
                  >
                    <Image
                      fill
                      src="https://images.genius.com/4d7a3bfcf312d0fe2fcbdff4064c449d.1000x1000x1.jpg"
                      alt="Joji"
                      className="rounded-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    key={"profile-2"}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative z-30 h-12 w-12 rounded-full ring-2 ring-[#1D9BF0]"
                  >
                    <Image
                      fill
                      src="https://scontent-cgk2-2.cdninstagram.com/v/t51.2885-19/435274715_400251902639425_2568560913834926441_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby45NTguYzIifQ&_nc_ht=scontent-cgk2-2.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2QHiB53Fzp7oR-pPcBQo0o4cyri3K2w-BcnhYBxImRK9G514dsY3cdNQD7iiGTBB02Y&_nc_ohc=1VDI48C_hTwQ7kNvwFjYRYT&_nc_gid=YbO4Hf72NpAzwxEgd6J7Kg&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfjyDN0wWqHTrZ_6_T3ls2l998kLCLt4AAu-SMIsA_JGWw&oe=691789E1&_nc_sid=7a9f4b"
                      alt="Paige"
                      className="rounded-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    key={"profile-3"}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative z-30 h-12 w-12 rounded-full ring-2 ring-[#1D9BF0]"
                  >
                    <Image
                      fill
                      src="https://i.scdn.co/image/ab67616d0000b273b9c93163c53545df6182e7ef"
                      alt="Claire"
                      className="rounded-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>

          <motion.span
            initial={{ filter: "blur(4px)", opacity: 0, y: 5 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            exit={{ filter: "blur(4px)", opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            key={buttonState}
            layout
            className="text-lg font-medium text-white"
          >
            {buttonState === "loading"
              ? "updating timeline"
              : buttonState === "success"
              ? "timeline updated"
              : "posted"}
          </motion.span>
        </motion.div>
      </motion.button>
    </AnimatePresence>
  );
}
