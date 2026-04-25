import { Hero } from "../components/Hero.tsx";
import { Highlights } from "../components/Highlights.tsx";
import { Features } from "../components/Features.tsx";
import { PowerFeatures } from "../components/PowerFeatures.tsx";
import { Performance } from "../components/Performance.tsx";
import { Releases } from "../components/Releases.tsx";
import { CtaWaitlist } from "../components/CtaWaitlist.tsx";

export function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Features />
      <PowerFeatures />
      <Performance />
      <Releases />
      <CtaWaitlist />
    </>
  );
}
