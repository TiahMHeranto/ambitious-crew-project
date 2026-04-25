import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { WikiHeader } from "@/components/WikiHeader";
import { SearchBar } from "@/components/SearchBar";
import { CATEGORY_LABEL, ARTICLES, type Category } from "@/lib/mockData";
import enfantImg from "@/assets/category-enfant.jpg";
import explorateurImg from "@/assets/category-explorateur.jpg";
import chercheurImg from "@/assets/category-chercheur.jpg";

const IMAGES: Record<Category, string> = {
  enfant: enfantImg,
  explorateur: explorateurImg,
  chercheur: chercheurImg,
};

const DESCRIPTIONS: Record<Category, string> = {
  enfant: "Articles ludiques avec puzzles interactifs pour apprendre en s'amusant.",
  explorateur: "Articles enrichis de quiz pour tester et approfondir tes connaissances.",
  chercheur: "Articles complets, sourcés et collaboratifs, avec édition possible.",
};

const INTROS: Record<Category, { title: string; paragraphs: string[] }> = {
  enfant: {
    title: "Bienvenue dans l'espace Enfant !",
    paragraphs: [
      "Ici, on apprend en jouant ! Chaque article est écrit avec des mots simples, des images et un petit jeu de puzzle pour t'amuser à découvrir le sujet.",
      "Choisis un thème dans la barre de recherche ci-dessus. Tu verras, c'est facile : tu lis, tu cliques sur les images, et tu deviens un petit explorateur du savoir.",
    ],
  },
  explorateur: {
    title: "Espace Explorateur — Apprends et teste-toi",
    paragraphs: [
      "Tu aimes apprendre et vérifier ce que tu sais ? Cet espace est fait pour toi. Chaque article t'explique un sujet en détail, puis te propose un quiz pour mesurer ce que tu as retenu.",
      "Idéal pour réviser, préparer un exposé, ou simplement satisfaire ta curiosité avec rigueur.",
    ],
  },
  chercheur: {
    title: "Espace Chercheur — Le savoir collaboratif",
    paragraphs: [
      "L'espace Chercheur propose des articles approfondis, structurés et sourcés selon les standards encyclopédiques. Chaque page peut être enrichie, corrigée ou complétée par la communauté.",
      "Pour modifier ou supprimer un contenu, vous devez disposer d'un compte connecté. Les contributions sont publiées sous licence libre.",
    ],
  },
};

const POPULAR: Record<Category, string[]> = {
  enfant: ["Dinosaures", "Volcans", "Pyramides", "Système solaire", "Madagascar"],
  explorateur: ["Japon", "Mont Everest", "Astronomie", "Amazonie", "Océan Pacifique"],
  chercheur: ["Madagascar", "France", "Léonard de Vinci", "Mathématiques", "Égypte"],
};

const STATS: Record<Category, { articles: number; contributors: number }> = {
  enfant: { articles: 1247, contributors: 89 },
  explorateur: { articles: 4581, contributors: 412 },
  chercheur: { articles: 8440, contributors: 1873 },
};

function isCategory(v: string): v is Category {
  return v === "enfant" || v === "explorateur" || v === "chercheur";
}

function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

export const Route = createFileRoute("/$category/")({
  loader: ({ params }) => {
    if (!isCategory(params.category)) throw notFound();
    return { category: params.category };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${CATEGORY_LABEL[loaderData.category]} — NovaPedia` },
          {
            name: "description",
            content: DESCRIPTIONS[loaderData.category],
          },
        ]
      : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <WikiHeader />
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold">Catégorie introuvable</h1>
        <Link to="/" className="mt-4 inline-block wiki-link" style={{ color: "var(--color-primary)" }}>
          Retour à l'accueil
        </Link>
      </div>
    </div>
  ),
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const label = CATEGORY_LABEL[category];
  const intro = INTROS[category];
  const popular = POPULAR[category];
  const stats = STATS[category];

  return (
    <div className="min-h-screen bg-background">
      <WikiHeader back={{ to: "/", label: "Retour à l'accueil" }} />
      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* En-tête */}
        <div className="flex flex-col items-center text-center">
          <div className="overflow-hidden rounded-full border-2 border-border shadow-md ring-4 ring-accent/40">
            <img
              src={IMAGES[category]}
              alt={label}
              width={220}
              height={220}
              className="h-44 w-44 object-cover sm:h-52 sm:w-52"
            />
          </div>
          <h1 className="mt-6 text-4xl font-normal">
            Espace <span className="font-semibold">{label}</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground wiki-sans">
            {DESCRIPTIONS[category]}
          </p>
        </div>

        {/* Recherche */}
        <section className="mt-10">
          <SearchBar
            restrictTo={category}
            placeholder={`Rechercher dans l'espace ${label.toLowerCase()}…`}
          />
        </section>

        {/* Présentation */}
        <section className="mt-12 border border-border bg-card p-5 shadow-sm rounded-sm">
          <h2 className="border-b border-border pb-2 text-xl font-normal">{intro.title}</h2>
          <div className="mt-3 space-y-3 text-base leading-relaxed">
            {intro.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Articles populaires + statistiques */}
        <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 border border-border bg-card p-5 shadow-sm rounded-sm">
            <h2 className="border-b border-border pb-2 text-xl font-normal">
              Articles populaires
            </h2>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm">
              {popular.map((title) => (
                <li key={title}>
                  <Link
                    to="/$category/$slug"
                    params={{ category, slug: toSlug(title) }}
                    className="wiki-link"
                    style={{ color: "var(--color-primary)" }}
                  >
                    » {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border bg-card p-5 shadow-sm rounded-sm wiki-sans">
            <h2 className="border-b border-border pb-2 text-xl font-normal">En chiffres</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Articles</dt>
                <dd className="font-semibold">{stats.articles.toLocaleString("fr-FR")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Contributeurs</dt>
                <dd className="font-semibold">{stats.contributors.toLocaleString("fr-FR")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Mis à jour</dt>
                <dd className="font-semibold">aujourd'hui</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Index alphabétique */}
        <section className="mt-6 border border-border bg-card p-5 shadow-sm rounded-sm">
          <h2 className="border-b border-border pb-2 text-xl font-normal">
            Tous les articles ({ARTICLES.length})
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-3">
            {[...ARTICLES].sort((a, b) => a.localeCompare(b, "fr")).map((title) => (
              <li key={title}>
                <Link
                  to="/$category/$slug"
                  params={{ category, slug: toSlug(title) }}
                  className="wiki-link"
                  style={{ color: "var(--color-primary)" }}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
