import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";

const stats: { idx: number; value: number; unit: string; decimals?: number }[] = [
  { idx: 0, value: 142, unit: "ms" },
  { idx: 1, value: 7.4, unit: "ms", decimals: 1 },
  { idx: 2, value: 96, unit: "MB" },
  { idx: 3, value: 38, unit: "MB" },
];

export function Performance() {
  const { t } = useTranslation();
  return (
    <section className="container-x py-24" id="performance">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
          {t("performance.kicker")}
        </span>
        <h2 className="mt-3 font-display text-[clamp(28px,4vw,48px)] font-medium leading-tight tracking-tight">
          {t("performance.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-ink-muted">
          {t("performance.subtitle")}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard
            key={s.idx}
            label={t(`performance.stats.${s.idx}.label`)}
            note={t(`performance.stats.${s.idx}.note`)}
            value={s.value}
            unit={s.unit}
            decimals={s.decimals ?? 0}
            index={i}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mt-10 flex justify-center"
      >
        <Link
          to="/benchmarks"
          className="group inline-flex items-center gap-2 rounded-lg border border-line bg-bg-card px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-bg-card-2"
        >
          {t("performance.viewBenchmarks")}
          <span className="text-ink-muted transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </motion.div>
    </section>
  );
}

type StatProps = {
  label: string;
  value: number;
  unit: string;
  note: string;
  decimals: number;
  index: number;
};

function StatCard({ label, value, unit, note, decimals, index }: StatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: value,
      duration: 1.6,
      ease: "power2.out",
      delay: index * 0.08,
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = obj.v.toFixed(decimals);
      },
    });
  }, [inView, value, decimals, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="glass-soft rounded-2xl p-6"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
        {label}
      </span>
      <div className="mt-4 flex items-baseline gap-1">
        <span
          ref={numRef}
          className="font-display text-[42px] font-medium leading-none tracking-tight text-ink"
        >
          0
        </span>
        <span className="font-mono text-[14px] text-ink-muted">{unit}</span>
      </div>
      <p className="mt-3 text-[12px] text-ink-muted">{note}</p>
    </motion.div>
  );
}
