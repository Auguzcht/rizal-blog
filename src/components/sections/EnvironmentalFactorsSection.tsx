import { Section } from "./Section";
import { ProseHover } from "@/components/motion/ProseHover";
import { environmentalFactors } from "@/data/biographical-facts";

export function EnvironmentalFactorsSection() {
  const { family, education, socioPolitical } = environmentalFactors;

  return (
    <Section
      id="environmental"
      eyebrow="III. Environmental Factors"
      title="The World That Shaped Him"
    >
      <h3 className="font-display text-display-lg text-ink-700 mt-8 mb-4">
        {family.heading}
      </h3>
      <ProseHover>{family.body}</ProseHover>

      <h3 className="font-display text-display-lg text-ink-700 mt-16 mb-4">
        {education.heading}
      </h3>
      <ProseHover>{education.body}</ProseHover>

      <h3 className="font-display text-display-lg text-ink-700 mt-16 mb-4">
        {socioPolitical.heading}
      </h3>
      <ProseHover>{socioPolitical.body}</ProseHover>
    </Section>
  );
}
