import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  kicker: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
};

export function PageShell({ kicker, title, subtitle, children }: Props) {
  return (
    <section className="relative">
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10 opacity-50" />
      <div className="container-x pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
            {kicker}
          </span>
          <h1 className="mt-3 font-display text-[clamp(36px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.03em]">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
      <div className="container-x pb-24">{children}</div>
    </section>
  );
}
