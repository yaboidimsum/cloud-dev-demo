"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Check } from "lucide-react";

export default function MergeCards() {
  const [merged, setMerged] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showBorder, setShowBorder] = useState(false);

  // Border delay after merge
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (merged) {
      timer = setTimeout(() => setShowBorder(true), 500);
    } else {
      setShowBorder(false);
    }
    return () => clearTimeout(timer);
  }, [merged]);

  return (
    <div
      className="relative flex w-full flex-col items-center"
      onMouseEnter={() => {
        if (!completed) setCompleted(true); // Trigger on hover
      }}
    >
      {/* Spinner + Morph container */}
      <motion.div
        className="absolute z-20 flex items-center justify-center overflow-visible rounded-full p-4 will-change-transform"
        style={{
          width: 40,
          height: 40,
          top: "50%",
          transform: "translateY(-50%)",
        }}
        animate={{
          backgroundColor: completed ? "#22c55e" : "#ffffff",
          border: completed ? "#e4e4e7" : "",
        }}
        transition={{
          backgroundColor: { duration: 0.6, ease: "easeInOut" },
        }}
      >
        <AnimatePresence>
          {!completed && (
            <motion.div
              key="spinner"
              className="absolute rounded-full border-[3px] border-blue-500/40 border-t-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)] will-change-transform"
              style={{ width: 40, height: 40 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              exit={{ opacity: 0, scale: 0.6, borderColor: "#22c55e" }}
              transition={{
                opacity: { duration: 0.5, ease: "easeOut" },
                scale: { duration: 0.5, ease: "easeOut" },
                rotate: { repeat: Infinity, duration: 1.2, ease: "linear" },
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key="arrows"
              className="relative flex items-center overflow-visible"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* <motion.div
                className="relative"
                initial={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeIn" }}
              >
                <ArrowUp className="h-3 w-3 text-blue-500" />
              </motion.div> */}

              <motion.div
                className="relative"
                initial={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeIn" }}
              >
                <ArrowDown className="h-6 w-6 text-blue-500" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="check"
              className="relative"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
                delay: 0.15,
              }}
              onAnimationStart={() => setMerged(true)}
            >
              <Check className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- Card Wrapper --- */}
      <motion.div
        className="pointer-events-none relative flex flex-col items-center transition-all will-change-transform duration-300"
        style={{ backgroundColor: "transparent", overflow: "visible" }}
        animate={{
          boxShadow: merged
            ? "0 8px 20px rgba(0,0,0,0.12)"
            : "0 0 0 rgba(0,0,0,0)",
          borderRadius: merged ? 12 : 0,
        }}
        transition={{
          boxShadow: { delay: merged ? 0.25 : 0, duration: 0.35 },
          borderRadius: { duration: 0.3 },
        }}
      >
        {/* --- Top Card --- */}
        <motion.div
          className={`relative w-[340px] bg-white p-4 transition-all will-change-transform duration-300 ${
            showBorder ? "border-b border-zinc-200" : ""
          }`}
          initial={{
            borderRadius: 12,
            boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
          }}
          animate={{
            borderBottomLeftRadius: merged ? 0 : 12,
            borderBottomRightRadius: merged ? 0 : 12,
          }}
          transition={{
            borderRadius: { duration: 0.25, ease: "easeInOut" },
          }}
        >
          <div className="flex justify-between">
            <div>
              <div className="justi flex items-center gap-2">
                <svg viewBox="7.056000232696533 3 37.35095977783203 45" className="w-4 h-4">
                  <g
                    xmlns="http://www.w3.org/2000/svg"
                    clipPath="url(#paypal__a)"
                  >
                    <path
                      fill="#002991"
                      d="M38.914 13.35c0 5.574-5.144 12.15-12.927 12.15H18.49l-.368 2.322L16.373 39H7.056l5.605-36h15.095c5.083 0 9.082 2.833 10.555 6.77a9.687 9.687 0 0 1 .603 3.58z"
                    />
                    <path
                      fill="#60CDFF"
                      d="M44.284 23.7A12.894 12.894 0 0 1 31.53 34.5h-5.206L24.157 48H14.89l1.483-9 1.75-11.178.367-2.322h7.497c7.773 0 12.927-6.576 12.927-12.15 3.825 1.974 6.055 5.963 5.37 10.35z"
                    />
                    <path
                      fill="#008CFF"
                      d="M38.914 13.35C37.31 12.511 35.365 12 33.248 12h-12.64L18.49 25.5h7.497c7.773 0 12.927-6.576 12.927-12.15z"
                    />
                  </g>
                </svg>
                <p className="font-semibold tracking-tighter">PayPal</p>

                <div className="flex h-4 w-4"></div>
              </div>
              <p className="text-xs tracking-tighter text-gray-400">10:07 AM (UTC-8)</p>
            </div>
            <p className="font-semibold tracking-tighter">-$15.00</p>
          </div>
        </motion.div>

        {/* Gap */}
        <motion.div
          className="will-change-transform"
          initial={{ height: 16 }}
          animate={{ height: merged ? 0 : 16 }}
          transition={{
            delay: merged ? 0.2 : 0,
            type: "spring",
            damping: 16,
            stiffness: 120,
          }}
        />

        {/* --- Bottom Card --- */}
        <motion.div
          className={`relative w-[340px] bg-white p-4 transition-all will-change-transform duration-300 ${
            showBorder ? "border-t border-zinc-200" : ""
          }`}
          initial={{
            borderRadius: 12,
            boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
          }}
          animate={{
            borderTopLeftRadius: merged ? 0 : 12,
            borderTopRightRadius: merged ? 0 : 12,
          }}
          transition={{
            borderRadius: { duration: 0.25, ease: "easeInOut" },
          }}
        >
          <div className="flex justify-between">
            <div>
              <div className="flex justify-center items-center gap-2">
                <svg
                  className="w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="63"
                  height="16"
                  viewBox="0 0 63 16"
                >
                  <g fill="none" fillRule="evenodd">
                    <path fill="#FFF" fillOpacity=".01" d="M0 0h63v16H0z" />
                    <g transform="translate(0 1.143)">
                      <ellipse
                        cx="6.811"
                        cy="6.857"
                        fill="#00AED6"
                      fillRule="nonzero"
                        rx="6.811"
                        ry="6.857"
                      />
                      <path
                        fill="#FFF"
                        d="M10.778 6.644a1.587 1.587 0 0 0-1.652-1.5H4.824a.285.285 0 0 1-.284-.286c0-.158.127-.286.284-.286h4.359a1.362 1.362 0 0 0-.993-1.26 10.97 10.97 0 0 0-3.84 0 1.82 1.82 0 0 0-1.362 1.526 13.711 13.711 0 0 0 0 4.06 1.92 1.92 0 0 0 1.552 1.526 19.13 19.13 0 0 0 4.748 0 1.669 1.669 0 0 0 1.317-1.44c.14-.772.199-1.556.173-2.34zm-1.413.96v.254a.285.285 0 0 1-.284.286.285.285 0 0 1-.284-.286v-.254a.427.427 0 0 1 .284-.746.427.427 0 0 1 .284.746z"
                      />
                    </g>
                    <g fill="#000" fillRule="nonzero">
                      <path d="M18.937 11.414a2.921 2.921 0 0 0 2.545 1.252c1.187 0 2.059-.763 2.059-1.8v-.547h-.029c-.65.64-1.537.974-2.444.922a3.955 3.955 0 0 1-3.513-1.94 4.012 4.012 0 0 1-.037-4.033 3.956 3.956 0 0 1 3.478-2.002 3.39 3.39 0 0 1 2.516.892h.029V3.41h2.03v7.428c0 2.159-1.7 3.656-4.089 3.656a4.87 4.87 0 0 1-4.06-1.814l1.515-1.266zm4.519-4.622c0-.863-.973-1.655-2.059-1.655-1.373 0-2.288.835-2.288 2.087-.04.594.18 1.175.605 1.588a1.995 1.995 0 0 0 1.597.557c1.187 0 2.145-.748 2.145-1.684v-.893zM30.916 3.194c2.474 0 4.276 1.77 4.276 4.03 0 2.26-1.802 4.031-4.276 4.031a4.005 4.005 0 0 1-3.692-1.935 4.063 4.063 0 0 1 0-4.191 4.005 4.005 0 0 1 3.692-1.935zm0 1.87a2.152 2.152 0 0 0-2.13 2.17 2.152 2.152 0 0 0 2.15 2.15 2.152 2.152 0 0 0 2.14-2.16 2.075 2.075 0 0 0-.605-1.562 2.045 2.045 0 0 0-1.555-.597zM36.29 3.41h2.03v.676h.03a3.359 3.359 0 0 1 2.444-.892c2.18.04 3.928 1.828 3.932 4.023.004 2.196-1.738 3.99-3.918 4.038-.86.02-1.7-.265-2.373-.806h-.029v3.829H36.29V3.41zm4.176 1.67c-1.116 0-2.06.791-2.06 1.655v.964c0 .922.916 1.684 2.073 1.684a2.145 2.145 0 0 0 2.131-2.158 2.145 2.145 0 0 0-2.144-2.146zM48.803 6.49c1.387-.187 1.802-.388 1.802-.777 0-.504-.53-.806-1.344-.806a1.79 1.79 0 0 0-1.888 1.367l-2.002-.417c.286-1.555 1.874-2.663 3.832-2.663 2.216 0 3.59 1.137 3.59 2.993v4.852H50.89v-.835h-.03a3.117 3.117 0 0 1-2.559 1.051c-1.673 0-2.83-.921-2.83-2.275 0-1.425.943-2.159 3.331-2.49zm1.973.806h-.028c-.187.274-.587.432-1.616.62-1.244.23-1.687.474-1.687.92 0 .461.372.663 1.172.663 1.216 0 2.16-.562 2.16-1.296v-.907zM56.82 10.622L53.317 3.41h2.331l2.302 4.98h.028l2.274-4.98h2.345L57.35 14.278h-2.331z" />
                    </g>
                  </g>
                </svg>
                <p className="font-semibold tracking-tighter">Gopay</p>
              </div>

              <p className="text-xs tracking-tighter text-gray-400">12:07 AM (UTC+7)</p>
            </div>
            <p className="font-semibold tracking-tighter text-green-600">+Rp249.885,00</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
