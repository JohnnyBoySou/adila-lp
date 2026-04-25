import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo.tsx";

type Item = { label: string; to: string; external?: boolean };

const product: Item[] = [
  { label: "features", to: "/#features" },
  { label: "performance", to: "/#performance" },
  { label: "releases", to: "/#changelog" },
  { label: "roadmap", to: "/roadmap" },
];

const resources: Item[] = [
  { label: "docs", to: "/docs" },
  { label: "cli", to: "/cli" },
  { label: "github", to: "https://github.com/JohnnyBoySou/adila-ide", external: true },
  { label: "discord", to: "https://discord.gg/adila", external: true },
];

const company: Item[] = [
  { label: "about", to: "/sobre" },
  { label: "privacy", to: "/privacidade" },
  { label: "license", to: "/licenca" },
  { label: "contact", to: "/contato" },
];

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
        <Col title={t("footer.cols.product")} group="product" items={product} />
        <Col title={t("footer.cols.resources")} group="resources" items={resources} />
        <Col title={t("footer.cols.company")} group="company" items={company} />
      </div>
      <div className="container-x mt-12 flex flex-col items-center justify-between gap-2 border-t border-line-soft pt-5 font-mono text-[11px] text-ink-dim md:flex-row">
        <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
        <span>{t("footer.build")}</span>
      </div>
    </footer>
  );
}

function Col({ title, group, items }: { title: string; group: string; items: Item[] }) {
  const { t } = useTranslation();
  return (
    <div>
      <h5 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-dim">
        {title}
      </h5>
      <ul className="space-y-2.5">
        {items.map((it) => {
          const label = t(`footer.links.${group}.${it.label}`);
          if (it.external) {
            return (
              <li key={it.label}>
                <a
                  href={it.to}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-ink-muted transition-colors hover:text-ink"
                >
                  {label}
                </a>
              </li>
            );
          }
          return (
            <li key={it.label}>
              <Link
                to={it.to}
                className="text-[13px] text-ink-muted transition-colors hover:text-ink"
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
