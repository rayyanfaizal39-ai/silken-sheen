import { seoMeta, type SeoOptions } from "@/lib/seo";
import novaCss from "./nova-cards.css?url";

export function novaHead(options: SeoOptions) {
  const seo = seoMeta(options);
  return { ...seo, links: [...seo.links, { rel: "stylesheet", href: novaCss }] };
}
