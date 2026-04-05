interface JsonLdProps {
  // We use Record broadly here so we can pass various Schema.org definitions 
  data: Record<string, unknown>; 
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
