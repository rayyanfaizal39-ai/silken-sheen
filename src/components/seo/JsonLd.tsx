// Renders a JSON-LD structured-data block. Safe to render anywhere in the
// tree (Google reads JSON-LD from the full document, not just <head>) and
// safe under SSR/hydration since the content is a pure function of static
// input data — server and client always produce identical JSON.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
