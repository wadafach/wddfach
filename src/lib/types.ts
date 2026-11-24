export type Locale = "id" | "en";

/** Kategori karya — sesuai tiga hal yang kamu kerjakan. */
export type WorkCategory = "uiux" | "threed" | "gameart";

export interface Work {
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  body?: Record<Locale, string>;
  category: WorkCategory;
  tags: string[];
  year: number;
  /** path di /public, mis. /works/senjata-01.jpg */
  cover: string;
  gallery?: string[];
  /** model 3D opsional — kalau ada, muncul viewer 3D di halaman detail */
  model?: string;
  featured?: boolean;
  client?: string;
  /** tools yang dipakai, ditampilkan sebagai chip */
  tools?: string[];
}

export type ProductKind = "service" | "digital";

export interface Product {
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  detail?: Record<Locale, string>;
  kind: ProductKind;
  /** harga dalam Rupiah, integer. 0 = "hubungi dulu" */
  price: number;
  /** untuk jasa: satuan ("per project", "per hari"). untuk digital: "" */
  unit?: Record<Locale, string>;
  cover?: string;
  deliverables: Record<Locale, string[]>;
  /** berapa lama pengerjaan */
  turnaround?: Record<Locale, string>;
  featured?: boolean;
  active: boolean;
}

export interface OrderItem {
  slug: string;
  title: string;
  kind: ProductKind;
  price: number;
  qty: number;
}

export type OrderStatus = "pending" | "confirmed" | "in_progress" | "delivered" | "cancelled";

export interface Order {
  code: string;
  createdAt: string;
  name: string;
  contact: string;
  channel: "whatsapp" | "email";
  note: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
}

export interface OrderDraft {
  name: string;
  contact: string;
  channel: "whatsapp" | "email";
  note: string;
}
