"use client";
import Link from "next/link";
import Image from "next/image";

/**
 * WEBBINICH Header
 * - fixed oben, zentriert
 * - "Glass Pill" mit Blur + weichem Shadow
 * - links Logo, rechts ein oranger CTA
 * - nur die Pill ist klickbar (pointer-events), Rest des Bildschirms bleibt frei
 */
export default function Header() {
  return (
    // Wrapper: fixed + pointer-events disabled (damit nichts blockiert)
    <div
      id="wb-header"
      role="banner"
      aria-label="Site header"
      className="
        absolute left-0 right-0 top-[var(--wb-top,0px)] z-[100000] pointer-events-none
      "
    >
      {/* GLASS PILL: pointer-events wieder an, damit man klicken kann */}
      <div
        className="
          wb-pill pointer-events-auto relative mx-auto flex max-w-[var(--wb-pill-max,650px)]
          items-center justify-between gap-3 rounded-full
          border-0 px-3.5 py-1.5
          shadow-[0_26px_60px_rgba(0,0,0,0.18),0_8px_22px_rgba(0,0,0,0.10)]
          backdrop-blur-[16px] backdrop-saturate-[160%]
        "
        // Hintergrund (leichtes "Glas"-Gradient)
        style={{
          background:
            "linear-gradient(to bottom right, rgba(255,255,255,0.86), rgba(255,255,255,0.62))",
        }}
      >
        {/* LOGO (klicke zur Startseite) */}
        <Link
          href="/"
          aria-label="Zur Startseite"
          className="wb-logo inline-flex items-center gap-2 no-underline"
        >
          {/* Wenn du die Datei im /public hast, nimm src='/logo_signatur.webp' */}
          <Image
            src="/logo_signatur.webp"
            alt="webbinich"
            width={130}
            height={24}
            className="h-6 w-auto"
            // Fallback: falls die lokale Datei noch nicht existiert, nimm externe URL:
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.src =
                "https://webbinich.agency/wp-content/uploads/2025/09/logo_signatur.webp";
            }}
            priority
          />
        </Link>

        {/* ACTIONS rechts: nur 1 CTA */}
        <nav className="wb-actions ml-auto flex items-center gap-2" aria-label="Primary actions">
          <Link
            href="/kontakt"
            className="
              wb-cta inline-flex items-center gap-4 rounded-full border-0
              bg-[var(--wb-accent,#ff9500)] px-3.5 py-2 text-[11px] font-semibold uppercase
              tracking-[1px] text-black no-underline
              transition-transform duration-150
              active:translate-y-[0px] hover:-translate-y-[1px]
            "
          >
            {/* Label */}
            <span className="wb-cta__label">://kontakt/</span>

            {/* Icon-Bubble */}
            <span
              className="
                wb-cta__icon grid h-[30px] w-[30px] place-items-center rounded-full
                bg-black text-[24px] font-light leading-none text-[var(--wb-accent,#ff9500)]
                pb-[3px]
              "
              aria-hidden
            >
              »
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
