"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { features } from "@/contents/page/freelance/content";
import { cn } from "@/lib/utils";

const cardVariants = ["custom-design", "performance", "mobile-responsive", "accessibility"] as const;

export default function FeaturesSection() {
  return (
    <section className="">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <div className="mb-3 text-xs uppercase tracking-widest text-foreground-secondary">
            {features.eyebrow}
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {features.heading}
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} variant={cardVariants[index]} />
          ))}
        </div>
      </div>
    </section>
  );
}

type FeatureCardVariant = (typeof cardVariants)[number];

function FeatureCard({
  feature,
  variant,
}: {
  feature: (typeof features.items)[number];
  variant: FeatureCardVariant;
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0, visible: false });
  const [progress, setProgress] = useState(0);
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const active = hovered || focused;

  useEffect(() => {
    const element = cardRef.current;

    if (!element) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      const bounds = element.getBoundingClientRect();
      setCardSize({ width: bounds.width, height: bounds.height });
    });

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      const { width, height } = entry.contentRect;
      setCardSize({ width, height });
    });

    observer.observe(element);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (variant !== "performance") {
      return;
    }

    let frame = 0;

    if (!active) {
      return undefined;
    }

    if (prefersReducedMotion) {
      frame = window.requestAnimationFrame(() => setProgress(95));
      return undefined;
    }

    const duration = 500;
    const start = performance.now();

    const animateProgress = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(95, (elapsed / duration) * 95);
      setProgress(next);

      if (next < 95) {
        frame = window.requestAnimationFrame(animateProgress);
      }
    };

    frame = window.requestAnimationFrame(animateProgress);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [active, prefersReducedMotion, variant]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (variant !== "mobile-responsive") {
      return;
    }

    const bounds = cardRef.current?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    setPointer({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      visible: true,
    });
  };

  const circleRadius = 24;
  const circleStroke = 4;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const circleOffset = circleCircumference - (progress / 100) * circleCircumference;

  return (
    <article
      ref={cardRef}
      tabIndex={0}
      onPointerEnter={() => {
        setHovered(true);
        if (variant === "performance") {
          setProgress(0);
        }
      }}
      onPointerLeave={() => {
        setHovered(false);
        setPointer((current) => ({ ...current, visible: false }));
        if (variant === "performance") {
          setProgress(0);
        }
      }}
      onPointerMove={handlePointerMove}
      onFocus={() => {
        setFocused(true);
        if (variant === "performance") {
          setProgress(0);
        }
      }}
      onBlur={() => {
        setFocused(false);
        setPointer((current) => ({ ...current, visible: false }));
        if (variant === "performance") {
          setProgress(0);
        }
      }}
      className={cn(
        "group relative isolate overflow-visible rounded-2xl border border-white/20 bg-white/5 px-4 py-5 backdrop-blur-xs transition-[border-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:border-white/30 cursor-pointer", variant == "custom-design" && "hover:border-white/10"
      )}
    >
      {variant === "custom-design" && (
        <ShimmerBorder active={active} prefersReducedMotion={prefersReducedMotion} width={cardSize.width} height={cardSize.height} />
      )}

      {variant === "performance" && (
        <motion.div
          aria-hidden
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" }}
          className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative h-[72px] w-[72px] rounded-full border border-white/15 bg-background/90 shadow-[0_0_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r={circleRadius} fill="none" stroke="currentColor" strokeWidth={circleStroke} className="text-white/15" />
              <circle
                cx="28"
                cy="28"
                r={circleRadius}
                fill="none"
                stroke="var(--success)"
                strokeLinecap="round"
                strokeWidth={circleStroke}
                strokeDasharray={circleCircumference}
                strokeDashoffset={circleOffset}
                style={{ transition: prefersReducedMotion ? "none" : "stroke-dashoffset 80ms linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-foreground">
              {Math.round(progress)}
              <span className="ml-0.5 text-[10px] font-medium text-foreground-secondary">%</span>
            </div>
          </div>
        </motion.div>
      )}

      {variant === "mobile-responsive" && active && pointer.visible && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
          <div
            className="absolute bottom-0 top-0 w-px bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.7),transparent)]"
            style={{ left: `${pointer.x}px` }}
          />
          <div
            className="absolute left-0 right-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.7),transparent)]"
            style={{ top: `${pointer.y}px` }}
          />
          <div
            className="absolute font-mono text-[8px] leading-none text-foreground"
            style={{
              left: `${Math.max(pointer.x, 18)}px`,
              top: `${Math.max(pointer.y, 18)}px`,
              transform: "translate(40%, -100%) translate(-8px, -8px)",
            }}
          >
            <div>x: {Math.round(pointer.x)}px</div>
            <div>y: {Math.round(pointer.y)}px</div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {variant === "accessibility" && active && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" }}
            className="pointer-events-none absolute top-6 z-20 inset-x-2 -translate-y-[calc(100%+10px)] overflow-hidden rounded-xl border border-white/30 bg-background-secondary px-3 py-2 font-mono text-[11px] leading-5 text-foreground"
          >
            <span className="text-foreground-secondary">&lt;button </span>
            <span className="rounded-sm bg-blue-300/20 text-foreground-secondary">aria-label=</span>
            <span className="text-foreground-secondary">&quot;Open navigation&quot;&gt;</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
          <feature.icon className="h-5 w-5 shrink-0 text-foreground" />
        </div>
        <p className="text-sm leading-6 text-foreground-secondary">{feature.body}</p>
      </div>
    </article>
  );
}

function ShimmerBorder({
  active,
  prefersReducedMotion,
}: {
  active: boolean;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={active && !prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="pointer-events-none absolute -inset-[2px] z-20 overflow-visible rounded-[18px]"
    >
      <svg
        aria-hidden
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="feature-border-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(216,180,254,0.06)" />
            <stop offset="45%" stopColor="rgba(168,85,247,0.18)" />
            <stop offset="56%" stopColor="rgba(216,180,254,1)" />
            <stop offset="66%" stopColor="rgba(168,85,247,0.9)" />
            <stop offset="76%" stopColor="rgba(168,85,247,0.12)" />
            <stop offset="100%" stopColor="rgba(216,180,254,0.06)" />
          </linearGradient>
        </defs>
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="18"
          ry="18"
          fill="none"
          stroke="url(#feature-border-purple)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.22 0.78"
          animate={active && !prefersReducedMotion ? { strokeDashoffset: -1 } : { strokeDashoffset: 0 }}
          transition={active && !prefersReducedMotion ? { duration: 2.6, repeat: Infinity, ease: "linear" } : { duration: 0.2 }}
          style={{ filter: "drop-shadow(0 0 6px rgba(168,85,247,0.55))" }}
        />
      </svg>
    </motion.div>
  );
}