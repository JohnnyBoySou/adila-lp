import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";

const stats = [
  { label: "Cold start", value: 142, unit: "ms", note: "projeto de 12k arquivos" },
  { label: "Latência de teclado", value: 7.4, unit: "ms", note: "p99, 120Hz", decimals: 1 },
  { label: "RAM em idle", value: 96, unit: "MB", note: "vs. ~600MB do Electron" },
  { label: "Binário", value: 38, unit: "MB", note: "single-file, sem runtime" },
];

export function Performance() {
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
          Números
        </span>
        <h2 className="mt-3 font-display text-[clamp(28px,4vw,48px)] font-medium leading-tight tracking-tight">
          Velocidade não é detalhe.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-ink-muted">
          Adila foi medida e re-medida em cada release. Estes são números reais — não estimativas de
          marketing.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}

type StatProps = {
  label: string;
  value: number;
  unit: string;
  note: string;
  decimals?: number;
  index: number;
};

function StatCard({ label, value, unit, note, decimals = 0, index }: StatProps) {
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
      className="rounded-2xl border border-line bg-bg-card p-6"
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
