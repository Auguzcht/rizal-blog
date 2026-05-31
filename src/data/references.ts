/**
 * references.ts
 *
 * The single source of truth for all citations in the project.
 * Every TimelineEvent, BiographicalFact, and image must point back to
 * at least one id from this list.
 *
 * Citation format: APA 7th Edition
 * ID convention: lastnameyear (disambiguate with 'a', 'b' if needed)
 */

import type { Reference } from "@/types/reference";

// ─── Authoritative Biographies ───────────────────────────────────────────────

export const references: Reference[] = [
  {
    id: "guerrero1963",
    shortLabel: "Guerrero 1963",
    type: "book",
    authors: ["Guerrero, León María"],
    title: "The First Filipino: A Biography of José Rizal",
    year: 1963,
    publisher: "National Heroes Commission",
    notes:
      "Pulitzer Prize–level biography by the former Philippine ambassador to London. Widely considered the most literary and thoroughly researched English-language life of Rizal.",
  },
  {
    id: "palma1949",
    shortLabel: "Palma 1949",
    type: "book",
    authors: ["Palma, Rafael"],
    title: "The Pride of the Malay Race: A Biography of José Rizal",
    year: 1949,
    publisher: "Prentice-Hall",
    notes:
      "Trans. Roman Ozaeta. Original Spanish title: Biografía de Rizal (1949). One of the earliest comprehensive biographies by a Filipino scholar and statesman.",
  },
  {
    id: "ocampo1990",
    shortLabel: "Ocampo 1990",
    type: "book",
    authors: ["Ocampo, Ambeth R."],
    title: "Rizal Without the Overcoat",
    year: 1990,
    publisher: "Anvil Publishing",
    notes:
      "Pasig City. Debunks apocryphal Rizal myths and grounds the national hero in lived, human detail. Essential for the character analysis section.",
  },
  {
    id: "coates1968",
    shortLabel: "Coates 1968",
    type: "book",
    authors: ["Coates, Austin"],
    title: "Rizal: Philippine Nationalist and Martyr",
    year: 1968,
    publisher: "Oxford University Press",
    notes:
      "Hong Kong. A balanced, external scholarly perspective from a British colonial administrator turned historian.",
  },
  {
    id: "zaide1999",
    shortLabel: "Zaide & Zaide 1999",
    type: "book",
    authors: ["Zaide, Gregorio F.", "Zaide, Sonia M."],
    title: "Jose Rizal: Life, Works and Writings of a Genius, Writer, Scientist and National Hero",
    year: 1999,
    publisher: "National Book Store",
    notes:
      "Manila. The standard collegiate textbook used in Philippine universities. Chapter-by-chapter coverage of Rizal's life. Useful for cross-referencing dates.",
  },
  {
    id: "schumacher1997",
    shortLabel: "Schumacher 1997",
    type: "book",
    authors: ["Schumacher, John N."],
    title: "The Propaganda Movement, 1880–1895: The Creators of a Filipino Consciousness, the Makers of a Revolution",
    year: 1997,
    publisher: "Ateneo de Manila University Press",
    notes:
      "Quezon City. Revised edition. The definitive historical study of the movement Rizal was central to.",
  },

  // ─── Primary Sources — Rizal's Own Works ────────────────────────────────────

  {
    id: "rizal-noli",
    shortLabel: "Rizal, Noli Me Tángere (1887)",
    type: "primary",
    authors: ["Rizal, José"],
    title: "Noli Me Tángere",
    year: 1887,
    publisher: "Berliner Buchdruckerei-Actien-Gesellschaft",
    notes:
      "Berlin. First edition printed at Rizal's own expense. English translation by Harold Augenbraum (Penguin Classics, 2006) and Ma. Soledad Lacson-Locsin (Bookmark, 1996).",
    url: "https://www.gutenberg.org/ebooks/6737",
  },
  {
    id: "rizal-fili",
    shortLabel: "Rizal, El Filibusterismo (1891)",
    type: "primary",
    authors: ["Rizal, José"],
    title: "El Filibusterismo",
    year: 1891,
    publisher: "F. Meyer-van Loo Press",
    notes:
      "Ghent. Dedicated to the martyred priests Gómez, Burgos, and Zamora (GOMBURZA). English translation by Ma. Soledad Lacson-Locsin (Bookmark, 1996).",
    url: "https://www.gutenberg.org/ebooks/36488",
  },
  {
    id: "rizal-ultimo-adios",
    shortLabel: "Rizal, Mi Último Adiós (1896)",
    type: "primary",
    authors: ["Rizal, José"],
    title: "Mi Último Adiós",
    year: 1896,
    notes:
      "Composed in his cell at Fort Santiago on December 29, 1896, the night before his execution. Hidden in an oil lamp and given to his sister Trinidad. No title was written by Rizal himself; the title was added by Mariano Ponce.",
  },
  {
    id: "rizal-indolencia",
    shortLabel: "Rizal, Indolencia (1890)",
    type: "primary",
    authors: ["Rizal, José"],
    title: "Sobre la Indolencia de los Filipinos",
    year: 1890,
    journal: "La Solidaridad",
    notes:
      "Published in five installments in La Solidaridad (Madrid), July–September 1890. Rizal argues that Filipino 'indolence' is a colonial product, not an inherent trait.",
  },
  {
    id: "rizal-filipinas",
    shortLabel: "Rizal, Filipinas (1889–1890)",
    type: "primary",
    authors: ["Rizal, José"],
    title: "Filipinas Dentro de Cien Años",
    year: 1890,
    journal: "La Solidaridad",
    notes:
      "Published in La Solidaridad in four parts (1889–1890). English title: 'The Philippines a Century Hence.' Rizal forecasts eventual Philippine independence.",
  },
  {
    id: "rizal-morga",
    shortLabel: "Rizal, Morga Annotations (1890)",
    type: "primary",
    authors: ["Rizal, José"],
    title: "Sucesos de las Islas Filipinas",
    year: 1890,
    publisher: "Garnier Hermanos",
    notes:
      "Paris. Rizal's annotated reprint of Antonio de Morga's 1609 work, drawn from his research at the British Museum. Used to demonstrate pre-colonial Philippine civilization.",
  },

  // ─── Primary Sources — Letters ───────────────────────────────────────────────

  {
    id: "rizal-letters-blumentritt",
    shortLabel: "Rizal–Blumentritt Correspondence",
    type: "letter",
    authors: ["Rizal, José", "Blumentritt, Ferdinand"],
    title: "The Rizal-Blumentritt Correspondence",
    notes:
      "Two-volume collection of letters between Rizal and his Austrian friend and champion Ferdinand Blumentritt, spanning 1886–1896. Published by the José Rizal National Centennial Commission (1961).",
  },

  // ─── Institutional / Online Sources ─────────────────────────────────────────

  {
    id: "nhcp-rizal",
    shortLabel: "NHCP — Rizal",
    type: "web",
    authors: ["National Historical Commission of the Philippines"],
    title: "José Rizal: National Hero of the Philippines",
    url: "https://nhcp.gov.ph/jose-rizal/",
    accessed: "2025-03-15",
    notes:
      "Official government biographical resource. Cross-reference with Guerrero and Palma for contested dates.",
  },
  {
    id: "britannica-rizal",
    shortLabel: "Britannica — Rizal",
    type: "web",
    authors: ["Tarling, Nicholas"],
    title: "José Rizal",
    journal: "Encyclopædia Britannica",
    url: "https://www.britannica.com/biography/Jose-Rizal",
    accessed: "2025-03-15",
    notes: "Updated March 2026. Good for concise factual verification of well-established dates.",
  },

  // ─── Image Sources ───────────────────────────────────────────────────────────

  {
    id: "wikimedia-rizal-portrait",
    shortLabel: "Wikimedia Commons — Rizal portrait",
    type: "image",
    authors: ["Unknown photographer"],
    title: "Portrait of José Rizal, circa 1890",
    url: "https://commons.wikimedia.org/wiki/File:Jose_Rizal_full.jpg",
    license: "Public Domain",
    notes:
      "Pre-1923 photograph; public domain under PD-Philippines-1972 and PD-1996. Original held at the Rizal Shrine.",
  },
  {
    id: "wikimedia-rizal-execution",
    shortLabel: "Wikimedia Commons — Execution illustration",
    type: "image",
    authors: ["Unknown illustrator"],
    title: "Illustration of the execution of José Rizal at Bagumbayan, 1896",
    url: "https://commons.wikimedia.org/wiki/File:Rizal_execution.jpg",
    license: "Public Domain",
    notes: "Published before 1931 in the United States; public domain.",
  },
  {
    id: "wikimedia-noli-cover",
    shortLabel: "Wikimedia Commons — Noli Me Tángere first edition",
    type: "image",
    authors: ["Unknown"],
    title: "Cover of Noli Me Tángere, first edition (Berlin, 1887)",
    url: "https://commons.wikimedia.org/wiki/File:Noli_Me_Tangere.jpg",
    license: "Public Domain",
    notes: "Published 1887; copyright expired.",
  },
  {
    id: "wikimedia-hidalgo-portrait-1883",
    shortLabel: "Hidalgo — Rizal portrait, 1883",
    type: "image",
    authors: ["Hidalgo, Félix Resurrección"],
    title: "Portrait of José Rizal",
    year: 1883,
    url: "https://commons.wikimedia.org/wiki/File:Jose_Rizal_1883_oil_portrait_by_Felix_Resurreccion_Hidalgo.jpg",
    license: "Public Domain",
    notes:
      "Oil on canvas. Hidalgo (1855–1913) painted this in Madrid while both he and Rizal were students there. " +
      "Public domain: author died 1913, life plus 100 years expired.",
  },
  {
    id: "wikimedia-rizal-london-1888",
    shortLabel: "Wikimedia Commons — Rizal in London, 1888",
    type: "image",
    authors: ["Unknown photographer"],
    title: "Photograph of José Rizal, London, 1888",
    year: 1888,
    url: "https://commons.wikimedia.org/wiki/File:Rizal1888london2.JPG",
    license: "Public Domain",
    notes: "Pre-1923 photograph; public domain.",
  },
  {
    id: "wikimedia-calamba-house",
    shortLabel: "Wikimedia Commons — Rizal Shrine Calamba",
    type: "image",
    authors: ["Various"],
    title: "Rizal Shrine (Ancestral House), Calamba, Laguna",
    url: "https://commons.wikimedia.org/wiki/File:Rizal_Shrine_Calamba.jpg",
    license: "CC BY-SA 4.0",
    notes: "Reconstruction of the Mercado-Rizal ancestral home. Attribution required.",
  },
  {
    id: "wikimedia-heidelberg-1890s",
    shortLabel: "Wikimedia Commons — Heidelberg, 1890s",
    type: "image",
    authors: ["Unknown photographer"],
    title: "Heidelberg, seen from the Philosophenweg, Germany, 1890s",
    url: "https://commons.wikimedia.org/wiki/File:Heidelberg,_seen_from_the_Philosophenweg,_Germany,_1890s.jpg",
    license: "Public Domain",
    notes: "Pre-1923 photograph. Period-accurate to Rizal's 1886 stay in Heidelberg.",
  },
  {
    id: "wikimedia-dapitan-shrine",
    shortLabel: "Wikimedia Commons — Rizal Shrine, Dapitan",
    type: "image",
    authors: ["Unknown photographer"],
    title: "José Rizal Shrine, Dapitan, Zamboanga del Norte",
    url: "https://commons.wikimedia.org/wiki/File:Jose_Rizal_Shrine,_Dapitan,_Zamboanga_del_Norte.JPG",
    license: "Public Domain",
    notes:
      "Photograph of the Rizal Shrine at Talisay, Dapitan — the reconstruction of Rizal's exile home, school, and clinic.",
  },
  {
    id: "wikimedia-fili-manuscript",
    shortLabel: "Wikimedia Commons — El Filibusterismo manuscript",
    type: "image",
    authors: ["Rizal, José"],
    title: "First page of El Filibusterismo manuscript",
    year: 1891,
    url: "https://commons.wikimedia.org/wiki/File:First_page_of_El_filibusterismo_manuscript.jpg",
    license: "Public Domain",
    notes: "From the Works by José Rizal category on Wikimedia Commons. Pre-1923; public domain.",
  },
  {
    id: "wikimedia-ultimo-adios-engraved",
    shortLabel: "Wikimedia Commons — Mi Último Adiós (engraved)",
    type: "image",
    authors: ["Unknown photographer"],
    title: "Engraved bronze plate of Mi Último Adiós, Rizal Park, Manila",
    url: "https://commons.wikimedia.org/wiki/File:Engraved_-_Mi_Ultimo_Adios.JPG",
    license: "CC BY-SA 3.0",
    notes:
      "Photograph of the engraved bronze rendering of the poem at Rizal Park. " +
      "CC BY-SA 3.0 requires attribution and share-alike. " +
      "The original manuscript (unsigned, undated, untitled) is at the National Library of the Philippines " +
      "and has not been digitized for public distribution.",
  },
  {
    id: "wikimedia-teodora-alonso",
    shortLabel: "Wikimedia Commons — Teodora Alonso",
    type: "image",
    authors: ["Unknown photographer"],
    title: "Portrait of Teodora Alonso Realonda y Quintos",
    url: "https://commons.wikimedia.org/wiki/File:Teodora_Alonzo_Mercado_Rizal.jpg",
    license: "Public Domain",
    notes:
      "Pre-1923 photograph of Rizal's mother. Original resolution is 271×365px. " +
      "Note the category spelling: 'Alonzo' (with a z) is the variant used in Commons.",
  },
  {
    id: "wikimedia-josephine-bracken",
    shortLabel: "Wikimedia Commons — Josephine Bracken",
    type: "image",
    authors: ["Unknown photographer"],
    title: "Portrait of Josephine Bracken",
    url: "https://commons.wikimedia.org/wiki/File:Josephine_Bracken_BR.jpg",
    license: "Public Domain",
    notes:
      "Late 19th-century photograph. Bracken died March 1902; " +
      "any photograph of her is pre-1923 and public domain in the United States.",
  },
];

// ─── Lookup helper ────────────────────────────────────────────────────────────

export const referencesById: Record<string, Reference> = Object.fromEntries(
  references.map((r) => [r.id, r])
);

/**
 * Returns a formatted APA 7 citation string for a given reference id.
 * Used by the ReferencesSection and the Cite tooltip.
 */
export function formatReferenceAPA(id: string): string {
  const ref = referencesById[id];
  if (!ref) {
    if (import.meta.env.DEV) {
      console.warn(`[references] Unknown reference id: "${id}"`);
    }
    return `[Unknown reference: ${id}]`;
  }

  const authors = ref.authors
    .map((a) => {
      const parts = a.split(", ");
      return parts.length === 2 ? `${parts[0]}, ${parts[1][0]}.` : a;
    })
    .join(", & ");

  const year = ref.year ? `(${ref.year})` : "(n.d.)";
  const title =
    ref.type === "article" || ref.type === "web" || ref.type === "letter"
      ? ref.title
      : `*${ref.title}*`;
  const source = ref.publisher ?? ref.journal ?? "";
  const url = ref.url ? ` ${ref.url}` : "";

  return `${authors} ${year}. ${title}. ${source}${url}`.trim().replace(/\.\s*$/, ".").replace(/\s+/g, " ");
}
