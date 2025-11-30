"use client";

import React, { useEffect, useRef } from "react";

interface TextSpotlightProps {
  text: string;
  className?: string;
  color?: string;
  /** optional radius in pixels; if omitted, computed from window width on client */
  size?: number; // px radius of spotlight
  smoothing?: number; // 0-1
}

export default function TextSpotlight({
  text,
  className = "",
  color = "rgba(99,102,241,0.95)",
  size = 220,
  smoothing = 0.16,
}: TextSpotlightProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

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
      const grad = `radial-gradient(circle ${used}px at ${currentX}px ${currentY}px, ${color} 0%, ${color} 40%, transparent 60%)`;
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
  }, [color, size, smoothing]);

  return (
    <span ref={ref} className={className} aria-hidden={false}>
      {text}
    </span>
  );
}
