import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

export type DocsNavGroup = {
  title: string;
  items: { label: string; to: string }[];
};

export type DocsTocItem = { id: string; label: string; depth?: 2 | 3 };

type Props = {
  nav: DocsNavGroup[];
  toc: DocsTocItem[];
  breadcrumb?: string[];
  title: string;
  description?: string;
  children: ReactNode;
};

export function DocsLayout({ nav, toc, breadcrumb, title, description, children }: Props) {
  const location = useLocation();
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (toc.length === 0) return;
    const opts: IntersectionObserverInit = {
      rootMargin: "-25% 0% -65% 0%",
      threshold: [0, 1],
    };
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveId(visible[0].target.id);
    }, opts);
    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  const flatNav = useMemo(() => nav.flatMap((g) => g.items), [nav]);

  return (
    <div className="mx-auto w-full max-w-[1500px] px-6 pt-12 pb-24">
      <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)_220px]">
        <aside className="hidden lg:block">
          <nav className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto pr-2 text-[13px]">
            {nav.map((group) => (
              <div key={group.title} className="mb-6">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                  {group.title}
                </div>
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const active =
                      location.pathname + location.hash === item.to ||
                      (item.to.includes("#") === false && location.pathname === item.to);
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className={`block rounded-md border-l-2 px-3 py-1.5 transition-colors ${
                            active
                              ? "border-brand bg-brand/5 text-ink"
                              : "border-transparent text-ink-muted hover:border-line hover:bg-bg-card hover:text-ink"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <article ref={containerRef} className="min-w-0">
          {breadcrumb && breadcrumb.length > 0 && (
            <div className="mb-3 flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-ink-dim">
              {breadcrumb.map((b, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-ink-dim/60">›</span>}
                  <span>{b}</span>
                </span>
              ))}
            </div>
          )}
          <h1 className="font-display text-[clamp(28px,4vw,40px)] font-medium leading-[1.1] tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
              {description}
            </p>
          )}
          <div className="prose-docs mt-10">{children}</div>

          <div className="mt-16 border-t border-line-soft pt-6">
            <PrevNext flat={flatNav} />
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto text-[13px]">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
              Nesta página
            </div>
            <ul className="space-y-1">
              {toc.map((item) => (
                <li key={item.id} className={item.depth === 3 ? "ml-3" : ""}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(item.id);
                      if (!el) return;
                      const y = el.getBoundingClientRect().top + window.scrollY - 24;
                      window.scrollTo({ top: y, behavior: "smooth" });
                      setActiveId(item.id);
                    }}
                    className={`block py-1 transition-colors ${
                      activeId === item.id ? "text-brand" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PrevNext({ flat }: { flat: { label: string; to: string }[] }) {
  const location = useLocation();
  const path = location.pathname + location.hash;
  const idx = flat.findIndex((i) => i.to === path);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;
  if (!prev && !next) return null;
  return (
    <div className="flex flex-wrap items-stretch justify-between gap-3">
      {prev ? (
        <Link
          to={prev.to}
          className="group flex min-w-[180px] flex-1 flex-col rounded-xl border border-line bg-bg-card px-4 py-3 transition-colors hover:border-ink/30"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
            ← Anterior
          </span>
          <span className="mt-1 text-[14px] text-ink">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={next.to}
          className="group flex min-w-[180px] flex-1 flex-col items-end rounded-xl border border-line bg-bg-card px-4 py-3 transition-colors hover:border-ink/30"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
            Próximo →
          </span>
          <span className="mt-1 text-right text-[14px] text-ink">{next.label}</span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
