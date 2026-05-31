import { ExternalLink } from "lucide-react";
import { Section } from "./Section";
import { references } from "@/data/references";

function formatAuthors(authors: string[]): string {
  return authors.length > 2
    ? `${authors[0]} et al.`
    : authors.join(" & ");
}

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

      <ol className="mt-8 space-y-3 md:space-y-4 pl-4 md:pl-6 text-sm md:text-base">
        {references.map((ref) => (
          <li
            key={ref.id}
            id={`ref-${ref.id}`}
            className="font-body text-ink-900 leading-relaxed break-all md:break-words"
          >
            <span className="text-ink-700 font-medium">
              {formatAuthors(ref.authors)}
            </span>
            {ref.year && <span> ({ref.year}).</span>}
            {" "}
            <em>{ref.title}</em>.
            {ref.publisher && <span> {ref.publisher}.</span>}
            {ref.journal && <span> <em>{ref.journal}</em>.</span>}
            {ref.url && (
              <>
                {" "}
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline text-gold-500 hover:text-blood-600 transition-colors underline underline-offset-2 break-all"
                >
                  <ExternalLink size={12} />
                  {ref.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
