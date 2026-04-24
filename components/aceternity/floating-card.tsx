"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FloatingCard({
  children,
  delay = 0,
  className = "",
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
