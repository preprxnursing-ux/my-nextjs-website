import AnatomyVisualizer from "@/components/AnatomyVisualizer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anatomy Visualizer | Pre-NCLEX Nursing",
  description: "Interactive AI-powered human anatomy visualizer.",
};

export default function AnatomyPage() {
  return <AnatomyVisualizer />;
}
