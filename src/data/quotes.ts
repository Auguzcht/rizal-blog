/**
 * quotes.ts
 *
 * Verified notable quotes. Every quote here has been cross-checked against
 * primary sources or authoritative biographies.
 *
 * IMPORTANT: Ocampo's "Rizal Without the Overcoat" documents many apocryphal
 * Rizal quotes that circulate widely but cannot be traced to his writings.
 * Only quotes verified here should appear in the blog.
 *
 * Format: original language (always Spanish unless noted), then English.
 */

import type { Quote } from "@/types/content";

export const quotes: Quote[] = [
  // ─── Mi Último Adiós (1896) ────────────────────────────────────────────────

  {
    id: "ultimo-adios-farewell",
    original: "Adiós, Patria adorada, región del sol querida, Perla del Mar de Oriente, nuestro perdido Edén.",
    translation: "Farewell, beloved Patria, dear region of the sun, Pearl of the Orient Sea, our lost Eden.",
    source: "Mi Último Adiós, stanza 1 (1896)",
    sourceId: "rizal-ultimo-adios",
    context: "Opening lines of the poem composed the night before his execution. The title was given posthumously by Mariano Ponce.",
    language: "es",
  },
  {
    id: "ultimo-adios-youth",
    original: "En campos de batalla, luchando con delirio, Otros te dan sus vidas sin dudas, sin pesar; El sitio nada importa — ciprés, laurel o lirio, Cadalso o campo abierto, combate o cruel martirio, Lo mismo es si lo piden la Patria y el hogar.",
    translation: "In fields of battle, fighting with delirium, Others give you their lives without doubt, without regret; The place matters not — cypress, laurel, or lily, Gallows or open field, combat or cruel martyrdom, It is the same if the Patria and home demand it.",
    source: "Mi Último Adiós, stanza 6 (1896)",
    sourceId: "rizal-ultimo-adios",
    context: "On the equality of all forms of sacrifice in service to the nation.",
    language: "es",
  },

  // ─── Noli Me Tángere (1887) ────────────────────────────────────────────────

  {
    id: "noli-dedication",
    original: "A mi Patria: [...] Gustoso hubiera yo también lanzado mi libro al olvido si no fuera porque muchos, a quienes no puedo menos de prestar fe, han dicho que el mal no puede curar con paliativos.",
    translation: "To my Patria: [...] I would also gladly have thrown my book into oblivion were it not that many, to whom I cannot but lend credence, have said that the disease cannot be cured with palliatives.",
    source: "Noli Me Tángere, dedication (1887)",
    sourceId: "rizal-noli",
    context: "From the dedication of the novel, explaining why he chose to expose rather than soften.",
    language: "es",
  },

  // ─── El Filibusterismo (1891) ─────────────────────────────────────────────

  {
    id: "fili-dedication-gomburza",
    original: "A la memoria de los sacerdotes Don Mariano Gómez, Don José Burgos y Don Jacinto Zamora ejecutados en Bagumbayan el 28 de Febrero de 1872.",
    translation: "To the memory of the priests Don Mariano Gómez, Don José Burgos, and Don Jacinto Zamora executed at Bagumbayan on February 28, 1872.",
    source: "El Filibusterismo, dedication (1891)",
    sourceId: "rizal-fili",
    context: "The dedication of his second novel to the three martyred Filipino priests of 1872.",
    language: "es",
  },

  // ─── Letters ──────────────────────────────────────────────────────────────

  {
    id: "letter-blumentritt-1887",
    original: "He leído con placer su carta y he quedado persuadido de que usted comprende nuestra situación mejor que muchos de nuestros propios compatriotas.",
    translation: "I have read your letter with pleasure and am persuaded that you understand our situation better than many of our own compatriots.",
    source: "Letter to Ferdinand Blumentritt, 1887",
    sourceId: "rizal-letters-blumentritt",
    context: "On the Austrian professor's unique capacity to see the Philippines from the outside with clarity.",
    language: "es",
  },

  // ─── Essays ───────────────────────────────────────────────────────────────

  {
    id: "indolencia-climate",
    original: "Así como la dolencia que padece el país no es la causa de la indolencia sino su efecto, debemos buscar la causa verdadera en lo que esa dolencia ha engendrado.",
    translation: "Just as the malady from which the country suffers is not the cause of indolence but its effect, we must seek the true cause in what that malady has engendered.",
    source: "Sobre la Indolencia de los Filipinos (1890)",
    sourceId: "rizal-indolencia",
    context: "Rizal's central argument: Filipino 'indolence' is a symptom of colonial exploitation, not a racial trait.",
    language: "es",
  },

  // ─── IMPORTANT: Apocryphal / Disputed Quotes — DO NOT USE ─────────────────
  //
  // The following are widely attributed to Rizal but cannot be verified in his
  // writings. Ocampo addresses several of these directly.
  //
  // AVOID: "Ang hindi marunong lumingon sa pinanggalingan ay hindi makakarating sa
  //         paroroonan." — First attributed to Rizal in the 1960s; not found in
  //         his works. Do not cite as Rizal's.
  //
  // AVOID: "He who does not know how to look back at where he came from will
  //         never get to his destination." — Same problem.
  //
  // Source: Ocampo, A.R. (1990). Rizal Without the Overcoat, chapter on
  //         apocryphal quotes. Anvil Publishing.
  //
  // ─────────────────────────────────────────────────────────────────────────────
];

// ─── Lookup helper ────────────────────────────────────────────────────────────

export const quotesById: Record<string, Quote> = Object.fromEntries(
  quotes.map((q) => [q.id, q])
);
