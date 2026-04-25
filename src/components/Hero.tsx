import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import { EditorMockup } from "./EditorMockup.tsx";

export function Hero() {
  const { t } = useTranslation();
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 60, opacity: 0, rotateX: 12, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 1.1,
        delay: 0.35,
        ease: "power3.out",
      },
    );

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      gsap.to(el, {
        rotateY: dx * 5,
        rotateX: -dy * 3,
        duration: 0.7,
        ease: "power2.out",
        transformPerspective: 1400,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const fadeUp = {
    hidden: { y: 24, opacity: 0 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, delay: 0.05 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-20">
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      <div className="container-x relative z-10 text-center">
        <motion.a
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="show"
          href="#changelog"
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-bg-card px-3 py-1 text-[12px] text-ink-muted transition-colors hover:text-ink"
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
          <br className="hidden sm:block" /> {t("hero.title2")}
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
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-bg shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5"
          >
            <DownloadIcon /> {t("hero.ctaDownload")}
          </a>
          <a
            href="https://github.com/JohnnyBoySou/adila-ide"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg-card-2 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-bg-card"
          >
            <GhIcon /> {t("hero.ctaGithub")}
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

        <div ref={stageRef} className="mx-auto mt-14 max-w-[1040px] [perspective:1400px]">
          <EditorMockup />
        </div>
      </div>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GhIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}
