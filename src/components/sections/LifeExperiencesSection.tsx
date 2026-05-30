import { Section } from "./Section";

export function LifeExperiencesSection() {
  return (
    <Section
      id="timeline"
      eyebrow="IV. Life Experiences"
      title="The Arc of a Life"
      className="max-w-full"
    >
      <p className="max-w-[65ch]">
        Rizal&apos;s journey from Calamba to Bagumbayan spans continents,
        disciplines, and transformations. The timeline below traces the key
        events that shaped his character — from a precocious child in Laguna to
        a martyr whose death ignited a nation.
      </p>

      {/* Timeline placeholder — will be replaced by <Timeline /> component */}
      <div className="mt-16 border-l-2 border-sepia-400 pl-8 space-y-12">
        {[
          { date: "June 19, 1861", title: "Born in Calamba, Laguna" },
          { date: "1872", title: "Enters Ateneo Municipal de Manila" },
          { date: "1882", title: "Departs for Spain" },
          { date: "March 1887", title: "Noli Me Tángere published in Berlin" },
          { date: "September 1891", title: "El Filibusterismo published in Ghent" },
          { date: "July 1892", title: "Exiled to Dapitan" },
          { date: "December 30, 1896", title: "Execution at Bagumbayan" },
        ].map((event) => (
          <div key={event.date} className="relative">
            <div className="absolute -left-[calc(2rem+9px)] top-1 h-4 w-4 rounded-full bg-parchment-200 border-2 border-sepia-400" />
            <p className="font-serif-i italic text-caption text-sepia-600 mb-1">
              {event.date}
            </p>
            <p className="font-body text-body-lg text-ink-700">{event.title}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
