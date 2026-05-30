import { Section } from "./Section";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";

export function ThesisSection() {
  return (
    <Section
      id="thesis"
      eyebrow="I. Introduction"
      title="Thesis Statement"
    >
      <p>
        José Rizal&apos;s character — his intellectual breadth, moral courage,
        patriotism, and capacity for sacrifice — was not an innate gift but the
        product of a complex interplay between biological inheritance,
        environmental influences, and lived experiences. This narrative traces
        how his family pedigree, the sociopolitical climate of 19th-century
        Philippines, his education in Europe, and the specific crucible of exile
        forged the national hero whose execution at Bagumbayan on December 30,
        1896, would catalyze a revolution.
      </p>
    </Section>
  );
}
