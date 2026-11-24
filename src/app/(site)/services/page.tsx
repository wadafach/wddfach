import type { Metadata } from "next";
import { ServicesPage } from "@/components/site/ServicesPage";

export const metadata: Metadata = {
  title: "Jasa & Produk",
  description:
    "Jasa desain UI/UX, asset 3D game-ready, dan konsep senjata. Harga mulai dari Rp 95.000. Bayar QRIS, DANA, atau BCA.",
};

export default function Page() {
  return <ServicesPage />;
}
