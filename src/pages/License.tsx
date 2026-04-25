import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PageShell } from "../components/PageShell.tsx";

export function License() {
  const { t } = useTranslation();
  return (
    <PageShell
      kicker={t("pages.license.kicker")}
      title={t("pages.license.title")}
      subtitle={t("pages.license.subtitle")}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="mx-auto max-w-3xl space-y-6"
      >
        <div className="overflow-hidden rounded-2xl border border-line bg-bg-card">
          <div className="flex items-center justify-between border-b border-line-soft px-6 py-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
              {t("pages.license.label")}
            </span>
            <span className="rounded-full border border-brand/40 bg-brand/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
              MIT
            </span>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap p-6 font-mono text-[12px] leading-relaxed text-ink-muted">
            {t("pages.license.body")}
          </pre>
        </div>

        <div className="text-center text-[13px] text-ink-muted">
          {t("pages.license.full")}{" "}
          <a
            href="https://github.com/JohnnyBoySou/adila-ide/blob/master/LICENSE"
            target="_blank"
            rel="noreferrer"
            className="text-brand hover:underline"
          >
            LICENSE
          </a>
          .
        </div>
      </motion.div>
    </PageShell>
  );
}
