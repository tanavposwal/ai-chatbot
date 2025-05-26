import { motion } from "framer-motion";
import { Instrument_Serif } from "next/font/google";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

export const Greeting = () => {
  return (
    <div
      key="overview"
      className={
        "max-w-3xl mx-auto md:mt-20 px-8 size-full flex flex-col justify-center " +
        serif.className
      }>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className="text-4xl">
        Hello there!
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        className="text-4xl text-zinc-500">
        How can I help you today?
      </motion.div>
    </div>
  );
};
