import { Section } from "./Section";

export function CharacterAnalysisSection() {
  return (
    <Section
      id="character"
      eyebrow="V. Character Analysis"
      title="Virtues and Shadows"
    >
      <p>
        Rizal&apos;s character resists hagiography. He was not a flawless
        demigod but a man of extraordinary gifts and recognizable human
        limitations. Understanding both illuminates why he remains compelling.
      </p>

      <h3 className="font-display text-display-lg text-ink-700 mt-16 mb-6">
        Virtues
      </h3>
      <ul className="space-y-4 list-disc pl-6">
        <li>
          <strong>Intellectual breadth.</strong> Rizal was a polymath —
          ophthalmologist, novelist, poet, linguist, sculptor, surveyor,
          engineer. He spoke 22 languages. His intellectual curiosity never
          dimmed.
        </li>
        <li>
          <strong>Moral courage.</strong> He wrote what he believed, knowing it
          could cost him his life. The novels were not published anonymously.
        </li>
        <li>
          <strong>Compassion.</strong> In Dapitan, he operated on the poor for
          free, taught children, and built a water system for the community.
        </li>
        <li>
          <strong>Discipline.</strong> He structured his days rigorously — study,
          writing, exercise, community work — even in exile.
        </li>
      </ul>

      <h3 className="font-display text-display-lg text-ink-700 mt-16 mb-6">
        Shortcomings
      </h3>
      <ul className="space-y-4 list-disc pl-6">
        <li>
          <strong>Stubbornness.</strong> Rizal&apos;s disagreements with Marcelo
          H. del Pilar over the leadership of the Propaganda Movement revealed a
          streak of inflexibility that fragmented the reformist camp.
        </li>
        <li>
          <strong>Class blind spots.</strong> His vision of reform was
          fundamentally elite-driven. He distrusted mass mobilization — a stance
          that put him at odds with Bonifacio and the Katipunan.
        </li>
        <li>
          <strong>Romantic complications.</strong> His relationships — with
          Leonor Rivera, Neneng, O-sei-san, Josephine Bracken — reveal a man
          who struggled to reconcile personal desire with his sense of mission.
        </li>
      </ul>
    </Section>
  );
}
