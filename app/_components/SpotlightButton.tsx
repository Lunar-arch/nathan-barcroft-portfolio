"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useResolvedTailwindColors } from "@/lib/useResolvedTailwindColors";
import { cn } from "@/lib/utils";

interface Position {
  x: number;
  y: number;
}

interface SpotlightButton2Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})` | string;
  haloColor?: `rgba(${number}, ${number}, ${number}, ${number})` | string;
  haloRadius?: number; // px radius of halo
  haloOpacity?: number; // 0-1
  haloTransitionMs?: number;
  portalId?: string;
  hoverOpacity?: number; // 0-1
  focusOpacity?: number; // 0-1
  radius?: number; // px radius of spotlight
  transitionMs?: number;
  smoothing?: number; // 0-1
}

export default function SpotlightButton({
  children,
  className = "",
  spotlightColor = "rgba(255,255,255,0.12)",
  haloColor = "rgba(99,102,241,0.25)",
  haloRadius = 140,
  haloOpacity = 0.8,
  haloTransitionMs = 700,
  portalId = "spotlight-portal-root",
  hoverOpacity = 0.7,
  focusOpacity = 0.85,
  radius = 160,
  transitionMs = 160,
  smoothing = 0.18,
  onMouseMove,
  onPointerMove,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: SpotlightButton2Props) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const bgRef = useRef<HTMLSpanElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [opacity, setOpacity] = useState<number>(0);
  const [haloActive, setHaloActive] = useState(false);
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const [haloPosition, setHaloPosition] = useState<Position>({ x: 0, y: 0 });
  const targetRef = useRef<Position>({ x: -9999, y: -9999 });
  const currentRef = useRef<Position>({ x: -9999, y: -9999 });
  const colorTokens = useMemo(
    () => [{ color: spotlightColor }, { color: haloColor }],
    [spotlightColor, haloColor]
  );
  const { resolvedColors, swatches } = useResolvedTailwindColors(colorTokens);
  const resolvedSpotlightColor = resolvedColors[0] ?? spotlightColor;
  const resolvedHaloColor = resolvedColors[1] ?? haloColor;

  const updateHaloPosition = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setHaloPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  const setSpotlightCenter = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const center = { x: rect.width / 2, y: rect.height / 2 };
    targetRef.current = center;
    currentRef.current = center;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!btnRef.current || isFocused) return;
    const rect = btnRef.current.getBoundingClientRect();
    targetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (onPointerMove) onPointerMove(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current || isFocused) return;
    const rect = btnRef.current.getBoundingClientRect();
    targetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (onMouseMove) onMouseMove(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(true);
    setOpacity(focusOpacity);
    setHaloActive(true);
    updateHaloPosition();
    setSpotlightCenter();
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      targetRef.current = { x: rect.width / 2, y: rect.height / 2 };
    }
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(false);
    setOpacity(0);
    setHaloActive(false);
    if (onBlur) onBlur(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpacity(hoverOpacity);
    setHaloActive(true);
    updateHaloPosition();
    setSpotlightCenter();
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpacity(0);
    targetRef.current = { x: -9999, y: -9999 };
    setHaloActive(false);
    if (onMouseLeave) onMouseLeave(e);
  };

  useEffect(() => {
    setPortalNode(document.getElementById(portalId));
  }, [portalId]);

  useLayoutEffect(() => {
    setSpotlightCenter();
  }, []);

  useEffect(() => {
    if (!haloActive) return;
    updateHaloPosition();
    const onResize = () => updateHaloPosition();
    const onScroll = () => updateHaloPosition();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [haloActive]);

  useLayoutEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    let rafId = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const render = () => {
      const target = targetRef.current;
      const current = currentRef.current;

      current.x = lerp(current.x, target.x, smoothing);
      current.y = lerp(current.y, target.y, smoothing);

      const grad = `radial-gradient(circle ${radius}px at ${current.x}px ${current.y}px, ${resolvedSpotlightColor}, transparent 70%)`;
      el.style.backgroundImage = grad;

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [radius, resolvedSpotlightColor, smoothing]);

  const bgStyle: React.CSSProperties = {
    opacity,
    transition: `opacity ${transitionMs}ms ease`,
    pointerEvents: "none",
  };

  const haloStyle: React.CSSProperties = {
    position: "fixed",
    left: `${haloPosition.x}px`,
    top: `${haloPosition.y}px`,
    width: `${haloRadius * 2}px`,
    height: `${haloRadius * 2}px`,
    transform: `translate(-50%, -50%) scale(${haloActive ? 1 : 0.65})`,
    opacity: haloActive ? haloOpacity : 0,
    transition: `opacity ${haloTransitionMs}ms ease, transform ${haloTransitionMs}ms ease`,
    backgroundImage: `radial-gradient(circle ${haloRadius}px at center, ${resolvedHaloColor}, transparent 70%)`,
    pointerEvents: "none",
  };

  return (
    <button
      {...rest}
      ref={btnRef}
      onPointerMove={handlePointerMove}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden cursor-pointer", className)}
      type={rest.type ?? "button"}
    >
      {swatches.map((swatch) => (
        <span
          key={swatch.key}
          ref={swatch.setRef}
          className={`${swatch.className} sr-only`}
          style={swatch.style}
          aria-hidden="true"
        />
      ))}
      <span
        aria-hidden="true"
        ref={bgRef}
        style={bgStyle}
        className="absolute inset-0"
      />
      <span className="contents">{children}</span>
      {portalNode &&
        createPortal(
          <span aria-hidden="true" style={haloStyle} />,
          portalNode
        )}
    </button>
  );
}