import { useTranslation } from "react-i18next";
import { Logo } from "./Logo.tsx";

const cols = ["product", "resources", "company"] as const;

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-line-soft py-14">
      <div className="container-x grid gap-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink-muted">
            {t("footer.tagline")}
          </p>
        </div>
        {cols.map((c) => {
          const items = t(`footer.items.${c}`, { returnObjects: true }) as string[];
          return <Col key={c} title={t(`footer.cols.${c}`)} items={items} />;
        })}
      </div>
      <div className="container-x mt-12 flex flex-col items-center justify-between gap-2 border-t border-line-soft pt-5 font-mono text-[11px] text-ink-dim md:flex-row">
        <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
        <span>{t("footer.build")}</span>
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
