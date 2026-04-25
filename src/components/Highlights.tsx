import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const items = [
  { idx: 0, accent: "from-[#5b8cff] to-[#9d6bff]" },
  { idx: 1, accent: "from-[#22d3ee] to-[#5b8cff]" },
  { idx: 2, accent: "from-[#f472b6] to-[#fb923c]" },
] as const;

export function Highlights() {
  const { t } = useTranslation();
  return (
    <section className="container-x py-24" id="features">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.article
            key={it.idx}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-bg-card p-7"
          >
            <div
              className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${it.accent} opacity-60`}
            />
            <span className="font-mono text-[10px] tracking-[0.2em] text-ink-dim">
              {t(`highlights.${it.idx}.kicker`)}
            </span>
            <h3 className="mt-4 font-display text-[22px] font-medium leading-tight tracking-tight">
              {t(`highlights.${it.idx}.title`)}
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
              {t(`highlights.${it.idx}.text`)}
            </p>
            <div className="mt-6 flex items-baseline gap-2 border-t border-line-soft pt-5">
              <span
                className={`bg-gradient-to-r ${it.accent} bg-clip-text font-display text-[28px] font-medium tracking-tight text-transparent`}
              >
                {t(`highlights.${it.idx}.metric`)}
              </span>
              <span className="font-mono text-[11px] text-ink-dim">
                {t(`highlights.${it.idx}.sub`)}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
