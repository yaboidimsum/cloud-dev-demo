"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import MultiStepCardStyle from "./multi-step-card.module.css";

export default function MultiStepComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [directionForward, setDirectionForward] = useState(true);
  const [ref, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 className={`${MultiStepCardStyle.heading}`}>
              This is step one
            </h2>
            <p>
              This step explains why the feature exists and what it does,
              followed by a button to continue.
            </p>
            {/* <div className={`${MultiStepCardStyle.skeletons}`}>
              <div
                className={`${MultiStepCardStyle.skeleton}`}
                style={{ width: 256 }}
              />
              <div
                className={`${MultiStepCardStyle.skeleton}`}
                style={{ width: 192 }}
              />
              <div className={`${MultiStepCardStyle.skeleton}`} />
              <div
                className={`${MultiStepCardStyle.skeleton}`}
                style={{ width: 384 }}
              />
            </div> */}
          </>
        );
      case 1:
        return (
          <>
            <h2 className={`${MultiStepCardStyle.heading}`}>
              This is step two
            </h2>
            <p>
              Here we show the purpose of the feature, then provide a button to
              move forward.
            </p>
            <div className={`${MultiStepCardStyle.skeletons}`}>
              <div
                className={`${MultiStepCardStyle.skeleton}`}
                style={{ width: 256 }}
              />
              <div
                className={`${MultiStepCardStyle.skeleton}`}
                style={{ width: 192 }}
              />
              {/* <div
                className={`${MultiStepCardStyle.skeleton}`}
                style={{ width: 384 }}
              /> */}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className={`${MultiStepCardStyle.heading}`}>
              This is step three
            </h2>
            <p>
              In this step, the feature&apos;s purpose is explained, with a
              button to go to the next step.
            </p>
            {/* <div className={`${MultiStepCardStyle.skeletons}`}>
              <div
                className={`${MultiStepCardStyle.skeleton}`}
                style={{ width: 256 }}
              />
              <div
                className={`${MultiStepCardStyle.skeleton}`}
                style={{ width: 192 }}
              />
              <div
                className={`${MultiStepCardStyle.skeleton}`}
                style={{ width: 128 }}
              />
              <div
                className={`${MultiStepCardStyle.skeleton}`}
                style={{ width: 224 }}
              />
              <div
                className={`${MultiStepCardStyle.skeleton}`}
                style={{ width: 384 }}
              />
            </div> */}
          </>
        );
    }
  }, [currentStep]);

  const variants = {
    initial: (forward: boolean) => ({
      x: forward ? "-110%" : "110%",
      opacity: 0,
    }),
    exit: (forward: boolean) => ({
      x: forward ? "110%" : "-110%",
      opacity: 0,
    }),
  };

  return (
    <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
      <motion.div
        animate={{ height: bounds.height }}
        className={`${MultiStepCardStyle.multiStepWrapper} scale-80 flex min-h-fit flex-col bg-white`}
      >
        <div
          className={`${MultiStepCardStyle.multiStepInner} text-zinc-800`}
          ref={ref}
        >
          <AnimatePresence
            custom={directionForward}
            mode="popLayout"
            initial={false}
          >
            <motion.div
              key={currentStep}
              custom={directionForward}
              variants={variants}
              initial="initial"
              animate={{ x: 0, opacity: 1 }}
              exit="exit"
            >
              {content}
            </motion.div>
          </AnimatePresence>
          <motion.div
            layout
            className={`${MultiStepCardStyle.actions} scale-80`}
          >
            <button
              className={`${MultiStepCardStyle.secondaryButton} ${MultiStepCardStyle.disabledButton} ease active:scale-97 transform cursor-pointer duration-150`}
              disabled={currentStep === 0}
              onClick={() => {
                setDirectionForward(false);
                if (currentStep === 0) {
                  return;
                }

                setCurrentStep((prev) => prev - 1);
              }}
            >
              Back
            </button>
            <button
              className={`${MultiStepCardStyle.primaryButton} ${MultiStepCardStyle.disabledButton} ease active:scale-97 transform cursor-pointer duration-150`}
              disabled={currentStep === 2}
              onClick={() => {
                setDirectionForward(true);
                if (currentStep === 2) {
                  setCurrentStep(0);
                  return;
                }
                setCurrentStep((prev) => prev + 1);
              }}
            >
              Continue
            </button>
          </motion.div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
