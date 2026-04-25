import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { searchArticles, searchInCategory, CATEGORY_LABEL, type Category } from "@/lib/mockData";

type Props = {
  /** Si défini, restreint la recherche à cette catégorie */
  restrictTo?: Category;
  placeholder?: string;
};

export function SearchBar({ restrictTo, placeholder }: Props) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = restrictTo ? searchInCategory(q, restrictTo) : searchArticles(q);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto wiki-sans">
      <div className="flex shadow-sm rounded-sm overflow-hidden">
        <input
          type="text"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder ?? "Rechercher dans Wikidia"}
          className="flex-1 border border-border bg-background px-4 py-2.5 text-base outline-none focus:border-primary focus:ring-1 focus:ring-ring"
        />
        <button
          type="button"
          className="border border-l-0 border-border bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground hover:bg-accent transition-colors"
        >
          Rechercher
        </button>
      </div>

      {open && q.trim() && (
        <div className="absolute left-0 right-0 z-20 mt-1 max-h-96 overflow-y-auto border border-border bg-popover shadow-lg rounded-sm">
          {results.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">Aucun résultat pour « {q} »</div>
          ) : (
            <ul>
              {results.map((r, i) => (
                <li key={`${r.category}-${r.title}-${i}`} className="border-b border-border last:border-0">
                  <Link
                    to="/$category/$slug"
                    params={{ category: r.category, slug: r.slug }}
                    className="block px-3 py-2 text-sm hover:bg-accent transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <span className="wiki-link" style={{ color: "var(--color-primary)" }}>
                      {r.title}
                    </span>{" "}
                    <span className="text-muted-foreground">({CATEGORY_LABEL[r.category]})</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
