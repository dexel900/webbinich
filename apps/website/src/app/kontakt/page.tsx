import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export default function Kontakt() {
  return (
    <section className="space-y-6">
      <Reveal><h1 className="text-3xl font-bold">Kontakt</h1></Reveal>
      <Reveal delay={0.05}><ContactForm /></Reveal>
    </section>
  );
}
