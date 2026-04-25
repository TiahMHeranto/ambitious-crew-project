// types/article.ts
export type Category = "enfant" | "explorateur" | "chercheur";

export type ArticleStatus = "draft" | "published" | "archived";

export interface ArticleFormData {
  title: string;
  category: Category;
  content: string;
  summary: string;
  tags: string[];
  status: ArticleStatus;
  image?: File | string;
  imagePreview?: string;
}

export interface ArticleValidationErrors {
  title?: string;
  category?: string;
  content?: string;
  summary?: string;
  image?: string;
}