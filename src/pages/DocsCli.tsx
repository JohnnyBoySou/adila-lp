import { DocsLayout, type DocsTocItem } from "../components/DocsLayout.tsx";
import { docsNav } from "./docs/_nav.ts";

const toc: DocsTocItem[] = [
  { id: "visao-geral", label: "Visão geral" },
  { id: "instalacao", label: "Instalação" },
  { id: "comandos", label: "Comandos" },
  { id: "abrir", label: "Abrir projetos" },
  { id: "diff-merge", label: "Diff e merge" },
  { id: "shell", label: "Integração com shell" },
  { id: "exit-codes", label: "Exit codes" },
];

type Command = {
  cmd: string;
  description: string;
  example?: string;
};

const commands: Command[] = [
  {
    cmd: "adila .",
    description: "Abre o diretório atual em uma nova janela da Adila.",
    example: "$ adila ~/projetos/app",
  },
  {
    cmd: "adila <arquivo>",
    description: "Abre um arquivo específico, criando-o se não existir.",
    example: "$ adila src/index.ts",
  },
  {
    cmd: "adila --new-window",
    description: "Força abertura em nova janela mesmo se já há instância rodando.",
  },
  {
    cmd: "adila --reuse-window",
    description: "Abre em janela existente, reutilizando o workspace.",
  },
  {
    cmd: "adila diff <a> <b>",
    description: "Abre o diff visual entre dois arquivos.",
    example: "$ adila diff base.json head.json",
  },
  {
    cmd: "adila merge <a> <b> -o <out>",
    description: "Merge 3-way entre dois arquivos, gravando o resultado em <out>.",
    example: "$ adila merge ours.txt theirs.txt -o resolved.txt",
  },
  {
    cmd: "adila install",
    description:
      "Instala o symlink global da CLI em /usr/local/bin (macOS/Linux) ou no PATH (Windows).",
  },
  {
    cmd: "adila uninstall",
    description: "Remove o symlink global da CLI sem afetar a aplicação principal.",
  },
  {
    cmd: "adila --version",
    description: "Imprime a versão da CLI e do core da Adila.",
  },
  {
    cmd: "adila --help",
    description: "Lista todos os comandos e flags disponíveis.",
  },
];

function CommandsTable({ rows }: { rows: Command[] }) {
  return (
    <div className="not-prose mt-3 overflow-hidden rounded-xl border border-line bg-bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-bg-card-2">
            <tr className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim">
              <th className="px-4 py-2.5">Comando</th>
              <th className="px-4 py-2.5">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c, i) => (
              <tr key={c.cmd} className={`border-t border-line ${i % 2 === 1 ? "bg-bg/40" : ""}`}>
                <td className="px-4 py-3 align-top">
                  <code className="rounded-md border border-line-soft bg-bg-elev px-2 py-0.5 font-mono text-[12px] text-ink">
                    {c.cmd}
                  </code>
                  {c.example && (
                    <div className="mt-2 font-mono text-[11px] text-ink-dim">{c.example}</div>
                  )}
                </td>
                <td className="px-4 py-3 align-top text-[13px] leading-relaxed text-ink-muted">
                  {c.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DocsCli() {
  return (
    <DocsLayout
      nav={docsNav}
      toc={toc}
      breadcrumb={["Docs", "Configuração", "CLI"]}
      title="CLI"
      description="A Adila acompanha um binário CLI chamado adila — útil para abrir projetos pelo terminal, fazer diffs, scriptar workflows e integrar com Git como editor padrão."
    >
      <h2 id="visao-geral">Visão geral</h2>
      <p>
        A CLI é instalada junto com a aplicação no macOS e Windows. No Linux, dependendo do método
        de instalação (AppImage, deb, tar.gz), pode ser necessário rodar <code>adila install</code>{" "}
        uma vez para registrar o symlink global.
      </p>

      <h2 id="instalacao">Instalação</h2>
      <p>Após instalar a aplicação, registre o comando global:</p>
      <pre>
        <code>{`$ adila install
✓ Symlink criado em /usr/local/bin/adila
$ adila --version
adila 1.0.0-beta`}</code>
      </pre>
      <p>
        Para remover o symlink sem desinstalar a Adila, use <code>adila uninstall</code>. A
        aplicação continua disponível pelo launcher do sistema.
      </p>

      <h2 id="comandos">Comandos</h2>
      <CommandsTable rows={commands} />

      <h2 id="abrir">Abrir projetos</h2>
      <p>
        O caso mais comum é apontar a CLI para uma pasta. Os caminhos são resolvidos relativos ao{" "}
        <code>cwd</code>, então <code>adila .</code> abre o diretório atual:
      </p>
      <pre>
        <code>{`$ cd ~/projetos/api
$ adila .`}</code>
      </pre>
      <p>
        Se já houver uma janela aberta com o mesmo workspace, ela ganha foco. Para forçar nova
        janela, use <code>--new-window</code>:
      </p>
      <pre>
        <code>{`$ adila ~/projetos/web --new-window`}</code>
      </pre>

      <h2 id="diff-merge">Diff e merge</h2>
      <p>
        <code>adila diff</code> abre uma view side-by-side com syntax highlight e detecção de
        movimentos. Útil para inspecionar mudanças sem subir um Git GUI:
      </p>
      <pre>
        <code>{`$ adila diff config.old.json config.new.json`}</code>
      </pre>
      <p>
        <code>adila merge</code> aceita dois arquivos e grava o resultado em <code>--output</code>.
        Pode ser configurado como mergetool do Git:
      </p>
      <pre>
        <code>{`[mergetool "adila"]
  cmd = adila merge $LOCAL $REMOTE -o $MERGED
  trustExitCode = true

[merge]
  tool = adila`}</code>
      </pre>

      <h2 id="shell">Integração com shell</h2>
      <p>
        A CLI termina assim que despacha o comando para a aplicação — não bloqueia o terminal. Se
        precisar bloquear (por exemplo, para usar como <code>$EDITOR</code> em{" "}
        <code>git commit</code>
        ), passe <code>--wait</code>:
      </p>
      <pre>
        <code>{`$ export EDITOR="adila --wait"
$ git commit  # abre o COMMIT_EDITMSG na Adila e espera salvar/fechar`}</code>
      </pre>
      <p>
        O mesmo vale para <code>$VISUAL</code>, <code>crontab -e</code>, <code>visudo</code> e
        qualquer ferramenta que respeite essas variáveis.
      </p>

      <h2 id="exit-codes">Exit codes</h2>
      <ul>
        <li>
          <code>0</code> — sucesso
        </li>
        <li>
          <code>1</code> — erro genérico (arquivo inválido, permissão negada, falha ao spawnar a
          app)
        </li>
        <li>
          <code>2</code> — flags inválidas
        </li>
        <li>
          <code>130</code> — interrompido pelo usuário (<code>Ctrl+C</code> em modo{" "}
          <code>--wait</code>)
        </li>
      </ul>
    </DocsLayout>
  );
}
