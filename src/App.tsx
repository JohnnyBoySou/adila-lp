import { Nav } from "./components/Nav.tsx";
import { Hero } from "./components/Hero.tsx";
import { Highlights } from "./components/Highlights.tsx";
import { Features } from "./components/Features.tsx";
import { PowerFeatures } from "./components/PowerFeatures.tsx";
import { Performance } from "./components/Performance.tsx";
import { CtaWaitlist } from "./components/CtaWaitlist.tsx";
import { Footer } from "./components/Footer.tsx";

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Nav />
      <main>
        <Hero />
        <Highlights />
        <Features />
        <PowerFeatures />
        <Performance />
        <CtaWaitlist />
      </main>
      <Footer />
    </div>
  );
}
