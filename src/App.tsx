"use client";

import { AnimatePresence } from "motion/react";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { useUIStore } from "@/store/useUIStore";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

import { HeroSection } from "@/components/sections/HeroSection";
import { ThesisSection } from "@/components/sections/ThesisSection";
import { BiologicalFactorsSection } from "@/components/sections/BiologicalFactorsSection";
import { EnvironmentalFactorsSection } from "@/components/sections/EnvironmentalFactorsSection";
import { LifeExperiencesSection } from "@/components/sections/LifeExperiencesSection";
import { CharacterAnalysisSection } from "@/components/sections/CharacterAnalysisSection";
import { PitfallsAndHeroismSection } from "@/components/sections/PitfallsAndHeroismSection";
import { LegacySection } from "@/components/sections/LegacySection";
import { GuestbookSection } from "@/components/sections/GuestbookSection";
import { ReferencesSection } from "@/components/sections/ReferencesSection";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { BackToTop } from "@/components/layout/BackToTop";
import { IosCursor } from "@/components/ui/IOSCursor";

function App() {
  const loaded = useUIStore((s) => s.loaded);

  // Mount Firebase auth listener once at the top level
  useFirebaseAuth();

  return (
    <LenisProvider>
      <IosCursor />
      <AnimatePresence>
        {!loaded && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <ScrollProgress />
      <Nav />

      <main>
        <HeroSection />

        <ThesisSection />

        <OrnamentalDivider />

        <BiologicalFactorsSection />

        <OrnamentalDivider />

        <EnvironmentalFactorsSection />

        <OrnamentalDivider />

        <LifeExperiencesSection />

        <OrnamentalDivider />

        <CharacterAnalysisSection />

        <OrnamentalDivider />

        <PitfallsAndHeroismSection />

        <OrnamentalDivider />

        <LegacySection />

        <OrnamentalDivider />

        <GuestbookSection />

        <OrnamentalDivider />

        <ReferencesSection />
      </main>

      <BackToTop />
      <Footer />
    </LenisProvider>
  );
}

export default App;
