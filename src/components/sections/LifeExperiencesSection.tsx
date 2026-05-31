import { Section } from "./Section";
import { Timeline } from "@/components/timeline";

export function LifeExperiencesSection() {
  return (
    <Section
      id="timeline"
      eyebrow="IV. Life Experiences"
      title="The Arc of a Life"
      full
    >
      <p className="prose-rizal max-w-[65ch] mb-16">
        Rizal&apos;s journey from Calamba to Bagumbayan spans continents,
        disciplines, and transformations. The timeline below traces the key
        events that shaped his character — from a precocious child in Laguna to
        a martyr whose death ignited a nation.
      </p>

      <Timeline />
    </Section>
  );
}
