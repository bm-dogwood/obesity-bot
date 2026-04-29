// app/insurance/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insurance Coverage Guide — OBESITY.BOT",
  description:
    "What Medicare, Medicaid, and major commercial plans cover for weight-loss medication and bariatric procedures.",
  openGraph: {
    title: "Insurance Coverage Guide — OBESITY.BOT",
    description:
      "Coverage matrix for GLP-1 drugs and bariatric surgery across major U.S. payers.",
  },
};

export default function InsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
