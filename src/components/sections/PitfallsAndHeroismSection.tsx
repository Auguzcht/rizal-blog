import { Section } from "./Section";
import { ProseHover } from "@/components/motion/ProseHover";
import { pitfallsAndHeroism } from "@/data/biographical-facts";

export function PitfallsAndHeroismSection() {
  return (
    <Section
      id="pitfalls"
      eyebrow="VI. Pitfalls and Heroism"
      title="The Cost of Conviction"
    >
      <ProseHover>
        Rizal&apos;s heroism was not an accident of history but a choice made
        deliberately in the face of certain death. The moments below trace the
        deepening cost of his convictions — from his mother&apos;s imprisonment
        when he was a child to the firing squad at Bagumbayan.
      </ProseHover>

      {pitfallsAndHeroism.pitfalls.map((pitfall) => (
        <div key={pitfall.heading} className="mb-12">
          <h3 className="font-display text-display-lg text-ink-700 mb-4">
            {pitfall.heading}
          </h3>
          <ProseHover>{pitfall.body}</ProseHover>
        </div>
      ))}
    </Section>
  );
}
