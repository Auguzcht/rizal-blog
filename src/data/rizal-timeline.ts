/**
 * rizal-timeline.ts
 *
 * The chronological backbone of the blog. Every event has a source.
 * Build this fully before building the Timeline component —
 * the content count determines the component's scope.
 *
 * Sorted chronologically. Do not reorder.
 * Emphasis levels: "default" | "pivotal" | "tragic"
 */

import type { TimelineEvent } from "@/types/timeline";

export const rizalTimeline: TimelineEvent[] = [
  // ─── Era: Early Life ─────────────────────────────────────────────────────────

  {
    id: "birth-1861",
    date: "1861-06-19",
    displayDate: "June 19, 1861",
    era: "early",
    title: "Born in Calamba, Laguna",
    body: `José Protasio Rizal Mercado y Alonso Realonda was born in the prosperous town of Calamba, Laguna, the seventh of eleven children born to Francisco Mercado Rizal and Teodora Alonso y Quintos. His family belonged to the *principalía*, the local educated elite, with Chinese (through paternal great-great-grandfather Domingo Lamco), Spanish, and Malay ancestry converging in his blood. His father, whom Rizal called "a model of fathers," was a tenant farmer of Dominican-owned hacienda lands; his mother, whom Rizal called "loving and prudent," had studied at the Colegio de Santa Rosa and was, by the standards of her era, exceptionally learned.`,
    image: {
      src: "/images/places/rizal-shrine-calamba.webp",
      alt: "Reconstruction of the Mercado-Rizal ancestral house in Calamba, Laguna",
      caption: "The Rizal Shrine (ancestral house reconstruction), Calamba, Laguna",
      sourceId: "wikimedia-calamba-house",
    },
    sourceIds: ["guerrero1963", "palma1949", "nhcp-rizal"],
    emphasis: "default",
  },

  {
    id: "early-education-1864",
    date: "1864",
    displayDate: "c. 1864–1869",
    era: "early",
    title: "Teodora's Classroom — His First School",
    body: `Before any schoolmaster touched him, Rizal was shaped entirely by his mother. Teodora Alonso taught him to read and write in Spanish and Tagalog by age three, recited poetry to him before he could understand it, and sat beside him as he drew with pencil and molded figures in clay at age five. This domestic education was deliberate: Teodora believed that character preceded curriculum, and she instilled in her son a reverence for language, a habit of observation, and an early moral imagination that no formal institution would match.`,
    image: {
      src: "/images/family/teodora-alonso.webp",
      alt: "Portrait photograph of Teodora Alonso Realonda, mother of José Rizal",
      caption: "Teodora Alonso Realonda y Quintos (1827–1911), Rizal's first and most formative teacher.",
      sourceId: "wikimedia-teodora-alonso",
      objectPosition: "top",
    },
    sourceIds: ["guerrero1963", "zaide1999"],
    emphasis: "default",
  },

  {
    id: "binan-school-1869",
    date: "1869",
    displayDate: "1869–1870",
    era: "early",
    title: "Biñan: His First School Outside Home",
    body: `At eight years old, Rizal traveled with his older brother Paciano to Biñan, Laguna to study under Maestro Justiniano Aquino Cruz. Cruz's methods were strict — boys studied Latin and Spanish grammar by memory, with the *palmeta* (wooden paddle) for errors — yet Rizal surpassed every classmate within months, earning him the combined admiration and resentment of his peers. The Biñan period is notable less for what he learned than for revealing his competitive temperament: he entered his first *pelota* game against a boy twice his age and won, establishing early the pattern of outperforming expectations.`,
    sourceIds: ["guerrero1963", "zaide1999"],
    emphasis: "default",
  },

  {
    id: "teodora-imprisoned-1871",
    date: "1871",
    displayDate: "1871",
    era: "early",
    title: "His Mother Imprisoned — Injustice Becomes Personal",
    body: `When Rizal was ten, his mother Teodora was arrested by the Civil Guard, accused of complicity in an alleged poisoning attempt on her half-brother's wife — a charge Rizal's family and later biographers considered fabricated or grossly distorted. She was imprisoned in Santa Cruz, Laguna for two and a half years without adequate trial. For the young Rizal, the arrest was an introduction to colonial arbitrary power in the most intimate possible terms: the state's violence against his own mother. Guerrero argues this episode was the first seed of Rizal's understanding of injustice as systemic, not individual.`,
    sourceIds: ["guerrero1963", "ocampo1990"],
    emphasis: "pivotal",
  },

  {
    id: "gomburza-1872",
    date: "1872-02-17",
    displayDate: "February 17, 1872",
    era: "early",
    title: "GOMBURZA Executed — A Nation Watches",
    body: `Three Filipino secular priests — Fathers Mariano Gómez, José Burgos, and Jacinto Zamora — were publicly garroted at Bagumbayan on charges of complicity in the Cavite Mutiny. Rizal was eleven. His older brother Paciano had been a servant and student of Father Burgos, and the execution placed the Mercado-Rizal family under colonial suspicion for a generation. Rizal would later dedicate *El Filibusterismo* to the memory of these three men, writing that their deaths "opened my eyes and made me see the injustice." The event gave him his political consciousness before he had a politics.`,
    sourceIds: ["guerrero1963", "schumacher1997", "rizal-fili"],
    emphasis: "pivotal",
  },

  // ─── Era: Education ──────────────────────────────────────────────────────────

  {
    id: "ateneo-1872",
    date: "1872",
    displayDate: "1872–1877",
    era: "education",
    title: "Ateneo Municipal de Manila",
    body: `Rizal entered the Ateneo Municipal de Manila in 1872, initially denied enrollment because he arrived late and because of suspicion cast on the family by the GOMBURZA affair. A Jesuit rector eventually admitted him. Under the Jesuits' rigorous *ratio studiorum*, he excelled in all subjects, winning gold medals in multiple disciplines and graduating with the highest grade, *Sobresaliente* (Outstanding), in 1877. He studied under Father Francisco de Paula Sánchez, who recognized and nurtured his literary gifts, encouraging him to write poetry in Spanish, Tagalog, and Latin. By graduation, Rizal had already written a Spanish drama, *El Consejo de los Dioses*, which won a prize from the Manila Liceo Artístico-Literario.`,
    sourceIds: ["guerrero1963", "palma1949", "zaide1999"],
    emphasis: "default",
  },

  {
    id: "ust-1877",
    date: "1877",
    displayDate: "1877–1882",
    era: "education",
    title: "University of Santo Tomas — Medicine and Philosophy",
    body: `After Ateneo, Rizal enrolled at the University of Santo Tomas (UST) to pursue Medicine and Philosophy and Letters. The experience was a stark contrast: the Dominican professors were resistant to Filipino excellence, and Rizal found the academic atmosphere racially charged — Filipino students were treated with condescension by Spanish students and instructors alike. This humiliation accelerated his political awakening. He completed his pre-medical and philosophy coursework but left without finishing his degree in 1882, deciding to complete his medical education in Spain, partly to escape the hostile environment and partly to pursue the European exposure he believed the Philippines needed its future leaders to have.`,
    sourceIds: ["guerrero1963", "zaide1999"],
    emphasis: "default",
  },

  // ─── Era: Abroad ─────────────────────────────────────────────────────────────

  {
    id: "departure-1882",
    date: "1882-05",
    displayDate: "May 1882",
    era: "abroad",
    title: "Secret Departure for Spain",
    body: `At twenty-one, Rizal boarded a ship for Spain without the knowledge of his father, who would have forbidden it. Only Paciano knew — it was Paciano who financed the journey with money earned from farming. The secrecy was deliberate: a young Filipino man traveling to Europe to study was viewed by colonial authorities with suspicion, especially one connected to the Burgos affair. Rizal sailed via Singapore and Aden, arriving in Barcelona before settling in Madrid, where he enrolled at the Universidad Central de Madrid. The departure marks the beginning of his most intellectually transformative decade.`,
    sourceIds: ["guerrero1963", "palma1949"],
    emphasis: "default",
  },

  {
    id: "madrid-medicine-1884",
    date: "1884",
    displayDate: "June 1884",
    era: "abroad",
    title: "Licentiate in Medicine — And a Famous Toast",
    body: `In June 1884, Rizal received his Licentiate in Medicine from the Universidad Central de Madrid. That same month, at a banquet honoring Filipino painters Juan Luna and Félix Resurrección Hidalgo, who had won gold and silver medals respectively at the Madrid Exposition, Rizal delivered an impromptu speech that electrified the room. He argued that the painters' achievement proved Filipino capacity for the highest artistic expression — a direct rebuttal of Spanish colonial claims of Filipino racial inferiority. The toast made him a leading voice among the ilustrado community in Madrid practically overnight.`,
    image: {
      src: "/images/rizal/rizal-hidalgo-portrait-1883.webp",
      alt: "Oil portrait of José Rizal painted in Madrid in 1883 by Félix Resurrección Hidalgo",
      caption: "Rizal in Madrid, 1883. Portrait by Félix Resurrección Hidalgo — the same artist whose gold medal the following year Rizal would famously toast.",
      sourceId: "wikimedia-hidalgo-portrait-1883",
      objectPosition: "top",
    },
    sourceIds: ["guerrero1963", "ocampo1990"],
    emphasis: "pivotal",
  },

  {
    id: "madrid-philosophy-1885",
    date: "1885",
    displayDate: "1885",
    era: "abroad",
    title: "Licentiate in Philosophy and Letters",
    body: `The following year, Rizal completed a second degree — a Licentiate in Philosophy and Letters, also from the Universidad Central de Madrid. The double degree was unusual even by European standards; for a young man from a colonized province of the Spanish empire, it was extraordinary. The Philosophy degree deepened his engagement with Enlightenment thought, positivism, and the historical writing that would shape his Morga annotations. By age twenty-four, Rizal had surpassed the educational attainment of most of the Spanish colonial officials who governed his country.`,
    sourceIds: ["guerrero1963", "zaide1999"],
    emphasis: "default",
  },

  {
    id: "heidelberg-berlin-1886",
    date: "1886",
    displayDate: "1885–1887",
    era: "abroad",
    title: "Paris, Heidelberg, Leipzig, and Berlin",
    body: `After Madrid, Rizal undertook a study tour of Europe. In Paris he worked under renowned ophthalmologist Dr. Louis de Wecker; in Heidelberg he studied under Dr. Otto Becker at the University Eye Hospital — he had chosen ophthalmology specifically to treat his mother's failing sight. In Heidelberg he wrote the poem "A las Flores de Heidelberg" and celebrated his twenty-fifth birthday with the family of Pastor Karl Ullmer in Wilhelmsfeld. In Leipzig and then Berlin, he completed his research on pre-colonial Philippine civilization, attending lectures at the Ethnological Society of Berlin and refining the manuscript that would become *Noli Me Tángere*.`,
    image: {
      src: "/images/places/heidelberg-1890s.webp",
      alt: "Panoramic view of Heidelberg seen from the Philosophenweg, Germany, 1890s",
      caption: "Heidelberg, seen from the Philosophenweg, c. 1890s. Rizal studied here under Dr. Otto Becker in 1886.",
      sourceId: "wikimedia-heidelberg-1890s",
    },
    sourceIds: ["guerrero1963", "coates1968"],
    emphasis: "default",
  },

  {
    id: "noli-published-1887",
    date: "1887-03",
    displayDate: "March 1887",
    era: "abroad",
    title: "Noli Me Tángere Published in Berlin",
    body: `After years of writing and revising — often by candlelight, sustained by the financial help of friends including Máximo Viola who lent him the printing costs — Rizal published *Noli Me Tángere* in Berlin in March 1887. The novel was immediately banned by colonial authorities in the Philippines. Its depiction of friar abuses, racial hierarchy, and colonial hypocrisy, filtered through the tragic story of Crisostomo Ibarra, circulated secretly across the archipelago, passed hand to hand, copied by hand when printed copies were seized. Before it was ever discussed in a lecture hall, it was already transforming Filipino consciousness.`,
    image: {
      src: "/images/works/noli-first-edition-1887.webp",
      alt: "Cover of the first edition of Noli Me Tángere, published in Berlin, 1887",
      caption: "Noli Me Tángere, first edition. Berlin: Berliner Buchdruckerei-Actien-Gesellschaft, 1887.",
      sourceId: "wikimedia-noli-cover",
    },
    sourceIds: ["guerrero1963", "rizal-noli", "ocampo1990"],
    emphasis: "pivotal",
  },

  {
    id: "first-return-1887",
    date: "1887-08",
    displayDate: "August 1887",
    era: "abroad",
    title: "First Return to the Philippines",
    body: `Rizal returned to Calamba in August 1887 and immediately set up a medical practice, offering free treatment to the poor while charging those who could afford it. He saw patients, resumed his writing and artistic work, and reconnected with his family. The colonial government, alerted to the author of the *Noli*, surveilled him. The friars preached against him from pulpits. His patients were pressured not to see him. Within months, the harassment expanded to his entire family, including efforts by the Dominican order to evict the Mercado-Rizal family from the hacienda lands they had farmed for generations — the beginning of what would become the Calamba Agrarian Case.`,
    sourceIds: ["guerrero1963", "palma1949"],
    emphasis: "default",
  },

  {
    id: "second-departure-1888",
    date: "1888-02",
    displayDate: "February 1888",
    era: "abroad",
    title: "Second Departure — Japan, America, and London",
    body: `Feeling the noose of colonial harassment tightening around his family, Rizal departed for Europe again in February 1888. He traveled via Japan, where he spent several weeks and encountered a culture that fascinated him — particularly its rapid modernization while preserving national character. He briefly considered the Japanese experience as a possible model for the Philippines. He then crossed the United States, making stops in San Francisco and New York, before arriving in London, where he would spend the most intellectually productive months of this period.`,
    sourceIds: ["guerrero1963", "coates1968"],
    emphasis: "default",
  },

  {
    id: "london-morga-1888",
    date: "1888",
    displayDate: "1888–1889",
    era: "abroad",
    title: "London — The British Museum and the Morga Annotations",
    body: `At the British Museum's reading room, Rizal spent months annotating the 1609 chronicle *Sucesos de las Islas Filipinas* by Spanish colonial official Antonio de Morga. His purpose was historical and political simultaneously: by re-publishing Morga's account with extensive footnotes, Rizal argued that pre-colonial Philippine civilization had been sophisticated and self-sufficient — that colonial accounts of Filipinos as primitive were retrospective fabrications designed to justify conquest. The work was published in Paris in 1890. It remains one of the earliest examples of Filipino historiographical nationalism.`,
    image: {
      src: "/images/travels/rizal-london-1888.webp",
      alt: "Photograph of José Rizal taken in London in 1888",
      caption: "Rizal in London, 1888, during his months of research at the British Museum reading room.",
      sourceId: "wikimedia-rizal-london-1888",
      objectPosition: "top",
    },
    sourceIds: ["guerrero1963", "rizal-morga"],
    emphasis: "default",
  },

  {
    id: "la-solidaridad-1889",
    date: "1889",
    displayDate: "1889–1891",
    era: "abroad",
    title: "La Solidaridad and the Propaganda Movement",
    body: `Through 1889 to 1891, Rizal was one of the most prominent contributors to *La Solidaridad*, the reformist newspaper published in Barcelona and later Madrid by the Propaganda Movement. He wrote under the pen name *Laong Laan* ("Ever Ready"). His two landmark essays appeared here: *Filipinas Dentro de Cien Años* (1889–1890), which forecast Philippine independence, and *Sobre la Indolencia de los Filipinos* (1890), which argued colonial conditions — not racial character — produced economic stagnation. These essays extended his influence beyond the novel-reading public into the political debate among ilustrados and Spanish liberals.`,
    sourceIds: ["guerrero1963", "schumacher1997", "rizal-filipinas", "rizal-indolencia"],
    emphasis: "default",
  },

  {
    id: "fili-published-1891",
    date: "1891-09",
    displayDate: "September 1891",
    era: "abroad",
    title: "El Filibusterismo Published in Ghent",
    body: `*El Filibusterismo*, Rizal's darker sequel to the *Noli*, was published in Ghent in September 1891 — again with borrowed money, this time from fellow ilustrado Valentin Ventura. Where the *Noli* had hope, the *Fili* had fury. Its protagonist Simoun is Crisostomo Ibarra transformed by years of suffering into a would-be revolutionary, and the novel's climax — a failed revolution — raises without resolving the question of whether violence is ever justified. Rizal dedicated it to the memory of GOMBURZA. The colonial government banned it immediately; its circulation in the Philippines was, again, clandestine.`,
    image: {
      src: "/images/works/fili-first-page-1891.webp",
      alt: "First page of the El Filibusterismo manuscript, 1891",
      caption: "First page of El Filibusterismo (1891), dedicated to the martyred priests of GOMBURZA.",
      sourceId: "wikimedia-fili-manuscript",
    },
    sourceIds: ["guerrero1963", "rizal-fili", "palma1949"],
    emphasis: "pivotal",
  },

  // ─── Era: Homeland ───────────────────────────────────────────────────────────

  {
    id: "hong-kong-1892",
    date: "1892",
    displayDate: "1891–1892",
    era: "homeland",
    title: "Hong Kong — Medical Practice and the Plan to Return",
    body: `After the *Fili*, Rizal traveled to Hong Kong, where he established a medical practice that was successful enough to give him financial independence for the first time. He treated patients of multiple nationalities, performed cataract surgeries, and corresponded intensively with reformists and governors about the possibility of returning to the Philippines. He proposed establishing a Filipino colony in Borneo — a plan that ultimately came to nothing when the British North Borneo Company failed to provide satisfactory terms. The Hong Kong months reveal Rizal at his most practically minded, testing paths other than writing.`,
    image: {
      src: "/images/rizal/rizal-portrait-c1890.webp",
      alt: "Portrait of José Rizal, circa 1890",
      caption: "José Rizal, c. 1890 — around the time of his Hong Kong medical practice.",
      sourceId: "wikimedia-rizal-portrait",
      objectPosition: "top",
    },
    sourceIds: ["guerrero1963", "coates1968"],
    emphasis: "default",
  },

  {
    id: "return-manila-1892",
    date: "1892-06",
    displayDate: "June 1892",
    era: "homeland",
    title: "Return to Manila — For the Last Time",
    body: `Rizal returned to Manila in late June 1892, knowing the risks but believing that his physical presence was necessary to organize. He sought meetings with Governor-General Eulogio Despujol to advocate for his family's situation in the Calamba agrarian case and to present the statutes of La Liga Filipina. The Governor-General agreed to meet. Rizal used the meetings to press for reforms while Despujol used them to gauge whether Rizal was a revolutionary threat. Both men understood, without saying so, that they were negotiating the terms of Rizal's remaining freedom.`,
    sourceIds: ["guerrero1963", "palma1949"],
    emphasis: "default",
  },

  {
    id: "la-liga-1892",
    date: "1892-07-03",
    displayDate: "July 3, 1892",
    era: "homeland",
    title: "La Liga Filipina Founded",
    body: `On July 3, 1892, in the house of Doroteo Ongjunco in Tondo, Manila, Rizal presided over the founding of La Liga Filipina — a civic mutual-aid association, explicitly non-revolutionary, designed to unite Filipinos across class lines for collective legal and economic self-defense. The Liga was Rizal's answer to a question the *Noli* had raised but not answered: not how to overthrow the colonial government, but how to build Filipino civil society within and despite it. Four days later, he was arrested.`,
    sourceIds: ["guerrero1963", "schumacher1997", "nhcp-rizal"],
    emphasis: "pivotal",
  },

  // ─── Era: Dapitan ────────────────────────────────────────────────────────────

  {
    id: "exile-dapitan-1892",
    date: "1892-07-07",
    displayDate: "July 7, 1892",
    era: "dapitan",
    title: "Arrested, Exiled to Dapitan",
    body: `Governor-General Despujol had Rizal arrested on July 6, 1892, with authorities claiming to have found anti-friar pamphlets in the luggage of Rizal's sister Lucia. Rizal denied all knowledge. He was transported to Dapitan, a small coastal town in Zamboanga del Norte, Mindanao — remote, provincial, severed from the intellectual networks he had spent a decade building. He was placed under the custody of Jesuit Father Antonio Obach. He was thirty-one years old, and he would not be free again.`,
    sourceIds: ["guerrero1963", "coates1968"],
    emphasis: "default",
  },

  {
    id: "dapitan-works-1893",
    date: "1893",
    displayDate: "1892–1896",
    era: "dapitan",
    title: "Building a Life in Exile — School, Clinic, and Waterworks",
    body: `Rather than surrendering to despair, Rizal transformed Dapitan. He purchased sixteen hectares of land in Talisay using lottery winnings he shared with the provincial governor. He built a school where he taught local children without charge — Spanish, English, mathematics, drawing, and gymnastics. He established a small hospital and clinic where he saw patients for free, performing eye surgeries and treating tropical diseases. Using his engineering knowledge, he constructed an irrigation and water supply system that brought clean water from surrounding springs to the community. He planted cacao, coffee, coconut, and fruit trees, conducting agricultural experiments. He also collected zoological specimens, eventually discovering four previously undescribed species: a tree frog, a flying lizard, and two beetles.`,
    image: {
      src: "/images/dapitan/dapitan-talisay-house.webp",
      alt: "The Rizal Shrine in Talisay, Dapitan, Zamboanga del Norte",
      caption: "José Rizal Shrine, Dapitan. On this property Rizal built his home, school, and clinic (1892–1896).",
      sourceId: "wikimedia-dapitan-shrine",
    },
    sourceIds: ["guerrero1963", "zaide1999", "nhcp-rizal"],
    emphasis: "pivotal",
  },

  {
    id: "josephine-bracken-1895",
    date: "1895-02",
    displayDate: "February 1895",
    era: "dapitan",
    title: "Josephine Bracken — Love in Exile",
    body: `In February 1895, a young Irish woman named Josephine Leopoldine Bracken arrived in Dapitan with her blind adoptive father, George Taufer, seeking ophthalmic treatment from the doctor whose reputation had traveled to Hong Kong. Rizal partially restored Taufer's sight. Taufer, observing the growing attraction between Rizal and the eighteen-year-old Josephine, returned to Hong Kong alone; Josephine chose to remain. The Church refused to marry them without Josephine undergoing a three-day convent confinement she rejected. They considered themselves married before God. Their union — brief, complex, and deeply human — gave Rizal the closest thing to domestic peace he had ever known in adulthood.`,
    image: {
      src: "/images/family/josephine-bracken.webp",
      alt: "Portrait photograph of Josephine Bracken, Rizal's wife",
      caption: "Josephine Bracken (1876–1902). She arrived in Dapitan in February 1895 and chose to stay.",
      sourceId: "wikimedia-josephine-bracken",
      objectPosition: "top",
    },
    sourceIds: ["guerrero1963", "ocampo1990"],
    emphasis: "default",
  },

  {
    id: "katipunan-visit-1896",
    date: "1896-06",
    displayDate: "June 1896",
    era: "dapitan",
    title: "Pio Valenzuela's Visit — Rizal and the Revolution",
    body: `In June 1896, Katipunan emissary Pio Valenzuela traveled secretly to Dapitan to inform Rizal of the Katipunan's plans for armed revolution and to seek his blessing, if not his leadership. Rizal's response was unambiguous: he opposed the revolution as premature and likely to fail, arguing that the Filipino people were not yet sufficiently educated or organized for armed uprising to succeed. He was not against independence — he was against what he believed would be a catastrophic defeat. The Katipunan leadership did not follow his counsel. Andres Bonifacio launched the revolution in August 1896 without him.`,
    sourceIds: ["guerrero1963", "schumacher1997", "zaide1999"],
    emphasis: "pivotal",
  },

  // ─── Era: Trial ──────────────────────────────────────────────────────────────

  {
    id: "departure-dapitan-1896",
    date: "1896-07-31",
    displayDate: "July 31, 1896",
    era: "trial",
    title: "Farewell to Dapitan",
    body: `On July 31, 1896, Rizal left Dapitan for the last time, bound for Cuba as a volunteer army doctor — a posting he had requested as a means of securing his freedom through loyal service to Spain. The townspeople of Dapitan lined the shore. The brass band played a farewell piece that turned out, strangely, to be Chopin's Funeral March. He was accompanied by Josephine, his sister Narcisa, and several of his Dapitan students. He carried with him everything he had built — and none of it, of course, could travel with him.`,
    sourceIds: ["guerrero1963", "coates1968"],
    emphasis: "default",
  },

  {
    id: "arrested-at-sea-1896",
    date: "1896-09",
    displayDate: "September 1896",
    era: "trial",
    title: "Arrested at Sea",
    body: `The Philippine Revolution erupted in August 1896 while Rizal was already at sea, en route to Cuba via Spain. When his ship docked in Barcelona, Spanish authorities arrested him — retroactively linking him to the Katipunan uprising despite his documented opposition to it. He was transported back to Manila and imprisoned at Fort Santiago. The colonial government understood that putting Rizal on trial was itself a political act: a warning to every educated Filipino who believed reform was possible within the colonial order.`,
    sourceIds: ["guerrero1963", "palma1949"],
    emphasis: "default",
  },

  {
    id: "trial-1896",
    date: "1896-12-26",
    displayDate: "December 26, 1896",
    era: "trial",
    title: "Trial by Military Court",
    body: `On December 26, 1896, Rizal was tried before a military court, charged with rebellion, sedition, and forming illegal associations. The prosecution argued that his novels and essays had inspired the revolution; Rizal countered that inspiring thought is not the same as commanding action, and that he had explicitly opposed the Katipunan uprising. The verdict had been decided before the proceedings opened. He was found guilty on all counts and sentenced to death. The trial lasted one day. His defense was prepared and delivered by a Spanish military officer, Lieutenant Luis Taviel de Andrade.`,
    sourceIds: ["guerrero1963", "coates1968", "nhcp-rizal"],
    emphasis: "default",
  },

  {
    id: "ultimo-adios-1896",
    date: "1896-12-29",
    displayDate: "December 29, 1896",
    era: "trial",
    title: "Mi Último Adiós — The Poem Hidden in a Lamp",
    body: `On the night of December 29, 1896 — the night before his execution — Rizal composed
a fourteen-stanza farewell poem in his cell at Fort Santiago. He wrote on a small sheet
of paper, leaving it unsigned, undated, and without a title. He folded the manuscript
and concealed it inside a small alcohol burner (*cocinilla*) that he had used since his
travels abroad. As his family departed after their final visit, the guard handed the stove
to his sister Narcisa. At home, the family retrieved the folded paper. Rizal's quiet
instruction to Trinidad had been simply: "There is something inside." Mariano Ponce
later gave the poem its now-famous title — *Mi Último Adiós*, "My Last Farewell" — in
the copies he distributed from Hong Kong in 1897. On the same night, Rizal and Josephine
Bracken were married before a Jesuit priest.`,
    image: {
      src: "/images/works/ultimo-adios-engraved.webp",
      alt: "Bronze engraving of Mi Último Adiós at Rizal Park, Manila",
      caption: "Mi Último Adiós, engraved in bronze at Rizal Park. The original manuscript is held at the National Library of the Philippines.",
      sourceId: "wikimedia-ultimo-adios-engraved",
    },
    sourceIds: ["guerrero1963", "rizal-ultimo-adios", "ocampo1990"],
    emphasis: "pivotal",
  },

  {
    id: "execution-1896",
    date: "1896-12-30",
    displayDate: "December 30, 1896",
    era: "trial",
    title: "Executed at Bagumbayan — 7:03 a.m.",
    body: `At dawn on December 30, 1896, José Rizal was escorted from Fort Santiago to Bagumbayan Field (now Rizal Park) in Manila. He was thirty-five years old. Facing the firing squad, he requested — and was denied — the privilege of facing his executioners; he was to be shot in the back as a traitor. As the volley rang out, witnesses reported that he twisted his body at the last moment to fall face upward toward the sky. He was buried in an unmarked grave at Paco Cemetery. His execution, intended to end the Philippine nationalist movement, instead transformed it — and him — irreversibly.`,
    image: {
      src: "/images/execution/bagumbayan-1896-illustration.webp",
      alt: "Illustration of the execution of José Rizal at Bagumbayan, December 30, 1896",
      caption: "Execution of José Rizal at Bagumbayan, December 30, 1896. Contemporary illustration.",
      sourceId: "wikimedia-rizal-execution",
    },
    sourceIds: ["guerrero1963", "palma1949", "nhcp-rizal"],
    emphasis: "tragic",
  },
];
