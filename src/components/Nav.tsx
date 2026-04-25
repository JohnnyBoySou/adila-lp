import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo.tsx";
import { ThemeToggle } from "./ThemeToggle.tsx";
import { LanguageSelect } from "./LanguageSelect.tsx";

const links = [
  { key: "features", to: "/#features" },
  { key: "performance", to: "/#performance" },
  { key: "workflow", to: "/#workflow" },
  { key: "docs", to: "/docs" },
] as const;

export function Nav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-line-soft bg-bg/70 backdrop-blur-xl"
    >
      <div className="container-x flex h-16 items-center justify-between gap-3 sm:gap-6">
        <Logo />
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-ink-muted">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-ink">
                  {t(`nav.links.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSelect />
          <ThemeToggle />
          <Link
            to="/#download"
            className="hidden rounded-lg bg-ink px-4 py-2 text-[13px] font-semibold text-bg transition-colors hover:bg-ink/90 md:inline-flex"
          >
            {t("nav.download")}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={t(open ? "nav.menuClose" : "nav.menuOpen")}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-bg-card-2 text-ink-muted transition-colors hover:text-ink md:hidden"
          >
            <BurgerIcon open={open} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden border-t border-line-soft bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <nav className="container-x py-4">
              <ul className="flex flex-col divide-y divide-line-soft">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="block py-3 text-[15px] text-ink-muted transition-colors hover:text-ink"
                    >
                      {t(`nav.links.${l.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/#download"
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ink/90"
              >
                {t("nav.download")}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <motion.path
        animate={open ? { d: "M4 4 L14 14" } : { d: "M3 5 L15 5" }}
        transition={{ duration: 0.2 }}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <motion.path
        animate={open ? { opacity: 0 } : { opacity: 1, d: "M3 9 L15 9" }}
        transition={{ duration: 0.15 }}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <motion.path
        animate={open ? { d: "M4 14 L14 4" } : { d: "M3 13 L15 13" }}
        transition={{ duration: 0.2 }}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
