// app/providers/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provider Finder — OBESITY.BOT",
  description:
    "Locate accredited bariatric centers, endocrinologists, and obesity-medicine specialists by zip code.",
  openGraph: {
    title: "Provider Finder — OBESITY.BOT",
    description:
      "Search obesity-medicine specialists, endocrinologists, and bariatric centers by zip.",
  },
};

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
