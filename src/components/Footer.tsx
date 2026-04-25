import { Logo } from "./Logo.tsx";

const product = ["Recursos", "Performance", "Changelog", "Roadmap"];
const resources = ["Docs", "CLI", "GitHub", "Discord"];
const company = ["Sobre", "Privacidade", "Licença", "Contato"];

export function Footer() {
  return (
    <footer className="border-t border-line-soft py-14">
      <div className="container-x grid gap-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink-muted">
            Adila é um editor de código nativo construído em Go. Performance, DX e fullstack — sem
            concessões.
          </p>
        </div>
        <Col title="Produto" items={product} />
        <Col title="Recursos" items={resources} />
        <Col title="Adila" items={company} />
      </div>
      <div className="container-x mt-12 flex flex-col items-center justify-between gap-2 border-t border-line-soft pt-5 font-mono text-[11px] text-ink-dim md:flex-row">
        <span>© {new Date().getFullYear()} Adila. Todos os direitos reservados.</span>
        <span>v1.0.0-beta · construído com Go + Wails</span>
      </div>
    </footer>
  );
}

function Col({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h5 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-dim">
        {title}
      </h5>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it}>
            <a href="#" className="text-[13px] text-ink-muted transition-colors hover:text-ink">
              {it}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
