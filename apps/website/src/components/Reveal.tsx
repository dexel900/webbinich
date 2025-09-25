"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Reveal({
  children,
  y = 16,           // Startverschiebung
  delay = 0,        // Verzögerung in s
}: { children: React.ReactNode; y?: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
