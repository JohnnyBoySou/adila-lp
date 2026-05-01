import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CaretDown } from "@phosphor-icons/react";

const RELEASES_URL = "https://raw.githubusercontent.com/JohnnyBoySou/adila-ide/master/RELEASES.md";

type Block =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] };

type Release = {
  version: string;
  date: string;
  current: boolean;
  blocks: Block[];
};

function parseReleases(md: string): Release[] {
  const lines = md.split("\n");
  const releases: Release[] = [];
  let current: Release | null = null;
  let buffer: string[] = [];
  let listBuffer: string[] = [];

  const flushParagraph = () => {
    if (!current) return;
    if (buffer.length === 0) return;
    const text = buffer.join(" ").trim();
    if (text) current.blocks.push({ kind: "p", text });
    buffer = [];
  };
  const flushList = () => {
    if (!current) return;
    if (listBuffer.length === 0) return;
    current.blocks.push({ kind: "ul", items: [...listBuffer] });
    listBuffer = [];
  };

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");

    if (line.startsWith("<!--")) continue;
    if (line.startsWith("-->")) continue;

    const release = line.match(/^##\s+v([\w.\-+]+)\s+—\s+([\d-]+)(?:\s+\((current)\))?/i);
    if (release) {
      flushParagraph();
      flushList();
      current = {
        version: release[1],
        date: release[2],
        current: Boolean(release[3]),
        blocks: [],
      };
      releases.push(current);
      continue;
    }

    if (!current) continue;

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      current.blocks.push({ kind: "h3", text: line.slice(4).trim() });
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      listBuffer.push(line.slice(2).trim());
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("# ")) continue;

    buffer.push(line.trim());
  }

  if (current) {
    flushParagraph();
    flushList();
  }

  return releases;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-ink">
          {p.slice(2, -2)}
        </strong>
      );
    }
    if (p.startsWith("`") && p.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded border border-line-soft bg-bg-elev px-1.5 py-px font-mono text-[0.85em] text-ink"
        >
          {p.slice(1, -1)}
        </code>
      );
    }
    const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noreferrer"
          className="text-brand underline-offset-2 hover:underline"
        >
          {link[1]}
        </a>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function formatDate(iso: string, locale: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" });
}

export function Releases() {
  const { t, i18n } = useTranslation();
  const [md, setMd] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    fetch(RELEASES_URL)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((text) => {
        if (!cancelled) setMd(text);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const releases = useMemo(() => (md ? parseReleases(md) : []), [md]);

  return (
    <section className="container-x py-24" id="changelog">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
          {t("releases.kicker")}
        </span>
        <h2 className="mt-3 font-display text-[clamp(28px,4vw,48px)] font-medium leading-tight tracking-tight">
          {t("releases.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-ink-muted">{t("releases.subtitle")}</p>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        {error && (
          <div className="rounded-2xl border border-line bg-bg-card p-8 text-center text-[14px] text-ink-muted">
            {t("releases.error")}{" "}
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noreferrer"
              className="text-brand hover:underline"
            >
              RELEASES.md
            </a>
          </div>
        )}

        {!error && !md && (
          <div className="grid gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-2xl border border-line-soft bg-bg-card"
              />
            ))}
          </div>
        )}

        <div className="space-y-6">
          {releases.map((r, i) => (
            <motion.article
              key={r.version}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative overflow-hidden rounded-2xl border border-line bg-bg-card"
            >
              <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line-soft px-7 py-5">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-[24px] font-medium leading-none tracking-tight">
                    v{r.version}
                  </h3>
                  {r.current && (
                    <span className="rounded-full border border-brand/40 bg-brand/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                      {t("releases.current")}
                    </span>
                  )}
                </div>
                <time className="font-mono text-[11px] text-ink-dim">
                  {formatDate(r.date, i18n.language)}
                </time>
              </header>

              <ReleaseBody
                blocks={r.blocks}
                expanded={Boolean(expanded[r.version])}
                onToggle={() => setExpanded((e) => ({ ...e, [r.version]: !e[r.version] }))}
                expandLabel={t("releases.expand")}
                collapseLabel={t("releases.collapse")}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

type ReleaseBodyProps = {
  blocks: Block[];
  expanded: boolean;
  onToggle: () => void;
  expandLabel: string;
  collapseLabel: string;
};

function ReleaseBody({ blocks, expanded, onToggle, expandLabel, collapseLabel }: ReleaseBodyProps) {
  return (
    <div>
      <motion.div
        animate={{ height: expanded ? "auto" : 220 }}
        initial={false}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative overflow-hidden"
      >
        <div className="space-y-5 px-7 py-6">
          {blocks.map((b, idx) => {
            if (b.kind === "p") {
              return (
                <p key={idx} className="text-[14px] leading-relaxed text-ink-muted">
                  {renderInline(b.text)}
                </p>
              );
            }
            if (b.kind === "h3") {
              return (
                <h4
                  key={idx}
                  className="pt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim"
                >
                  {b.text}
                </h4>
              );
            }
            return (
              <ul key={idx} className="space-y-2">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[14px] leading-relaxed text-ink-muted">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-dim" />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
        <AnimatePresence>
          {!expanded && (
            <motion.div
              key="fade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-card via-bg-card/80 to-transparent"
            />
          )}
        </AnimatePresence>
      </motion.div>
      <div className="flex justify-center border-t border-line-soft px-7 py-3">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-ink"
        >
          {expanded ? collapseLabel : expandLabel}
          <motion.span
            aria-hidden
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="inline-grid"
          >
            <CaretDown size={10} weight="bold" />
          </motion.span>
        </button>
      </div>
    </div>
  );
}
