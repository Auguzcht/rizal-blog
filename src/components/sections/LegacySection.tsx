import { Section } from "./Section";
import { ProseHover } from "@/components/motion/ProseHover";

export function LegacySection() {
  return (
    <Section id="legacy" eyebrow="VII. Conclusion" title="A Hero for All Seasons">
      <ProseHover>
        The character of José Rizal was forged from a convergence of forces:
        the intellectual inheritance of the Mercado-Alonso family, the
        crucible of injustice under Spanish rule, the transformative
        experience of European enlightenment, and the steady accretion of
        personal experience — from the classrooms of the Ateneo to the
        desolate beauty of Dapitan.
      </ProseHover>
      <ProseHover>
        Rizal chose — repeatedly — the harder path. He chose reason over
        resignation, reform over revolt, and ultimately, sacrifice over
        silence. In doing so, he did not merely shape the Philippines&apos;
        future; he shaped an ideal of what a Filipino could be: learned,
        courageous, compassionate, and unbroken.
      </ProseHover>
      <ProseHover>
        His legacy endures not because he was perfect, but because he was real —
        a man who wrestled with the same forces that shape every life, and who
        rose to meet his moment with a clarity that still commands attention,
        125 years after his death.
      </ProseHover>
    </Section>
  );
}
