import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { DownloadSimple, GithubLogo, Star } from "@phosphor-icons/react";
import { ChipsScene } from "./ChipsScene.tsx";
import { useGithubStars, formatStars } from "../hooks/useGithubStars.ts";

export function Hero() {
  const { t, i18n } = useTranslation();
  const stars = useGithubStars("JohnnyBoySou/adila-ide");

  const fadeUp = {
    hidden: { y: 24, opacity: 0 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, delay: 0.05 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section className="relative min-h-[90vh] pt-20 pb-20">
      <div className="absolute inset-0 z-[1]">
        <ChipsScene />
      </div>

      <div className="container-x pointer-events-none relative z-10 text-center">
        <motion.a
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="show"
          href="#changelog"
          className="glass-soft pointer-events-auto mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] text-ink-muted transition-colors hover:text-ink"
        >
          <span className="grid h-4 w-4 place-items-center rounded-full bg-brand text-[9px] font-bold text-white">
            v1
          </span>
          <span>{t("hero.badge")}</span>
          <span className="text-ink-dim">→</span>
        </motion.a>

        <motion.h1
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl font-display text-[clamp(40px,5.8vw,72px)] font-medium leading-[1.02] tracking-[-0.035em]"
        >
          {t("hero.title1")}
          <br className="hidden sm:block" />{" "}
          <span className="font-serif italic font-normal">{t("hero.title2")}</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-ink-muted"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#download"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-bg shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5"
          >
            <DownloadSimple size={14} weight="bold" /> {t("hero.ctaDownload")}
          </a>
          <a
            href="https://github.com/JohnnyBoySou/adila-ide"
            target="_blank"
            rel="noreferrer"
            className="glass-soft group pointer-events-auto inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:text-ink"
          >
            <GithubLogo size={14} weight="fill" /> {t("hero.ctaGithub")}
            {stars !== null && (
              <span className="ml-1 inline-flex items-center gap-1 border-l border-line-soft pl-3 font-mono text-[12px] text-ink-muted transition-colors group-hover:text-ink">
                <Star size={12} weight="fill" />
                {formatStars(stars, i18n.language)}
              </span>
            )}
          </a>
        </motion.div>

        <motion.p
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate="show"
          className="mt-5 font-mono text-[11px] text-ink-dim"
        >
          {t("hero.platforms")}
        </motion.p>
      </div>
    </section>
  );
}
