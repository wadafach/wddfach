import type { Metadata } from "next";
import { HomeHero } from "@/components/site/home/Hero";
import { HomeWork } from "@/components/site/home/HomeWork";
import { HomeDisciplines } from "@/components/site/home/Disciplines";
import { HomeProcess } from "@/components/site/home/Process";
import { HomeCta } from "@/components/site/home/Cta";
import { HomeServices } from "@/components/site/home/HomeServices";
import { WeaponShowcase } from "@/components/site/home/WeaponShowcase";

export const metadata: Metadata = {
  title: "wddfach — UI/UX · 3D · Game Concept",
  description:
    "Portofolio wddfach: desain antarmuka, asset 3D game-ready, dan konsep senjata. Jasa desain terbuka untuk proyek.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeWork />
      <WeaponShowcase />
      <HomeDisciplines />
      <HomeServices />
      <HomeProcess />
      <HomeCta />
    </>
  );
}
