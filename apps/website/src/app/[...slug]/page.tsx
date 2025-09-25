import pagesJson from "@/content/pages.json";
import { notFound } from "next/navigation";

type PageDoc = { slug: string; title?: string; html?: string };
type Params = { params: { slug?: string[] } };

const pages = pagesJson as PageDoc[]; // JSON sauber typisieren

export const dynamicParams = false; // SSG

export async function generateStaticParams() {
  return pages.map(p => ({ slug: p.slug.split("/") }));
}

export function generateMetadata({ params }: Params) {
  const path = (params.slug ?? []).join("/");
  const doc = pages.find(p => p.slug === path);
  return { title: doc ? `${doc.title} | webbinich.agency` : "webbinich.agency" };
}

export default function Page({ params }: Params) {
  const path = (params.slug ?? []).join("/");
  const doc = pages.find(p => p.slug === path);
  if (!doc) return notFound();

  return (
    <article className="max-w-3xl space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold">{doc.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: doc.html ?? "" }} />
    </article>
  );
}
