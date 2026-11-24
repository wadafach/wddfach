import { CosmicBackground } from "@/components/three/CosmicBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SettingsPanel } from "@/components/layout/SettingsPanel";
import { CartDrawer } from "@/components/layout/CartDrawer";

/**
 * Kerangka halaman publik.
 * Latar 3D ada di sini, sekali, supaya tidak ada canvas kedua yang
 * dibangun saat navigasi antar halaman.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CosmicBackground />
      <Header />
      <main id="main" className="relative">
        {children}
      </main>
      <Footer />
      <SettingsPanel />
      <CartDrawer />
    </>
  );
}
