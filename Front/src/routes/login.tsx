import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { WikiHeader } from "@/components/WikiHeader";

type LoginSearch = {
  redirect?: string;
  action?: "edit" | "delete";
};

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
    action:
      search.action === "edit" || search.action === "delete" ? search.action : undefined,
  }),
  head: () => ({
    meta: [{ title: "Connexion — Wikidia" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { action } = Route.useSearch();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");

  const isLogin = mode === "login";

  return (
    <div className="min-h-screen bg-background">
      <WikiHeader back={{ to: "/", label: "Retour à l'accueil" }} />
      <main className="mx-auto max-w-md px-4 py-12">
        <div className="border border-border bg-card p-6 shadow-sm rounded-sm">
          <h1 className="text-2xl font-normal border-b border-border pb-2">
            {isLogin ? "Connexion à Wikidia" : "Créer un compte Wikidia"}
          </h1>

          {/* Onglets */}
          <div className="mt-4 flex border-b border-border wiki-sans text-sm">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
                isLogin
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
                !isLogin
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Inscription
            </button>
          </div>

          {action && isLogin && (
            <p className="mt-4 rounded bg-accent px-3 py-2 text-sm wiki-sans">
              Vous devez être connecté pour{" "}
              <strong>{action === "edit" ? "modifier" : "supprimer"}</strong> cet article.
            </p>
          )}

          <form
            className="mt-4 space-y-4 wiki-sans"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <label className="block text-sm font-medium">Nom d'utilisateur</label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="mt-1 w-full border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-ring rounded-sm"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium">Adresse e-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-ring rounded-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium">Mot de passe</label>
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="mt-1 w-full border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-ring rounded-sm"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  value={pwd2}
                  onChange={(e) => setPwd2(e.target.value)}
                  className="mt-1 w-full border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-ring rounded-sm"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 rounded-sm shadow-sm"
            >
              {isLogin ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground wiki-sans">
            {isLogin ? (
              <>
                Pas encore de compte ?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="wiki-link"
                  style={{ color: "var(--color-primary)" }}
                >
                  Inscrivez-vous
                </button>
              </>
            ) : (
              <>
                Déjà un compte ?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="wiki-link"
                  style={{ color: "var(--color-primary)" }}
                >
                  Connectez-vous
                </button>
              </>
            )}
          </p>

          <p className="mt-2 text-center text-xs text-muted-foreground wiki-sans">
            <Link to="/" className="wiki-link" style={{ color: "var(--color-primary)" }}>
              ← Retour à l'accueil
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
