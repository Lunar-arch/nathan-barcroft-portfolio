"use client";

//Component imports
import { useCallback, useRef, useState } from "react";
import Header from "./components/Header";
import EntranceOnboard from "./components/EntranceOnboard";
import TextSpotlight from "./components/TextSpotlight";
import CTAs from "./components/CTAs";
import MobileMenu from "./components/MobileMenu";

// Import GSAP
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Import GSAP plugins
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,ScrollSmoother,ScrollToPlugin,SplitText,TextPlugin);

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(open => !open), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);

  	return (
  		<>
  			<MobileMenu open={mobileMenuOpen} onClose={closeMobileMenu} triggerRef={menuToggleRef} />
  			<EntranceOnboard />
  			<div className="relative flex min-h-screen items-center justify-center bg-background font-sans">
  				<Header mobileOpen={mobileMenuOpen} onToggleMobileMenu={toggleMobileMenu} menuToggleRef={menuToggleRef} />
  				<main id="main-content" className="relative z-10 w-full max-w-5xl md:px-12 lg:px-6 px-6 py-24" tabIndex={-1}>
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
                  color="rgba(99,102,241,0.95)"
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
        </main>
      </div>
    </>
  );
}
