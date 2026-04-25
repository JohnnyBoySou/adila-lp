import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const items = [
  { idx: 0, chip: "⌘K", mock: "command" },
  { idx: 1, chip: "lsp", mock: "lsp" },
  { idx: 2, chip: "git", mock: "git" },
  { idx: 3, chip: "tty", mock: "shell" },
] as const;

export function PowerFeatures() {
  const { t } = useTranslation();
  return (
    <section className="container-x py-24" id="docs">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-16 max-w-2xl text-center"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
          {t("powerFeatures.kicker")}
        </span>
        <h2 className="mt-3 font-display text-[clamp(28px,4vw,48px)] font-medium leading-tight tracking-tight">
          {t("powerFeatures.title1")}
          <br /> {t("powerFeatures.title2")}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-ink-muted">
          {t("powerFeatures.subtitle")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.article
            key={it.idx}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-line bg-bg-card p-5"
          >
            <Mock kind={it.mock} />
            <div className="mt-4 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-dim">
                {it.chip}
              </span>
              <span className="h-px flex-1 bg-line-soft" />
            </div>
            <h4 className="mt-2 font-display text-[16px] font-medium leading-snug tracking-tight">
              {t(`powerFeatures.items.${it.idx}.title`)}
            </h4>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
              {t(`powerFeatures.items.${it.idx}.text`)}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Mock({ kind }: { kind: string }) {
  if (kind === "command") {
    return (
      <div className="flex h-40 flex-col gap-1.5 overflow-hidden rounded-xl border border-line-soft bg-code-bg p-3 font-mono text-[11px]">
        <div className="flex items-center gap-2 rounded-md border border-line bg-bg-card px-2 py-1.5 text-ink-muted">
          <span>⌘K</span>
          <span className="text-ink">›</span>
          <span className="text-ink">server.ts</span>
          <span className="ml-auto h-3 w-[2px] bg-brand animate-caret" />
        </div>
        {["src/server.ts", "src/schema.ts", "src/lib/db.ts"].map((s, i) => (
          <div
            key={s}
            className={`flex items-center gap-2 rounded px-2 py-1 ${
              i === 0 ? "bg-bg-card-2 text-ink" : "text-ink-muted"
            }`}
          >
            <span className="text-ink-dim">·</span>
            <span>{s}</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "lsp") {
    return (
      <div className="flex h-40 flex-col gap-1.5 overflow-hidden rounded-xl border border-line-soft bg-code-bg p-3 font-mono text-[11px]">
        {[
          { lang: "typescript-language-server", v: "4.3.3", ok: true },
          { lang: "gopls", v: "0.16", ok: true },
          { lang: "rust-analyzer", v: "0.4", ok: true },
          { lang: "tailwindcss-ls", v: "0.0.27", ok: false },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-2 rounded bg-bg-card px-2 py-1.5">
            <span className={s.ok ? "text-emerald-400" : "text-amber-400"}>{s.ok ? "●" : "↻"}</span>
            <span className="truncate text-ink">{s.lang}</span>
            <span className="ml-auto text-ink-dim">{s.v}</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "git") {
    return (
      <div className="flex h-40 flex-col gap-1.5 overflow-hidden rounded-xl border border-line-soft bg-code-bg p-3 font-mono text-[11px]">
        <div className="flex items-center justify-between text-ink">
          <span>feat/edge-runtime</span>
          <span className="rounded bg-bg-card-2 px-1.5 py-0.5 text-[10px] text-ink-dim">↑3 ↓0</span>
        </div>
        {[
          { sym: "+", c: "text-emerald-400", t: "edge: cold start < 12ms" },
          { sym: "~", c: "text-amber-400", t: "schema: validate id" },
          { sym: "−", c: "text-rose-400", t: "remove legacy adapter" },
        ].map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={d.c}>{d.sym}</span>
            <span className="truncate text-ink-muted">{d.t}</span>
          </div>
        ))}
        <div className="mt-auto rounded bg-bg-card px-2 py-1.5 text-[10px] text-ink-muted">
          PR #142 · ready for review
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-40 flex-col gap-1.5 overflow-hidden rounded-xl border border-line-soft bg-code-bg p-3 font-mono text-[11px] text-ink-muted">
      <div className="text-ink-dim">$ go test ./...</div>
      <div className="text-emerald-400">ok&nbsp;&nbsp;adila/server&nbsp;&nbsp;0.184s</div>
      <div className="text-emerald-400">ok&nbsp;&nbsp;adila/lsp&nbsp;&nbsp;&nbsp;&nbsp;0.092s</div>
      <div className="text-emerald-400">ok&nbsp;&nbsp;adila/term&nbsp;&nbsp;&nbsp;0.071s</div>
      <div className="text-ink-dim">$ _</div>
    </div>
  );
}
