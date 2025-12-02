"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// store measured target widths without attaching properties to DOM nodes
const entranceTargetWidths = new WeakMap<HTMLElement, string>();

// Helper to check if GSAP is working properly
function isGsapAvailable(): boolean {
  try {
    // Test if GSAP can perform basic operations
    return typeof gsap !== 'undefined' && typeof gsap.set === 'function';
  } catch {
    return false;
  }
}

// CSS fallback animation function
function runCssFallbackAnimation(
  overlay: HTMLElement,
  grid: HTMLElement,
  setVisible: (v: boolean) => void
) {
  const header = document.querySelector("#site-header") as HTMLElement | null;
  const headerChildren = header ? Array.from(header.querySelectorAll("*")) : [];
  const mainEl = document.querySelector('#main-content') as HTMLElement | null;
  const cells = Array.from(grid.children) as HTMLElement[];

  // Set initial state
  overlay.style.opacity = "1";
  overlay.style.visibility = "visible";

  if (header) {
    header.style.maxWidth = "48px";
    header.style.overflow = "hidden";
    header.style.transition = "max-width 0.8s cubic-bezier(0.33, 1, 0.68, 1)";
    header.classList.remove("max-w-12");
    header.classList.add("max-w-6xl");
    headerChildren.forEach((child) => {
      if (child instanceof HTMLElement) {
        child.style.opacity = "0";
        child.style.transition = "opacity 0.45s cubic-bezier(0.33, 1, 0.68, 1)";
      }
    });
  }

  if (mainEl) {
    mainEl.setAttribute('inert', '');
    mainEl.style.opacity = "0";
    mainEl.style.visibility = "hidden";
    mainEl.style.transition = "opacity 0.45s cubic-bezier(0.33, 1, 0.68, 1), visibility 0.45s";
  }

  // Animate cells with CSS
  cells.forEach((cell, i) => {
    cell.style.transform = "scale(1)";
    cell.style.opacity = "1";
    cell.style.transition = `transform 0.6s cubic-bezier(0.33, 1, 0.68, 1) ${i * 0.03}s, opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1) ${i * 0.03}s`;
  });

  // Start animation sequence
  requestAnimationFrame(() => {
    // Expand header
    if (header) {
      header.style.maxWidth = "72rem";
    }

    // Fade in header children after short delay
    setTimeout(() => {
      headerChildren.forEach((child) => {
        if (child instanceof HTMLElement) {
          child.style.opacity = "1";
        }
      });
    }, 350);

    // Animate cells out
    setTimeout(() => {
      cells.forEach((cell) => {
        cell.style.transform = "scale(0.6)";
        cell.style.opacity = "0";
      });
    }, 120);

    // Fade in main content
    setTimeout(() => {
      if (mainEl) {
        mainEl.removeAttribute('inert');
        mainEl.style.opacity = "1";
        mainEl.style.visibility = "visible";
      }
    }, 800);

    // Hide overlay and cleanup
    setTimeout(() => {
      overlay.style.transition = "opacity 0.4s, visibility 0.4s";
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
      setTimeout(() => setVisible(false), 400);
    }, 1000);
  });
}

export default function EntranceOnboard() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  // Track if we're using CSS fallback
  const usingCssFallback = useRef(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const grid = gridRef.current;
    if (!overlay || !grid) return;

    // Respect user preference for reduced motion: skip the intro
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let canceled = false;
      const callback = () => {
        if (!canceled) setVisible(false);
      };
      const canAnimateFrame = typeof window.requestAnimationFrame === 'function';
      const handleRequest = canAnimateFrame
        ? window.requestAnimationFrame(callback)
        : window.setTimeout(callback, 0);
      return () => {
        canceled = true;
        if (canAnimateFrame && typeof window.cancelAnimationFrame === 'function') {
          window.cancelAnimationFrame(handleRequest as number);
        } else {
          window.clearTimeout(handleRequest as number);
        }
      };
    }

    // Use CSS fallback if GSAP is not available
    if (!isGsapAvailable()) {
      usingCssFallback.current = true;
      runCssFallbackAnimation(overlay, grid, setVisible);
      return;
    }

    const header = document.querySelector("#site-header");
    const headerChildren = header ? Array.from(header.querySelectorAll("*")) : [];

    // prepare grid cells
    const cells = Array.from(grid.children) as HTMLElement[];

    try {
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
            main.removeAttribute('inert');
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
      // use inert to prevent focus on hidden elements (fixes ARIA hidden focusable violation)
      const mainEl = document.querySelector('#main-content') as HTMLElement | null;
      if (mainEl) {
        mainEl.setAttribute('inert', '');
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
        if (main) main.removeAttribute('inert');
      };
    } catch {
      // GSAP failed, use CSS fallback
      console.warn("GSAP animation failed, using CSS fallback");
      usingCssFallback.current = true;
      runCssFallbackAnimation(overlay, grid, setVisible);
    }
  }, []);

  const handleSkip = () => {
    // kill timeline and hide overlay immediately
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    const overlay = overlayRef.current;
    const main = document.querySelector('#main-content') as HTMLElement | null;
    
    if (isGsapAvailable() && !usingCssFallback.current) {
      if (overlay) gsap.set(overlay, { autoAlpha: 0 });
      if (main) {
        main.removeAttribute('inert');
        // ensure main is visible immediately when skipping
        gsap.set(main, { autoAlpha: 1 });
      }
    } else {
      // CSS fallback for skip
      if (overlay) {
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
      }
      if (main) {
        main.removeAttribute('inert');
        main.style.opacity = "1";
        main.style.visibility = "visible";
      }
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
