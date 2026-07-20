type SeoJsonLdProps = {
  jsonLd: unknown;
};

export default function SeoJsonLd({ jsonLd }: SeoJsonLdProps) {
  return (
    <script type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </script>
  );
}
