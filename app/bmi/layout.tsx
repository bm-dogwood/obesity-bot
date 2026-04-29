// app/bmi/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator — OBESITY.BOT",
  description:
    "Compute Body Mass Index with health risk stratification across CDC and WHO frameworks. Includes waist-to-height ratio.",
  openGraph: {
    title: "BMI Calculator — OBESITY.BOT",
    description:
      "BMI calculator with categorical risk assessment using CDC and WHO frameworks.",
  },
};

export default function BmiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
