"use client";

import Reveal from "@/components/Reveal";
import PrimaryButton from "@/components/PrimaryButton";
import HeroScribble from "@/components/HeroScribble";
// Falls deine Datei anders heißt, ändere den Import:
// import GeoDodecaWire from "@/components/GeoWire";
import GeoDodecaWire from "@/components/GeoWire";

export default function HomeHero() {
  return (
    <section
      className="
        relative
        w-screen left-1/2 right-1/2 -mx-[50vw]   /* full-bleed Hero */
        min-h-[100svh] flex items-center justify-center text-center
        pb-16 md:pb-24
      "
    >
      {/* dezenter, animierter Dodekaeder rechts */}
      <GeoDodecaWire />

      {/* Scribble nur innerhalb des Heros */}
      <HeroScribble />

      {/* Inhalt */}
      <div className="mx-auto max-w-4xl px-4">
        <Reveal>
          <h1 className="font-outfit text-[clamp(2.4rem,5vw+1rem,5rem)] leading-[1.05] font-bold tracking-tight">
            Bist du schon,<br />
            <span className="font-extrabold">wer</span>{" "}
            <span className="font-light">Du sein willst?</span>
          </h1>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-5 mx-auto max-w-2xl text-neutral-400">
            ://web/bin/ich ist die Agentur, die aus Ihrem Unternehmen ein
            Kraftpaket im Internet formt. Ihr Potenzial im Internet ist größer,
            als es Ihre Zahlen zeigen – wer könnten Sie im Web sein?
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton href="/kontakt">://WEB/BERATUNG/</PrimaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
