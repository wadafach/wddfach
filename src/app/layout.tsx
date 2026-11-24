import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-face",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://wddfach.vercel.app"),
  title: {
    default: "wddfach — UI/UX Designer, 3D Artist, Game Concept Designer",
    template: "%s — wddfach",
  },
  description:
    "Portofolio wddfach: desain antarmuka, asset 3D, dan konsep senjata untuk game. Terbuka untuk proyek desain.",
  keywords: [
    "UI UX designer",
    "3D artist",
    "jasa desain",
    "konsep senjata",
    "game concept art",
    "portofolio desainer",
    "wddfach",
  ],
  authors: [{ name: "wddfach" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "wddfach",
    title: "wddfach — UI/UX · 3D · Game Concept",
    description: "Portofolio wddfach: desain antarmuka, asset 3D, dan konsep senjata untuk game.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04050a",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <a href="#main" className="skip-link">
          Lewati ke konten
        </a>
        {children}
      </body>
    </html>
  );
}
