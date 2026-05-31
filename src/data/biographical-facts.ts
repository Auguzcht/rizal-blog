/**
 * biographical-facts.ts
 *
 * Structured data for the BiologicalFactors and EnvironmentalFactors sections.
 * Covers the assignment outline:
 *   II. Biological Factors (inherited traits, physical characteristics)
 *   III. Environmental Factors (family, education, socio-political context)
 *   IV. Character Analysis (virtues, shortcomings, evolution)
 *   V. Pitfalls and Heroism
 */

import type { CharacterTrait, FamilyMember } from "@/types/content";

// ─── II. Biological Factors ──────────────────────────────────────────────────

export const biologicalFactors = {
  ancestry: {
    heading: "A Convergence of Civilizations",
    body: `Rizal's ancestry was a microcosm of Philippine colonial history. Through his father's line, his earliest traceable forefather was Domingo Lamco (or Lam-Co), a Chinese immigrant from Fujian Province who arrived in Manila in the mid-18th century and converted to Christianity. Lamco's descendants married into local and Spanish families across several generations, producing Francisco Mercado Rizal, José's father. Through his mother Teodora Alonso, there was Spanish blood, along with Malay and Tagalog lineage reaching back to the principalía of Santa Cruz. The blending of Chinese industry, Spanish formal education, and Malay communal values in a single family produced the cultural range that Rizal himself would embody.`,
    traits: [
      "Chinese lineage (paternal) — Domingo Lamco → Gaspar Aquino de Belen → Cipriano Alonso → Francisco Mercado",
      "Spanish lineage (maternal) — contributed to the family's principalía status and access to education",
      "Malay-Tagalog lineage — cultural rootedness in local language, custom, and communal identity",
    ],
    sourceIds: ["guerrero1963", "palma1949"],
  },

  intelligence: {
    heading: "Inherited Intellectual Gifts",
    body: `Intelligence was not Rizal's alone in his family. His mother Teodora was herself educated at the Colegio de Santa Rosa and was, according to Rizal, "more than ordinarily cultured" — she wrote verse, knew mathematics, read widely, and recited poetry to her children from infancy. His older brother Paciano was also educated beyond the provincial norm, studied under Father Burgos, and became one of the Katipunan's trusted contacts. Three of his sisters received formal schooling. The family produced achievement across generations, suggesting that what appeared as Rizal's individual genius was partly the inheritance of a household that treated learning as a moral obligation.`,
    sourceIds: ["guerrero1963", "zaide1999"],
  },

  physicalDescription: {
    heading: "The Body of the Hero",
    body: `Rizal stood approximately 150 cm (4 feet 11 inches) tall — slight by European standards but average for a Filipino man of his era. His build was lean, his hands notably fine and precise — the hands of a surgeon, a sculptor, and a draftsman in one. Contemporary descriptions uniformly note his alert, penetrating eyes and an economy of movement that suggested contained energy. He was meticulous about his dress, particularly during his European years, understanding that appearance was a political statement: a well-dressed Filipino gentleman contradicted colonial stereotypes by his mere presence in a Viennese salon or a Madrid café. He spoke without accent in Spanish, French, and German, which regularly startled Europeans who expected colonial inferiority.`,
    sourceIds: ["guerrero1963", "ocampo1990"],
  },
};

// ─── III. Environmental Factors ──────────────────────────────────────────────

export const environmentalFactors = {
  family: {
    heading: "The House in Calamba",
    body: `The Mercado-Rizal home in Calamba was an unusually literate household. Francisco kept books; Teodora recited verse. The family's prosperity — they were among the wealthiest principalía families in Calamba — meant that education was not a luxury but an expectation. Rizal grew up surrounded by older siblings who had already distinguished themselves academically, particularly Paciano. The home's physical orientation toward the Lake Laguna landscape also mattered: Rizal developed his naturalist's sensibility — his lifelong passion for collecting specimens, observing species, drawing plants and animals — from the biodiversity he encountered in childhood, not from any classroom.`,
    sourceIds: ["guerrero1963", "palma1949"],
  },

  education: {
    heading: "Three Schools, Three Worlds",
    body: `Rizal's formal education moved through three distinct pedagogical worlds. The first was his mother's kitchen-table classroom: irregular, intimate, rich in literature and moral instruction. The second was the Jesuit Ateneo: rigorous, scholastic, competitive, forming him in Latin, rhetoric, and Aristotelian logic while also nurturing his literary voice. The third was the secular, Enlightenment-oriented Universidad Central de Madrid and the German universities, where he encountered positivism, scientific method, historical criticism, and the liberal political thought that would give his nationalism its intellectual framework. Each successive school did not replace the previous one — they layered, and Rizal held all three simultaneously.`,
    sourceIds: ["guerrero1963", "coates1968"],
  },

  socioPolitical: {
    heading: "Spanish Colonial Philippines — The World He Was Born Into",
    body: `The Philippines that formed Rizal was a society structured by racial hierarchy, friar power, and the deep contradiction between Spanish liberal ideology and Spanish colonial practice. The Catholic religious orders — Dominicans, Franciscans, Augustinians, Recollects — controlled vast land holdings, parish appointments, and civil government at the local level. Ilustrados like Rizal's family occupied a middle position: educated enough to see the injustice, property-holding enough to lose from violent revolution, Spanish-speaking enough to argue their case in Manila and Madrid. The 1872 GOMBURZA execution removed the last illusion that loyalty to Spain would protect Filipino lives. Rizal was formed by this contradiction — and his entire project was an attempt to resolve it through words rather than arms.`,
    sourceIds: ["guerrero1963", "schumacher1997"],
  },
};

// ─── IV. Character Analysis ───────────────────────────────────────────────────

export const characterAnalysis: {
  virtues: CharacterTrait[];
  shortcomings: CharacterTrait[];
  evolution: string;
} = {
  virtues: [
    {
      trait: "Polyglot Intellect",
      body: `Rizal is reliably documented as having spoken or written in at least eight languages: Tagalog, Spanish, French, German, English, Latin, Greek, and Italian. Some accounts claim as many as twenty-two; Ocampo argues the higher numbers are exaggerations but that ten to twelve is defensible. The gift was real, but what mattered more than the count was his use of language as a political instrument — in Spanish to argue with colonial officials, in German to correspond with scientists, in Tagalog to reach his own people.`,
      sourceIds: ["ocampo1990", "guerrero1963"],
    },
    {
      trait: "Compassion in Practice",
      body: `Dapitan is the clearest evidence of Rizal's compassion as a lived commitment rather than a rhetorical posture. He treated hundreds of patients without charge. He built the waterworks not because it would advance his career but because the community needed clean water. He taught children for free because he believed — as he argued in the *Filipinas* essays — that education was the precondition of national liberation. His compassion was not sentimental; it was organized and practical.`,
      sourceIds: ["guerrero1963", "zaide1999", "nhcp-rizal"],
    },
    {
      trait: "Moral Courage",
      body: `Rizal continued writing and publishing after explicit threats, the confiscation of his novels, and the harassment of his family. He returned to the Philippines in 1892 knowing he was under surveillance and that arrest was probable. He refused to recant his views at trial even when recantation might have spared his life. Whether one agrees with his political choices or not, the consistency between his stated convictions and his actions under threat is rare in any life and remarkable in a thirty-five-year one.`,
      sourceIds: ["guerrero1963", "coates1968"],
    },
    {
      trait: "Scientific Discipline",
      body: `Rizal's naturalist work in Dapitan — resulting in four newly described species named in his honor, systematic botanical collections sent to European scientific institutions, and correspondence with the Dresden Museum — was not dilettante collecting. It was methodical, documented, and peer-reviewed by European zoologists. The breadth of his intellectual life (novelist, physician, sculptor, linguist, naturalist, draftsman) was matched by genuine depth in each.`,
      sourceIds: ["guerrero1963", "nhcp-rizal"],
    },
  ],

  shortcomings: [
    {
      trait: "Reformism's Limits",
      body: `Rizal's most significant intellectual weakness, from the perspective of Philippine national history, is his consistent underestimation of how deeply Spanish colonial power was structurally embedded. He believed — until very late — that educated argument, demonstration of Filipino cultural achievement, and appeal to Spanish liberal principles could achieve reform. Andres Bonifacio and the Katipunan drew a different, and as events showed, more realistic conclusion about what Spanish colonialism would voluntarily surrender. Ocampo is careful not to condemn Rizal for this but notes that his class position — principalía, propertied, educated in European institutions — made it nearly impossible for him to fully imagine the perspective of landless, unlettered Filipinos for whom the Spanish liberal tradition meant nothing.`,
      sourceIds: ["ocampo1990", "schumacher1997"],
    },
    {
      trait: "The Propagandist Rivalries",
      body: `Rizal's relationship with Marcelo H. del Pilar, the other dominant voice of the Propaganda Movement, was persistently tense. There were genuine strategic disagreements — Rizal favored assimilation and gradual reform; del Pilar leaned toward more confrontational methods — but there were also personality conflicts, competition for leadership of the ilustrado community in Madrid, and a dispute over control of the Propaganda funds. Rizal withdrew from active *La Solidaridad* participation in part because of these frictions. His detachment from organizational politics, while preserving his moral authority, weakened the movement's cohesion.`,
      sourceIds: ["guerrero1963", "schumacher1997", "ocampo1990"],
    },
    {
      trait: "The Retraction Controversy",
      body: `On the morning of his execution, a document appeared purporting to be Rizal's retraction of his writings and his reconciliation with the Catholic Church. The document's authenticity has been debated by historians for over a century. Scholars including Ambeth Ocampo have analyzed the document carefully and found elements suggesting it may have been prepared in advance by Jesuit authorities. Whether authentic or not, the controversy speaks to a genuine tension in Rizal's life between his rationalist, Masonic convictions and his emotional attachment to the religious tradition he had been formed by. It is not a simple question.`,
      sourceIds: ["ocampo1990", "guerrero1963"],
    },
  ],

  evolution: `From the child in Calamba drawing with pencil and clay to the young man composing prize-winning verses at the Ateneo, to the Madrid student delivering a toast that made ilustrados weep, to the novelist whose books circulated like contraband across his homeland, to the exile who built schools and water systems in Mindanao, to the condemned man composing a farewell poem in a lamp — Rizal's character did not change at its core so much as it deepened, confronting greater stakes at each stage while maintaining the same fundamental commitments: to truth as a tool, to education as liberation, to his country as something worth dying for rather than merely writing about.`,
};

// ─── V. Pitfalls and Heroism ────────────────────────────────────────────────

export const pitfallsAndHeroism = {
  pitfalls: [
    {
      heading: "Teodora's Imprisonment — Justice Denied at Home",
      body: `The wrongful imprisonment of his mother, when Rizal was ten, established the template for every injustice he would later write about: power exercised arbitrarily, innocence defenseless against accusation, and the family — the most intimate unit of Filipino society — exposed to colonial violence. He could not fix it as a child. He could only watch. And then he could write.`,
      sourceIds: ["guerrero1963"],
    },
    {
      heading: "The Calamba Agrarian Case — His Family Dispossessed",
      body: `Between 1887 and 1891, the Dominican order pursued the eviction of the Mercado-Rizal family and hundreds of other tenant farmers from the Calamba hacienda lands. The case was a direct response to the *Noli*'s publication and the notoriety of its author. Rizal watched from Europe as his family lost their home and livelihood as punishment for his writing. The episode crystallized the connection between his personal life and colonial structure in a way that no abstract analysis could have.`,
      sourceIds: ["guerrero1963", "palma1949"],
    },
    {
      heading: "Exile in Dapitan — Freedom Stripped, Purpose Preserved",
      body: `Four and a half years of exile in Dapitan stripped Rizal of the freedom of movement, intellectual community, and political agency he had spent his adult life cultivating. The colonial government intended it as erasure. Instead, Rizal turned it into the most concrete demonstration of his values: he built things, healed people, taught children, and fell in love. The exile years converted the abstract reformist into a man who had actually improved a specific community's actual life — a credential no written argument could match.`,
      sourceIds: ["guerrero1963", "nhcp-rizal"],
    },
    {
      heading: "The Trial — A Predetermined Verdict",
      body: `The December 1896 trial was, as Rizal and everyone present understood, theater. The verdict had been decided. What he could choose was how to conduct himself, and he chose precision and dignity over pleading. He answered every charge carefully, denied nothing he had actually written, and maintained until the end that literature is not sedition. Whether or not this mattered to the court, it mattered enormously to Filipino history — the record of the trial became, in time, as politically charged as the novels themselves.`,
      sourceIds: ["guerrero1963", "coates1968"],
    },
  ],
};

// ─── Influential Figures ─────────────────────────────────────────────────────

export const influences: FamilyMember[] = [
  {
    id: "teodora-alonso",
    name: "Teodora Alonso Realonda",
    relationship: "Mother",
    body: `His first and most formative teacher. Rizal credits her with instilling his love of language, his moral imagination, and his attention to injustice. Her unjust imprisonment was, by his own account, the first political education he received.`,
    sourceIds: ["guerrero1963", "palma1949"],
  },
  {
    id: "paciano-rizal",
    name: "Paciano Rizal Mercado",
    relationship: "Older Brother",
    body: `Paciano was José's intellectual elder brother, financial patron, and strategic advisor throughout his life. He had studied under Father Burgos, survived the suspicion cast by the GOMBURZA execution, and later became a general in the Philippine Revolution. He financed Rizal's first departure for Spain and maintained the family's fortunes under continuous colonial harassment.`,
    sourceIds: ["guerrero1963"],
  },
  {
    id: "blumentritt",
    name: "Ferdinand Blumentritt",
    relationship: "Austrian Friend and Scholarly Champion",
    body: `The Austrian professor of geography and ethnology at Leitmeritz became Rizal's most steadfast European intellectual ally after their correspondence began in 1886. Blumentritt championed Rizal's work to European academic audiences, collaborated on the Morga annotations, and maintained contact until Rizal's execution despite Spanish government pressure to distance himself.`,
    sourceIds: ["guerrero1963", "rizal-letters-blumentritt"],
  },
  {
    id: "fr-sanchez",
    name: "Father Francisco de Paula Sánchez",
    relationship: "Jesuit Mentor at Ateneo",
    body: `The Jesuit professor who recognized Rizal's literary gifts at the Ateneo and encouraged him to develop them, assigning him more challenging exercises than the standard curriculum and praising his work in public. His influence explains much of the formal elegance of Rizal's Spanish prose.`,
    sourceIds: ["guerrero1963"],
  },
  {
    id: "josephine-bracken",
    name: "Josephine Bracken",
    relationship: "Wife",
    body: `Born in Hong Kong to an Irish father and a Filipino mother, Josephine Bracken arrived in Dapitan in February 1895 with her blind adoptive father. Her decision to stay — against considerable social and ecclesiastical pressure — gave Rizal a domestic and emotional anchor during the most constrained years of his life. She remained with him until his arrest in 1896. They married formally the night before his execution.`,
    sourceIds: ["guerrero1963", "ocampo1990"],
  },
];
