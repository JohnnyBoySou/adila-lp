import { motion } from "framer-motion";
import { LogoMark } from "./Logo.tsx";

const platforms = [
  { os: "macOS", arch: "Apple Silicon · Intel", icon: "" },
  { os: "Linux", arch: "x86_64 · ARM64", icon: "" },
  { os: "Windows", arch: "x64", icon: "" },
];

export function CtaWaitlist() {
  return (
    <section className="container-x py-24 text-center" id="download">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="font-display text-[clamp(30px,4.5vw,52px)] font-medium leading-tight tracking-tight">
          Pronto para sentir
          <br /> a diferença?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-ink-muted">
          Beta público. Gratuito enquanto durar. Suas configs viajam com sua conta.
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl border border-line bg-bg-card p-10"
      >
        <motion.div
          aria-hidden
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, var(--hero-glow-color) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <LogoMark size="lg" />
          <h3 className="mt-5 font-display text-[22px] font-medium tracking-tight">
            Baixe a Adila
          </h3>
          <p className="mt-1 max-w-sm text-[13px] text-ink-muted">
            Um único binário. Detecção automática da sua plataforma na próxima tela.
          </p>

          <div className="mt-7 grid w-full max-w-md gap-2">
            {platforms.map((p, i) => (
              <motion.a
                key={p.os}
                initial={{ y: 12, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                whileHover={{ x: 2 }}
                href="#"
                className="flex items-center justify-between rounded-xl border border-line-soft bg-bg-elev px-4 py-3 text-left transition-colors hover:border-line"
              >
                <div>
                  <div className="text-[13px] font-medium text-ink">{p.os}</div>
                  <div className="font-mono text-[11px] text-ink-dim">{p.arch}</div>
                </div>
                <span className="font-mono text-[11px] text-ink-muted">↓ baixar</span>
              </motion.a>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 font-mono text-[11px] text-ink-dim">
            <span>ou</span>
            <code className="rounded border border-line-soft bg-bg-elev px-2 py-1 text-ink">
              brew install adila
            </code>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
