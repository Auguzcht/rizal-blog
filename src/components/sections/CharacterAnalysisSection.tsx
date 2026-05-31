import { Section } from "./Section";
import { ProseHover } from "@/components/motion/ProseHover";
import { characterAnalysis } from "@/data/biographical-facts";

export function CharacterAnalysisSection() {
  const { virtues, shortcomings, evolution } = characterAnalysis;

  return (
    <Section
      id="character"
      eyebrow="V. Character Analysis"
      title="Virtues and Shadows"
    >
      <ProseHover>
        Rizal&apos;s character resists hagiography. He was not a flawless
        demigod but a man of extraordinary gifts and recognizable human
        limitations. Understanding both illuminates why he remains compelling.
      </ProseHover>

      <h3 className="font-display text-display-lg text-ink-700 mt-16 mb-6">
        Virtues
      </h3>
      {virtues.map((trait) => (
        <div key={trait.trait} className="mb-8">
          <h4 className="font-display text-display-md text-ink-700 mb-2">
            {trait.trait}
          </h4>
          <ProseHover>{trait.body}</ProseHover>
        </div>
      ))}

      <h3 className="font-display text-display-lg text-ink-700 mt-16 mb-6">
        Shortcomings
      </h3>
      {shortcomings.map((trait) => (
        <div key={trait.trait} className="mb-8">
          <h4 className="font-display text-display-md text-ink-700 mb-2">
            {trait.trait}
          </h4>
          <ProseHover>{trait.body}</ProseHover>
        </div>
      ))}

      <h3 className="font-display text-display-lg text-ink-700 mt-16 mb-6">
        Evolution Over Time
      </h3>
      {evolution.split("\n\n").map((paragraph, i) => (
        <ProseHover key={i}>{paragraph}</ProseHover>
      ))}
    </Section>
  );
}
