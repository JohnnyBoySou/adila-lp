import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PageShell } from "../components/PageShell.tsx";

const sections = ["collect", "store", "share", "rights", "contact"] as const;

export function Privacy() {
  const { t } = useTranslation();
  return (
    <PageShell
      kicker={t("pages.privacy.kicker")}
      title={t("pages.privacy.title")}
      subtitle={t("pages.privacy.subtitle")}
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-10 font-mono text-[11px] text-ink-dim">{t("pages.privacy.updated")}</p>
        <div className="space-y-10">
          {sections.map((s, i) => (
            <motion.section
              key={s}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="border-l-2 border-line-soft pl-6"
            >
              <h3 className="font-display text-[20px] font-medium tracking-tight">
                {t(`pages.privacy.sections.${s}.title`)}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                {t(`pages.privacy.sections.${s}.text`)}
              </p>
            </motion.section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
