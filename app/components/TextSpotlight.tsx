"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import { useResolvedTailwindColors } from "../../lib/useResolvedTailwindColors";

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

export default function TextSpotlight({
  text,
  className = "",
  colors,
  size = 300,
  smoothing = 0.03,
}: TextSpotlightProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const normalizedColors = useMemo<ColorStop[]>(() => {
    if (colors && colors.length > 0) return colors;
    return [
      { color: "rgba(99,102,241,0.95)", percent: "40%" },
      { color: "transparent", percent: "60%" },
      { color: "transparent", percent: "80%" },
    ];
  }, [colors]);

  const colorTokens = useMemo(
    () => normalizedColors.map(color => ({ color: color.color, isClass: color.isClass })),
    [normalizedColors]
  );
  const { resolvedColors, swatches } = useResolvedTailwindColors(colorTokens);

  useLayoutEffect(() => {
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

    const setCenter = () => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      targetX = centerX;
      targetY = centerY;
      currentX = centerX;
      currentY = centerY;
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
        .map((c, i) => `${resolvedColors[i] ?? c.color} ${c.percent}`)
        .join(", ");
      const grad = `radial-gradient(circle ${used}px at ${currentX}px ${currentY}px, ${stops})`;
      el.style.backgroundImage = grad;

      requestAnimationFrame(render);
    };

    const onPointer = (e: PointerEvent) => updateTarget(e.clientX, e.clientY);
    const onMouse = (e: MouseEvent) => updateTarget(e.clientX, e.clientY);
    const onEnter = (e: PointerEvent) => updateTarget(e.clientX, e.clientY);

    window.addEventListener("pointermove", onPointer);
    window.addEventListener("mousemove", onMouse);
    el.addEventListener("pointerenter", onEnter);

    setCenter();

    // start loop
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("mousemove", onMouse);
      el.removeEventListener("pointerenter", onEnter);
    };
  }, [normalizedColors, resolvedColors, size, smoothing]);

  return (
    <span className="relative inline-flex">
      {swatches.map(swatch => (
        <span
          key={swatch.key}
          ref={swatch.setRef}
          className={`${swatch.className} sr-only`}
          style={swatch.style}
          aria-hidden="true"
        />
      ))}
      <span ref={ref} className={className} aria-hidden={false}>
        {text}
      </span>
    </span>
  );
}
