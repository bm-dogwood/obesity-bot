// app/statistics/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "State Atlas — OBESITY.BOT",
  description:
    "CDC adult obesity prevalence rates across 50 U.S. states with longitudinal context and disparity analysis.",
  openGraph: {
    title: "State Atlas — OBESITY.BOT",
    description: "CDC obesity statistics by state, ranked and visualized.",
  },
};

export default function StatisticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
