"use client";

//Component imports
import { useCallback, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import EntranceOnboard from "./components/EntranceOnboard";
import TextSpotlight from "./components/TextSpotlight";
import CTAs from "./components/CTAs";
import MobileMenu from "./components/MobileMenu";
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
  const easeOut = [0.22, 1, 0.36, 1] as const;

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
        />
        <motion.main
          id="main-content"
          className="relative z-10 w-full max-w-5xl md:px-12 lg:px-6 px-6 py-24"
          tabIndex={-1}
          inert={!introRevealed}
          aria-hidden={!introRevealed}
          initial={{ opacity: 0 }}
          animate={mainAnimation}
        >
          <section className="mx-auto flex flex-col-reverse items-center gap-12 md:flex-row md:items-center">
            <div className="w-full md:w-2/3">
              <p className="mb-4 text-sm font-medium text-foreground-secondary">
                <span className="text-foreground uppercase font-bold text-base">Hi, I&apos;m Nathan! </span>
                — A full stack developer with a front-end focus
              </p>
              <h1 className="mb-6 text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
                I build{' '}
                <TextSpotlight
                  text="beautiful,"
                  className="inline-block font-semibold bg-foreground-secondary/30"
                    colors={[
                      { color: "bg-blue-300", percent: "25%", isClass: true },
                      { color: "bg-indigo-600", percent: "70%", isClass: true },
                      { color: "bg-purple-700", percent: "100%", isClass: true },
                    ]}
                />{' '}
                accessible web experiences
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-7 text-foreground-secondary">
                I focus on modern React and Next.js apps with clean UI, good
                performance, and delightful UX. I&apos;m currently available for
                freelance projects and open-source collaboration.
              </p>
              <CTAs />
            </div>

            <div className="flex w-full items-center justify-center md:w-1/3">
              <div className="relative flex md:w-full md:h-auto h-48 w-48 aspect-square items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-foreground/10 to-background-secondary">
              </div>
            </div>
          </section>
        </motion.main>
      </div>
    </>
  );
}
