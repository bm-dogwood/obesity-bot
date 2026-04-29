// app/treatments/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treatment Comparison — OBESITY.BOT",
  description:
    "Side-by-side analysis of dietary protocols, bariatric surgery, and GLP-1 receptor agonists. Efficacy, monthly cost, side effects.",
  openGraph: {
    title: "Treatment Comparison — OBESITY.BOT",
    description:
      "Compare diet, surgery, and GLP-1 drugs by efficacy, cost, and risk.",
  },
};

export default function TreatmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
