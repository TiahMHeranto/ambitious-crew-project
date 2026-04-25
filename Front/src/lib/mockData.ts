export type Category = "enfant" | "explorateur" | "chercheur";

export const CATEGORY_LABEL: Record<Category, string> = {
  enfant: "Enfant",
  explorateur: "Explorateur",
  chercheur: "Chercheur",
};

// Type de contenu rendu selon la catégorie
export const CATEGORY_KIND: Record<Category, "puzzle" | "quiz" | "article"> = {
  enfant: "puzzle",
  explorateur: "quiz",
  chercheur: "article",
};

export type ArticleData = {
  title: string;
  summary: string;
  funFact: string; // pour enfants
  infobox: { label: string; value: string }[];
  sections: { heading: string; paragraphs: string[] }[];
  references: string[];
  quiz?: {
    question: string;
    options: { k: string; t: string }[];
    correct: string;
    explanation: string;
  };
};

export const ARTICLES_DATA: Record<string, ArticleData> = {
  Madagascar: {
    title: "Madagascar",
    summary:
      "Madagascar est une île-continent de l'océan Indien, située au large de la côte sud-est de l'Afrique. Avec une superficie de 587 041 km², c'est la quatrième plus grande île du monde. Connue pour sa biodiversité unique, près de 90 % de sa faune et de sa flore n'existent nulle part ailleurs sur Terre.",
    funFact:
      "Sais-tu qu'à Madagascar, il existe plus de 100 espèces différentes de lémuriens, ces petits singes aux grands yeux ? Tu ne peux les voir nulle part ailleurs dans la nature !",
    infobox: [
      { label: "Capitale", value: "Antananarivo" },
      { label: "Superficie", value: "587 041 km²" },
      { label: "Population", value: "≈ 30 millions" },
      { label: "Langue officielle", value: "Malgache, français" },
      { label: "Monnaie", value: "Ariary (MGA)" },
    ],
    sections: [
      {
        heading: "Géographie",
        paragraphs: [
          "Madagascar s'étire sur environ 1 580 km du nord au sud et 580 km d'est en ouest. L'île est traversée par une chaîne montagneuse centrale, les Hautes Terres, dont le point culminant est le Maromokotro à 2 876 mètres d'altitude.",
          "Le climat varie fortement selon les régions : tropical humide à l'est, tempéré sur les Hautes Terres et semi-aride dans le Sud. Cette diversité climatique explique en grande partie la richesse de ses écosystèmes.",
        ],
      },
      {
        heading: "Faune et flore",
        paragraphs: [
          "L'isolement de Madagascar, séparée du continent africain depuis environ 165 millions d'années, a permis l'évolution d'espèces endémiques uniques. Les baobabs, les lémuriens, le fossa et le caméléon panthère comptent parmi les emblèmes naturels de l'île.",
          "Plus de 12 000 espèces de plantes y sont recensées, dont environ 80 % sont endémiques. Malheureusement, la déforestation menace gravement ces habitats.",
        ],
      },
      {
        heading: "Histoire",
        paragraphs: [
          "Les premiers habitants seraient arrivés il y a environ 2 000 ans depuis l'Asie du Sud-Est et l'Afrique de l'Est. Au XVIIIᵉ siècle, le royaume Merina unifie progressivement l'île. Madagascar devient une colonie française en 1896, puis accède à l'indépendance le 26 juin 1960.",
        ],
      },
    ],
    references: [
      "UNESCO, « Forêts humides de l'Atsinanana », patrimoine mondial.",
      "Goodman S. M. & Benstead J. P., The Natural History of Madagascar, 2003.",
    ],
    quiz: {
      question: "Quelle est la particularité principale de la faune de Madagascar ?",
      options: [
        { k: "A", t: "Elle est identique à celle du continent africain." },
        { k: "B", t: "Près de 90 % des espèces y sont endémiques." },
        { k: "C", t: "On n'y trouve aucun mammifère." },
      ],
      correct: "B",
      explanation:
        "Grâce à son isolement géologique, Madagascar abrite une biodiversité unique au monde, dont les célèbres lémuriens.",
    },
  },
  France: {
    title: "France",
    summary:
      "La France, en forme longue la République française, est un État souverain transcontinental dont la métropole se situe en Europe occidentale. Avec ses régions d'outre-mer, elle partage des frontières terrestres avec onze pays. Sa capitale est Paris.",
    funFact:
      "La Tour Eiffel, à Paris, mesure 330 mètres de haut ! Au début, elle ne devait rester que 20 ans, mais les Parisiens l'ont tellement aimée qu'on l'a gardée.",
    infobox: [
      { label: "Capitale", value: "Paris" },
      { label: "Superficie", value: "643 801 km²" },
      { label: "Population", value: "≈ 68 millions" },
      { label: "Langue officielle", value: "Français" },
      { label: "Monnaie", value: "Euro (EUR)" },
    ],
    sections: [
      {
        heading: "Géographie",
        paragraphs: [
          "La France métropolitaine s'étend de la mer du Nord à la Méditerranée et de l'Atlantique au Rhin. Son relief est varié : plaines du Bassin parisien, massifs anciens (Massif central, Vosges) et montagnes jeunes (Alpes, Pyrénées).",
          "Le Mont Blanc, à 4 808 mètres, est le sommet le plus élevé d'Europe occidentale.",
        ],
      },
      {
        heading: "Histoire",
        paragraphs: [
          "L'histoire de France débute traditionnellement avec les Gaulois, puis la conquête romaine. Le royaume franc, fondé par Clovis Iᵉʳ, donne naissance à un État qui s'affirme au Moyen Âge sous les Capétiens.",
          "La Révolution française de 1789 marque l'avènement des principes républicains modernes. La Vᵉ République, fondée en 1958 par Charles de Gaulle, est le régime politique actuel.",
        ],
      },
      {
        heading: "Culture",
        paragraphs: [
          "La France est mondialement reconnue pour sa gastronomie, sa littérature, sa philosophie, son cinéma et son patrimoine architectural. Le pays compte 53 sites inscrits au patrimoine mondial de l'UNESCO.",
        ],
      },
    ],
    references: [
      "INSEE, Bilan démographique annuel.",
      "Braudel F., L'Identité de la France, 1986.",
    ],
    quiz: {
      question: "Quel est le sommet le plus élevé d'Europe occidentale ?",
      options: [
        { k: "A", t: "Le Mont Ventoux" },
        { k: "B", t: "Le Mont Blanc" },
        { k: "C", t: "Le Pic du Midi" },
      ],
      correct: "B",
      explanation: "Le Mont Blanc culmine à 4 808 mètres dans les Alpes franco-italiennes.",
    },
  },
  Japon: {
    title: "Japon",
    summary:
      "Le Japon est un pays insulaire d'Asie de l'Est, situé dans l'océan Pacifique. L'archipel se compose de 6 852 îles, dont les quatre principales sont Honshū, Hokkaidō, Kyūshū et Shikoku. Sa capitale, Tokyo, est l'une des plus grandes métropoles du monde.",
    funFact:
      "Au Japon, il y a plus de 5 millions de distributeurs automatiques ! Tu peux y acheter des boissons, des nouilles chaudes, et même des parapluies.",
    infobox: [
      { label: "Capitale", value: "Tokyo" },
      { label: "Superficie", value: "377 975 km²" },
      { label: "Population", value: "≈ 125 millions" },
      { label: "Langue officielle", value: "Japonais" },
      { label: "Monnaie", value: "Yen (JPY)" },
    ],
    sections: [
      {
        heading: "Géographie",
        paragraphs: [
          "Le Japon est situé sur la ceinture de feu du Pacifique, ce qui explique sa forte activité sismique et volcanique. Le pays compte plus de 100 volcans actifs, dont le mont Fuji (3 776 m), symbole national.",
        ],
      },
      {
        heading: "Histoire",
        paragraphs: [
          "L'histoire japonaise est marquée par la longue période féodale des shoguns (1185-1868), puis par l'ère Meiji qui ouvre le pays au monde et à la modernité. Après la Seconde Guerre mondiale, le Japon connaît un essor économique exceptionnel.",
        ],
      },
      {
        heading: "Culture",
        paragraphs: [
          "Le Japon est célèbre pour sa culture traditionnelle (cérémonie du thé, ikebana, sumo) comme pour sa pop culture contemporaine (manga, anime, jeu vidéo). La cuisine japonaise, inscrite au patrimoine immatériel de l'UNESCO, est mondialement appréciée.",
        ],
      },
    ],
    references: [
      "Souyri P.-F., Nouvelle histoire du Japon, 2010.",
      "UNESCO, Le washoku, traditions culinaires japonaises.",
    ],
    quiz: {
      question: "Quel est le sommet le plus connu et symbolique du Japon ?",
      options: [
        { k: "A", t: "Le mont Aso" },
        { k: "B", t: "Le mont Fuji" },
        { k: "C", t: "Le mont Tate" },
      ],
      correct: "B",
      explanation: "Le mont Fuji, volcan endormi de 3 776 m, est le symbole emblématique du Japon.",
    },
  },
};

// Données génériques pour les articles sans entrée détaillée
function genericArticle(title: string): ArticleData {
  return {
    title,
    summary: `${title} est un sujet d'étude majeur abordé dans cette encyclopédie. Cet article propose une synthèse documentée et invite la communauté à le compléter, le corriger ou l'enrichir collaborativement.`,
    funFact: `Le savais-tu ? ${title} a inspiré beaucoup de livres, de films et même de chansons à travers le monde !`,
    infobox: [
      { label: "Domaine", value: "Connaissance générale" },
      { label: "Type", value: "Article encyclopédique" },
      { label: "Statut", value: "En développement" },
    ],
    sections: [
      {
        heading: "Présentation",
        paragraphs: [
          `${title} désigne un sujet largement étudié dans plusieurs disciplines. Les premières mentions documentées soulignent déjà son importance dans les domaines concernés.`,
          `De nombreux chercheurs et passionnés se sont intéressés à ${title} au fil des siècles. Leurs travaux ont permis d'enrichir notre compréhension collective.`,
        ],
      },
      {
        heading: "Caractéristiques",
        paragraphs: [
          `Plusieurs traits distinctifs caractérisent ${title} et permettent de le différencier d'autres sujets apparentés. Cette section sera enrichie progressivement par la communauté.`,
        ],
      },
      {
        heading: "Postérité",
        paragraphs: [
          `L'influence de ${title} se ressent encore aujourd'hui dans de nombreux domaines de la connaissance et de la culture populaire.`,
        ],
      },
    ],
    references: [
      `Encyclopédie générale, article « ${title} ».`,
      `Études contemporaines sur ${title}, 2020.`,
    ],
    quiz: {
      question: `Que peut-on dire de ${title} ?`,
      options: [
        { k: "A", t: `${title} n'a jamais été étudié.` },
        { k: "B", t: `${title} a fait l'objet de nombreuses recherches.` },
        { k: "C", t: `${title} est un mythe inventé récemment.` },
      ],
      correct: "B",
      explanation: `${title} est un sujet bien documenté qui a suscité de nombreuses études.`,
    },
  };
}

export function getArticleData(slug: string): ArticleData {
  // Trouve un titre correspondant au slug
  const matched = Object.keys(ARTICLES_DATA).find(
    (key) => key.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") === slug.toLowerCase(),
  );
  if (matched) return ARTICLES_DATA[matched];
  const decoded = decodeURIComponent(slug).replace(/-/g, " ");
  const title = decoded.charAt(0).toUpperCase() + decoded.slice(1);
  return genericArticle(title);
}

export const ARTICLES: string[] = [
  "Madagascar",
  "France",
  "Japon",
  "Égypte",
  "Dinosaures",
  "Volcans",
  "Système solaire",
  "Océan Pacifique",
  "Léonard de Vinci",
  "Mathématiques",
  "Pyramides",
  "Amazonie",
  "Mont Everest",
  "Astronomie",
];

export type SearchResult = {
  title: string;
  category: Category;
  slug: string;
};

export function searchArticles(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const matches = ARTICLES.filter((a) => a.toLowerCase().includes(q));
  const cats: Category[] = ["enfant", "explorateur", "chercheur"];
  const results: SearchResult[] = [];
  for (const title of matches) {
    for (const c of cats) {
      results.push({
        title,
        category: c,
        slug: title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
      });
    }
  }
  return results.slice(0, 30);
}

export function searchInCategory(query: string, category: Category): SearchResult[] {
  return searchArticles(query).filter((r) => r.category === category);
}
