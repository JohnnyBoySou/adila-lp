import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { supportedLngs, type Lng } from "../i18n.ts";

export function LanguageSelect() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const current =
    supportedLngs.find((l) => l.code === i18n.resolvedLanguage) ??
    supportedLngs.find((l) => i18n.resolvedLanguage?.startsWith(l.code)) ??
    supportedLngs[0];

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const choose = async (code: Lng) => {
    await i18n.changeLanguage(code);
    document.documentElement.lang = code;
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("nav.language")}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-bg-card-2 px-3 font-mono text-[11px] font-medium text-ink-muted transition-colors hover:text-ink"
      >
        <GlobeIcon />
        <span>{current.short}</span>
        <motion.svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            d="M2 4l3 3 3-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[160px] overflow-hidden rounded-lg border border-line bg-bg-card shadow-[0_20px_40px_-15px_rgba(0,0,0,0.45)]"
          >
            {supportedLngs.map((l) => {
              const active = l.code === current.code;
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => choose(l.code)}
                    className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-[13px] transition-colors ${
                      active ? "bg-bg-card-2 text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="font-mono text-[10px] text-ink-dim">{l.short}</span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
