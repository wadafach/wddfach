"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale, OrderItem, Product } from "./types";

/* ------------------------------------------------------------------
   3D scene level.
   - auto   : ditentukan dari perangkat (default)
   - full   : bintang + planet + hujan meteor + efek lanjutan
   - reduced: bintang saja, tanpa post-processing, DPR rendah
   - off    : WebGL tidak disentuh sama sekali, pakai latar CSS
   ------------------------------------------------------------------ */
export type SceneLevel = "auto" | "full" | "reduced" | "off";

interface SettingsState {
  locale: Locale;
  scene: SceneLevel;
  reduceMotion: boolean;
  setLocale: (l: Locale) => void;
  setScene: (s: SceneLevel) => void;
  setReduceMotion: (v: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      locale: "id",
      scene: "auto",
      reduceMotion: false,
      setLocale: (locale) => set({ locale }),
      setScene: (scene) => set({ scene }),
      setReduceMotion: (reduceMotion) => set({ reduceMotion }),
    }),
    { name: "wddfach.settings", version: 1 },
  ),
);

/* ------------------------------------------------------------------ */

interface CartState {
  items: OrderItem[];
  add: (p: Product, locale: Locale) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (p, locale) => {
        const items = get().items;
        const existing = items.find((i) => i.slug === p.slug && i.kind === p.kind);
        if (existing) return;
        set({
          items: [
            ...items,
            {
              slug: p.slug,
              title: p.title[locale],
              kind: p.kind,
              price: p.price,
              qty: 1,
            },
          ],
        });
      },
      remove: (slug) => set({ items: get().items.filter((i) => i.slug !== slug) }),
      setQty: (slug, qty) =>
        set({
          items: get().items.map((i) =>
            i.slug === slug ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i,
          ),
        }),
      clear: () => set({ items: [] }),
    }),
    { name: "wddfach.cart", version: 1 },
  ),
);

export const cartTotal = (items: OrderItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0);

/* ------------------------------------------------------------------ */

interface UiState {
  settingsOpen: boolean;
  cartOpen: boolean;
  setSettingsOpen: (v: boolean) => void;
  setCartOpen: (v: boolean) => void;
  toggleSettings: () => void;
  toggleCart: () => void;
}

export const useUi = create<UiState>()((set, get) => ({
  settingsOpen: false,
  cartOpen: false,
  setSettingsOpen: (settingsOpen) => set({ settingsOpen, cartOpen: false }),
  setCartOpen: (cartOpen) => set({ cartOpen, settingsOpen: false }),
  toggleSettings: () => set({ settingsOpen: !get().settingsOpen, cartOpen: false }),
  toggleCart: () => set({ cartOpen: !get().cartOpen, settingsOpen: false }),
}));
