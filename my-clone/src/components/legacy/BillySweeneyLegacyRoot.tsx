export function BillySweeneyLegacyRoot({ html }: { html: string }) {
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
