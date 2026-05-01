import type { DocsNavGroup } from "../../components/DocsLayout.tsx";

export const docsNav: DocsNavGroup[] = [
  {
    title: "Começando",
    items: [
      { label: "Introdução", to: "/docs" },
      { label: "Instalação", to: "/docs#instalacao" },
    ],
  },
  {
    title: "Configuração",
    items: [
      { label: ".adila/settings.json", to: "/docs/settings" },
      { label: "Temas", to: "/docs/themes" },
      { label: "Atalhos de teclado", to: "/docs/shortcuts" },
      { label: "CLI", to: "/docs/cli" },
    ],
  },
];
