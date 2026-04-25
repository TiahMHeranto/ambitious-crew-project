// pages/ArticleEditor.tsx
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { WikiHeader } from "@/components/WikiHeader";
import { SpeakButton } from "@/components/SpeakButton";
import { useArticleForm } from "@/hooks/useArticleForm";
import { Category } from "@/types/article";

const CATEGORY_OPTIONS = [
  { value: "enfant" as Category, label: "Enfant", color: "text-green-600" },
  { value: "explorateur" as Category, label: "Explorateur", color: "text-blue-600" },
  { value: "chercheur" as Category, label: "Chercheur", color: "text-purple-600" },
];

const STATUS_OPTIONS = [
  { value: "draft", label: "Brouillon" },
  { value: "published", label: "Publié" },
  { value: "archived", label: "Archivé" },
];

export function ArticleEditor() {
  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleTagsChange,
    handleImageChange,
    handleSubmit,
    resetForm,
  } = useArticleForm();

  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const getPreviewContent = () => {
    return `
      <h1>${formData.title}</h1>
      <div class="category-badge">${CATEGORY_OPTIONS.find(c => c.value === formData.category)?.label}</div>
      <div class="summary">${formData.summary}</div>
      <div class="content">${formData.content.replace(/\n/g, "<br/>")}</div>
      ${formData.tags.length ? `<div class="tags">Tags: ${formData.tags.join(", ")}</div>` : ""}
    `;
  };

  return (
    <div className="min-h-screen bg-background">
      <WikiHeader back={{ to: "/", label: "Retour à l'accueil" }} />
      
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground wiki-sans">
            Nouvel article
          </h1>
          <p className="mt-2 text-muted-foreground">
            Créez un nouvel article pour l'encyclopédie NovaPedia
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="border border-border bg-card rounded-lg">
              <div className="border-b border-border p-4">
                <div className="flex gap-2">
                  {["write", "preview"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as "write" | "preview")}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === tab
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      {tab === "write" ? "Écrire" : "Aperçu"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === "write" ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Titre */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Titre *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                          errors.title
                            ? "border-red-500 focus:ring-red-500"
                            : "border-border focus:ring-primary"
                        }`}
                        placeholder="Titre de l'article"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                      )}
                    </div>

                    {/* Catégorie */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Catégorie *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {CATEGORY_OPTIONS.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Résumé */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">Résumé *</label>
                        <SpeakButton text={formData.summary} label="Écouter" />
                      </div>
                      <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                          errors.summary
                            ? "border-red-500 focus:ring-red-500"
                            : "border-border focus:ring-primary"
                        }`}
                        placeholder="Court résumé de l'article (max 200 caractères)"
                      />
                      <div className="mt-1 flex justify-between">
                        {errors.summary && (
                          <p className="text-sm text-red-500">{errors.summary}</p>
                        )}
                        <p className="text-xs text-muted-foreground ml-auto">
                          {formData.summary.length}/200
                        </p>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">Contenu *</label>
                        <SpeakButton text={formData.content} label="Écouter" />
                      </div>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={12}
                        className={`w-full border rounded-md px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 ${
                          errors.content
                            ? "border-red-500 focus:ring-red-500"
                            : "border-border focus:ring-primary"
                        }`}
                        placeholder="Contenu de l'article..."
                      />
                      {errors.content && (
                        <p className="mt-1 text-sm text-red-500">{errors.content}</p>
                      )}
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tags (séparés par des virgules)
                      </label>
                      <input
                        type="text"
                        value={formData.tags.join(", ")}
                        onChange={(e) => handleTagsChange(e.target.value)}
                        className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="ex: science, technologie, nature"
                      />
                    </div>

                    {/* Image */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Image de couverture
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                      {errors.image && (
                        <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                      )}
                      {formData.imagePreview && (
                        <div className="mt-4">
                          <img
                            src={formData.imagePreview}
                            alt="Preview"
                            className="h-32 w-32 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>

                    {/* Statut */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Statut
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Boutons */}
                    {submitError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{submitError}</p>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Création en cours..." : "Créer l'article"}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 border border-border rounded-md hover:bg-accent transition-colors"
                      >
                        Réinitialiser
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <div
                      dangerouslySetInnerHTML={{ __html: getPreviewContent() }}
                      className="space-y-4"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar avec conseils */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="border border-border bg-card rounded-lg p-6">
                <h3 className="font-semibold mb-3">📝 Conseils d'écriture</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Utilisez un titre clair et concis</li>
                  <li>• Structurez votre contenu avec des paragraphes</li>
                  <li>• Ajoutez des mots-clés pertinents en tags</li>
                  <li>• Vérifiez l'orthographe avant publication</li>
                  <li>• Utilisez le bouton "Écouter" pour relire votre texte</li>
                </ul>
              </div>

              <div className="border border-border bg-card rounded-lg p-6">
                <h3 className="font-semibold mb-3">📊 Statistiques</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Titre:</span>
                    <span className="font-medium">{formData.title.length} caractères</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Résumé:</span>
                    <span className="font-medium">{formData.summary.length}/200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contenu:</span>
                    <span className="font-medium">{formData.content.length} caractères</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tags:</span>
                    <span className="font-medium">{formData.tags.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}