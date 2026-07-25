"use client";

import { useReducedMotion } from "motion/react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export function useReveal() {
  const reduceMotion = useReducedMotion();
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.6, ease: easeOut },
  } as const;
}