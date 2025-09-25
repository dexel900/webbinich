"use client";
import { useEffect, useRef } from "react";

/**
 * HeroScribble
 * - Zeichnet die Linie NUR innerhalb des Elternelements.
 * - Kein Prop nötig. Einfach <HeroScribble /> in eine relative Section legen.
 */
export default function HeroScribble() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastMove = useRef<number>(0);

  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const points = useRef<{ x: number; y: number }[]>(
    Array.from({ length: 24 }, () => ({ x: 0, y: 0 }))
  );

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !svg.parentElement) return;

    const host = svg.parentElement; // ⬅️ Elternelement (dein Hero)
    let w = host.clientWidth;
    let h = host.clientHeight;

    const centerAll = () => {
      const cx = w / 2;
      const cy = h / 2;
      target.current = { x: cx, y: cy };
      pos.current = { x: cx, y: cy };
      points.current = points.current.map(() => ({ x: cx, y: cy }));
    };
    centerAll();

    const onMove = (e: MouseEvent) => {
      lastMove.current = performance.now();
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      target.current.x = Math.min(Math.max(0, x), r.width);
      target.current.y = Math.min(Math.max(0, y), r.height);
    };

    const ro = new ResizeObserver(() => {
      w = host.clientWidth;
      h = host.clientHeight;
      centerAll();
    });

    host.addEventListener("mousemove", onMove, { passive: true });
    ro.observe(host);

    let t = 0;
    const tick = () => {
      const now = performance.now();
      const idle = now - lastMove.current > 1200;

      if (idle) {
        const cx = w / 2;
        const cy = h / 2;
        const rX = Math.min(w, h) * 0.18;
        const rY = Math.min(w, h) * 0.10;
        target.current.x = cx + rX * Math.cos(t * 0.9);
        target.current.y = cy + rY * Math.sin(t * 1.3);
        t += 0.016;
      }

      pos.current.x = lerp(pos.current.x, target.current.x, 0.18);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.18);

      points.current.pop();
      points.current.unshift({ x: pos.current.x, y: pos.current.y });

      const path = pathRef.current;
      if (path) {
        const d =
          "M " +
          points.current
            .map((p, i) => (i === 0 ? `${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
            .join(" ");
        path.setAttribute("d", d);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      host.removeEventListener("mousemove", onMove);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      width="100%"
      height="100%"
    >
      <defs>
        <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        ref={pathRef}
        d="M 0 0"
        stroke="var(--accent, #FF8A00)"
        strokeWidth={6}
        strokeLinecap="round"
        fill="none"
        filter="url(#hero-glow)"
        opacity="0.85"
      />
    </svg>
  );
}
