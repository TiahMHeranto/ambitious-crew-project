import { createFileRoute, Link } from "@tanstack/react-router";
import { WikiHeader } from "@/components/WikiHeader";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchBar } from "@/components/SearchBar";
import enfantImg from "@/assets/category-enfant.jpg";
import explorateurImg from "@/assets/category-explorateur.jpg";
import chercheurImg from "@/assets/category-chercheur.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NovaPedia — L'encyclopédie pour tous" },
      {
        name: "description",
        content:
          "NovaPedia, l'encyclopédie libre adaptée aux enfants, explorateurs et chercheurs.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <WikiHeader />
      <main className="mx-auto max-w-5xl px-4 py-12">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-5xl font-normal tracking-tight text-foreground">
            Bienvenue sur <span className="font-semibold">NovaPedia</span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground wiki-sans">
            L'encyclopédie libre que{" "}
            <Link to="/login" className="wiki-link" style={{ color: "var(--color-primary)" }}>
              chacun peut améliorer
            </Link>
            .
          </p>
          <p className="mt-2 text-sm text-muted-foreground wiki-sans">
            <strong>14 268</strong> articles en français · <strong>3</strong> niveaux de lecture
            adaptés
          </p>
        </div>

        {/* Catégories */}
        <section className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <CategoryCard
            category="enfant"
            title="Enfant"
            subtitle="Apprends en t'amusant avec des puzzles"
            image={enfantImg}
          />
          <CategoryCard
            category="explorateur"
            title="Explorateur"
            subtitle="Découvre et teste tes connaissances"
            image={explorateurImg}
          />
          <CategoryCard
            category="chercheur"
            title="Chercheur"
            subtitle="Articles approfondis et collaboratifs"
            image={chercheurImg}
          />
        </section>

        {/* Recherche */}
        <section className="mt-12">
          <SearchBar placeholder="Rechercher un article (ex. Madagascar)" />
        </section>

        {/* Article du jour + Le saviez-vous */}
        <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="border border-border bg-card p-5 shadow-sm rounded-sm">
            <h2 className="border-b border-border pb-2 text-xl font-normal">
              <span className="text-primary">★</span> Article du jour
            </h2>
            <h3 className="mt-3 text-lg font-semibold">
              <Link
                to="/$category/$slug"
                params={{ category: "chercheur", slug: "madagascar" }}
                className="wiki-link"
                style={{ color: "var(--color-primary)" }}
              >
                Madagascar
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              Quatrième plus grande île du monde, Madagascar est célèbre pour sa
              biodiversité exceptionnelle : près de 90 % de ses espèces animales et végétales
              n'existent nulle part ailleurs sur Terre. Lémuriens, baobabs et caméléons font
              de cette île-continent un véritable laboratoire de l'évolution…
            </p>
            <p className="mt-3 text-sm wiki-sans">
              <Link
                to="/$category/$slug"
                params={{ category: "chercheur", slug: "madagascar" }}
                className="wiki-link"
                style={{ color: "var(--color-primary)" }}
              >
                Lire la suite →
              </Link>
            </p>
          </article>

          <article className="border border-border bg-card p-5 shadow-sm rounded-sm">
            <h2 className="border-b border-border pb-2 text-xl font-normal">
              <span className="text-primary">💡</span> Le saviez-vous ?
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed list-disc pl-5">
              <li>
                Le mont{" "}
                <Link
                  to="/$category/$slug"
                  params={{ category: "explorateur", slug: "japon" }}
                  className="wiki-link"
                  style={{ color: "var(--color-primary)" }}
                >
                  Fuji
                </Link>{" "}
                culmine à 3 776 mètres et est considéré comme sacré au Japon.
              </li>
              <li>
                Les{" "}
                <Link
                  to="/$category/$slug"
                  params={{ category: "enfant", slug: "dinosaures" }}
                  className="wiki-link"
                  style={{ color: "var(--color-primary)" }}
                >
                  dinosaures
                </Link>{" "}
                ont peuplé la Terre pendant plus de 160 millions d'années.
              </li>
              <li>
                La{" "}
                <Link
                  to="/$category/$slug"
                  params={{ category: "chercheur", slug: "france" }}
                  className="wiki-link"
                  style={{ color: "var(--color-primary)" }}
                >
                  France
                </Link>{" "}
                compte 53 sites inscrits au patrimoine mondial de l'UNESCO.
              </li>
            </ul>
          </article>
        </section>

        {/* Présentation des espaces */}
        <section className="mt-10 border border-border bg-card p-5 shadow-sm rounded-sm">
          <h2 className="border-b border-border pb-2 text-xl font-normal">
            Trois façons d'explorer le savoir
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 text-sm leading-relaxed sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-primary">Espace Enfant</h3>
              <p className="mt-1 text-muted-foreground wiki-sans">
                Des articles courts, illustrés et un puzzle interactif pour apprendre
                en s'amusant, dès 6 ans.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary">Espace Explorateur</h3>
              <p className="mt-1 text-muted-foreground wiki-sans">
                Des articles enrichis et un quiz à la fin de chaque page pour tester ce
                que tu as retenu.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary">Espace Chercheur</h3>
              <p className="mt-1 text-muted-foreground wiki-sans">
                Des articles complets, sourcés, modifiables par la communauté pour faire
                avancer le savoir.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-16 border-t border-border pt-6 text-center text-xs text-muted-foreground wiki-sans">
          NovaPedia — projet de démonstration. Texte sous licence libre Creative Commons.
        </footer>
      </main>
    </div>
  );
}
