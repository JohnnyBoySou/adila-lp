import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { EditorMockup } from "./EditorMockup.tsx";

export function Features() {
  const { t } = useTranslation();
  return (
    <section className="container-x py-24" id="workflow">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-20 max-w-2xl text-center"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
          {t("features.kicker")}
        </span>
        <h2 className="mt-3 font-display text-[clamp(30px,4vw,52px)] font-medium leading-tight tracking-tight">
          {t("features.title1")}
          <br /> <span className="font-serif italic font-normal">{t("features.title2")}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-ink-muted">
          {t("features.subtitle")}
        </p>
      </motion.div>

      <FeatureRow
        kicker={t("features.row1.kicker")}
        title={
          <>
            {t("features.row1.title1")}
            <br />{" "}
            <span className="font-serif italic font-normal">{t("features.row1.title2")}</span>
          </>
        }
        text={t("features.row1.text")}
        cta={t("features.row1.cta")}
        flip={false}
      >
        <EditorMockup
          compact
          showTerminal={false}
          tabs={[{ name: "schema.ts", active: true }, { name: "server.ts" }]}
          tree={[
            { label: "src", depth: 0, type: "dir" },
            { label: "schema.ts", depth: 1, type: "file", active: true },
            { label: "server.ts", depth: 1, type: "file" },
          ]}
        />
      </FeatureRow>

      <FeatureRow
        kicker={t("features.row2.kicker")}
        title={
          <>
            {t("features.row2.title1")}
            <br />{" "}
            <span className="font-serif italic font-normal">{t("features.row2.title2")}</span>
          </>
        }
        text={t("features.row2.text")}
        cta={t("features.row2.cta")}
        flip
      >
        <TerminalArt />
      </FeatureRow>
    </section>
  );
}

type RowProps = {
  kicker: string;
  title: React.ReactNode;
  text: string;
  cta: string;
  flip: boolean;
  children: React.ReactNode;
};

function FeatureRow({ kicker, title, text, cta, flip, children }: RowProps) {
  return (
    <div
      className={`grid items-center gap-12 py-10 md:grid-cols-2 ${
        flip ? "md:[direction:rtl]" : ""
      }`}
    >
      <motion.div
        initial={{ x: flip ? 40 : -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="md:[direction:ltr]"
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ x: flip ? -40 : 40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="md:[direction:ltr]"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
          {kicker}
        </span>
        <h3 className="mt-3 font-display text-[clamp(26px,3.2vw,40px)] font-medium leading-[1.1] tracking-tight">
          {title}
        </h3>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-muted">{text}</p>
        <a
          href="#"
          className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-ink transition-colors hover:text-brand"
        >
          {cta}
          <span aria-hidden>→</span>
        </a>
      </motion.div>
    </div>
  );
}

function TerminalArt() {
  const lines: { c?: string; t: string }[] = [
    { c: "text-ink-dim", t: "$ adila git status" },
    { c: "text-ink", t: "On branch feat/edge-runtime" },
    { c: "text-ink-muted", t: "  modified:   src/server.ts" },
    { c: "text-ink-muted", t: "  modified:   src/schema.ts" },
    { t: "" },
    { c: "text-ink-dim", t: "$ adila pr open" },
    { c: "text-emerald-400", t: "✓ pushed feat/edge-runtime → origin" },
    { c: "text-emerald-400", t: "✓ PR #142 — 'edge runtime + cold start'" },
    { c: "text-ink-muted", t: "  reviewers · @leandro @maria" },
  ];
  return (
    <div
      className="overflow-hidden rounded-xl border border-line bg-bg-elev"
      style={{ boxShadow: "0 30px 60px -25px rgba(0,0,0,0.5)" }}
    >
      <div className="flex items-center gap-2 border-b border-line-soft bg-bg-card px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 font-mono text-[11px] text-ink-dim">terminal · zsh</span>
      </div>
      <pre className="p-5 font-mono text-[12px] leading-relaxed text-ink">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className={l.c ?? ""}
          >
            {l.t || " "}
          </motion.div>
        ))}
        <span className="inline-block h-3 w-[7px] translate-y-[2px] bg-brand animate-caret" />
      </pre>
    </div>
  );
}
