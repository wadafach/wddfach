import type { Metadata } from "next";
import { CheckoutPage } from "@/components/site/CheckoutPage";

export const metadata: Metadata = {
  title: "Pembayaran",
  description: "Selesaikan pesananmu — bayar lewat QRIS, DANA, atau transfer BCA.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CheckoutPage />;
}
