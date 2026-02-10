"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

interface TextSpotlightProps {
  text: string;
  className?: string;
  colors?: ColorStop[];
  size?: number; // px radius of spotlight
  smoothing?: number; // 0-1
}
type ColorStop = {
  color: string;
  percent: `${number}%`;
  isClass?: boolean;
};

const isTailwindClass = (value: string) => value.includes("bg-") || value.includes("text-");

const resolveComputedColor = (el: HTMLSpanElement | null, fallback: string, mode: "color" | "background") => {
  if (!el) return fallback;
  const styles = getComputedStyle(el);
  return mode === "background" ? styles.backgroundColor : styles.color;
};

export default function TextSpotlight({
  text,
  className = "",
  colors,
  size = 300,
  smoothing = 0.16,
}: TextSpotlightProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const swatchRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const normalizedColors = useMemo<ColorStop[]>(() => {
    if (colors && colors.length > 0) return colors;
    return [
      { color: "rgba(99,102,241,0.95)", percent: "40%" },
      { color: "transparent", percent: "60%" },
      { color: "transparent", percent: "80%" },
    ];
  }, [colors]);

  const [resolved, setResolved] = useState<string[]>(
    normalizedColors.map(c => c.color)
  );

  useLayoutEffect(() => {
    const next = normalizedColors.map((c, i) => {
      const usesClass = c.isClass ?? isTailwindClass(c.color);
      if (!usesClass) return c.color;
      const mode = c.color.includes("bg-") ? "background" : "color";
      return resolveComputedColor(swatchRefs.current[i], c.color, mode);
    });
    setResolved(next);
  }, [normalizedColors]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // style needed for bg-clip to show background inside text
    el.style.backgroundRepeat = "no-repeat";
    el.style.webkitBackgroundClip = "text";
    el.style.backgroundClip = "text";
    el.style.color = "transparent";

    let targetX = -9999;
    let targetY = -9999;
    let currentX = targetX;
    let currentY = targetY;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const updateTarget = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      // position relative to element
      targetX = clientX - rect.left;
      targetY = clientY - rect.top;
    };

    // compute effective size on client if caller didn't provide one
    let effectiveSize = size;
    if (!effectiveSize && typeof window !== "undefined") {
      effectiveSize = Math.round(Math.max(120, window.innerWidth / 2));
    }

    const render = () => {
      currentX = lerp(currentX, targetX, smoothing);
      currentY = lerp(currentY, targetY, smoothing);

      const used = effectiveSize ?? 220;
      const stops = normalizedColors
        .map((c, i) => `${resolved[i] ?? c.color} ${c.percent}`)
        .join(", ");
      const grad = `radial-gradient(circle ${used}px at ${currentX}px ${currentY}px, ${stops})`;
      el.style.backgroundImage = grad;

      requestAnimationFrame(render);
    };

    const onPointer = (e: PointerEvent) => updateTarget(e.clientX, e.clientY);
    const onMouse = (e: MouseEvent) => updateTarget(e.clientX, e.clientY);

    window.addEventListener("pointermove", onPointer);
    window.addEventListener("mousemove", onMouse);

    // start loop
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [normalizedColors, resolved, size, smoothing]);

  return (
    <span className="relative inline-flex">
      {normalizedColors.map((c, i) => {
        const usesClass = c.isClass ?? isTailwindClass(c.color);
        return (
          <span
            key={`${c.color}-${i}`}
            ref={el => {
              swatchRefs.current[i] = el;
            }}
            className={`${usesClass ? c.color : ""} sr-only`}
            style={!usesClass ? { color: c.color } : undefined}
            aria-hidden="true"
          />
        );
      })}
      <span ref={ref} className={className} aria-hidden={false}>
        {text}
      </span>
    </span>
  );
}
