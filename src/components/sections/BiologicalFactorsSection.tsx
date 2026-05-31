import { Section } from "./Section";
import { ProseHover } from "@/components/motion/ProseHover";
import { biologicalFactors } from "@/data/biographical-facts";

export function BiologicalFactorsSection() {
  const { ancestry, intelligence, physicalDescription } = biologicalFactors;

  return (
    <Section
      id="biological"
      eyebrow="II. Biological Factors"
      title="Of Blood and Lineage"
    >
      <h3 className="font-display text-display-lg text-ink-700 mt-8 mb-4">
        {ancestry.heading}
      </h3>
      <ProseHover>{ancestry.body}</ProseHover>

      <h3 className="font-display text-display-lg text-ink-700 mt-16 mb-4">
        {intelligence.heading}
      </h3>
      <ProseHover>{intelligence.body}</ProseHover>

      <h3 className="font-display text-display-lg text-ink-700 mt-16 mb-4">
        {physicalDescription.heading}
      </h3>
      <ProseHover>{physicalDescription.body}</ProseHover>
    </Section>
  );
}
