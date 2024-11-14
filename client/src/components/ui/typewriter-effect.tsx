"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";

// Define props type for TypewriterEffect
interface TypewriterEffectProps {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
  style?: React.CSSProperties; // Add this to allow custom styles
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  className,
  cursorClassName,
  style, // Accept custom styles
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { display: "inline-block", opacity: 1, width: "fit-content" },
        { duration: 0.3, delay: stagger(0.2), ease: "easeInOut" }
      );
    }
  }, [isInView]);

  const renderWords = () => (
    <motion.div ref={scope} className="inline">
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block mr-2">
          {word.text.map((char, index) => (
            <motion.span
              initial={{}}
              key={`char-${index}`}
              style={{ color: "#c1ff72", fontFamily: "'Anton', sans-serif" }}
              className={cn(`opacity-0 hidden`, word.className)}
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.div>
  );

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-4xl lg:text-6xl font-bold text-center",
        className
      )}
      style={style} // Apply custom styles here
    >
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
