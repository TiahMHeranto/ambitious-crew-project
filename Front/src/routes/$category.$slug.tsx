import { createFileRoute, notFound, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { WikiHeader } from "@/components/WikiHeader";
import { SpeakButton } from "@/components/SpeakButton";
import madagascarPuzzleImg from "@/assets/madagascar-puzzle.jpg";
import {
  CATEGORY_LABEL,
  CATEGORY_KIND,
  getArticleData,
  type Category,
  type ArticleData,
} from "@/lib/mockData";

/** Concatène le texte d'un article pour la lecture vocale. */
function articleToSpeech(article: ArticleData): string {
  const sections = article.sections
    .map((s) => `${s.heading}. ${s.paragraphs.join(" ")}`)
    .join(" ");
  return `${article.title}. ${article.summary} ${sections}`;
}

function isCategory(v: string): v is Category {
  return v === "enfant" || v === "explorateur" || v === "chercheur";
}

export const Route = createFileRoute("/$category/$slug")({
  loader: ({ params }) => {
    if (!isCategory(params.category)) throw notFound();
    const article = getArticleData(params.slug);
    return { category: params.category, slug: params.slug, article };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.article.title} (${CATEGORY_LABEL[loaderData.category]}) — NovaPedia`,
          },
          { name: "description", content: loaderData.article.summary.slice(0, 160) },
        ]
      : [],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { category, slug, article } = Route.useLoaderData();
  const kind = CATEGORY_KIND[category];

  return (
    <div className="min-h-screen bg-background">
      <WikiHeader
        back={{
          to: "/$category",
          params: { category },
          label: `Retour à l'espace ${CATEGORY_LABEL[category]}`,
        }}
      />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="border-b border-border pb-2">
          <h1 className="text-4xl font-normal">{article.title}</h1>
          <p className="mt-1 text-xs text-muted-foreground wiki-sans">
            Espace{" "}
            <Link
              to="/$category"
              params={{ category }}
              className="wiki-link"
              style={{ color: "var(--color-primary)" }}
            >
              {CATEGORY_LABEL[category]}
            </Link>{" "}
            · Article encyclopédique
          </p>
        </div>

        <div className="mt-6">
          {kind === "puzzle" && <ChildView article={article} />}
          {kind === "quiz" && <ExplorerView article={article} />}
          {kind === "article" && (
            <ResearcherView article={article} category={category} slug={slug} />
          )}
        </div>
      </main>
    </div>
  );
}

/* -------------------------- Infobox -------------------------- */

function Infobox({ article }: { article: ArticleData }) {
  return (
    <aside className="float-none mb-4 w-full border border-border bg-card p-3 text-sm shadow-sm rounded-sm wiki-sans sm:float-right sm:ml-6 sm:mb-2 sm:w-64">
      <h2 className="border-b border-border pb-1 text-center text-base font-semibold">
        {article.title}
      </h2>
      <dl className="mt-2 space-y-1.5">
        {article.infobox.map((row) => (
          <div key={row.label} className="grid grid-cols-3 gap-2">
            <dt className="col-span-1 text-muted-foreground">{row.label}</dt>
            <dd className="col-span-2 font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

function TableOfContents({ article }: { article: ArticleData }) {
  return (
    <nav className="mb-6 inline-block border border-border bg-muted/40 p-3 text-sm wiki-sans rounded-sm">
      <p className="font-semibold">Sommaire</p>
      <ol className="mt-1 list-decimal pl-5 space-y-0.5">
        {article.sections.map((s, i) => (
          <li key={i}>
            <a
              href={`#section-${i}`}
              className="wiki-link"
              style={{ color: "var(--color-primary)" }}
            >
              {s.heading}
            </a>
          </li>
        ))}
        <li>
          <a href="#references" className="wiki-link" style={{ color: "var(--color-primary)" }}>
            Références
          </a>
        </li>
      </ol>
    </nav>
  );
}

/* -------------------------- ENFANT -------------------------- */

function ChildView({ article }: { article: ArticleData }) {
  return (
    <div className="space-y-8">
      <div className="border border-border bg-accent/40 p-4 rounded-sm">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold">📖 C'est quoi {article.title} ?</h2>
          <SpeakButton text={`${article.title}. ${article.summary}`} />
        </div>
        <p className="mt-2 text-base leading-relaxed">{article.summary}</p>
      </div>

      <div className="border border-primary/40 bg-primary/5 p-4 rounded-sm">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-primary">⭐ Le savais-tu ?</h2>
          <SpeakButton text={article.funFact} />
        </div>
        <p className="mt-2 text-base leading-relaxed">{article.funFact}</p>
      </div>

      <div>
        <h2 className="border-b border-border pb-1 text-2xl font-normal">
          🧩 Joue avec le puzzle de Madagascar
        </h2>
        <p className="mt-2 text-sm text-muted-foreground wiki-sans">
          Reconstitue l'image en cliquant sur les tuiles à côté de la case vide.
        </p>
        <ImagePuzzle title={article.title} />
      </div>
    </div>
  );
}

/** Puzzle 3x3 basé sur une image (Madagascar). */
function ImagePuzzle({ title }: { title: string }) {
  const initial = useMemo(() => {
    // 0..7 = tuiles d'image, 8 = case vide
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // Mélange "résolvable" : on effectue plusieurs déplacements valides
    let empty = 8;
    for (let k = 0; k < 80; k++) {
      const [er, ec] = [Math.floor(empty / 3), empty % 3];
      const neighbors: number[] = [];
      if (er > 0) neighbors.push(empty - 3);
      if (er < 2) neighbors.push(empty + 3);
      if (ec > 0) neighbors.push(empty - 1);
      if (ec < 2) neighbors.push(empty + 1);
      const swap = neighbors[Math.floor(Math.random() * neighbors.length)];
      [arr[empty], arr[swap]] = [arr[swap], arr[empty]];
      empty = swap;
    }
    return arr;
  }, []);
  const [tiles, setTiles] = useState<number[]>(initial);

  function move(idx: number) {
    const empty = tiles.indexOf(8);
    const [r, c] = [Math.floor(idx / 3), idx % 3];
    const [er, ec] = [Math.floor(empty / 3), empty % 3];
    if (Math.abs(r - er) + Math.abs(c - ec) === 1) {
      const next = [...tiles];
      [next[idx], next[empty]] = [next[empty], next[idx]];
      setTiles(next);
    }
  }

  function shuffle() {
    const arr = [...tiles];
    let empty = arr.indexOf(8);
    for (let k = 0; k < 80; k++) {
      const [er, ec] = [Math.floor(empty / 3), empty % 3];
      const neighbors: number[] = [];
      if (er > 0) neighbors.push(empty - 3);
      if (er < 2) neighbors.push(empty + 3);
      if (ec > 0) neighbors.push(empty - 1);
      if (ec < 2) neighbors.push(empty + 1);
      const swap = neighbors[Math.floor(Math.random() * neighbors.length)];
      [arr[empty], arr[swap]] = [arr[swap], arr[empty]];
      empty = swap;
    }
    setTiles(arr);
  }

  const solved = tiles.every((v, i) => v === i);
  const TILE_PX = 110;
  const BOARD_PX = TILE_PX * 3;

  return (
    <div className="mt-4 flex flex-col items-center text-center">
      <div
        className="relative rounded-lg border border-border bg-accent p-2 shadow-md"
        style={{ width: BOARD_PX + 16, height: BOARD_PX + 16 }}
      >
        <div
          className="grid grid-cols-3 grid-rows-3 gap-0"
          style={{ width: BOARD_PX, height: BOARD_PX }}
        >
          {tiles.map((v, i) => {
            if (v === 8) {
              return <div key={i} className="bg-background/40" />;
            }
            const row = Math.floor(v / 3);
            const col = v % 3;
            return (
              <button
                key={i}
                onClick={() => move(i)}
                aria-label={`Tuile ${v + 1}`}
                className="border border-background/60 bg-cover transition hover:brightness-110"
                style={{
                  backgroundImage: `url(${madagascarPuzzleImg})`,
                  backgroundSize: `${BOARD_PX}px ${BOARD_PX}px`,
                  backgroundPosition: `-${col * TILE_PX}px -${row * TILE_PX}px`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 wiki-sans">
        <button
          onClick={shuffle}
          className="rounded border border-border bg-secondary px-3 py-1 text-sm hover:bg-accent"
        >
          🔀 Mélanger
        </button>
        <img
          src={madagascarPuzzleImg}
          alt="Aperçu du puzzle"
          width={56}
          height={56}
          loading="lazy"
          className="rounded border border-border"
        />
        <span className="text-xs text-muted-foreground">Modèle : Madagascar 🌍</span>
      </div>

      {solved && (
        <p className="mt-4 text-lg font-semibold text-primary">
          🎉 Bravo, tu as reconstitué l'image de Madagascar pour {title} !
        </p>
      )}
    </div>
  );
}

/* -------------------------- EXPLORATEUR -------------------------- */

function ExplorerView({ article }: { article: ArticleData }) {
  const [answer, setAnswer] = useState<string | null>(null);
  const quiz = article.quiz!;

  return (
    <div className="space-y-6">
      <Infobox article={article} />

      <div className="flex justify-end">
        <SpeakButton text={articleToSpeech(article)} label="Écouter l'article" />
      </div>

      <p className="text-base leading-relaxed">{article.summary}</p>

      <TableOfContents article={article} />

      {article.sections.map((s, i) => (
        <section key={i} id={`section-${i}`}>
          <div className="flex items-center justify-between gap-3 border-b border-border pb-1">
            <h2 className="text-2xl font-normal">{s.heading}</h2>
            <SpeakButton text={`${s.heading}. ${s.paragraphs.join(" ")}`} />
          </div>
          <div className="mt-2 space-y-3">
            {s.paragraphs.map((p, j) => (
              <p key={j} className="text-base leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <div className="rounded-sm border border-primary/40 bg-card p-5 shadow-sm wiki-sans">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-primary">🎯 Quiz — Teste-toi !</h2>
          <SpeakButton
            text={`${quiz.question}. ${quiz.options.map((o) => `Option ${o.k}: ${o.t}`).join(". ")}`}
            label="Écouter la question"
          />
        </div>
        <p className="mt-2 text-sm">{quiz.question}</p>
        <div className="mt-3 space-y-2">
          {quiz.options.map((opt) => (
            <button
              key={opt.k}
              onClick={() => setAnswer(opt.k)}
              className={`block w-full rounded border px-3 py-2 text-left text-sm transition ${
                answer === opt.k
                  ? opt.k === quiz.correct
                    ? "border-primary bg-primary/10"
                    : "border-destructive bg-destructive/10"
                  : "border-border hover:bg-accent"
              }`}
            >
              <span className="font-semibold">{opt.k}.</span> {opt.t}
            </button>
          ))}
        </div>
        {answer && (
          <div className="mt-3 flex items-start justify-between gap-3">
            <p className="text-sm">
              {answer === quiz.correct ? "✅ Bonne réponse ! " : "❌ Ce n'est pas ça. "}
              <span className="text-muted-foreground">{quiz.explanation}</span>
            </p>
            <SpeakButton
              text={`${answer === quiz.correct ? "Bonne réponse !" : "Ce n'est pas ça."} ${quiz.explanation}`}
            />
          </div>
        )}
      </div>

      <section id="references">
        <h2 className="border-b border-border pb-1 text-xl font-normal">Références</h2>
        <ol className="mt-2 list-inside list-decimal text-sm wiki-sans space-y-1">
          {article.references.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}

/* -------------------------- CHERCHEUR -------------------------- */

function ResearcherView({
  article,
  category,
  slug,
}: {
  article: ArticleData;
  category: Category;
  slug: string;
}) {
  const navigate = useNavigate();
  const goLogin = (action: "edit" | "delete") => {
    navigate({
      to: "/login",
      search: { redirect: `/${category}/${slug}`, action },
    });
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2 wiki-sans">
        <button
          onClick={() => goLogin("edit")}
          className="rounded border border-border bg-secondary px-3 py-1 text-sm hover:bg-accent"
        >
          ✎ Modifier
        </button>
        <button
          onClick={() => goLogin("delete")}
          className="rounded border border-border bg-secondary px-3 py-1 text-sm text-destructive hover:bg-destructive/10"
        >
          🗑 Supprimer
        </button>
        <button
          disabled
          className="rounded border border-border bg-secondary px-3 py-1 text-sm text-muted-foreground"
        >
          Discussion
        </button>
        <button
          disabled
          className="rounded border border-border bg-secondary px-3 py-1 text-sm text-muted-foreground"
        >
          Historique
        </button>
        <SpeakButton text={articleToSpeech(article)} label="Écouter l'article" />
      </div>

      <Infobox article={article} />

      <p className="text-base leading-relaxed">{article.summary}</p>

      <div className="mt-4">
        <TableOfContents article={article} />
      </div>

      {article.sections.map((s, i) => (
        <section key={i} id={`section-${i}`} className="mt-6">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-1">
            <h2 className="text-2xl font-normal">{s.heading}</h2>
            <SpeakButton text={`${s.heading}. ${s.paragraphs.join(" ")}`} />
          </div>
          <div className="mt-2 space-y-3">
            {s.paragraphs.map((p, j) => (
              <p key={j} className="text-base leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <section id="references" className="mt-8">
        <h2 className="border-b border-border pb-1 text-2xl font-normal">Références</h2>
        <ol className="mt-2 list-inside list-decimal text-sm wiki-sans space-y-1">
          {article.references.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </section>

      <section className="mt-8 border-t border-border pt-4 text-xs text-muted-foreground wiki-sans">
        <p>
          Cet article est publié sous licence libre Creative Commons. Dernière modification :
          aujourd'hui à 14:32 par <span className="text-primary">NovaPedia-bot</span>.
        </p>
      </section>
    </div>
  );
}
