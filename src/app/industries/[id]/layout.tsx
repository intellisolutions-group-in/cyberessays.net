const INDUSTRY_IDS = [
  "saas",
  "healthcare",
  "fintech",
  "education",
  "retail",
  "manufacturing",
  "energy",
  "logistics",
  "proptech",
  "automotive",
  "media",
] as const;

export function generateStaticParams() {
  return INDUSTRY_IDS.map((id) => ({ id }));
}

export default function IndustryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
