import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PageShell } from "../components/PageShell.tsx";
import { LogoMark } from "../components/Logo.tsx";

const stack = [
  { label: "Go", note: "core, LSP, terminal" },
  { label: "Wails", note: "desktop runtime" },
  { label: "React 19", note: "UI" },
  { label: "Tailwind v4", note: "styling" },
  { label: "Monaco", note: "editor" },
  { label: "node-pty", note: "PTY" },
];

export function About() {
  const { t } = useTranslation();
  return (
    <PageShell
      kicker={t("pages.about.kicker")}
      title={t("pages.about.title")}
      subtitle={t("pages.about.subtitle")}
    >
      <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <motion.div
          initial={{ x: -24, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-bg-card p-8"
        >
          <LogoMark size="lg" />
          <div>
            <h3 className="font-display text-[20px] font-medium tracking-tight">
              {t("pages.about.mission.title")}
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
              {t("pages.about.mission.text")}
            </p>
          </div>
          <div className="border-t border-line-soft pt-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
              {t("pages.about.stack")}
            </span>
            <ul className="mt-4 grid grid-cols-2 gap-2.5">
              {stack.map((s) => (
                <li
                  key={s.label}
                  className="rounded-md border border-line-soft bg-bg-elev px-3 py-2"
                >
                  <div className="font-mono text-[12px] text-ink">{s.label}</div>
                  <div className="font-mono text-[10px] text-ink-dim">{s.note}</div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 24, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="space-y-8 text-[15px] leading-relaxed text-ink-muted"
        >
          <p>{t("pages.about.body.0")}</p>
          <p>{t("pages.about.body.1")}</p>
          <p>{t("pages.about.body.2")}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://github.com/JohnnyBoySou/adila-ide"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg-card-2 px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-bg-card"
            >
              GitHub →
            </a>
            <a
              href="/contato"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-[13px] font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              {t("pages.about.contact")} →
            </a>
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
}
