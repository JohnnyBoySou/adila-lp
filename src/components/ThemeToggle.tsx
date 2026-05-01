import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "../theme.tsx";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? t("nav.themeLight") : t("nav.themeDark")}
      className="relative grid h-9 w-9 place-items-center rounded-lg border border-line bg-bg-card-2 text-ink-muted transition-colors hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="inline-grid"
        >
          {theme === "dark" ? (
            <Sun size={16} weight="regular" />
          ) : (
            <Moon size={16} weight="regular" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
