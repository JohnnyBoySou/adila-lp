import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PageShell } from "../components/PageShell.tsx";

const commands = [
  { key: "open", cmd: "adila ." },
  { key: "diff", cmd: "adila diff <a> <b>" },
  { key: "merge", cmd: "adila merge <a> <b> -o <out>" },
  { key: "install", cmd: "adila install" },
  { key: "uninstall", cmd: "adila uninstall" },
  { key: "version", cmd: "adila --version" },
] as const;

export function Cli() {
  const { t } = useTranslation();
  return (
    <PageShell
      kicker={t("pages.cli.kicker")}
      title={t("pages.cli.title")}
      subtitle={t("pages.cli.subtitle")}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-10 overflow-hidden rounded-2xl border border-line bg-bg-elev">
          <div className="flex items-center gap-2 border-b border-line-soft bg-bg-card px-3.5 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[11px] text-ink-dim">install</span>
          </div>
          <pre className="p-5 font-mono text-[13px] leading-relaxed text-ink">
            <span className="text-ink-dim">$ </span>brew install adila
            {"\n"}
            <span className="text-ink-dim">$ </span>adila --version
            {"\n"}
            <span className="text-emerald-400">adila 1.0.0-beta</span>
          </pre>
        </div>

        <ul className="divide-y divide-line-soft overflow-hidden rounded-2xl border border-line bg-bg-card">
          {commands.map((c, i) => (
            <motion.li
              key={c.key}
              initial={{ x: -16, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.04, duration: 0.45 }}
              className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:gap-6"
            >
              <code className="shrink-0 rounded-md border border-line-soft bg-bg-elev px-2.5 py-1 font-mono text-[12px] text-ink">
                {c.cmd}
              </code>
              <p className="text-[13px] leading-relaxed text-ink-muted">
                {t(`pages.cli.commands.${c.key}`)}
              </p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </PageShell>
  );
}
