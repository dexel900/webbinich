"use client";
import { useEffect, useRef, useState } from "react";

/**
 * SideScroller (dezent)
 * - kleiner Ring rechts oben
 * - zeigt Scrollfortschritt
 * - Klick = 25% weiter
 * - Draggen = proportional scrollen
 * - kein innerer Punkt
 */
export default function SideScroller() {
  const [show, setShow] = useState(false);
  const [p, setP] = useState(0);
  const dragging = useRef(false);

  const compute = () => {
    const vh = window.innerHeight;
    const sh = document.documentElement.scrollHeight;
    const st = window.scrollY;
    const max = Math.max(1, sh - vh);
    setP(Math.min(1, Math.max(0, st / max)));
    setShow(sh > vh * 1.05);
  };

  useEffect(() => {
    compute();
    const onScroll = () => compute();
    const onResize = () => compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const ratio = e.clientY / window.innerHeight;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: max * Math.min(1, Math.max(0, ratio)) });
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  if (!show) return null;

  // Geometrie
  const size = 44;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * p;

  return (
    <button
      aria-label="Scroll-Handle (ziehen/klicken)"
      onPointerDown={(e) => {
        dragging.current = true;
        const ratio = e.clientY / window.innerHeight;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: max * Math.min(1, Math.max(0, ratio)) });
      }}
      onClick={(e) => {
        e.preventDefault();
        window.scrollBy({ top: window.innerHeight * 0.25, behavior: "smooth" });
      }}
      className="
        fixed right-4 top-4 z-[100001]
        grid place-items-center
        h-11 w-11 rounded-full
        bg-black/45 backdrop-blur-md
        border border-white/10
        shadow-[0_8px_26px_rgba(0,0,0,0.35)]
        transition hover:bg-black/55 active:scale-[0.98]
      "
      style={{ color: "var(--accent, #FF8A00)" }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Hintergrund-Ring (dezent) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="white"
          strokeOpacity={0.15}
          strokeWidth={stroke}
          fill="none"
        />
        {/* Fortschritt in Akzentfarbe */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>
    </button>
  );
}
