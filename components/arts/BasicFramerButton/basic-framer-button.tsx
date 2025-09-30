"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "./Spinner";
import BasicFramerButton from "./basic-frammer-button.module.css";

const animations = {
  enter: { y: -20, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
};

const buttonCopy = {
  idle: "Cancel Subscription",
  loading: <Spinner size={16} color="rgba(255, 255, 255, 0.65)" />,
  success: "Nice Try :)",
} as const;

type ButtonState = keyof typeof buttonCopy; // "idle" | "loading" | "success"

export default function SmoothButton() {
  const [buttonState, setButtonState] = useState<ButtonState>("idle");

  return (
    <div className={`${BasicFramerButton.outerWrapper}`}>
      <button
        className={`${BasicFramerButton.blueButton} ease active:scale-97 transform cursor-pointer duration-150`}
        disabled={buttonState !== "idle"}
        onClick={() => {
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
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={buttonState}
            variants={animations}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
          >
            {buttonCopy[buttonState]}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
