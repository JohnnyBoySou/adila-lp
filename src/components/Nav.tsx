import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo.tsx";
import { ThemeToggle } from "./ThemeToggle.tsx";
import { LanguageSelect } from "./LanguageSelect.tsx";

const links = [
  { key: "features", href: "#features" },
  { key: "performance", href: "#performance" },
  { key: "workflow", href: "#workflow" },
  { key: "docs", href: "#docs" },
] as const;

export function Nav() {
  const { t } = useTranslation();
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-line-soft bg-bg/70 backdrop-blur-xl"
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav>
          <ul className="hidden items-center gap-8 text-sm text-ink-muted md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-ink">
                  {t(`nav.links.${l.key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSelect />
          <ThemeToggle />
          <a
            href="#download"
            className="hidden rounded-lg bg-ink px-4 py-2 text-[13px] font-semibold text-bg transition-colors hover:bg-ink/90 sm:inline-flex"
          >
            {t("nav.download")}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
