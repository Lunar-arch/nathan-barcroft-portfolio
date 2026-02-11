"use client";

import React, { CSSProperties, useLayoutEffect, useMemo, useRef, useState } from "react";

type TailwindColorToken = {
  color: string;
  isClass?: boolean;
  mode?: "color" | "background";
};

type Swatch = {
  key: string;
  className: string;
  style?: CSSProperties;
  setRef: (el: HTMLSpanElement | null) => void;
};

const isTailwindClass = (value: string) => value.includes("bg-") || value.includes("text-");

const resolveComputedColor = (
  el: HTMLSpanElement | null,
  fallback: string,
  mode: "color" | "background"
) => {
  if (!el) return fallback;
  const styles = getComputedStyle(el);
  return mode === "background" ? styles.backgroundColor : styles.color;
};

export function useResolvedTailwindColors(tokens: TailwindColorToken[]) {
  const swatchRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [resolvedColors, setResolvedColors] = useState<string[]>(
    tokens.map(token => token.color)
  );

  useLayoutEffect(() => {
    const next = tokens.map((token, index) => {
      const usesClass = token.isClass ?? isTailwindClass(token.color);
      if (!usesClass) return token.color;
      const mode = token.mode ?? (token.color.includes("bg-") ? "background" : "color");
      return resolveComputedColor(swatchRefs.current[index], token.color, mode);
    });
    setResolvedColors(next);
  }, [tokens]);

  const swatches = useMemo<Swatch[]>(
    () =>
      tokens.map((token, index) => {
        const usesClass = token.isClass ?? isTailwindClass(token.color);
        return {
          key: `${token.color}-${index}`,
          className: usesClass ? token.color : "",
          style: !usesClass ? { color: token.color } : undefined,
          setRef: (el: HTMLSpanElement | null) => {
            swatchRefs.current[index] = el;
          },
        };
      }),
    [tokens]
  );

  return { resolvedColors, swatches };
}
