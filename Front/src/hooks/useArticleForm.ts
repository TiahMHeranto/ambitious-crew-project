// hooks/useArticleForm.ts
import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { ArticleFormData, ArticleValidationErrors, Category } from "@/types/article";

const initialFormData: ArticleFormData = {
  title: "",
  category: "explorateur",
  content: "",
  summary: "",
  tags: [],
  status: "draft",
};

export function useArticleForm() {
  const [formData, setFormData] = useState<ArticleFormData>(initialFormData);
  const [errors, setErrors] = useState<ArticleValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateField = useCallback((name: keyof ArticleFormData, value: any): string | undefined => {
    switch (name) {
      case "title":
        if (!value.trim()) return "Le titre est requis";
        if (value.length < 3) return "Le titre doit contenir au moins 3 caractères";
        if (value.length > 100) return "Le titre ne peut pas dépasser 100 caractères";
        break;
      case "category":
        if (!value) return "La catégorie est requise";
        break;
      case "content":
        if (!value.trim()) return "Le contenu est requis";
        if (value.length < 50) return "Le contenu doit contenir au moins 50 caractères";
        break;
      case "summary":
        if (!value.trim()) return "Le résumé est requis";
        if (value.length < 20) return "Le résumé doit contenir au moins 20 caractères";
        if (value.length > 200) return "Le résumé ne peut pas dépasser 200 caractères";
        break;
    }
    return undefined;
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      
      const error = validateField(name as keyof ArticleFormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  const handleTagsChange = useCallback((tagsString: string) => {
    const tags = tagsString.split(",").map(tag => tag.trim()).filter(tag => tag);
    setFormData((prev) => ({ ...prev, tags }));
  }, []);

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "L'image ne doit pas dépasser 5 MB" }));
        return;
      }
      
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Le fichier doit être une image" }));
        return;
      }

      const preview = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: file, imagePreview: preview }));
      setErrors((prev) => ({ ...prev, image: undefined }));
    }
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: ArticleValidationErrors = {};
    
    newErrors.title = validateField("title", formData.title);
    newErrors.category = validateField("category", formData.category);
    newErrors.content = validateField("content", formData.content);
    newErrors.summary = validateField("summary", formData.summary);
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== undefined);
  }, [formData, validateField]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      
      if (!validateForm()) return;
      
      setIsSubmitting(true);
      setSubmitError(null);
      
      try {
        // Ici, vous feriez un appel API pour sauvegarder l'article
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("summary", formData.summary);
        formDataToSend.append("tags", JSON.stringify(formData.tags));
        formDataToSend.append("status", formData.status);
        
        if (formData.image instanceof File) {
          formDataToSend.append("image", formData.image);
        }
        
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Rediriger ou afficher un message de succès
        console.log("Article créé avec succès", formData);
        
        // Reset form after success
        setFormData(initialFormData);
        
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "Une erreur est survenue");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm]
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitError(null);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleTagsChange,
    handleImageChange,
    handleSubmit,
    resetForm,
  };
}