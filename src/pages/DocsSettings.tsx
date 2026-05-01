import { DocsLayout, type DocsTocItem } from "../components/DocsLayout.tsx";
import { docsNav } from "./docs/_nav.ts";

const toc: DocsTocItem[] = [
  { id: "visao-geral", label: "Visão geral" },
  { id: "localizacao", label: "Localização do arquivo" },
  { id: "camadas", label: "Workspace vs. Global" },
  { id: "estrutura", label: "Estrutura" },
  { id: "aparencia", label: "Aparência" },
  { id: "editor", label: "Editor" },
  { id: "arquivos", label: "Arquivos" },
  { id: "workbench", label: "Workbench" },
  { id: "terminal", label: "Terminal" },
  { id: "busca-indexador", label: "Busca e Indexador" },
  { id: "ia", label: "Codex e Claude" },
  { id: "git", label: "Git" },
  { id: "developer", label: "Desenvolvedor" },
  { id: "performance", label: "Performance" },
  { id: "exemplo", label: "Exemplo completo" },
];

type Row = { key: string; type: string; default: string; desc: string };

function SettingsTable({ rows }: { rows: Row[] }) {
  return (
    <div className="not-prose mt-3 overflow-hidden rounded-xl border border-line bg-bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-bg-card-2">
            <tr className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim">
              <th className="px-4 py-2.5">Chave</th>
              <th className="px-4 py-2.5">Tipo</th>
              <th className="px-4 py-2.5">Padrão</th>
              <th className="px-4 py-2.5">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.key} className={`border-t border-line ${i % 2 === 1 ? "bg-bg/40" : ""}`}>
                <td className="whitespace-nowrap px-4 py-2 align-top font-mono text-ink">
                  {r.key}
                </td>
                <td className="whitespace-nowrap px-4 py-2 align-top font-mono text-ink-muted">
                  {r.type}
                </td>
                <td className="whitespace-nowrap px-4 py-2 align-top font-mono text-ink-dim">
                  {r.default}
                </td>
                <td className="px-4 py-2 align-top text-ink-muted">{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const appearance: Row[] = [
  {
    key: "workbench.colorTheme",
    type: "string",
    default: '"Default Dark Modern"',
    desc: "Tema do workbench. Aceita qualquer ID listado em /docs#temas.",
  },
  {
    key: "workbench.iconTheme",
    type: "enum",
    default: '"symbols"',
    desc: '"symbols" (Miguel Solorio) ou "minimal" (Lucide).',
  },
  {
    key: "adila.appearance.fontUi",
    type: "enum",
    default: '"google-sans-flex"',
    desc: 'Fonte da interface. Aceita "google-sans-flex" ou "system".',
  },
  {
    key: "adila.appearance.fontMono",
    type: "enum",
    default: '"google-sans-code"',
    desc: "Fonte monoespaçada dos painéis. Suporta as principais Nerd Fonts.",
  },
  {
    key: "adila.appearance.radius",
    type: "enum",
    default: '"lg"',
    desc: '"sm" | "md" | "lg" | "xl" — arredondamento global dos componentes.',
  },
  {
    key: "adila.appearance.density",
    type: "enum",
    default: '"comfortable"',
    desc: '"comfortable" ou "compact". Compacto reduz fonte base e espaçamentos.',
  },
  {
    key: "adila.appearance.transparency",
    type: "boolean",
    default: "false",
    desc: "Janela translúcida com blur. Requer compositor com suporte (Mutter/KWin/Picom).",
  },
  {
    key: "adila.appearance.transparencyOpacity",
    type: "number",
    default: "0.85",
    desc: "Opacidade do fundo translúcido entre 0.2 e 1.0.",
  },
  {
    key: "adila.appearance.transparencyBlur",
    type: "number",
    default: "24",
    desc: "Intensidade do blur em pixels. 0 desativa.",
  },
  {
    key: "window.zoomLevel",
    type: "number",
    default: "0",
    desc: "Fator de zoom global. Cada unidade equivale a ~10%.",
  },
];

const editor: Row[] = [
  {
    key: "editor.fontFamily",
    type: "string",
    default: '"Google Sans Code"',
    desc: "Fonte usada no buffer de código.",
  },
  { key: "editor.fontSize", type: "number", default: "13", desc: "Tamanho da fonte do editor." },
  { key: "editor.tabSize", type: "number", default: "2", desc: "Largura do tab em espaços." },
  {
    key: "editor.insertSpaces",
    type: "boolean",
    default: "true",
    desc: "Inserir espaços em vez de tabs.",
  },
  {
    key: "editor.wordWrap",
    type: "enum",
    default: '"off"',
    desc: '"off" | "on" | "wordWrapColumn" | "bounded".',
  },
  { key: "editor.lineNumbers", type: "enum", default: '"on"', desc: '"on" | "off" | "relative".' },
  {
    key: "editor.minimap.enabled",
    type: "boolean",
    default: "false",
    desc: "Exibe o minimap à direita do editor.",
  },
  {
    key: "editor.breadcrumbs.enabled",
    type: "boolean",
    default: "true",
    desc: "Caminho do arquivo acima do editor com dropdowns clicáveis.",
  },
  {
    key: "editor.renderLineHighlight",
    type: "enum",
    default: '"all"',
    desc: '"none" | "gutter" | "line" | "all".',
  },
  {
    key: "editor.renderWhitespace",
    type: "enum",
    default: '"selection"',
    desc: "Quando renderizar caracteres de espaço/tab.",
  },
  {
    key: "editor.smoothScrolling",
    type: "boolean",
    default: "true",
    desc: "Rolagem suave do editor.",
  },
  {
    key: "editor.scrollBeyondLastLine",
    type: "boolean",
    default: "false",
    desc: "Permite rolar além do conteúdo.",
  },
  {
    key: "editor.formatOnSave",
    type: "boolean",
    default: "false",
    desc: "Roda o formatter ao salvar.",
  },
  {
    key: "editor.formatOnPaste",
    type: "boolean",
    default: "false",
    desc: "Formata ao colar conteúdo.",
  },
  {
    key: "editor.formatOnType",
    type: "boolean",
    default: "false",
    desc: "Formata enquanto digita (depende do LSP).",
  },
  {
    key: "editor.cursorBlinking",
    type: "enum",
    default: '"smooth"',
    desc: '"blink" | "smooth" | "phase" | "expand" | "solid".',
  },
  {
    key: "editor.cursorSmoothCaretAnimation",
    type: "enum",
    default: '"on"',
    desc: "Movimento interpolado do cursor.",
  },
  {
    key: "editor.bracketPairColorization.enabled",
    type: "boolean",
    default: "true",
    desc: "Colore níveis de () [] {} de forma distinta.",
  },
  {
    key: "editor.guides.bracketPairs",
    type: "enum",
    default: '"active"',
    desc: "Guias verticais entre parênteses pareados.",
  },
  {
    key: "editor.guides.indentation",
    type: "boolean",
    default: "true",
    desc: "Linhas verticais nos níveis de indentação.",
  },
  {
    key: "editor.stickyScroll.enabled",
    type: "boolean",
    default: "true",
    desc: "Mantém escopo (function/class) fixo no topo.",
  },
  {
    key: "editor.fontLigatures",
    type: "boolean",
    default: "true",
    desc: "Ativa ligaduras nas fontes que suportam.",
  },
  {
    key: "editor.mouseWheelZoom",
    type: "boolean",
    default: "false",
    desc: "Ctrl + scroll ajusta tamanho da fonte.",
  },
  {
    key: "editor.linkedEditing",
    type: "boolean",
    default: "true",
    desc: "Renomeia tag pareada em HTML/JSX automaticamente.",
  },
  {
    key: "editor.inlayHints.enabled",
    type: "enum",
    default: '"on"',
    desc: "Dicas inline de tipos e nomes de parâmetros (LSP).",
  },
  {
    key: "editor.codeLens",
    type: "boolean",
    default: "true",
    desc: 'Links "References"/"Implementations" acima de funções.',
  },
  {
    key: "editor.padding.top",
    type: "number",
    default: "12",
    desc: "Espaço em pixels no topo do editor.",
  },
  {
    key: "editor.gitGutter",
    type: "boolean",
    default: "true",
    desc: "Marcas de git (added/modified/deleted) no gutter.",
  },
  {
    key: "editor.snippets.enabled",
    type: "boolean",
    default: "true",
    desc: "Habilita snippets embutidos por linguagem.",
  },
];

const files: Row[] = [
  {
    key: "files.autoSave",
    type: "enum",
    default: '"off"',
    desc: '"off" | "afterDelay" | "onFocusChange" | "onWindowChange".',
  },
  {
    key: "files.autoSaveDelay",
    type: "number",
    default: "1000",
    desc: "Intervalo do auto save em milissegundos.",
  },
  {
    key: "files.trimTrailingWhitespace",
    type: "boolean",
    default: "false",
    desc: "Remove espaços no fim das linhas ao salvar.",
  },
  {
    key: "files.insertFinalNewline",
    type: "boolean",
    default: "false",
    desc: "Garante newline ao fim do arquivo.",
  },
  { key: "files.eol", type: "enum", default: '"auto"', desc: '"auto" | "\\n" | "\\r\\n".' },
];

const workbench: Row[] = [
  {
    key: "workbench.sideBar.location",
    type: "enum",
    default: '"left"',
    desc: '"left" ou "right".',
  },
  {
    key: "workbench.activityBar.location",
    type: "enum",
    default: '"default"',
    desc: '"default" | "top" | "hidden".',
  },
  {
    key: "workbench.tree.indent",
    type: "number",
    default: "8",
    desc: "Recuo (px) por nível na árvore do explorer.",
  },
  {
    key: "workbench.zenMode",
    type: "boolean",
    default: "false",
    desc: "Esconde activity bar, status bar e abas.",
  },
  {
    key: "workbench.shortcutHud",
    type: "boolean",
    default: "true",
    desc: "Exibe HUD de atalhos no canto inferior.",
  },
  {
    key: "window.confirmClose",
    type: "boolean",
    default: "false",
    desc: "Pede confirmação ao fechar a janela.",
  },
  {
    key: "explorer.sortOrder",
    type: "enum",
    default: '"name-asc"',
    desc: '"name-asc" | "name-desc" | "type" | "modified".',
  },
  {
    key: "explorer.confirmDelete",
    type: "boolean",
    default: "true",
    desc: "Confirma exclusão antes de apagar pelo explorer.",
  },
  {
    key: "explorer.excludeFolders",
    type: "string[]",
    default: "[node_modules, .git, ...]",
    desc: "Pastas ocultas no explorer e na busca.",
  },
];

const terminal: Row[] = [
  {
    key: "terminal.fontFamily",
    type: "string",
    default: '"Google Sans Code"',
    desc: "Fonte do terminal — Nerd Fonts trazem glifos para prompts.",
  },
  {
    key: "terminal.fontSize",
    type: "number",
    default: "13",
    desc: "Tamanho da fonte do terminal.",
  },
  {
    key: "terminal.cursorStyle",
    type: "enum",
    default: '"bar"',
    desc: '"bar" | "block" | "underline".',
  },
  { key: "terminal.cursorBlink", type: "boolean", default: "true", desc: "Faz o cursor piscar." },
  {
    key: "terminal.scrollback",
    type: "number",
    default: "20000",
    desc: "Linhas de histórico mantidas em memória.",
  },
];

const searchIndexer: Row[] = [
  {
    key: "search.maxResults",
    type: "number",
    default: "1000",
    desc: "Limite de resultados da busca global.",
  },
  {
    key: "indexer.enabled",
    type: "boolean",
    default: "true",
    desc: "Liga/desliga o indexador de símbolos do workspace.",
  },
  {
    key: "indexer.maxFileSize",
    type: "number",
    default: "1048576",
    desc: "Tamanho máximo (bytes) por arquivo indexado.",
  },
];

const ai: Row[] = [
  {
    key: "codex.model",
    type: "enum",
    default: '"gpt-5-codex"',
    desc: "Modelo padrão da integração com OpenAI Codex.",
  },
  {
    key: "claude.model",
    type: "enum",
    default: '"claude-opus-4-7"',
    desc: "Modelo padrão da integração com Anthropic Claude.",
  },
  {
    key: "adila.spotify.enabled",
    type: "boolean",
    default: "false",
    desc: "Ativa o mini-player do Spotify na status bar.",
  },
];

const git: Row[] = [
  {
    key: "git.autoFetch",
    type: "boolean",
    default: "false",
    desc: "Faz fetch periódico do remote em background.",
  },
  {
    key: "git.autoFetchPeriod",
    type: "number",
    default: "300",
    desc: "Intervalo em segundos do auto fetch (mínimo 30).",
  },
];

const developer: Row[] = [
  {
    key: "developer.showFps",
    type: "boolean",
    default: "false",
    desc: "Overlay de FPS no canto da janela.",
  },
  { key: "developer.profiler", type: "boolean", default: "false", desc: "Ativa o React Profiler." },
  {
    key: "developer.profilerThreshold",
    type: "number",
    default: "5",
    desc: "Limite (ms) abaixo do qual renders são ignorados.",
  },
];

const performance: Row[] = [
  {
    key: "performance.ultraFast",
    type: "boolean",
    default: "false",
    desc: "Desliga animações e efeitos não essenciais para máquinas modestas.",
  },
];

export function DocsSettings() {
  return (
    <DocsLayout
      nav={docsNav}
      toc={toc}
      breadcrumb={["Docs", "Configuração", ".adila/settings.json"]}
      title=".adila/settings.json"
      description="Referência completa das configurações da Adila IDE — tudo que você pode definir em settings.json, com tipo, valor padrão e descrição."
    >
      <h2 id="visao-geral">Visão geral</h2>
      <p>
        A Adila IDE persiste configurações em <code>settings.json</code>. O arquivo é JSON puro, sem
        comentários, sem trailing commas — qualquer chave ausente cai no valor padrão definido no{" "}
        <code>settingsSchema</code>.
      </p>
      <p>
        Você pode editar o arquivo manualmente em qualquer editor ou abri-lo direto pela própria
        Adila pelo painel de Settings (<code>Cmd/Ctrl+,</code>) → botão{" "}
        <em>"Abrir settings.json"</em>.
      </p>

      <h2 id="localizacao">Localização do arquivo</h2>
      <p>O caminho global segue o padrão do sistema operacional:</p>
      <ul>
        <li>
          <strong>Linux:</strong> <code>~/.config/adila/settings.json</code>
        </li>
        <li>
          <strong>macOS:</strong> <code>~/Library/Application Support/adila/settings.json</code>
        </li>
        <li>
          <strong>Windows:</strong> <code>%APPDATA%\adila\settings.json</code>
        </li>
      </ul>
      <p>
        O arquivo de workspace, quando existe, fica sempre em{" "}
        <code>{"<projeto>"}/.adila/settings.json</code>.
      </p>

      <h2 id="camadas">Workspace vs. Global</h2>
      <p>
        Configurações são resolvidas em camadas. Quando uma chave existe em mais de um nível, vence
        a mais específica:
      </p>
      <ol className="list-decimal pl-5">
        <li>
          <strong>Workspace</strong> — <code>.adila/settings.json</code> na raiz do projeto.
        </li>
        <li>
          <strong>Global</strong> — arquivo no diretório de configuração do usuário.
        </li>
        <li>
          <strong>Padrão</strong> — valor declarado no <code>settingsSchema</code> da Adila.
        </li>
      </ol>
      <blockquote>
        Versione <code>.adila/settings.json</code> no Git quando quiser garantir que toda a equipe
        use a mesma <code>tabSize</code>, fonte e formatter — sem depender da config global de cada
        dev.
      </blockquote>

      <h2 id="estrutura">Estrutura</h2>
      <p>
        O arquivo é um único objeto JSON com chaves achatadas (notação por ponto). A Adila não usa
        objetos aninhados — <code>"editor.fontSize"</code> é uma chave literal, não um caminho.
      </p>
      <pre>
        <code>{`{
  "workbench.colorTheme": "Default Dark Modern",
  "editor.fontFamily": "'JetBrains Mono NF', monospace",
  "editor.fontSize": 14,
  "editor.formatOnSave": true,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}`}</code>
      </pre>

      <h2 id="aparencia">Aparência</h2>
      <p>
        Tema, fontes, densidade e transparência da janela. Mudanças aqui são aplicadas sem reload —
        a UI re-renderiza ao detectar <code>config.changed</code>.
      </p>
      <SettingsTable rows={appearance} />

      <h2 id="editor">Editor</h2>
      <p>
        As chaves <code>editor.*</code> configuram o editor de código nativo da Adila — escrito do
        zero em Go + React, sem Monaco e sem CodeMirror. Tudo que está documentado abaixo é
        suportado oficialmente; chaves desconhecidas são ignoradas em vez de propagadas.
      </p>
      <SettingsTable rows={editor} />

      <h2 id="arquivos">Arquivos</h2>
      <p>Auto save, encoding e normalização ao salvar.</p>
      <SettingsTable rows={files} />

      <h2 id="workbench">Workbench</h2>
      <p>Layout, sidebar, explorer e ergonomia da janela.</p>
      <SettingsTable rows={workbench} />

      <h2 id="terminal">Terminal</h2>
      <p>
        Aparência e comportamento do terminal integrado. Para usar Powerline / devicons no prompt,
        prefira uma Nerd Font (<code>JetBrains Mono NF</code>, <code>Fira Code NF</code> etc.).
      </p>
      <SettingsTable rows={terminal} />

      <h2 id="busca-indexador">Busca e Indexador</h2>
      <p>
        O indexador alimenta a busca de símbolos e o Command Center. Desligar acelera a abertura de
        projetos enormes mas degrada Go-to-Definition.
      </p>
      <SettingsTable rows={searchIndexer} />

      <h2 id="ia">Codex e Claude</h2>
      <p>
        Integrações de IA são opt-in. As chaves de API ficam fora do <code>settings.json</code> —
        são gravadas no keychain do sistema via comando dedicado <code>codex.connect</code> /{" "}
        <code>claude.connect</code>.
      </p>
      <SettingsTable rows={ai} />

      <h2 id="git">Git</h2>
      <p>Auto fetch e integrações com repositórios Git locais.</p>
      <SettingsTable rows={git} />

      <h2 id="developer">Desenvolvedor</h2>
      <p>
        Ferramentas de diagnóstico para contribuir com a Adila ou debugar performance de extensões
        próprias.
      </p>
      <SettingsTable rows={developer} />

      <h2 id="performance">Performance</h2>
      <SettingsTable rows={performance} />

      <h2 id="exemplo">Exemplo completo</h2>
      <p>
        Um <code>.adila/settings.json</code> típico de um projeto TypeScript com formatter
        configurado:
      </p>
      <pre>
        <code>{`{
  "workbench.colorTheme": "Tokyo Night",
  "workbench.iconTheme": "symbols",
  "editor.fontFamily": "'JetBrains Mono NF', monospace",
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "editor.minimap.enabled": false,
  "editor.stickyScroll.enabled": true,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 800,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "explorer.excludeFolders": [
    "node_modules",
    ".git",
    "dist",
    "build"
  ],
  "git.autoFetch": true,
  "git.autoFetchPeriod": 600
}`}</code>
      </pre>
    </DocsLayout>
  );
}
