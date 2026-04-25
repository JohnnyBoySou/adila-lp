import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PageShell } from "../components/PageShell.tsx";

const columns = [
  { key: "now", count: 4, accent: "from-[#5b8cff] to-[#9d6bff]" },
  { key: "next", count: 4, accent: "from-[#22d3ee] to-[#5b8cff]" },
  { key: "later", count: 4, accent: "from-[#f472b6] to-[#fb923c]" },
] as const;

export function Roadmap() {
  const { t } = useTranslation();
  return (
    <PageShell
      kicker={t("pages.roadmap.kicker")}
      title={t("pages.roadmap.title")}
      subtitle={t("pages.roadmap.subtitle")}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((c, i) => (
          <motion.section
            key={c.key}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative overflow-hidden rounded-2xl border border-line bg-bg-card p-7"
          >
            <div
              className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${c.accent} opacity-70`}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
              {t(`pages.roadmap.columns.${c.key}.label`)}
            </span>
            <h3 className="mt-3 font-display text-[22px] font-medium leading-tight tracking-tight">
              {t(`pages.roadmap.columns.${c.key}.title`)}
            </h3>
            <ul className="mt-6 space-y-3">
              {Array.from({ length: c.count }).map((_, idx) => (
                <li key={idx} className="flex gap-3 text-[14px] leading-relaxed text-ink-muted">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-dim" />
                  <span>{t(`pages.roadmap.columns.${c.key}.items.${idx}`)}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
    </PageShell>
  );
}
