import { gsap } from "gsap";

/**
 * Check if GSAP is available and working properly for cross-browser compatibility.
 * This helps provide CSS fallback animations when GSAP fails (e.g., on Microsoft Edge).
 */
export function isGsapAvailable(): boolean {
  try {
    return typeof gsap !== "undefined" && typeof gsap.set === "function";
  } catch {
    return false;
  }
}

export { gsap };
