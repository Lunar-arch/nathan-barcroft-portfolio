"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// store measured target widths without attaching properties to DOM nodes
const entranceTargetWidths = new WeakMap<HTMLElement, string>();

export default function EntranceOnboard() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const grid = gridRef.current;
    if (!overlay || !grid) return;

    // Respect user preference for reduced motion: skip the intro
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return;
    }

    const header = document.querySelector("#site-header");
    const headerChildren = header ? Array.from(header.querySelectorAll("*")) : [];

    // prepare grid cells
    const cells = Array.from(grid.children) as HTMLElement[];

    gsap.set(overlay, { autoAlpha: 1 });
    if (header && header instanceof HTMLElement) {

      const targetWidth = "72rem"; // Tailwind max-w-6xl

      gsap.set(header, { maxWidth: "48px", overflow: "hidden" });
      header.classList.remove("max-w-12");
      header.classList.add("max-w-6xl");
      gsap.set(headerChildren, { opacity: 0 });

      // store target in WeakMap instead of attaching to the element
      entranceTargetWidths.set(header, targetWidth);
    }
    gsap.set(cells, { scale: 1, opacity: 1 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        const main = document.querySelector('#main-content') as HTMLElement | null;
        if (main) {
          main.removeAttribute('aria-hidden');
        }
        gsap.to(overlay, { autoAlpha: 0, duration: 0.4, onComplete: () => setVisible(false) });
      },
    });
    tlRef.current = tl;

    // animate header expansion using maxWidth (from 12px to measured width)
    if (header && header instanceof HTMLElement) {
      const targetWidth = entranceTargetWidths.get(header) || "72rem";
      tl.to(header, { maxWidth: targetWidth, duration: 0.8, ease: "power2.out" })
        .to(headerChildren, { opacity: 1, duration: 0.45, stagger: 0.06 }, "-=.35");
    }

    // while overlay is visible, hide the main content from assistive tech
    const mainEl = document.querySelector('#main-content') as HTMLElement | null;
    if (mainEl) {
      mainEl.setAttribute('aria-hidden', 'true');
      // start main visually hidden; we'll fade it in after the grid animation
      gsap.set(mainEl, { autoAlpha: 0 });
    }

    // staggered exit of grid squares: scale down and fade
    tl.to(cells, {
      scale: 0.6,
      opacity: 0,
      duration: 0.6,
      stagger: { each: 0.03, from: "center" },
      ease: "power2.in",
    }, ">+0.12");

    // fade main content in after the grid squares have animated out
    if (mainEl) {
      tl.to(mainEl, { autoAlpha: 1, duration: 0.45, ease: "power2.out" }, ">+0.02");
    }
	header?.classList.remove("max-w-12");

    return () => {
      tl.kill();
      const main = document.querySelector('#main-content') as HTMLElement | null;
      if (main) main.removeAttribute('aria-hidden');
    };
  }, []);

  const handleSkip = () => {
    // kill timeline and hide overlay immediately
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    const overlay = overlayRef.current;
    if (overlay) gsap.set(overlay, { autoAlpha: 0 });
    const main = document.querySelector('#main-content') as HTMLElement | null;
    if (main) {
      main.removeAttribute('aria-hidden');
      // ensure main is visible immediately when skipping
      gsap.set(main, { autoAlpha: 1 });
    }
    setVisible(false);
  };

  if (!visible) return null;

  // build 7x7 grid
  const cols = 7;
  const rows = 7;
  const total = cols * rows;
  const cells = Array.from({ length: total }, (_, i) => i);

  return (
    <div ref={overlayRef} role="dialog" aria-modal="true" aria-label="Intro animation" className="fixed inset-0 z-40 flex items-center justify-center bg-transparent">
      <button
        type="button"
        onClick={handleSkip}
        aria-label="Skip intro animation"
        className="sr-only focus:not-sr-only absolute top-4 right-4 z-50 rounded bg-background/80 px-3 py-2 text-sm text-foreground"
      >
        Skip intro
      </button>
      <div ref={gridRef} className="absolute inset-0 grid grid-cols-7 grid-rows-7">
        {cells.map((i) => (
          <div
            key={i}
            className="w-full h-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
        ))}
      </div>
    </div>
  );
}
