import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowDown, List, Star, X } from "@phosphor-icons/react";
import { Logo } from "./Logo.tsx";
import { ThemeToggle } from "./ThemeToggle.tsx";
import { LanguageSelect } from "./LanguageSelect.tsx";

const links = [
  { key: "features", to: "/#features" },
  { key: "performance", to: "/#performance" },
  { key: "workflow", to: "/#workflow" },
  { key: "docs", to: "/docs" },
] as const;

const GH_REPO = "https://github.com/JohnnyBoySou/adila-ide";

export function Nav() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const location = useLocation();
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setExpanded(false);
    setMobileMenu(false);
  }, [location]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(false);
        setMobileMenu(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!expanded && !mobileMenu) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setExpanded(false);
        setMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [expanded, mobileMenu]);

  useEffect(() => {
    const onScroll = () => {
      const remaining =
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      setAtBottom(remaining < 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollDown = () => window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });

  return (
    <motion.header
      ref={rootRef}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
    >
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            key="mobile-menu"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
            className="glass absolute bottom-full left-1/2 mb-3 w-[min(92vw,360px)] -translate-x-1/2 overflow-hidden rounded-2xl md:hidden"
          >
            <nav className="px-5 py-4">
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
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ink/90"
              >
                {t("nav.download")}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.6 }}
        className="glass relative flex h-14 items-center overflow-hidden rounded-full"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {expanded ? (
            <motion.div
              key="full"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex items-center gap-1 whitespace-nowrap px-3 sm:gap-3 sm:px-4"
            >
              <div className="px-1">
                <Logo />
              </div>
              <nav className="hidden md:block">
                <ul className="flex items-center gap-6 text-[13px] text-ink-muted">
                  {links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="transition-colors hover:text-ink">
                        {t(`nav.links.${l.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="ml-auto flex items-center gap-1.5 pl-2">
                <LanguageSelect />
                <ThemeToggle />
                <Link
                  to="/#download"
                  className="hidden rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-bg transition-colors hover:bg-ink/90 md:inline-flex"
                >
                  {t("nav.download")}
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenu((v) => !v)}
                  aria-expanded={mobileMenu}
                  aria-label={t(mobileMenu ? "nav.menuClose" : "nav.menuOpen")}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-bg-card-2/60 text-ink-muted transition-colors hover:text-ink md:hidden"
                >
                  {mobileMenu ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExpanded(false);
                    setMobileMenu(false);
                  }}
                  aria-label="Recolher navegação"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-bg-card-2/60 text-ink-muted transition-colors hover:text-ink"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mini"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex items-center gap-2 px-3"
            >
              <div className="px-1">
                <Logo />
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {atBottom ? (
                  <motion.a
                    key="star"
                    href={GH_REPO}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Dar uma estrela no GitHub"
                    initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.6, opacity: 0, rotate: 30 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.08, rotate: 8 }}
                    whileTap={{ scale: 0.95 }}
                    className="grid h-9 w-9 place-items-center rounded-full border border-brand/40 bg-brand/15 text-brand shadow-[0_0_18px_-4px_color-mix(in_oklab,var(--brand)_70%,transparent)] transition-colors hover:bg-brand/25"
                  >
                    <Star size={16} weight="fill" />
                  </motion.a>
                ) : (
                  <motion.button
                    key="scroll"
                    type="button"
                    onClick={scrollDown}
                    aria-label="Rolar para baixo"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line bg-bg-card-2/60 text-ink-muted transition-colors hover:text-ink"
                  >
                    <motion.span
                      animate={{ y: [0, 2, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-grid"
                    >
                      <ArrowDown size={16} weight="bold" />
                    </motion.span>
                  </motion.button>
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={() => setExpanded(true)}
                aria-label="Abrir menu"
                aria-expanded={false}
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-bg-card-2/60 text-ink-muted transition-colors hover:text-ink"
              >
                <List size={16} weight="bold" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}
