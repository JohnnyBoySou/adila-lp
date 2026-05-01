import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  CircleHalf,
  Command,
  Function,
  Gear,
  GitBranch,
  type Icon,
} from "@phosphor-icons/react";
import { PageShell } from "../components/PageShell.tsx";

const cards: { key: string; icon: Icon; href: string }[] = [
  { key: "start", icon: ArrowUpRight, href: "https://github.com/JohnnyBoySou/adila-ide#readme" },
  { key: "config", icon: Gear, href: "/docs/settings" },
  { key: "lsp", icon: Function, href: "#" },
  { key: "keys", icon: Command, href: "/docs/shortcuts" },
  { key: "themes", icon: CircleHalf, href: "/docs/themes" },
  { key: "git", icon: GitBranch, href: "#" },
];

export function Docs() {
  const { t } = useTranslation();
  return (
    <PageShell
      kicker={t("pages.docs.kicker")}
      title={t("pages.docs.title")}
      subtitle={t("pages.docs.subtitle")}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => {
          const IconCmp = c.icon;
          return (
            <motion.a
              key={c.key}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noreferrer" : undefined}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ y: -3 }}
              className="group flex flex-col rounded-2xl border border-line bg-bg-card p-6 transition-colors hover:border-ink/30"
            >
              <span className="text-brand">
                <IconCmp size={20} weight="duotone" />
              </span>
              <h3 className="mt-4 font-display text-[18px] font-medium leading-snug tracking-tight">
                {t(`pages.docs.cards.${c.key}.title`)}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                {t(`pages.docs.cards.${c.key}.text`)}
              </p>
              <span className="mt-5 font-mono text-[11px] text-ink-dim transition-colors group-hover:text-ink">
                {t("pages.docs.cta")} →
              </span>
            </motion.a>
          );
        })}
      </div>
    </PageShell>
  );
}
