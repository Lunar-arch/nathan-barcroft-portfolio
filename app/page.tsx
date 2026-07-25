"use client";

//Component imports
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Header from "./_components/Header";
import EntranceOnboard from "./_components/EntranceOnboard";
import MobileMenu from "./_components/MobileMenu";
import Hero from "./_components/Hero";
import { motion, useReducedMotion } from "motion/react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(open => !open), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [introRevealed, setIntroRevealed] = useState(reduceMotion);
  const [introComplete, setIntroComplete] = useState(reduceMotion);
  const [introSkipped, setIntroSkipped] = useState(false);
  const [progressTarget, setProgressTarget] = useState(0);
  const [progressReady, setProgressReady] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const progressTargetRef = useRef(0);
  const progressValueRef = useRef(0);
  const easeOut = [0.22, 1, 0.36, 1] as const;
  useEffect(() => {
    progressTargetRef.current = progressTarget;
  }, [progressTarget]);

  useEffect(() => {
    let rafId = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      const target = progressTargetRef.current;
      const current = progressValueRef.current;
      const next = lerp(current, target, 0.08);
      const clamped = Math.max(0, Math.min(100, next));
      const snapped = target >= 100 && clamped >= 95 ? 100 : clamped;
      progressValueRef.current = snapped;
      setProgressValue(snapped);

      if (!progressReady && target >= 100 && snapped >= 100) {
        setProgressReady(true);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [progressReady]);

  useEffect(() => {
    if (progressReady) return;
    const intervalId = window.setInterval(() => {
      setProgressTarget(prev => {
        if (prev >= 100) return prev;
        return Math.min(88, prev + 0.35);
      });
    }, 180);
    return () => window.clearInterval(intervalId);
  }, [progressReady]);

  useEffect(() => {
    let canceled = false;
    const waitForReady = async () => {
      if ("fonts" in document) {
        try {
          await (document as Document & { fonts: FontFaceSet }).fonts.ready;
        } catch {
          // Ignore font readiness errors to avoid blocking.
        }
      }
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      if (canceled) return;
      setProgressTarget(100);
    };

    const safetyTimer = window.setTimeout(() => {
      if (!canceled) setProgressTarget(100);
    }, 2600);

    waitForReady();
    return () => {
      canceled = true;
      window.clearTimeout(safetyTimer);
    };
  }, []);


  const mainAnimation = useMemo(() => {
    if (!introRevealed) {
      return { opacity: 0 };
    }
    return {
      opacity: 1,
      transition: reduceMotion || introSkipped
        ? { duration: 0 }
        : { duration: 0.45, ease: easeOut, delay: 0.02 },
    };
  }, [introRevealed, introSkipped, reduceMotion, easeOut]);

  return (
    <>
      <MobileMenu open={mobileMenuOpen} onClose={closeMobileMenu} triggerRef={menuToggleRef} />
      {!introComplete && (
        <EntranceOnboard
          ready={progressReady}
          onReveal={() => setIntroRevealed(true)}
          onComplete={() => setIntroComplete(true)}
          onSkip={() => {
            setIntroSkipped(true);
            setIntroRevealed(true);
            setIntroComplete(true);
          }}
        />
      )}
      <div className="relative flex min-h-screen items-center justify-center bg-background font-sans">
        <Header
          mobileOpen={mobileMenuOpen}
          onToggleMobileMenu={toggleMobileMenu}
          menuToggleRef={menuToggleRef}
          progress={progressValue}
          progressVisible={!progressReady}
        />
        <div
          id="spotlight-portal-root"
          className="pointer-events-none absolute inset-0 z-10"
        />
        <motion.main
          id="main-content"
          className="relative z-20 w-full max-w-5xl md:px-12 lg:px-6 px-6 py-24"
          tabIndex={-1}
          inert={!introRevealed}
          aria-hidden={!introRevealed}
          initial={{ opacity: 0 }}
          animate={mainAnimation}
        >
          <Hero />
        </motion.main>
        <div className="absolute z-10 inset-0 backdrop-blur-[48px]" />
      </div>
    </>
  );
}
