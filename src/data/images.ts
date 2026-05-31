/**
 * images.ts
 *
 * Image manifest for the blog. Every image used in sections and the timeline
 * must have an entry here with its local path, alt text, caption, and source.
 *
 * ─── HOW TO ADD AN IMAGE ─────────────────────────────────────────────────────
 *
 * 1. Find the image at the Wikimedia Commons URL listed below.
 * 2. Download the highest available resolution.
 * 3. Convert to WebP using Squoosh (https://squoosh.app/) or:
 *      npx @squoosh/cli --webp '{"quality":82}' <input>.jpg
 * 4. Save to the appropriate subdirectory under /public/images/.
 * 5. Verify the sourceId points to an entry in references.ts.
 *
 * ─── DIRECTORY STRUCTURE under /public/images/ ───────────────────────────────
 *
 *   rizal/          ← Portraits of Rizal himself
 *   family/         ← Parents, siblings, Josephine
 *   travels/        ← Europe, Japan, Hong Kong
 *   dapitan/        ← Exile period, school, house
 *   execution/      ← Bagumbayan, trial
 *   works/          ← Book covers, manuscripts, La Solidaridad
 *   places/         ← Calamba, Heidelberg, Madrid, Berlin
 *
 * ─── LICENSING VERIFICATION ──────────────────────────────────────────────────
 *
 * All images below are in the Public Domain or CC BY-SA 4.0.
 * PD: Pre-1931 publications are public domain in the United States.
 * PD-Philippines-1972: Pre-November 14, 1972 works are PD in the Philippines.
 * CC BY-SA 4.0: Attribution + ShareAlike required. Use the caption field.
 */

import type { Image } from "@/types/image";

export const images: Image[] = [
  
  // ─── Family ──────────────────────────────────────────────────────────────────
  
  {
  id: "teodora-alonso-portrait",
  src: "/images/family/teodora-alonso.webp",
  alt: "Portrait photograph of Teodora Alonso Realonda, mother of José Rizal",
  caption:
    "Teodora Alonso Realonda y Quintos (1827–1911), Rizal's mother. " +
    "She taught him to read at age three. Her wrongful imprisonment in 1871 " +
    "was Rizal's first encounter with colonial injustice.",
  sourceId: "wikimedia-teodora-alonso",
  aspect: "3/4",
  objectPosition: "top",
  wikilinkForDownload:
    "https://commons.wikimedia.org/wiki/File:Teodora_Alonzo_Mercado_Rizal.jpg",
  license: "Public Domain",
  downloadStatus: "TODO",
  notes:
    "Original is 271×365px — small but the best available. " +
    "Do not upscale; render at native size in a constrained container.",
  },
  {
    id: "josephine-bracken-portrait",
    src: "/images/family/josephine-bracken.webp",
    alt: "Portrait photograph of Josephine Bracken, Rizal's wife, circa late 19th century",
    caption:
      "Josephine Bracken (1876–1902). Born in Hong Kong to Irish parents, " +
      "she arrived in Dapitan in February 1895 with her adoptive father seeking " +
      "ophthalmic treatment. She chose to stay. They married the night before his execution.",
    sourceId: "wikimedia-josephine-bracken",
    aspect: "3/4",
    objectPosition: "top",
    wikilinkForDownload:
      "https://commons.wikimedia.org/wiki/File:Josephine_Bracken_BR.jpg",
    license: "Public Domain",
    downloadStatus: "TODO",
    notes:
      "Pre-1902 photograph (Bracken died March 1902). Public domain under PD-1923. " +
      "Verify the exact license tag on the file page before publishing.",
  },

  // ─── Portraits of Rizal ───────────────────────────────────────────────────

  {
    id: "rizal-portrait-1890",
    src: "/images/rizal/rizal-portrait-c1890.webp",
    alt: "Portrait of José Rizal in a dark suit, circa 1890, standing with hands at sides",
    caption: "José Rizal, c. 1890. Unknown photographer.",
    sourceId: "wikimedia-rizal-portrait",
    aspect: "3/4",
    objectPosition: "top",
    wikilinkForDownload: "https://commons.wikimedia.org/wiki/File:Jose_Rizal_full.jpg",
    license: "Public Domain",
    downloadStatus: "TODO",
  },
  {
    id: "rizal-portrait-1883-hidalgo",
    src: "/images/rizal/rizal-hidalgo-portrait-1883.webp",
    alt: "Oil portrait of José Rizal painted in Madrid in 1883 by Filipino artist Félix Resurrección Hidalgo",
    caption:
      "Portrait of José Rizal, 1883. Oil on canvas by Félix Resurrección Hidalgo. " +
      "Painted in Madrid while both men were students. Hidalgo would win a gold medal " +
      "at the Madrid Exposition the following year — an achievement Rizal toasted in his famous 1884 speech.",
    sourceId: "wikimedia-hidalgo-portrait-1883",
    aspect: "3/4",
    objectPosition: "top",
    wikilinkForDownload:
      "https://commons.wikimedia.org/wiki/File:Jose_Rizal_1883_oil_portrait_by_Felix_Resurreccion_Hidalgo.jpg",
    license: "Public Domain",
    downloadStatus: "TODO",
  },
  {
    id: "rizal-london-1888",
    src: "/images/travels/rizal-london-1888.webp",
    alt: "Photograph of José Rizal taken in London in 1888, seated and wearing a suit",
    caption: "Rizal in London, 1888. He spent this period at the British Museum annotating Morga's Sucesos.",
    sourceId: "wikimedia-rizal-london-1888",
    aspect: "3/4",
    objectPosition: "top",
    wikilinkForDownload:
      "https://commons.wikimedia.org/wiki/File:Rizal1888london2.JPG",
    license: "Public Domain",
    downloadStatus: "TODO",
  },

  // ─── Places ───────────────────────────────────────────────────────────────

  {
    id: "calamba-house",
    src: "/images/places/rizal-shrine-calamba.webp",
    alt: "The Rizal Shrine in Calamba, Laguna — reconstruction of the Mercado-Rizal ancestral home",
    caption: "Rizal Shrine (ancestral house), Calamba, Laguna. The original was burned during the Philippine–American War; the current structure is a reconstruction.",
    sourceId: "wikimedia-calamba-house",
    aspect: "16/9",
    wikilinkForDownload: "https://commons.wikimedia.org/wiki/File:Rizal_Shrine_Calamba.jpg",
    license: "CC BY-SA 4.0",
    downloadStatus: "TODO",
  },
  {
    id: "heidelberg-1890s",
    src: "/images/places/heidelberg-1890s.webp",
    alt: "Panoramic view of Heidelberg seen from the Philosophenweg, Germany, 1890s",
    caption:
      "Heidelberg, seen from the Philosophenweg, c. 1890s. " +
      "Rizal studied ophthalmology here under Dr. Otto Becker in 1886 " +
      "and wrote 'A las Flores de Heidelberg' during this period.",
    sourceId: "wikimedia-heidelberg-1890s",
    aspect: "16/9",
    wikilinkForDownload:
      "https://commons.wikimedia.org/wiki/File:Heidelberg,_seen_from_the_Philosophenweg,_Germany,_1890s.jpg",
    license: "Public Domain",
    downloadStatus: "TODO",
  },
  {
    id: "dapitan-casa-real",
    src: "/images/dapitan/dapitan-talisay-house.webp",
    alt: "The Rizal Shrine in Talisay, Dapitan, Zamboanga del Norte — site of Rizal's exile home and school",
    caption:
      "José Rizal Shrine, Dapitan, Zamboanga del Norte. " +
      "On this property Rizal built his home, school, and clinic during his exile (1892–1896).",
    sourceId: "wikimedia-dapitan-shrine",
    aspect: "16/9",
    wikilinkForDownload:
      "https://commons.wikimedia.org/wiki/File:Jose_Rizal_Shrine,_Dapitan,_Zamboanga_del_Norte.JPG",
    license: "Public Domain",
    downloadStatus: "TODO",
  },
  {
    id: "bagumbayan-field",
    src: "/images/execution/bagumbayan-1896-illustration.webp",
    alt: "19th-century illustration of the execution of José Rizal at Bagumbayan Field, December 30, 1896",
    caption: "Execution of José Rizal, Bagumbayan Field (now Rizal Park), December 30, 1896. Contemporary illustration.",
    sourceId: "wikimedia-rizal-execution",
    aspect: "4/3",
    wikilinkForDownload: "https://commons.wikimedia.org/wiki/File:Rizal_execution.jpg",
    license: "Public Domain",
    downloadStatus: "TODO",
  },

  // ─── Works ────────────────────────────────────────────────────────────────

  {
    id: "noli-first-edition",
    src: "/images/works/noli-first-edition-1887.webp",
    alt: "Cover and title page of Noli Me Tángere, first edition, Berlin 1887",
    caption:
      "Noli Me Tángere, first edition. Berlin: Berliner Buchdruckerei-Actien-Gesellschaft, 1887. " +
      "Printed at Rizal's own expense; no Spanish publisher would touch it.",
    sourceId: "wikimedia-noli-cover",
    aspect: "3/4",
    wikilinkForDownload:
      "https://commons.wikimedia.org/wiki/File:Noli_Me_Tangere.jpg",
    license: "Public Domain",
    downloadStatus: "TODO",
  },
  {
    id: "noli-page-one-manuscript",
    src: "/images/works/noli-page-one-1887.webp",
    alt: "First page of the 1887 first edition of Noli Me Tángere in Rizal's original Spanish",
    caption:
      "Page 1 of the first edition, Noli Me Tángere (1887). The novel opens in the house " +
      "of Captain Tiago in Binondo — a society party that sets the colonial world Rizal is dissecting.",
    sourceId: "wikimedia-noli-cover",
    aspect: "4/3",
    wikilinkForDownload:
      "https://commons.wikimedia.org/wiki/File:Noli_me_t%C3%A1ngere_(Jos%C3%A9_Rizal)_(page_1_crop).jpg",
    license: "Public Domain",
    downloadStatus: "TODO",
  },
  {
    id: "ultimo-adios-engraved",
    src: "/images/works/ultimo-adios-engraved.webp",
    alt: "Bronze engraving of Mi Último Adiós at Rizal Park, Manila",
    caption:
      "Mi Último Adiós, engraved in bronze at Rizal Park, Manila. " +
      "The original manuscript (9.5 × 15 cm, unsigned and untitled by Rizal) " +
      "is held at the National Library of the Philippines.",
    sourceId: "wikimedia-ultimo-adios-engraved",
    aspect: "4/3",
    wikilinkForDownload:
      "https://commons.wikimedia.org/wiki/File:Engraved_-_Mi_Ultimo_Adios.JPG",
    license: "CC BY-SA 3.0",
    downloadStatus: "TODO",
    notes:
      "CC BY-SA 3.0 — must credit the photographer and license in the caption. " +
      "The original manuscript is too fragile for public display; no scan exists on Wikimedia Commons.",
  },
  {
    id: "fili-first-page",
    src: "/images/works/fili-first-page-1891.webp",
    alt: "First page of the El Filibusterismo manuscript, 1891",
    caption:
      "First page of El Filibusterismo (1891), Rizal's second and darker novel, " +
      "dedicated to the martyred priests of GOMBURZA.",
    sourceId: "wikimedia-fili-manuscript",
    aspect: "4/3",
    wikilinkForDownload:
      "https://commons.wikimedia.org/wiki/File:First_page_of_El_filibusterismo_manuscript.jpg",
    license: "Public Domain",
    downloadStatus: "TODO",
  },
];

// ─── Lookup helper ────────────────────────────────────────────────────────────

export const imagesById: Record<string, Image> = Object.fromEntries(
  images.map((img) => [img.id, img])
);

// ─── Download checklist (for development) ────────────────────────────────────

/**
 * During development, call this in a useEffect or in a dev script to get
 * a list of images that still need to be downloaded.
 * Remove before production build.
 */
export function getImageDownloadChecklist() {
  return images
    .filter((img) => img.downloadStatus === "TODO")
    .map((img) => ({
      id: img.id,
      dest: `public${img.src}`,
      source: img.wikilinkForDownload,
      license: img.license,
    }));
}
