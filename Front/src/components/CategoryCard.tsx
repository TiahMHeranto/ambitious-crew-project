import { Link } from "@tanstack/react-router";
import type { Category } from "@/lib/mockData";

type Props = {
  category: Category;
  title: string;
  subtitle: string;
  image: string;
};

export function CategoryCard({ category, title, subtitle, image }: Props) {
  return (
    <Link
      to="/$category"
      params={{ category }}
      className="group flex flex-col items-center text-center"
    >
      <div className="overflow-hidden rounded-full border-2 border-border ring-4 ring-transparent transition-all duration-200 group-hover:border-primary group-hover:ring-accent group-hover:shadow-xl">
        <img
          src={image}
          alt={title}
          width={200}
          height={200}
          loading="lazy"
          className="h-40 w-40 object-cover transition-transform duration-300 group-hover:scale-105 sm:h-48 sm:w-48"
        />
      </div>
      <h3
        className="mt-5 text-xl font-semibold wiki-link group-hover:underline"
        style={{ color: "var(--color-primary)" }}
      >
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground wiki-sans max-w-[220px]">{subtitle}</p>
    </Link>
  );
}
