import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Panel Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  const configured = Boolean(process.env.ADMIN_PASSWORD);
  return <AdminShell passwordConfigured={configured} />;
}
