"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import NavSearchBarStyle from "./nav-search-bar.module.css";

export default function NavSearchBar() {
  const [activeTab, setActiveTab] = useState(TABS[0].name);
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeTabElementRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || isSearching) return;

    const container = containerRef.current;
    const activeTabElement = activeTabElementRef.current;

    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      const clipLeft = offsetLeft;
      const clipRight = offsetLeft + offsetWidth;
      container.style.clipPath = `inset(0 ${Number(
        100 - (clipRight / container.offsetWidth) * 100
      ).toFixed()}% 0 ${Number(
        (clipLeft / container.offsetWidth) * 100
      ).toFixed()}% round 17px)`;
    }
  }, [activeTab, isSearching]);

  // only animation logic
  const listVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.05,
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.05,
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <nav
      className="relative flex w-fit justify-center overflow-hidden rounded-full  bg-white py-2 will-change-transform
    "
    >
      <div className="relative flex items-center  scale-80">
        <motion.div
          layout
          // transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative flex w-[488px] flex-col items-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isSearching ? (
              <motion.div
                key="nav-links"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={listVariants}
                className="relative flex flex-col items-center"
              >
                <motion.ul
                  className={`${NavSearchBarStyle.list}`}
                  variants={listVariants}
                >
                  {TABS.map((tab) => (
                    <motion.li key={tab.name} variants={itemVariants}>
                      <button
                        ref={
                          activeTab === tab.name ? activeTabElementRef : null
                        }
                        data-tab={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`${NavSearchBarStyle.button} cursor-pointer tracking-tighter`}
                      >
                        {tab.icon}
                        {tab.name}
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>

                <div
                  aria-hidden
                  className={`${NavSearchBarStyle.clipPathContainer}`}
                  ref={containerRef}
                >
                  <ul
                    className={`${NavSearchBarStyle.list} ${NavSearchBarStyle.listOverlay} `}
                  >
                    {TABS.map((tab) => (
                      <li key={tab.name}>
                        <button
                          data-tab={tab.name}
                          onClick={() => setActiveTab(tab.name)}
                          className={`${NavSearchBarStyle.button} ${NavSearchBarStyle.buttonOverlay} cursor-pointer tracking-tighter `}
                          tabIndex={-1}
                        >
                          {tab.icon}
                          {tab.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="search-bar"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="w-full pl-2"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  spellCheck="false"
                  autoFocus
                  className="w-full rounded-full px-4 focus:outline-none"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          layout
          onClick={() => setIsSearching(!isSearching)}
          className="cursor-pointer rounded-full p-2 transition "
          aria-label={isSearching ? "Close search" : "Open search"}
        >
          <motion.div
            key={isSearching ? "x-icon" : "search-icon"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              ease: "easeInOut",
            }}
            whileTap={{ scale: 0.9 }}
            className="pr-4 text-black"
          >
            {isSearching ? <X size={20} /> : <Search size={20} />}
          </motion.div>
        </motion.button>
      </div>
    </nav>
  );
}

const TABS = [
  {
    name: "Payments",
    icon: (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M0 3.884c0-.8.545-1.476 1.306-1.68l.018-.004L10.552.213c.15-.038.3-.055.448-.055.927.006 1.75.733 1.75 1.74V4.5h.75A2.5 2.5 0 0 1 16 7v6.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 13.5V3.884ZM10.913 1.67c.199-.052.337.09.337.23v2.6H2.5c-.356 0-.694.074-1 .208v-.824c0-.092.059-.189.181-.227l9.216-1.984.016-.004ZM1.5 7v6.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-11a1 1 0 0 0-1 1Z"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M10.897 1.673 1.681 3.657c-.122.038-.181.135-.181.227v.824a2.492 2.492 0 0 1 1-.208h8.75V1.898c0-.14-.138-.281-.337-.23m0 0-.016.005Zm-9.59.532 9.23-1.987c.15-.038.3-.055.448-.055.927.006 1.75.733 1.75 1.74V4.5h.75A2.5 2.5 0 0 1 16 7v6.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 13.5V3.884c0-.8.545-1.476 1.306-1.68l.018-.004ZM1.5 13.5V7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1ZM13 10.25c0 .688-.563 1.25-1.25 1.25-.688 0-1.25-.55-1.25-1.25 0-.688.563-1.25 1.25-1.25.688 0 1.25.562 1.25 1.25Z"
        ></path>
      </svg>
    ),
  },
  {
    name: "Balances",
    icon: (
      <svg
        data-testid="primary-nav-item-icon"
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M1 2a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 1 2Zm0 8a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5A.75.75 0 0 1 1 10Zm2.25-4.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5ZM2.5 14a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 2.5 14Z"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M16 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
        ></path>
      </svg>
    ),
  },
  {
    name: "Customers",
    icon: (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M2.5 14.4h11a.4.4 0 0 0 .4-.4 3.4 3.4 0 0 0-3.4-3.4h-5A3.4 3.4 0 0 0 2.1 14c0 .22.18.4.4.4Zm0 1.6h11a2 2 0 0 0 2-2 5 5 0 0 0-5-5h-5a5 5 0 0 0-5 5 2 2 0 0 0 2 2ZM8 6.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8ZM8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        ></path>
      </svg>
    ),
  },
  {
    name: "Billing",
    icon: (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M0 2.25A2.25 2.25 0 0 1 2.25 0h7.5A2.25 2.25 0 0 1 12 2.25v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v10.851a.192.192 0 0 0 .277.172l.888-.444a.75.75 0 1 1 .67 1.342l-.887.443A1.69 1.69 0 0 1 0 13.101V2.25Z"
        ></path>
        <path
          fill="currentColor"
          d="M5 10.7a.7.7 0 0 1 .7-.7h4.6a.7.7 0 1 1 0 1.4H7.36l.136.237c.098.17.193.336.284.491.283.483.554.907.855 1.263.572.675 1.249 1.109 2.365 1.109 1.18 0 2.038-.423 2.604-1.039.576-.626.896-1.5.896-2.461 0-.99-.42-1.567-.807-1.998a.75.75 0 1 1 1.115-1.004C15.319 8.568 16 9.49 16 11c0 1.288-.43 2.54-1.292 3.476C13.838 15.423 12.57 16 11 16c-1.634 0-2.706-.691-3.51-1.64-.386-.457-.71-.971-1.004-1.472L6.4 12.74v2.56a.7.7 0 1 1-1.4 0v-4.6ZM2.95 4.25a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75ZM3.7 6.5a.75.75 0 0 0 0 1.5h4.6a.75.75 0 0 0 0-1.5H3.7Z"
        ></path>
      </svg>
    ),
  },
];
