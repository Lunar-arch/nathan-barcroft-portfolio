"use client";

import React, { useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface SpotlightButton2Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})` | string;
  hoverOpacity?: number; // 0-1
  focusOpacity?: number; // 0-1
  radius?: number; // px radius of spotlight
  transitionMs?: number;
}

export default function SpotlightButton2({
  children,
  className = "",
  spotlightColor = "rgba(255,255,255,0.12)",
  hoverOpacity = 0.7,
  focusOpacity = 0.85,
  radius = 160,
  transitionMs = 160,
  onMouseMove,
  onPointerMove,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: SpotlightButton2Props) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!btnRef.current || isFocused) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (onPointerMove) onPointerMove(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current || isFocused) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (onMouseMove) onMouseMove(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(true);
    setOpacity(focusOpacity);
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPosition({ x: rect.width / 2, y: rect.height / 2 });
    }
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(false);
    setOpacity(0);
    if (onBlur) onBlur(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpacity(hoverOpacity);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpacity(0);
    if (onMouseLeave) onMouseLeave(e);
  };

  const bgStyle: React.CSSProperties = {
    background: `radial-gradient(circle ${radius}px at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
    opacity,
    transition: `opacity ${transitionMs}ms ease, background-position ${transitionMs}ms ease`,
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
      className={`relative overflow-hidden cursor-pointer ${className}`}
      type={rest.type ?? "button"}
    >
      <span
        aria-hidden="true"
        style={bgStyle}
        className="absolute inset-0"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
