"use client";

import { useEffect, useRef } from "react";
import { useSettings, useUi } from "@/lib/store";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { SceneLevel } from "@/lib/store";
import { useQuality } from "@/components/three/quality";

const levels: SceneLevel[] = ["full", "reduced", "off"];

/** Panel pengaturan: bahasa, kekuatan efek 3D, kurangi animasi. */
export function SettingsPanel() {
  const open = useUi((s) => s.settingsOpen);
  const setOpen = useUi((s) => s.setSettingsOpen);
  const { locale, setLocale, scene, setScene, reduceMotion, setReduceMotion } = useSettings();
  const q = useQuality();
  const panel = useRef<HTMLDivElement>(null);

  // Esc buat nutup + kunci scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-50 bg-void/70 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={t("settings.title", locale)}
        className={cn(
          "fixed bottom-0 right-0 z-50 w-full max-w-sm border-l border-t border-line bg-deep/96 p-6 backdrop-blur-xl transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] sm:top-0 sm:h-full",
          open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full",
        )}
      >
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-semibold">{t("settings.title", locale)}</h2>
            <p className="mt-1 font-mono text-[11px] text-ink-mute">
              {locale === "id"
                ? q.lowTier ? "perangkat kelas menengah" : "perangkat kuat"
                : q.lowTier ? "mid-range device" : "high-end device"}
              {q.touch ? (locale === "id" ? " · sentuh" : " · touch") : ""} · {q.cores} {locale === "id" ? "core" : "cores"}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label={t("common.close", locale)}
            className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-ink-soft hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* bahasa */}
        <Setting label={t("settings.lang", locale)}>
          <div className="inline-flex rounded-full border border-line bg-surface-2/60 p-0.5">
            {(["id", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                aria-pressed={locale === l}
                className={cn(
                  "rounded-full px-4 py-1.5 text-[12.5px] font-medium transition-colors",
                  locale === l ? "bg-ember text-[#12100c]" : "text-ink-soft hover:text-ink",
                )}
              >
                {l === "id" ? "Indonesia" : "English"}
              </button>
            ))}
          </div>
        </Setting>

        {/* efek 3D */}
        <Setting label={t("settings.scene", locale)} hint={t("settings.sceneHint", locale)}>
          <div className="grid grid-cols-3 gap-2">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setScene(l)}
                aria-pressed={scene === l}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-[12.5px] font-medium transition-colors",
                  scene === l
                    ? "border-ember/60 bg-ember/12 text-ember"
                    : "border-line bg-surface-2/40 text-ink-soft hover:border-ink-mute",
                )}
              >
                {t(`settings.scene.${l}` as "settings.scene.full", locale)}
              </button>
            ))}
          </div>
          <p className="mt-2.5 font-mono text-[10.5px] leading-relaxed text-ink-mute">
            {scene === "auto" && t("settings.autoNote", locale)}
            {scene === "full" && (q.lowTier ? "⚠ " : "") + (locale === "id"
              ? "Bintang, meteor, dan kamera mengikuti scroll."
              : "Stars, meteors, and camera follow scroll parallax.")}
            {scene === "reduced" && (locale === "id"
              ? "Bintang lebih sedikit, tanpa efek lanjutan."
              : "Fewer stars, no extra effects.")}
            {scene === "off" && (locale === "id"
              ? "Murni gradien CSS. Paling hemat baterai."
              : "CSS gradient only. Best for battery.")}
          </p>
        </Setting>

        {/* kurangi animasi */}
        <Setting label={t("settings.reduceMotion", locale)}>
          <Toggle
            checked={reduceMotion}
            onChange={setReduceMotion}
            label={t("settings.reduceMotion", locale)}
          />
        </Setting>

        <p className="mt-auto border-t border-line-soft pt-5 font-mono text-[10.5px] leading-relaxed text-ink-mute">
          {locale === "id"
            ? "Pilihanmu disimpan di perangkat ini saja."
            : "Your choices are saved on this device only."}
        </p>
      </div>
    </>
  );
}

function Setting({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2.5 text-[13px] font-medium text-ink">{label}</p>
      {children}
      {hint && <p className="mt-2 text-[11.5px] leading-relaxed text-ink-mute">{hint}</p>}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 rounded-full border transition-colors",
        checked ? "border-ember/60 bg-ember/25" : "border-line bg-surface-2",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-4.5 rounded-full transition-transform duration-200",
          checked ? "translate-x-[22px] bg-ember" : "translate-x-0.5 bg-ink-mute",
        )}
        style={{ width: 18, height: 18 }}
      />
    </button>
  );
}
