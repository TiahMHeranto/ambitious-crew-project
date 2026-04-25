import { useSpeech } from "@/hooks/useSpeech";

type Props = {
  text: string;
  label?: string;
  className?: string;
};

/**
 * Petit bouton "écouter" qui lit le texte fourni avec la voix du navigateur.
 */
export function SpeakButton({ text, label = "Écouter", className = "" }: Props) {
  const { toggle, speaking, supported } = useSpeech("fr-FR");

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={() => toggle(text)}
      aria-pressed={speaking}
      title={speaking ? "Arrêter la lecture" : "Lire à voix haute"}
      className={`inline-flex items-center gap-1.5 rounded border border-border bg-secondary px-2.5 py-1 text-xs wiki-sans transition hover:bg-accent ${
        speaking ? "border-primary text-primary" : ""
      } ${className}`}
    >
      <span aria-hidden>{speaking ? "⏸" : "🔊"}</span>
      <span>{speaking ? "Pause" : label}</span>
    </button>
  );
}
