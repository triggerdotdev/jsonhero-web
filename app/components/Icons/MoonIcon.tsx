import { motion } from "framer-motion";
import { transition } from "../../utilities/animationConstants";

export const MoonIcon = () => {
  const variants = {
    initial: { scale: 0.6, rotate: 90 },
    animate: { scale: 1, rotate: 0, transition },
    whileTap: { scale: 0.95, rotate: 15 },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 50 50"
      key="moon"
    >
      <motion.path
        d="M 43.81 29.354 C 43.688 28.958 43.413 28.626 43.046 28.432 C 42.679 28.238 42.251 28.198 41.854 28.321 C 36.161 29.886 30.067 28.272 25.894 24.096 C 21.722 19.92 20.113 13.824 21.683 8.133 C 21.848 7.582 21.697 6.985 21.29 6.578 C 20.884 6.172 20.287 6.022 19.736 6.187 C 10.659 8.728 4.691 17.389 5.55 26.776 C 6.408 36.163 13.847 43.598 23.235 44.451 C 32.622 45.304 41.28 39.332 43.816 30.253 C 43.902 29.96 43.9 29.647 43.81 29.354 Z"
        fill="currentColor"
        initial="initial"
        animate="animate"
        whileTap="whileTap"
        variants={variants}
      />
    </motion.svg>
  );
};
