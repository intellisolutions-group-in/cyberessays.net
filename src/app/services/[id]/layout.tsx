const SERVICE_IDS = [
  "ai-solutions",
  "saas-development",
  "cloud-engineering",
  "mobile-apps",
  "cybersecurity",
  "enterprise-software",
  "product-design",
  "devops",
  "cloud-migrations",
  "api-design",
] as const;

export function generateStaticParams() {
  return SERVICE_IDS.map((id) => ({ id }));
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
