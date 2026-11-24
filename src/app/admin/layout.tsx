import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/**
 * Layout admin.
 *
 * Sengaja TERPISAH dari layout situs publik: admin memakai permukaan
 * terang (workspace), tanpa latar 3D, tanpa animasi. Alasan: ini
 * permukaan "Operate" — yang penting kecepatan dan kejelasan angka,
 * bukan pengalaman visual. Latar kosmik di sini malah mengganggu.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-root min-h-dvh">{children}</div>;
}
