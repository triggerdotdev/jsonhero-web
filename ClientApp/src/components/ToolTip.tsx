import React, { useState } from "react";
import { motion } from "framer-motion";

export type ToolTipProps = {
  children: React.ReactNode;
  className?: string;
  arrow?: ArrowDirection;
};

export type ArrowDirection = "top" | "bottom" | "left" | "right";

export function ToolTip({ children, className, arrow }: ToolTipProps) {
  const [isShown, setIsShown] = useState(false);
  const arrowStyle = () => {
    if (!arrow) {
      return "";
    }
    switch (arrow) {
      case "top":
        return "top-[40px] after:bg-white after:border-[1px] after:border-t-slate-300 after:border-r-transparent after:border-b-transparent after:border-l-slate-300 after:dark:border-t-slate-600 after:dark:border-r-transprent after:dark:border-b-transparent after:dark:border-l-slate-600 after:dark:bg-slate-700 after:h-[14px] after:w-[14px] after:top-[-8px] after:left-[calc(50%-7px)] after:content-[''] after:absolute after:bg-white after:rotate-45";
      case "bottom":
        return "bottom-[49px] after:bg-white after:border-[1px] after:border-t-transparent after:border-r-transparent after:border-b-slate-300 after:border-l-slate-300 after:dark:border-t-transprent after:dark:border-r-transprent after:dark:border-b-slate-600 after:dark:border-l-slate-600 after:dark:bg-slate-700 after:h-[14px] after:w-[14px] after:left-[-8px] after:top-[calc(50%-7px)] after:content-[''] after:absolute after:bg-white after:rotate-45";
      case "left":
        return "left-[49px] after:bg-white after:border-[1px] after:border-t-transparent after:border-r-transparent after:border-b-slate-300 after:border-l-slate-300 after:dark:border-t-transprent after:dark:border-r-transprent after:dark:border-b-slate-600 after:dark:border-l-slate-600 after:dark:bg-slate-700 after:h-[14px] after:w-[14px] after:left-[-8px] after:top-[calc(50%-7px)] after:content-[''] after:absolute after:bg-white after:rotate-45";
      case "right":
        return "right-[49px] after:bg-white after:border-[1px] after:border-t-transparent after:border-r-transparent after:border-b-slate-300 after:border-l-slate-300 after:dark:border-t-transprent after:dark:border-r-transprent after:dark:border-b-slate-600 after:dark:border-l-slate-600 after:dark:bg-slate-700 after:h-[14px] after:w-[14px] after:left-[-8px] after:top-[calc(50%-7px)] after:content-[''] after:absolute after:bg-white after:rotate-45";
    }
  };

  return (
    <motion.div
      animate={{}}
      initial={{ scale: 0.97, opacity: 0.5 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1, opacity: 1 }}
      whileTap={{
        scale: 1,
      }}
      onMouseOver={() => setIsShown(true)}
      onMouseOut={() => setIsShown(false)}
      className={`${className} absolute flex justify-center top-0 text-center z-10 h-full w-full text-slate-800 transtition dark:text-slate-200`}
    >
      <div
        className={`absolute flex items-center ${
          isShown
            ? `${arrowStyle()} pl-3 pr-2 py-2 w-max shadow rounded-sm border-slate-300 border-[1px] bg-white dark:bg-slate-700  dark:border-slate-600`
            : ""
        }`}
      >
        {isShown && children}
      </div>
    </motion.div>
  );
}
