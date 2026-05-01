import { DocsLayout, type DocsTocItem } from "../components/DocsLayout.tsx";
import { docsNav } from "./docs/_nav.ts";

const toc: DocsTocItem[] = [
  { id: "visao-geral", label: "Visão geral" },
  { id: "como-aplicar", label: "Como aplicar" },
  { id: "lista", label: "Temas embutidos" },
  { id: "claros", label: "Temas claros" },
  { id: "escuros", label: "Temas escuros" },
  { id: "alto-contraste", label: "Alto contraste" },
  { id: "preview", label: "Preview" },
  { id: "icones", label: "Tema de ícones" },
  { id: "custom", label: "Temas customizados" },
];

type ThemeRow = {
  id: string;
  label: string;
  mode: "dark" | "light";
  preview: { bg: string; text: string; border: string; accent: string };
};

const themes: ThemeRow[] = [
  {
    id: "Default Dark Modern",
    label: "Escuro (padrão)",
    mode: "dark",
    preview: { bg: "#1e1e2e", text: "#cdd6f4", border: "#313244", accent: "#89b4fa" },
  },
  {
    id: "Default Light Modern",
    label: "Claro (padrão)",
    mode: "light",
    preview: { bg: "#ffffff", text: "#1a1a1a", border: "#e1e4e8", accent: "#0366d6" },
  },
  {
    id: "High Contrast Dark",
    label: "Alto contraste escuro",
    mode: "dark",
    preview: { bg: "#000000", text: "#ffffff", border: "#6fc3df", accent: "#ffd700" },
  },
  {
    id: "High Contrast Light",
    label: "Alto contraste claro",
    mode: "light",
    preview: { bg: "#ffffff", text: "#000000", border: "#0f4a85", accent: "#0f4a85" },
  },
  {
    id: "Dimmed Dark",
    label: "Escuro atenuado",
    mode: "dark",
    preview: { bg: "#22272e", text: "#adbac7", border: "#373e47", accent: "#539bf5" },
  },
  {
    id: "GitHub Dark",
    label: "GitHub Dark",
    mode: "dark",
    preview: { bg: "#0d1117", text: "#c9d1d9", border: "#30363d", accent: "#58a6ff" },
  },
  {
    id: "GitHub Light",
    label: "GitHub Light",
    mode: "light",
    preview: { bg: "#ffffff", text: "#24292f", border: "#d0d7de", accent: "#0969da" },
  },
  {
    id: "Dracula",
    label: "Dracula",
    mode: "dark",
    preview: { bg: "#282a36", text: "#f8f8f2", border: "#44475a", accent: "#bd93f9" },
  },
  {
    id: "One Dark Pro",
    label: "One Dark Pro",
    mode: "dark",
    preview: { bg: "#282c34", text: "#abb2bf", border: "#3e4451", accent: "#61afef" },
  },
  {
    id: "Atom One Dark",
    label: "Atom One Dark",
    mode: "dark",
    preview: { bg: "#1e2127", text: "#abb2bf", border: "#3a3f4b", accent: "#61afef" },
  },
  {
    id: "Nord",
    label: "Nord",
    mode: "dark",
    preview: { bg: "#2e3440", text: "#d8dee9", border: "#3b4252", accent: "#88c0d0" },
  },
  {
    id: "Tokyo Night",
    label: "Tokyo Night",
    mode: "dark",
    preview: { bg: "#1a1b26", text: "#a9b1d6", border: "#24283b", accent: "#7aa2f7" },
  },
  {
    id: "Catppuccin Mocha",
    label: "Catppuccin Mocha",
    mode: "dark",
    preview: { bg: "#1e1e2e", text: "#cdd6f4", border: "#313244", accent: "#cba6f7" },
  },
  {
    id: "Catppuccin Latte",
    label: "Catppuccin Latte",
    mode: "light",
    preview: { bg: "#eff1f5", text: "#4c4f69", border: "#dce0e8", accent: "#8839ef" },
  },
  {
    id: "Solarized Dark",
    label: "Solarized Dark",
    mode: "dark",
    preview: { bg: "#002b36", text: "#839496", border: "#073642", accent: "#268bd2" },
  },
  {
    id: "Solarized Light",
    label: "Solarized Light",
    mode: "light",
    preview: { bg: "#fdf6e3", text: "#657b83", border: "#eee8d5", accent: "#268bd2" },
  },
  {
    id: "Monokai",
    label: "Monokai",
    mode: "dark",
    preview: { bg: "#272822", text: "#f8f8f2", border: "#3e3d32", accent: "#a6e22e" },
  },
  {
    id: "Gruvbox Dark",
    label: "Gruvbox Dark",
    mode: "dark",
    preview: { bg: "#282828", text: "#ebdbb2", border: "#3c3836", accent: "#fabd2f" },
  },
  {
    id: "Rose Pine",
    label: "Rosé Pine",
    mode: "dark",
    preview: { bg: "#191724", text: "#e0def4", border: "#26233a", accent: "#c4a7e7" },
  },
  {
    id: "Ayu Mirage",
    label: "Ayu Mirage",
    mode: "dark",
    preview: { bg: "#1f2430", text: "#cbccc6", border: "#2c3140", accent: "#ffcc66" },
  },
  {
    id: "Material Ocean",
    label: "Material Ocean",
    mode: "dark",
    preview: { bg: "#0f111a", text: "#a6accd", border: "#1f2233", accent: "#82aaff" },
  },
];

function ThemeCard({ t }: { t: ThemeRow }) {
  return (
    <div className="not-prose overflow-hidden rounded-xl border border-line bg-bg-card">
      <div
        className="flex h-24 items-center px-4"
        style={{ background: t.preview.bg, borderBottom: `1px solid ${t.preview.border}` }}
      >
        <div className="flex flex-col gap-1.5">
          <div
            className="h-1.5 w-20 rounded-full"
            style={{ background: t.preview.accent, opacity: 0.9 }}
          />
          <div
            className="h-1.5 w-32 rounded-full"
            style={{ background: t.preview.text, opacity: 0.7 }}
          />
          <div
            className="h-1.5 w-16 rounded-full"
            style={{ background: t.preview.text, opacity: 0.4 }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="min-w-0">
          <div className="truncate text-[13px] font-medium text-ink">{t.label}</div>
          <div className="font-mono text-[10px] text-ink-dim">{t.id}</div>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] ${
            t.mode === "dark"
              ? "border-line text-ink-muted"
              : "border-line bg-bg-card-2 text-ink-muted"
          }`}
        >
          {t.mode}
        </span>
      </div>
    </div>
  );
}

function ThemeGrid({ rows }: { rows: ThemeRow[] }) {
  return (
    <div className="not-prose mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {rows.map((t) => (
        <ThemeCard key={t.id} t={t} />
      ))}
    </div>
  );
}

export function DocsThemes() {
  const light = themes.filter((t) => t.mode === "light" && !t.id.includes("High Contrast"));
  const dark = themes.filter((t) => t.mode === "dark" && !t.id.includes("High Contrast"));
  const hc = themes.filter((t) => t.id.includes("High Contrast"));

  return (
    <DocsLayout
      nav={docsNav}
      toc={toc}
      breadcrumb={["Docs", "Configuração", "Temas"]}
      title="Temas"
      description="A Adila inclui 21 temas embutidos — claros, escuros e alto contraste — todos calibrados para o editor nativo, sidebar, status bar e terminal."
    >
      <h2 id="visao-geral">Visão geral</h2>
      <p>
        Cada tema cobre tanto a UI da aplicação (chrome, sidebar, status bar) quanto a coloração de
        sintaxe do editor. Não é necessário instalar extensões — todos os temas listados abaixo são
        ativados via <code>workbench.colorTheme</code>.
      </p>

      <h2 id="como-aplicar">Como aplicar</h2>
      <p>
        Defina o ID exato do tema na chave <code>workbench.colorTheme</code> em{" "}
        <code>settings.json</code>:
      </p>
      <pre>
        <code>{`{
  "workbench.colorTheme": "Tokyo Night"
}`}</code>
      </pre>
      <p>
        Você também pode trocar pelo Command Center (<code>Ctrl+Shift+P</code> →{" "}
        <em>"Tema: Selecionar"</em>) — a mudança é aplicada sem reload e é gravada automaticamente
        no arquivo de configuração.
      </p>

      <h2 id="lista">Temas embutidos</h2>
      <p>
        O ID listado em cada card é o que vai literal em <code>workbench.colorTheme</code>. O label
        é apenas o nome amigável exibido no seletor.
      </p>

      <h2 id="claros">Temas claros</h2>
      <ThemeGrid rows={light} />

      <h2 id="escuros">Temas escuros</h2>
      <ThemeGrid rows={dark} />

      <h2 id="alto-contraste">Alto contraste</h2>
      <p>
        Variantes pensadas para acessibilidade — bordas mais grossas, palette com contraste mínimo
        WCAG AAA e foco visível em todos os controles.
      </p>
      <ThemeGrid rows={hc} />

      <h2 id="preview">Preview</h2>
      <p>
        Cada tema vem com uma palette de preview (<code>bg</code>, <code>text</code>,{" "}
        <code>border</code>, <code>accent</code>) — esses valores são os que aparecem nos cards
        acima. Útil quando você quer apenas inspecionar a paleta sem trocar de tema.
      </p>

      <h2 id="icones">Tema de ícones</h2>
      <p>
        Independente do tema de cores, o tema de ícones controla apenas o explorer e as abas. A
        Adila acompanha dois sets:
      </p>
      <ul>
        <li>
          <code>"symbols"</code> — pack de Miguel Solorio. Ícones por extensão e pasta, palette
          colorida. <strong>Padrão.</strong>
        </li>
        <li>
          <code>"minimal"</code> — Lucide. Ícones monocromáticos, geometria mais leve.
        </li>
      </ul>
      <pre>
        <code>{`{
  "workbench.iconTheme": "minimal"
}`}</code>
      </pre>

      <h2 id="custom">Temas customizados</h2>
      <p>
        Suporte a temas customizados (TextMate / VS Code <code>tmTheme</code>) está em
        desenvolvimento — acompanhe o progresso em <a href="/roadmap">/roadmap</a>. Por enquanto, se
        quiser ajustes finos sobre um tema embutido, você pode sobrescrever cores específicas via{" "}
        <code>workbench.colorCustomizations</code> (em breve).
      </p>
    </DocsLayout>
  );
}
