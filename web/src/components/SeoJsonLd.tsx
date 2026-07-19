type SeoJsonLdProps = {
  jsonLd: unknown;
};

export default function SeoJsonLd({ jsonLd }: SeoJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
