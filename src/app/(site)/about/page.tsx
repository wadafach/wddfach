import type { Metadata } from "next";
import { AboutPage } from "@/components/site/AboutPage";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "wddfach — desainer UI/UX, 3D artist, dan game concept designer. Cara kerja, alat yang dipakai, dan cara menghubungi.",
};

export default function Page() {
  return <AboutPage />;
}
