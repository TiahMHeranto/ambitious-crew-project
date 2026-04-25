import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

type BackTo =
  | { to: "/" }
  | { to: "/$category"; params: { category: string } };

type Props = {
  /** Si défini, affiche un bouton "Retour" à la place du logo Wikidia */
  back?: { label: string } & BackTo;
};

export function WikiHeader({ back }: Props) {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 wiki-sans">
        {back ? (
          back.to === "/" ? (
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {back.label}
            </Link>
          ) : (
            <Link
              to="/$category"
              params={back.params as { category: "enfant" | "explorateur" | "chercheur" }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {back.label}
            </Link>
          )
        ) : (
          <Link to="/" className="text-lg font-bold tracking-tight text-foreground">
            Wiki<span className="text-primary">dia</span>
          </Link>
        )}
        <nav className="flex items-center gap-4 text-sm">
          {back && (
            <Link to="/" className="wiki-link" style={{ color: "var(--color-primary)" }}>
              Accueil
            </Link>
          )}
          <Link
            to="/login"
            className="wiki-link"
            style={{ color: "var(--color-primary)" }}
          >
            Connexion
          </Link>
        </nav>
      </div>
    </header>
  );
}
