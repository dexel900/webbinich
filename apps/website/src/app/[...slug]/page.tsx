import pages from "@/content/pages.json";
import { notFound } from "next/navigation";

export const dynamicParams = false; // rein statisch (SSG)

export async function generateStaticParams() {
  return pages.map(p => ({ slug: p.slug.split("/") }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const path = (params.slug ?? []).join("/");
  const doc = pages.find(p => p.slug === path);
  return { title: doc ? `${doc.title} – webbinich.agency` : "webbinich.agency" };
}

export default function Page({ params }: { params: { slug?: string[] } }) {
  const path = (params.slug ?? []).join("/");
  const doc = pages.find(p => p.slug === path);
  if (!doc) return notFound();

  return (
    <article className="max-w-3xl space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold">{doc.title}</h1>
      {/* Achtung: html kommt aus JSON – nur benutzen, wenn du der Quelle vertraust */}
      <div dangerouslySetInnerHTML={{ __html: doc.html }} />
    </article>
  );
}
