import { motion } from "framer-motion";

const reveal = {
  hidden: { y: 30, opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function ThreeCards() {
  return (
    <section className="container-x py-20">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <motion.div
          variants={reveal}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-3xl border border-line bg-bg-card p-7 min-h-[380px] flex flex-col gap-4"
        >
          <h3 className="text-[20px] font-medium tracking-tight text-ink">
            Organize any tasks.
            <br /> Prioritize with ease
          </h3>
          <p className="text-sm text-ink-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et tellus urna. Aliquam
            et tellus urna. Phasellus eget.
          </p>

          <div className="mt-auto flex items-center justify-between rounded-xl border border-[#2a2a38] bg-[#1f1f2b] px-3.5 py-2.5 text-sm text-ink-muted">
            <span className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded bg-[#2a2a38] text-[10px]">
                ✦
              </span>
              Spam
            </span>
            <button className="rounded-lg bg-brand px-3.5 py-1.5 text-xs font-medium text-white">
              Sent
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-line bg-[#1a1a24] px-3.5 py-2.5 text-sm text-ink-muted">
            <span className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded bg-brand text-[10px] text-white">
                f
              </span>
              Futurism (2)
            </span>
            <span className="rounded-md bg-brand px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-white">
              ▶ TEMPO
            </span>
          </div>

          <div className="space-y-1 text-xs text-ink-dim">
            <div className="flex gap-2 px-2 py-1">▾ To do</div>
            <div className="flex gap-2 px-2 py-1">▾ Reminders</div>
            <div className="flex gap-2 px-2 py-1">▾ Drafts</div>
          </div>
        </motion.div>

        <motion.div
          variants={reveal}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grad-purple grid min-h-[380px] place-items-center rounded-3xl p-8 relative overflow-hidden"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[210px] rounded-[28px] border-4 border-[#1a1a24] bg-bg-elev p-3.5 shadow-2xl"
          >
            <div className="flex flex-col gap-2 rounded-[18px] bg-bg-card p-3.5">
              <div className="text-[10px] font-medium text-ink">Inbox</div>
              {[
                "Lorem ipsum dolor sit amet",
                "Lorem ipsum dolor sit amet",
                "Pay invoice",
                "Lorem ipsum dolor sit amet",
                "Buy lunch and meet at office",
                "Plan day for tomorrow",
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] text-ink-muted">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span className="truncate">{t}</span>
                </div>
              ))}
              <div className="my-1 h-px bg-line" />
              <div className="text-[9px] font-medium text-ink-dim uppercase tracking-wider">
                Color scheme
              </div>
              <div className="flex gap-1.5">
                {["#1e6fff", "#a855f7", "#ec4899", "#22c55e", "#f97316"].map((c) => (
                  <span key={c} className="h-3 w-3 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <div className="my-1 h-px bg-line" />
              <div className="text-[9px] font-medium text-ink-dim uppercase tracking-wider">
                Alternative
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="h-1 flex-1 rounded-full bg-[#2a2a38]" />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={reveal}
          custom={2}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex min-h-[380px] flex-col gap-4 rounded-3xl border border-line bg-bg-card p-7"
        >
          <div className="flex items-center justify-between text-sm text-ink-muted">
            <span className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded bg-[#2a2a38] text-[10px]">
                ✦
              </span>
              Fun facts
            </span>
            <span className="text-ink-dim">𝕏</span>
          </div>

          <div className="flex items-baseline gap-1 font-display text-[64px] font-medium leading-none tracking-tight">
            30%
            <span className="text-3xl text-emerald-400">↗</span>
          </div>

          <p className="text-sm text-ink-muted">
            Effortlessly manage multiple projects, save 30% time.
          </p>

          <p className="mt-2 text-sm text-ink-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et tellus urna. Aliquam
            et tellus urna. Phasellus eget.
          </p>

          <div className="mt-auto flex items-center justify-center gap-1.5">
            <button
              aria-label="prev"
              className="grid h-7 w-7 place-items-center rounded-full border border-line bg-[#1a1a24] text-ink-muted text-xs"
            >
              ‹
            </button>
            <span className="h-1.5 w-4 rounded-full bg-ink" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#2a2a38]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#2a2a38]" />
            <button
              aria-label="next"
              className="grid h-7 w-7 place-items-center rounded-full border border-line bg-[#1a1a24] text-ink-muted text-xs"
            >
              ›
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
