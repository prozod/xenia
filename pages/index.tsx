import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Button from "../src/components/button/button.component";
import Gradients from "../src/components/gradients/gradients.component";
//test
const Hero = () => {
  const container = {
    initial: { y: "-25%", opacity: 0 },
    animate: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.25,
        delay: 0.5,
        staggerChildren: 1,
      },
    },
    exit: {
      y: "25%",
      opacity: 0,
      transition: {
        duration: 0.25,
        delayChildren: 0.15,
        staggerChildren: -1,
      },
    },
  };

  const item = {
    initial: { y: "-15%", opacity: 0 },
    animate: {
      y: "0%",
      opacity: 1,
    },
    exit: {
      y: "15%",
      opacity: 0,
    },
  };

  return (
    <div className="box flex flex-col items-start justify-center py-16 z-0 h-3/4">
      <motion.div
        className="md:w-3/6"
        variants={container}
        animate="animate"
        initial="initial"
        exit="exit"
      >
        <motion.h1 className="text-6xl font-bold leading-16" variants={item}>
          Album hoarder or just a simple music lover?
        </motion.h1>
        <motion.p className="leading-24 pt-2 text-white/60" variants={item}>
          Pick the next target for your collection, see what people are
          listening to these days
        </motion.p>
        <motion.div variants={item} className="relative flex gap-2 my-4">
          <Button.FullGradient text="Browse our albums" />
          <Button.GradientOutline text="Create free account" />
        </motion.div>
      </motion.div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Xenia | Album reviews, trending artists</title>
        <meta name="description" content="Albums and more" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Gradients />
      <Hero />
    </>
  );
};

export default Home;
