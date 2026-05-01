import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PageShell } from "../components/PageShell.tsx";

type BackendRow = {
  name: string;
  iters: number;
  nsOp: number;
  bOp: number;
  allocs: number;
  delta?: number;
};

type FrontendRow = {
  group: string;
  name: string;
  hz: number;
  meanMs: number;
  rme: number;
  delta?: number;
};

const backend: BackendRow[] = [
  { name: "ListDir_Small", iters: 538539, nsOp: 25536, bOp: 2638, allocs: 31, delta: 17.2 },
  { name: "ListDir_Medium", iters: 291521, nsOp: 50185, bOp: 15139, allocs: 169, delta: -11.5 },
  { name: "SearchFiles_Small", iters: 57290, nsOp: 266136, bOp: 85322, allocs: 1148, delta: -26.0 },
  {
    name: "SearchFiles_Medium",
    iters: 40321,
    nsOp: 490944,
    bOp: 179820,
    allocs: 2093,
    delta: -39.0,
  },
  {
    name: "ListAllFiles_Small",
    iters: 23054,
    nsOp: 708155,
    bOp: 188188,
    allocs: 1410,
    delta: -19.9,
  },
  {
    name: "ListAllFiles_Medium",
    iters: 2526,
    nsOp: 6295997,
    bOp: 2159570,
    allocs: 16057,
    delta: -32.0,
  },
  {
    name: "ListAllFiles_Large",
    iters: 600,
    nsOp: 21529720,
    bOp: 8963381,
    allocs: 62315,
    delta: -31.0,
  },
  { name: "ParseStatus_Small", iters: 9430015, nsOp: 1633, bOp: 3072, allocs: 2, delta: -67.1 },
  { name: "ParseStatus_Large", iters: 76947, nsOp: 168411, bOp: 253952, allocs: 3, delta: -61.9 },
  {
    name: "SearchInFiles_Literal",
    iters: 2985,
    nsOp: 5930003,
    bOp: 3212883,
    allocs: 9818,
    delta: -46.6,
  },
  {
    name: "SearchInFiles_Regex",
    iters: 1054,
    nsOp: 13982219,
    bOp: 2591588,
    allocs: 12401,
    delta: -41.3,
  },
  {
    name: "SearchInFiles_CaseInsensitive",
    iters: 3065,
    nsOp: 5477322,
    bOp: 3248049,
    allocs: 9927,
    delta: -39.9,
  },
  { name: "CompileSearchRegex", iters: 2680451, nsOp: 5203, bOp: 3248, allocs: 34, delta: -54.9 },
];

const frontend: FrontendRow[] = [
  {
    group: "palette",
    name: "filterCommands · 50 cmds 'open'",
    hz: 305529,
    meanMs: 3.273,
    rme: 0.26,
    delta: -2.4,
  },
  {
    group: "palette",
    name: "filterCommands · 200 cmds 'open'",
    hz: 73372,
    meanMs: 13.6292,
    rme: 0.25,
    delta: -1.4,
  },
  {
    group: "palette",
    name: "filterCommands · 1k cmds 'open'",
    hz: 12697,
    meanMs: 78.7598,
    rme: 0.3,
    delta: -1.2,
  },
  {
    group: "palette",
    name: "filterCommands · 200 'zzzzz' (no match)",
    hz: 122685,
    meanMs: 8.1509,
    rme: 0.25,
    delta: -2.8,
  },
  {
    group: "palette",
    name: "filterCommands · empty (passthrough)",
    hz: 7798555,
    meanMs: 0.1282,
    rme: 0.15,
    delta: -29.0,
  },
  {
    group: "palette",
    name: "filterFiles · 100 files (empty)",
    hz: 40621,
    meanMs: 24.6177,
    rme: 1.62,
    delta: -11.1,
  },
  {
    group: "palette",
    name: "filterFiles · 1k files (empty)",
    hz: 29855,
    meanMs: 33.4948,
    rme: 0.35,
    delta: -4.1,
  },
  {
    group: "palette",
    name: "filterFiles · 10k files (empty)",
    hz: 28973,
    meanMs: 34.5149,
    rme: 0.36,
    delta: -7.1,
  },
  {
    group: "palette",
    name: "filterFiles · 100 'file'",
    hz: 32279,
    meanMs: 30.9799,
    rme: 0.4,
    delta: -0.3,
  },
  {
    group: "palette",
    name: "filterFiles · 1k 'file'",
    hz: 2813,
    meanMs: 355.4856,
    rme: 0.6,
    delta: -1.6,
  },
  {
    group: "palette",
    name: "filterFiles · 10k 'file'",
    hz: 278,
    meanMs: 3598.832,
    rme: 2.05,
    delta: -1.8,
  },
  {
    group: "palette",
    name: "filterFiles · 1k '.tsx'",
    hz: 2051,
    meanMs: 487.5376,
    rme: 0.59,
    delta: 3.5,
  },
  {
    group: "palette",
    name: "filterFiles · 10k '.tsx'",
    hz: 201,
    meanMs: 4985.938,
    rme: 0.64,
    delta: -2.3,
  },
  {
    group: "palette",
    name: "filterFiles · 1k 'src+sf' (subseq)",
    hz: 1838,
    meanMs: 544.2149,
    rme: 0.58,
    delta: -3.4,
  },
  {
    group: "palette",
    name: "filterFiles · 10k 'src+sf' (subseq)",
    hz: 185,
    meanMs: 5408.94,
    rme: 0.74,
    delta: 14.9,
  },
  {
    group: "palette",
    name: "filterFiles · 10k no match",
    hz: 196,
    meanMs: 5112.344,
    rme: 0.68,
    delta: 3.5,
  },
  {
    group: "panes",
    name: "openTabInLeaf · 10 tabs",
    hz: 2556278,
    meanMs: 0.3912,
    rme: 1.93,
    delta: -36.3,
  },
  {
    group: "panes",
    name: "openTabInLeaf · 50 tabs",
    hz: 1646198,
    meanMs: 0.6075,
    rme: 0.35,
    delta: -34.7,
  },
  {
    group: "panes",
    name: "openTabInLeaf · re-activate",
    hz: 1314336,
    meanMs: 0.7608,
    rme: 0.44,
    delta: -34.0,
  },
  {
    group: "panes",
    name: "closeTabInTree · flat 50",
    hz: 1796680,
    meanMs: 0.5566,
    rme: 0.31,
    delta: -24.5,
  },
  {
    group: "panes",
    name: "closeTabInTree · depth 8",
    hz: 856090,
    meanMs: 1.1681,
    rme: 8.88,
    delta: -27.6,
  },
  {
    group: "panes",
    name: "closeTabInTree · depth 16",
    hz: 457265,
    meanMs: 2.1869,
    rme: 0.51,
    delta: -29.6,
  },
  {
    group: "panes",
    name: "getAllLeaves · depth 16",
    hz: 2183407,
    meanMs: 0.458,
    rme: 0.21,
    delta: -22.5,
  },
  {
    group: "panes",
    name: "getAllLeaves · depth 32",
    hz: 1238978,
    meanMs: 0.8071,
    rme: 0.34,
    delta: -14.4,
  },
  {
    group: "panes",
    name: "findLeafWithPath · 32 last",
    hz: 787987,
    meanMs: 1.2691,
    rme: 0.13,
    delta: -18.8,
  },
  {
    group: "panes",
    name: "findLeafWithPath · 32 miss",
    hz: 1159877,
    meanMs: 0.8622,
    rme: 0.17,
    delta: -14.2,
  },
  {
    group: "panes",
    name: "updateTabContent · 16 hit",
    hz: 943143,
    meanMs: 1.0603,
    rme: 2.37,
    delta: -17.1,
  },
  {
    group: "panes",
    name: "updateTabContent · 16 miss",
    hz: 2158996,
    meanMs: 0.4632,
    rme: 0.11,
    delta: -10.4,
  },
  {
    group: "panes",
    name: "splitLeafAtSide · depth 8",
    hz: 681444,
    meanMs: 1.4675,
    rme: 3.94,
    delta: -13.7,
  },
  {
    group: "panes",
    name: "openOrMoveTab · center depth 8",
    hz: 1192235,
    meanMs: 0.8388,
    rme: 0.42,
    delta: -18.4,
  },
  {
    group: "settings",
    name: "filterGroups · empty",
    hz: 8999415,
    meanMs: 0.1111,
    rme: 0.13,
    delta: -4.0,
  },
  {
    group: "settings",
    name: "filterGroups · 'theme'",
    hz: 182083,
    meanMs: 5.492,
    rme: 0.29,
    delta: -13.9,
  },
  {
    group: "settings",
    name: "filterGroups · 'editor.fontSize'",
    hz: 134050,
    meanMs: 7.4599,
    rme: 0.12,
    delta: -20.9,
  },
  {
    group: "settings",
    name: "filterGroups · 'autoSave'",
    hz: 144677,
    meanMs: 6.912,
    rme: 0.14,
    delta: -16.4,
  },
  {
    group: "settings",
    name: "filterGroups · 'zzzzz' no match",
    hz: 367876,
    meanMs: 2.7183,
    rme: 0.11,
    delta: -17.6,
  },
  {
    group: "settings",
    name: "filterGroups · 'a' broad",
    hz: 388756,
    meanMs: 2.5723,
    rme: 0.41,
    delta: -14.5,
  },
  {
    group: "explorer",
    name: "sortEntries name-asc · 50",
    hz: 99653,
    meanMs: 10.0349,
    rme: 1.11,
    delta: -30.8,
  },
  {
    group: "explorer",
    name: "sortEntries name-asc · 500",
    hz: 4999,
    meanMs: 200.0269,
    rme: 1.05,
    delta: -33.2,
  },
  {
    group: "explorer",
    name: "sortEntries name-asc · 5k",
    hz: 365,
    meanMs: 2741.0818,
    rme: 1.91,
    delta: -37.8,
  },
  {
    group: "explorer",
    name: "sortEntries name-desc · 500",
    hz: 4671,
    meanMs: 214.0722,
    rme: 1.0,
    delta: -37.9,
  },
  {
    group: "explorer",
    name: "sortEntries recent · 500/50",
    hz: 4400,
    meanMs: 227.2796,
    rme: 1.04,
    delta: -31.8,
  },
  {
    group: "explorer",
    name: "sortEntries recent · 5k/200",
    hz: 329,
    meanMs: 3035.6395,
    rme: 1.48,
    delta: -34.0,
  },
  {
    group: "utils",
    name: "cn · simple 2 strings",
    hz: 3007258,
    meanMs: 0.3325,
    rme: 0.19,
    delta: -9.6,
  },
  {
    group: "utils",
    name: "cn · with conditional",
    hz: 2621536,
    meanMs: 0.3815,
    rme: 0.34,
    delta: -12.9,
  },
  {
    group: "utils",
    name: "cn · typical button (8)",
    hz: 1683202,
    meanMs: 0.5941,
    rme: 0.38,
    delta: -12.1,
  },
  {
    group: "utils",
    name: "cn · with conflicts",
    hz: 3646577,
    meanMs: 0.2742,
    rme: 0.1,
    delta: -13.3,
  },
  {
    group: "utils",
    name: "cn · nested array+object",
    hz: 1905733,
    meanMs: 0.5247,
    rme: 10.67,
    delta: -13.5,
  },
  {
    group: "utils",
    name: "cn · stress 20 args",
    hz: 591810,
    meanMs: 1.6897,
    rme: 2.22,
    delta: -8.1,
  },
];

function fmtNum(n: number) {
  return n.toLocaleString("en-US");
}

function fmtNs(ns: number) {
  if (ns >= 1_000_000) return `${(ns / 1_000_000).toFixed(2)} ms`;
  if (ns >= 1_000) return `${(ns / 1_000).toFixed(1)} µs`;
  return `${ns} ns`;
}

function fmtBytes(b: number) {
  if (b >= 1_000_000) return `${(b / 1_000_000).toFixed(2)} MB`;
  if (b >= 1_000) return `${(b / 1_000).toFixed(1)} KB`;
  return `${b} B`;
}

function fmtHz(hz: number) {
  if (hz >= 1_000_000) return `${(hz / 1_000_000).toFixed(2)}M`;
  if (hz >= 1_000) return `${(hz / 1_000).toFixed(1)}K`;
  return `${hz}`;
}

function DeltaBadge({ value }: { value?: number }) {
  if (value === undefined || Math.abs(value) < 3) {
    return <span className="font-mono text-[11px] text-ink-dim">─</span>;
  }
  const negative = value < 0;
  return (
    <span className={`font-mono text-[11px] ${negative ? "text-emerald-400" : "text-rose-400"}`}>
      {value > 0 ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

export function Benchmarks() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"backend" | "frontend">("backend");

  const frontendByGroup = useMemo(() => {
    const map = new Map<string, FrontendRow[]>();
    for (const row of frontend) {
      if (!map.has(row.group)) map.set(row.group, []);
      map.get(row.group)?.push(row);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <PageShell
      kicker={t("pages.benchmarks.kicker")}
      title={t("pages.benchmarks.title")}
      subtitle={t("pages.benchmarks.subtitle")}
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-lg border border-line bg-bg-card p-1">
          <button
            type="button"
            onClick={() => setTab("backend")}
            className={`rounded-md px-4 py-1.5 text-[13px] font-medium transition-colors ${
              tab === "backend" ? "bg-bg-card-2 text-ink" : "text-ink-muted hover:text-ink"
            }`}
          >
            {t("pages.benchmarks.tabs.backend")}
          </button>
          <button
            type="button"
            onClick={() => setTab("frontend")}
            className={`rounded-md px-4 py-1.5 text-[13px] font-medium transition-colors ${
              tab === "frontend" ? "bg-bg-card-2 text-ink" : "text-ink-muted hover:text-ink"
            }`}
          >
            {t("pages.benchmarks.tabs.frontend")}
          </button>
        </div>
        <div className="font-mono text-[11px] text-ink-dim">
          {t("pages.benchmarks.runDate")} · 2026-04-25
        </div>
      </div>

      {tab === "backend" && (
        <motion.div
          key="backend"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetaCard label={t("pages.benchmarks.meta.hardware")} value="Ryzen 5 5600G" />
            <MetaCard label={t("pages.benchmarks.meta.runtime")} value="Go 1.26.2" />
            <MetaCard label={t("pages.benchmarks.meta.benchtime")} value="2s · count 6" />
            <MetaCard label={t("pages.benchmarks.meta.noise")} value="±3%" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-bg-card-2">
                  <tr className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim">
                    <th className="px-4 py-3">{t("pages.benchmarks.cols.benchmark")}</th>
                    <th className="px-4 py-3 text-right">{t("pages.benchmarks.cols.iters")}</th>
                    <th className="px-4 py-3 text-right">{t("pages.benchmarks.cols.nsOp")}</th>
                    <th className="px-4 py-3 text-right">{t("pages.benchmarks.cols.bOp")}</th>
                    <th className="px-4 py-3 text-right">{t("pages.benchmarks.cols.allocs")}</th>
                    <th className="px-4 py-3 text-right">{t("pages.benchmarks.cols.delta")}</th>
                  </tr>
                </thead>
                <tbody>
                  {backend.map((r, i) => (
                    <tr
                      key={r.name}
                      className={`border-t border-line ${i % 2 === 1 ? "bg-bg/40" : ""}`}
                    >
                      <td className="px-4 py-2.5 font-mono text-ink">{r.name}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-ink-muted">
                        {fmtNum(r.iters)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-ink">{fmtNs(r.nsOp)}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-ink-muted">
                        {fmtBytes(r.bOp)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-ink-muted">
                        {r.allocs}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <DeltaBadge value={r.delta} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {tab === "frontend" && (
        <motion.div
          key="frontend"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetaCard label={t("pages.benchmarks.meta.runtime")} value="Bun 1.3.10" />
            <MetaCard label="Node" value="v24.12.0" />
            <MetaCard
              label={t("pages.benchmarks.meta.suites")}
              value={String(frontendByGroup.length)}
            />
            <MetaCard label={t("pages.benchmarks.meta.noise")} value="±5%" />
          </div>

          <div className="space-y-6">
            {frontendByGroup.map(([group, rows]) => (
              <div
                key={group}
                className="overflow-hidden rounded-2xl border border-line bg-bg-card"
              >
                <div className="flex items-center justify-between border-b border-line bg-bg-card-2 px-5 py-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
                    {group}
                  </span>
                  <span className="font-mono text-[11px] text-ink-dim">
                    {rows.length} {t("pages.benchmarks.tests")}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px]">
                    <thead>
                      <tr className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim">
                        <th className="px-4 py-2.5">{t("pages.benchmarks.cols.benchmark")}</th>
                        <th className="px-4 py-2.5 text-right">{t("pages.benchmarks.cols.hz")}</th>
                        <th className="px-4 py-2.5 text-right">
                          {t("pages.benchmarks.cols.mean")}
                        </th>
                        <th className="px-4 py-2.5 text-right">{t("pages.benchmarks.cols.rme")}</th>
                        <th className="px-4 py-2.5 text-right">
                          {t("pages.benchmarks.cols.delta")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, i) => (
                        <tr
                          key={r.name}
                          className={`border-t border-line ${i % 2 === 1 ? "bg-bg/40" : ""}`}
                        >
                          <td className="px-4 py-2 font-mono text-ink">{r.name}</td>
                          <td className="px-4 py-2 text-right font-mono text-ink">{fmtHz(r.hz)}</td>
                          <td className="px-4 py-2 text-right font-mono text-ink-muted">
                            {r.meanMs.toFixed(r.meanMs < 1 ? 3 : 2)} ms
                          </td>
                          <td className="px-4 py-2 text-right font-mono text-ink-dim">
                            ±{r.rme.toFixed(2)}%
                          </td>
                          <td className="px-4 py-2 text-right">
                            <DeltaBadge value={r.delta} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <p className="mt-10 text-center text-[12px] text-ink-dim">{t("pages.benchmarks.footnote")}</p>
    </PageShell>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-bg-card px-4 py-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">{label}</div>
      <div className="mt-1.5 font-mono text-[13px] text-ink">{value}</div>
    </div>
  );
}
