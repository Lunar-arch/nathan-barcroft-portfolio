"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "motion/react";

type EntranceOnboardProps = {
  onReveal: () => void;
  onComplete: () => void;
  onSkip: () => void;
};

export default function EntranceOnboard({ onReveal, onComplete, onSkip }: EntranceOnboardProps) {
  const reduceMotion = useReducedMotion();
  const overlayControls = useAnimation();
  const cellControls = useAnimation();
  const [visible, setVisible] = useState(true);
  const easeOut = [0.22, 1, 0.36, 1] as const;
  const easeIn = [0.4, 0, 1, 1] as const;

  const cols = 7;
  const rows = 7;
  const total = cols * rows;
  const centerIndex = Math.floor(total / 2);
  const cells = useMemo(() => Array.from({ length: total }, (_, i) => i), [total]);

  const cellVariants = {
    enter: { scale: 1, opacity: 1 },
    exit: (index: number) => ({
      scale: 0.6,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: easeIn,
        delay: Math.abs(index - centerIndex) * 0.03,
      },
    }),
  };

  useEffect(() => {
    if (reduceMotion) {
      onReveal();
      onComplete();
      setVisible(false);
      return;
    }

    let canceled = false;
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const run = async () => {
      await wait(1020);
      if (canceled) return;
      await cellControls.start("exit");
      if (canceled) return;
      onReveal();
      await overlayControls.start({ opacity: 0, transition: { duration: 0.4, ease: easeOut } });
      if (canceled) return;
      setVisible(false);
      onComplete();
    };

    run();
    return () => {
      canceled = true;
      cellControls.stop();
      overlayControls.stop();
    };
  }, [cellControls, overlayControls, onComplete, onReveal, reduceMotion]);

  const handleSkip = () => {
    cellControls.stop();
    overlayControls.stop();
    onSkip();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Intro animation"
      className="fixed inset-0 z-40 flex items-center justify-center bg-transparent"
      initial={{ opacity: 1 }}
      animate={overlayControls}
    >
      <button
        type="button"
        onClick={handleSkip}
        aria-label="Skip intro animation"
        className="sr-only focus:not-sr-only absolute top-4 right-4 z-50 rounded bg-background/80 px-3 py-2 text-sm text-foreground"
      >
        Skip intro
      </button>
      <div className="absolute inset-0 grid grid-cols-7 grid-rows-7">
        {cells.map(i => (
          <motion.div
            key={i}
            className="w-full h-full"
            style={{ backgroundColor: "var(--accent)" }}
            custom={i}
            variants={cellVariants}
            initial="enter"
            animate={cellControls}
          />
        ))}
      </div>
    </motion.div>
  );
}
