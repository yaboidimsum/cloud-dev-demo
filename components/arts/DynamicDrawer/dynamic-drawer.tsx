"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";
import DynamicDrawerStyle from "./dynamic-drawer.module.css";

export default function DynamicDrawer() {
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [ref, bounds] = useMeasure();

  return (
    <div
      className={`flex flex-col items-center  justify-center gap-4 text-zinc-800`}
    >
      <button
        className={`${DynamicDrawerStyle.button} active:scale-85 ease w-fit scale-90 cursor-pointer font-semibold duration-150`}
        onClick={() => setShowExtraContent((b) => !b)}
      >
        {showExtraContent ? "Hide Extra" : " Show Extra"}
      </button>
      <motion.div
        className={`${DynamicDrawerStyle.element} `}
        animate={{ height: bounds.height ? bounds.height : "auto" }}
        transition={{ type: "spring", duration: 0.25, bounce: 0.2 }}
      >
        <div ref={ref} className={`${DynamicDrawerStyle.inner}`}>
          <h1>Blonde (Sunday 1994)</h1>
          <p>
            You found someone new this summer and I&apos;ve got the luck of a suicide
            bomber
          </p>
          {showExtraContent ? (
            <p>
              You knew me and all my friends but our love drowned in the River
              Thames
            </p>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
