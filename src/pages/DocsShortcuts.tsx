import { DocsLayout, type DocsTocItem } from "../components/DocsLayout.tsx";
import { docsNav } from "./docs/_nav.ts";

const toc: DocsTocItem[] = [
  { id: "visao-geral", label: "Visão geral" },
  { id: "modificadores", label: "Modificadores" },
  { id: "geral", label: "Geral" },
  { id: "editor", label: "Editor" },
  { id: "terminal", label: "Terminal" },
  { id: "navegacao", label: "Navegação" },
  { id: "git", label: "Controle de versão" },
  { id: "customizar", label: "Customizar" },
];

type Binding = {
  title: string;
  description?: string;
  keys: string[][];
  when?: string;
};

type Group = { id: string; label: string; bindings: Binding[] };

const groups: Group[] = [
  {
    id: "geral",
    label: "Geral",
    bindings: [
      {
        title: "Paleta de comandos",
        description: "Abre a paleta de comandos e busca de ações.",
        keys: [["Ctrl", "Shift", "P"]],
      },
      { title: "Abrir configurações", keys: [["Ctrl", ","]] },
      {
        title: "Atalhos de teclado",
        keys: [
          ["Ctrl", "K"],
          ["Ctrl", "S"],
        ],
      },
      {
        title: "Abrir pasta",
        keys: [
          ["Ctrl", "K"],
          ["Ctrl", "O"],
        ],
      },
    ],
  },
  {
    id: "editor",
    label: "Editor",
    bindings: [
      { title: "Salvar arquivo", keys: [["Ctrl", "S"]], when: "Editor ativo" },
      { title: "Salvar todos os arquivos", keys: [["Ctrl", "Shift", "S"]] },
      { title: "Fechar aba", keys: [["Ctrl", "W"]], when: "Editor ativo" },
      { title: "Próxima aba", keys: [["Ctrl", "Tab"]] },
      { title: "Aba anterior", keys: [["Ctrl", "Shift", "Tab"]] },
      { title: "Buscar no arquivo", keys: [["Ctrl", "F"]], when: "Editor ativo" },
      { title: "Substituir no arquivo", keys: [["Ctrl", "H"]], when: "Editor ativo" },
      { title: "Buscar em todos os arquivos", keys: [["Ctrl", "Shift", "F"]] },
      { title: "Ir para linha", keys: [["Ctrl", "G"]], when: "Editor ativo" },
      { title: "Ir para símbolo", keys: [["Ctrl", "Shift", "O"]], when: "Editor ativo" },
      { title: "Formatar documento", keys: [["Shift", "Alt", "F"]], when: "Editor ativo" },
      { title: "Alternar comentário de linha", keys: [["Ctrl", "/"]], when: "Editor ativo" },
      {
        title: "Alternar comentário de bloco",
        keys: [["Shift", "Alt", "A"]],
        when: "Editor ativo",
      },
      { title: "Aumentar indentação", keys: [["Tab"]], when: "Editor ativo, seleção" },
      { title: "Reduzir indentação", keys: [["Shift", "Tab"]], when: "Editor ativo, seleção" },
      { title: "Mover linha acima", keys: [["Alt", "↑"]], when: "Editor ativo" },
      { title: "Mover linha abaixo", keys: [["Alt", "↓"]], when: "Editor ativo" },
      { title: "Copiar linha acima", keys: [["Shift", "Alt", "↑"]], when: "Editor ativo" },
      { title: "Copiar linha abaixo", keys: [["Shift", "Alt", "↓"]], when: "Editor ativo" },
      { title: "Deletar linha", keys: [["Ctrl", "Shift", "K"]], when: "Editor ativo" },
      { title: "Adicionar cursor", keys: [["Alt", "Click"]], when: "Editor ativo" },
      {
        title: "Selecionar todas as ocorrências",
        keys: [["Ctrl", "Shift", "L"]],
        when: "Editor ativo",
      },
      { title: "Adicionar próxima ocorrência", keys: [["Ctrl", "D"]], when: "Editor ativo" },
      { title: "Desfazer", keys: [["Ctrl", "Z"]], when: "Editor ativo" },
      { title: "Refazer", keys: [["Ctrl", "Y"]], when: "Editor ativo" },
    ],
  },
  {
    id: "terminal",
    label: "Terminal",
    bindings: [
      { title: "Alternar terminal", keys: [["Ctrl", "`"]] },
      { title: "Novo terminal", keys: [["Ctrl", "Shift", "`"]] },
      { title: "Limpar terminal", keys: [["Ctrl", "K"]], when: "Terminal focado" },
      { title: "Rolar para cima", keys: [["Shift", "PgUp"]], when: "Terminal focado" },
      { title: "Rolar para baixo", keys: [["Shift", "PgDn"]], when: "Terminal focado" },
    ],
  },
  {
    id: "navegacao",
    label: "Navegação",
    bindings: [
      { title: "Voltar", keys: [["Alt", "←"]] },
      { title: "Avançar", keys: [["Alt", "→"]] },
      { title: "Focar na barra lateral", keys: [["Ctrl", "0"]] },
      { title: "Focar no editor", keys: [["Ctrl", "1"]] },
      { title: "Alternar barra lateral", keys: [["Ctrl", "B"]] },
      { title: "Aumentar zoom", keys: [["Ctrl", "="]] },
      { title: "Reduzir zoom", keys: [["Ctrl", "-"]] },
      { title: "Resetar zoom", keys: [["Ctrl", "0"]] },
    ],
  },
  {
    id: "git",
    label: "Controle de versão",
    bindings: [
      { title: "Abrir controle de versão", keys: [["Ctrl", "Shift", "G"]] },
      { title: "Commit", keys: [["Ctrl", "Enter"]], when: "Git: campo de mensagem focado" },
    ],
  },
];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-md border border-line bg-bg-card-2 px-1.5 font-mono text-[11px] text-ink shadow-[0_1px_0_0_rgba(0,0,0,0.2)]">
      {children}
    </kbd>
  );
}

function KeyChord({ keys }: { keys: string[][] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {keys.map((chord, ci) => (
        <span key={ci} className="flex items-center gap-1.5">
          {ci > 0 && <span className="font-mono text-[11px] text-ink-dim">depois</span>}
          <span className="flex items-center gap-1">
            {chord.map((k, ki) => (
              <span key={ki} className="flex items-center gap-1">
                {ki > 0 && <span className="font-mono text-[10px] text-ink-dim">+</span>}
                <Kbd>{k}</Kbd>
              </span>
            ))}
          </span>
        </span>
      ))}
    </div>
  );
}

function ShortcutsTable({ bindings }: { bindings: Binding[] }) {
  return (
    <div className="not-prose mt-3 overflow-hidden rounded-xl border border-line bg-bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-bg-card-2">
            <tr className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim">
              <th className="px-4 py-2.5">Comando</th>
              <th className="px-4 py-2.5">Atalho</th>
              <th className="px-4 py-2.5">Quando</th>
            </tr>
          </thead>
          <tbody>
            {bindings.map((b, i) => (
              <tr
                key={`${b.title}-${i}`}
                className={`border-t border-line ${i % 2 === 1 ? "bg-bg/40" : ""}`}
              >
                <td className="px-4 py-3 align-top">
                  <div className="text-ink">{b.title}</div>
                  {b.description && (
                    <div className="mt-0.5 text-[12px] text-ink-muted">{b.description}</div>
                  )}
                </td>
                <td className="px-4 py-3 align-top">
                  <KeyChord keys={b.keys} />
                </td>
                <td className="px-4 py-3 align-top font-mono text-[11px] text-ink-dim">
                  {b.when ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DocsShortcuts() {
  return (
    <DocsLayout
      nav={docsNav}
      toc={toc}
      breadcrumb={["Docs", "Configuração", "Atalhos de teclado"]}
      title="Atalhos de teclado"
      description="Referência completa das keybindings da Adila — divididas por contexto. Atalhos com mais de um chord são pressionados em sequência."
    >
      <h2 id="visao-geral">Visão geral</h2>
      <p>
        A Adila vem com um set de atalhos pré-configurado e estável entre releases. Você pode ver e
        editar todos eles em <code>Ctrl+K Ctrl+S</code> dentro do app — a mesma view usada nesta
        página.
      </p>
      <p>
        Quando um atalho aparece como <Kbd>Ctrl</Kbd>{" "}
        <span className="font-mono text-[11px]">depois</span> <Kbd>Ctrl</Kbd>{" "}
        <span className="font-mono text-[10px]">+</span> <Kbd>S</Kbd>, é um <em>chord</em>:
        pressione a primeira combinação, solte, e em seguida a segunda.
      </p>

      <h2 id="modificadores">Modificadores</h2>
      <p>
        No macOS, <Kbd>Ctrl</Kbd> mapeia para <Kbd>⌘</Kbd> e <Kbd>Alt</Kbd> mapeia para <Kbd>⌥</Kbd>{" "}
        automaticamente. Os atalhos abaixo estão escritos no formato Linux/Windows para manter a
        referência consistente.
      </p>
      <ul>
        <li>
          <Kbd>Ctrl</Kbd> — <code>⌘</code> no macOS, <code>Ctrl</code> em Linux/Windows
        </li>
        <li>
          <Kbd>Alt</Kbd> — <code>⌥</code> no macOS, <code>Alt</code> em Linux/Windows
        </li>
        <li>
          <Kbd>Shift</Kbd> — sempre <code>Shift</code>
        </li>
      </ul>

      {groups.map((g) => (
        <section key={g.id}>
          <h2 id={g.id}>{g.label}</h2>
          <ShortcutsTable bindings={g.bindings} />
        </section>
      ))}

      <h2 id="customizar">Customizar</h2>
      <p>
        Customização de atalhos via <code>keybindings.json</code> está no roadmap (
        <a href="/roadmap">/roadmap</a>). Por enquanto, os atalhos acima são imutáveis — exceto
        pelos chords reservados que dependem do layout do teclado e são detectados automaticamente
        no startup.
      </p>
    </DocsLayout>
  );
}
