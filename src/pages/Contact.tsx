import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PageShell } from "../components/PageShell.tsx";

const channels = [
  {
    key: "email",
    href: "mailto:hi@adila.dev",
    value: "hi@adila.dev",
    icon: "@",
  },
  {
    key: "github",
    href: "https://github.com/JohnnyBoySou/adila-ide",
    value: "JohnnyBoySou/adila-ide",
    icon: "GH",
  },
  {
    key: "discord",
    href: "https://discord.gg/adila",
    value: "discord.gg/adila",
    icon: "DC",
  },
  {
    key: "x",
    href: "https://x.com/adila_ide",
    value: "@adila_ide",
    icon: "X",
  },
] as const;

export function Contact() {
  const { t } = useTranslation();
  return (
    <PageShell
      kicker={t("pages.contact.kicker")}
      title={t("pages.contact.title")}
      subtitle={t("pages.contact.subtitle")}
    >
      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        {channels.map((c, i) => (
          <motion.a
            key={c.key}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noreferrer" : undefined}
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
            whileHover={{ y: -3 }}
            className="group flex items-start gap-4 rounded-2xl border border-line bg-bg-card p-6 transition-colors hover:border-ink/30"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-line-soft bg-bg-elev font-mono text-[12px] font-medium text-brand">
              {c.icon}
            </span>
            <div className="flex-1">
              <h3 className="font-display text-[16px] font-medium leading-tight tracking-tight">
                {t(`pages.contact.channels.${c.key}.title`)}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                {t(`pages.contact.channels.${c.key}.text`)}
              </p>
              <span className="mt-3 inline-block font-mono text-[12px] text-ink transition-colors group-hover:text-brand">
                {c.value} →
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </PageShell>
  );
}
