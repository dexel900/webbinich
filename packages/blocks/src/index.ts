export type FAQItem = { q: string; a: string };
export function renderFAQ(items: FAQItem[]): string {
  return `<section>${items.map(i => `<dt>${i.q}</dt><dd>${i.a}</dd>`).join('')}</section>`;
}
