import type { Metadata } from "next";
import { ContactPage } from "@/components/site/ContactPage";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi wddfach untuk proyek desain UI/UX, asset 3D, atau konsep senjata.",
};

export default function Page() {
  return <ContactPage />;
}
