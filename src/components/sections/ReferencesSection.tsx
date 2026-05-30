import { Section } from "./Section";

export function ReferencesSection() {
  return (
    <Section
      id="references"
      eyebrow="Bibliography"
      title="Sources and References"
    >
      <p>
        The following sources were consulted in the preparation of this
        narrative. All historical claims are traceable to at least one of the
        works listed below.
      </p>

      <ol className="mt-8 space-y-4 list-decimal pl-6">
        {[
          {
            id: "palma1949",
            label: "Palma, R. (1949).",
            title: "The Pride of the Malay Race: A Biography of José Rizal.",
          },
          {
            id: "guerrero1963",
            label: "Guerrero, L. Ma. (1963).",
            title: "The First Filipino: A Biography of José Rizal.",
          },
          {
            id: "ocampo1990",
            label: "Ocampo, A. (1990).",
            title: "Rizal Without the Overcoat.",
          },
          {
            id: "coates1968",
            label: "Coates, A. (1968).",
            title: "Rizal: Philippine Nationalist and Martyr.",
          },
          {
            id: "schumacher1973",
            label: "Schumacher, J. N. (1973).",
            title: "The Propaganda Movement, 1880–1895.",
          },
        ].map((ref) => (
          <li key={ref.id} id={`ref-${ref.id}`} className="font-body text-body text-ink-900">
            <strong className="text-ink-700">{ref.label}</strong>{" "}
            <em>{ref.title}</em>
          </li>
        ))}
      </ol>

      <p className="mt-12 text-caption text-sepia-600">
        Additional references to be added as content is finalized and sourced.
      </p>
    </Section>
  );
}
