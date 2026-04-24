"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`relative w-full min-w-0 max-w-full ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}
