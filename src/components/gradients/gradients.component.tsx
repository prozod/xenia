import { AnimatePresence, motion } from "framer-motion";

const blurBgAnimation = {
  initial: {},
  animate: {
    transition: {
      duration: 0,
      delayChildren: 0.25,
      staggerChildren: 1,
    },
  },
  exit: {
    transition: {
      duration: 0.05,
      delay: 5,
      delayChildren: 0.25,
      staggerChildren: -1,
    },
  },
};

const linesBgAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: { opacity: 0 },
};

const blurGradient1Animation = {
  initial: {
    opacity: 0,
    filter: "grayscale(100%), blur(50px)",
  },
  animate: {
    opacity: 0.8,
    filter: "grayscale(0%), blur(0px)",
  },
  exit: {
    opacity: 0,
    filter: "grayscale(100%), blur(50px)",
  },
};
const blurGradient2Animation = {
  initial: {
    opacity: 0,
    filter: "grayscale(100%), blur(15px)",
    x: "20%",
  },
  animate: {
    opacity: 0.8,
    filter: "grayscale(0%), blur(0px)",
    x: "0%",
  },
  exit: {
    opacity: 0,
    filter: "grayscale(100%), blur(15px)",
    x: "20%",
  },
};

function Gradients() {
  return (
    <motion.div
      key="grainybg"
      className="bg w-screen h-screen bg-primary-800 bg-cover absolute inset-0 overflow-hidden"
      variants={blurBgAnimation}
      animate="animate"
      initial="initial"
      exit="exit"
    >
      <motion.div
        key="tablelines"
        className="lines absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-primary-900/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5"
        variants={linesBgAnimation}
      ></motion.div>
      <motion.div
        key="purplegradient"
        className="purple-gradient w-screen h-screen bg-cover bg-transparent absolute left-[30%] md:inset-0"
        variants={blurGradient1Animation}
      ></motion.div>
      <motion.div
        key="pinkgradient"
        className="pink-gradient w-screen h-screen bg-transparent bg-cover absolute left-[-60%] top-[20%] blur-2xl md:inset-0 transition-all"
        variants={blurGradient2Animation}
      ></motion.div>
    </motion.div>
  );
}

export default Gradients;
