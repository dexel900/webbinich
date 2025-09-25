import Link from "next/link";

/**
 * PrimaryButton – Webbinich-CTA
 * - Orange Pill mit rechter schwarzer Kreisfläche + ».
 * - Hover: Nur der schwarze Kreis (hinter dem Pfeil) skaliert bis zur Vollfläche.
 *          Pfeil bleibt unverändert (eigene Ebene), Border bleibt orange, Text wird orange.
 */
export default function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`
        group relative inline-flex items-center justify-start
        rounded-full border-2
        px-8 pr-24 py-4
        text-sm font-semibold uppercase tracking-[0.12em]
        overflow-hidden                     /* wachsenden Kreis sauber clippen */
        select-none transition-colors duration-300
      `}
      style={{
        borderColor: "var(--accent, #FF8A00)",
        background: "var(--accent, #FF8A00)",
        color: "#000",
      }}
    >
      {/* Label (wird auf Hover orange) */}
      <span className="
  relative z-30 font-opensans
  transition-colors duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)]
  group-hover:text-[var(--accent,#FF8A00)]
">
        {children}
      </span>

      {/* WACHsender schwarzer Kreis OHNE Icon (liegt unter Pfeil & Label) */}
      <span
        className={`
          pointer-events-none absolute right-2 top-1/2 -translate-y-1/2
    h-12 w-12 rounded-full bg-black z-10
    transform-gpu will-change-transform
    transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)]
    group-hover:scale-[20]         /* füllt die gesamte Pill */
        `}
        aria-hidden
      />

      {/* Pfeil – EIGENE Ebene, skaliert NICHT */}
      <span
        className={`
          pointer-events-none
          absolute right-2 top-1/2 -translate-y-1/2
          grid h-12 w-12 place-items-center rounded-full
          z-40
          text-[var(--accent,#FF8A00)] text-xl leading-none
        `}
        aria-hidden
      >
        »
      </span>
    </Link>
  );
}
