import { useEffect } from "react";

export function useSpotlight(ref: React.RefObject<HTMLElement>, opts = { opacity: 0.7 }) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let targetX = 0, targetY = 0;

    const update = () => {
      // set CSS vars (we use px positions relative to element)
      el.style.setProperty("--spot-x", `${targetX}px`);
      el.style.setProperty("--spot-y", `${targetY}px`);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onEnter = () => el.style.setProperty("--spot-opacity", `${opts.opacity}`);
    const onLeave = () => el.style.setProperty("--spot-opacity", "0");

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, opts.opacity]);
}