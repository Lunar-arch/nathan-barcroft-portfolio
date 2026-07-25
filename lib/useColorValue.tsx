"use client";

import { CSSProperties, useLayoutEffect, useRef, useState } from "react";

export type ColorMode = "background" | "color" | "border";

const PREFIXES: Record<ColorMode, string> = {
  background: "bg-",
  color: "text-",
  border: "border-",
};

const HAS_PREFIX = /^(bg|text|border|ring|from|to|via|fill|stroke|outline|decoration|ring-offset)-/i;

/**
 * Resolves a color input to a real CSS color value, no matter how it's written.
 *
 * Accepts any of these forms:
 *   - Bare Tailwind color name:  "accent", "background-secondary", "indigo-500"
 *   - Prefixed Tailwind class:   "bg-indigo-500", "text-red-300", "border-white"
 *   - Raw CSS color:             "#fff", "oklch(0.6 0.2 250)", "rgb(...)", "white"
 *
 * For Tailwind classes/names it renders a hidden swatch and reads getComputedStyle.
 * For raw CSS colors it returns the string unchanged (no swatch needed).
 *
 * The `mode` decides which CSS property to read and which prefix to add when a
 * bare color name is given:
 *   - "background" → `bg-`  → reads `backgroundColor`
 *   - "color"      → `text-` → reads `color`
 *   - "border"     → `border-` → reads `borderColor`
 *
 * Returns `{ value, className, swatch }`:
 *   - `value`: the resolved CSS color string (safe to put in inline styles)
 *   - `className`: the Tailwind class that was applied (empty for raw colors)
 *   - `swatch`: a hidden zero-size element you must render so Tailwind classes
 *     can be measured. `null` for raw CSS colors.
 */
const isRawCssColor = (value: string) => {
  const v = value.trim();
  if (HAS_PREFIX.test(v)) return false;
  // Hex, oklch(), rgb(), hsl(), color(), or a named CSS color keyword.
  return /^(#|oklch\(|rgb\(|rgba\(|hsl\(|hsla\(|color\()/i.test(v) || /^[a-z]+$/i.test(v);
};

export function useColorValue(color: string, mode: ColorMode = "background") {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState<string>(color);

  // Figure out the actual class name to measure.
  const className = (() => {
    if (isRawCssColor(color)) return ""; // raw CSS color, nothing to resolve
    if (HAS_PREFIX.test(color)) return color; // already prefixed, use as-is
    return `${PREFIXES[mode]}${color}`; // bare name, add the right prefix
  })();

  useLayoutEffect(() => {
    if (!className) {
      // Raw CSS color — pass through unchanged.
      setValue(color);
      return;
    }
    if (!ref.current) return;
    const styles = getComputedStyle(ref.current);
    const resolved =
      mode === "background"
        ? styles.backgroundColor
        : mode === "border"
          ? styles.borderColor
          : styles.color;
    setValue(resolved);
  }, [className, mode, color]);

  const swatch = className ? (
    <span
      ref={ref}
      aria-hidden
      className={className}
      style={
        {
          position: "absolute",
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: "none",
          overflow: "hidden",
          // A border style + width is required so `getComputedStyle().borderColor`
          // resolves to the actual color instead of "transparent" (browsers report
          // transparent when border-style is `none`). Doesn't affect layout since
          // the swatch is 0×0 and invisible.
          borderWidth: "1px",
          borderStyle: "solid",
        } as CSSProperties
      }
    />
  ) : null;

  return { value, className, swatch };
}