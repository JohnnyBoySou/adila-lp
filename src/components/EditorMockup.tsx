import { motion } from "framer-motion";

type Token = { c: string; t: string };
type Line = { num: number; tokens: Token[]; indent?: number };

const defaultCode: Line[] = [
  {
    num: 1,
    indent: 0,
    tokens: [
      { c: "tk-key", t: "import" },
      { c: "tk-def", t: " { " },
      { c: "tk-var", t: "createServer" },
      { c: "tk-def", t: " } " },
      { c: "tk-key", t: "from" },
      { c: "tk-str", t: ' "adila/server"' },
    ],
  },
  {
    num: 2,
    indent: 0,
    tokens: [
      { c: "tk-key", t: "import" },
      { c: "tk-def", t: " { " },
      { c: "tk-var", t: "z" },
      { c: "tk-def", t: " } " },
      { c: "tk-key", t: "from" },
      { c: "tk-str", t: ' "zod"' },
    ],
  },
  { num: 3, tokens: [] },
  {
    num: 4,
    indent: 0,
    tokens: [{ c: "tk-com", t: "// edge runtime · cold start < 12ms" }],
  },
  {
    num: 5,
    indent: 0,
    tokens: [
      { c: "tk-key", t: "export const" },
      { c: "tk-fn", t: " app" },
      { c: "tk-def", t: " = " },
      { c: "tk-fn", t: "createServer" },
      { c: "tk-def", t: "({" },
    ],
  },
  {
    num: 6,
    indent: 1,
    tokens: [
      { c: "tk-var", t: "schema" },
      { c: "tk-def", t: ": " },
      { c: "tk-var", t: "z" },
      { c: "tk-def", t: "." },
      { c: "tk-fn", t: "object" },
      { c: "tk-def", t: "({ " },
      { c: "tk-var", t: "id" },
      { c: "tk-def", t: ": " },
      { c: "tk-typ", t: "z.string()" },
      { c: "tk-def", t: " })," },
    ],
  },
  {
    num: 7,
    indent: 1,
    tokens: [
      { c: "tk-fn", t: "handler" },
      { c: "tk-def", t: "({ " },
      { c: "tk-var", t: "input" },
      { c: "tk-def", t: " }) {" },
    ],
  },
  {
    num: 8,
    indent: 2,
    tokens: [
      { c: "tk-key", t: "return" },
      { c: "tk-def", t: " { " },
      { c: "tk-var", t: "ok" },
      { c: "tk-def", t: ": " },
      { c: "tk-key", t: "true" },
      { c: "tk-def", t: ", " },
      { c: "tk-var", t: "id" },
      { c: "tk-def", t: ": " },
      { c: "tk-var", t: "input" },
      { c: "tk-def", t: "." },
      { c: "tk-var", t: "id" },
      { c: "tk-def", t: " }" },
    ],
  },
  { num: 9, indent: 1, tokens: [{ c: "tk-def", t: "}," }] },
  { num: 10, indent: 0, tokens: [{ c: "tk-def", t: "})" }] },
];

const defaultTabs = [
  { name: "server.ts", active: true },
  { name: "schema.ts", active: false },
  { name: "client.tsx", active: false },
];

const defaultTree: { label: string; depth: number; type: "dir" | "file"; active?: boolean }[] = [
  { label: "src", depth: 0, type: "dir" },
  { label: "server.ts", depth: 1, type: "file", active: true },
  { label: "schema.ts", depth: 1, type: "file" },
  { label: "client.tsx", depth: 1, type: "file" },
  { label: "lib", depth: 1, type: "dir" },
  { label: "auth.ts", depth: 2, type: "file" },
  { label: "db.ts", depth: 2, type: "file" },
  { label: "package.json", depth: 0, type: "file" },
  { label: "README.md", depth: 0, type: "file" },
];

type Props = {
  code?: Line[];
  tabs?: { name: string; active?: boolean }[];
  tree?: typeof defaultTree;
  showTerminal?: boolean;
  className?: string;
  compact?: boolean;
};

export function EditorMockup({
  code = defaultCode,
  tabs = defaultTabs,
  tree = defaultTree,
  showTerminal = true,
  className = "",
  compact = false,
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-bg-elev ${className}`}
      style={{
        boxShadow:
          "0 50px 120px -40px rgba(91, 140, 255, 0.25), 0 30px 60px -25px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="flex items-center gap-2 border-b border-line-soft bg-bg-card px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 truncate font-mono text-[11px] text-ink-dim">
          ~/projects/adila-app · main
        </span>
      </div>
      <div
        className={`grid ${compact ? "grid-cols-[140px_1fr]" : "grid-cols-[180px_1fr]"}`}
        style={{ minHeight: compact ? 220 : 360 }}
      >
        <aside className="border-r border-line-soft bg-bg-card px-2 py-3 font-mono text-[11px] text-ink-muted">
          <div className="mb-2 px-2 text-[10px] uppercase tracking-[0.16em] text-ink-dim">
            Explorer
          </div>
          <ul className="space-y-0.5">
            {tree.map((it, i) => (
              <li key={i}>
                <span
                  className={`flex items-center gap-1.5 truncate rounded-[5px] px-2 py-[3px] ${
                    it.active ? "bg-bg-card-2 text-ink" : "hover:text-ink"
                  }`}
                  style={{ paddingLeft: `${8 + it.depth * 10}px` }}
                >
                  <span className="text-[9px] text-ink-dim">{it.type === "dir" ? "▾" : "·"}</span>
                  {it.label}
                </span>
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex flex-col bg-code-bg">
          <div className="flex items-center gap-1 border-b border-line-soft bg-bg-card px-2 pt-1.5">
            {tabs.map((t, i) => (
              <span
                key={i}
                className={`flex items-center gap-1.5 rounded-t-md border-x border-t px-3 py-1.5 font-mono text-[11px] ${
                  t.active ? "border-line bg-code-bg text-ink" : "border-transparent text-ink-muted"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {t.name}
              </span>
            ))}
          </div>
          <pre className="flex-1 overflow-hidden p-3 font-mono text-[11px] leading-[1.7] text-ink code-syntax">
            {code.map((line, idx) => (
              <motion.div
                key={line.num}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04, duration: 0.4 }}
                className="flex"
              >
                <span className="mr-3 inline-block w-5 text-right text-ink-dim">{line.num}</span>
                <span style={{ paddingLeft: `${(line.indent ?? 0) * 16}px` }}>
                  {line.tokens.map((tok, ti) => (
                    <span key={ti} className={tok.c}>
                      {tok.t}
                    </span>
                  ))}
                  {idx === code.length - 1 && (
                    <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-[2px] bg-brand animate-caret" />
                  )}
                </span>
              </motion.div>
            ))}
          </pre>
          {showTerminal && (
            <div className="border-t border-line-soft bg-bg-card px-3 py-2 font-mono text-[11px] text-ink-muted">
              <div className="text-ink-dim">$ adila dev --turbo</div>
              <div>
                <span className="text-emerald-400">✓</span> ready in{" "}
                <span className="text-ink">142ms</span>
                <span className="text-ink-dim"> · 0 errors</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
