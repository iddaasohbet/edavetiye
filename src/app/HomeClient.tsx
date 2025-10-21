"use client";
import TemplateGrid from "./components/TemplateGrid";

export type Template = {
  id: string;
  title: string;
  category: string;
  image?: string;
};

type Props = {
  initialTemplates?: Template[];
};

const FALLBACK_TEMPLATES: Template[] = [
  { id: "t1", title: "Minimal Düğün", category: "Düğün" },
  { id: "t2", title: "Klasik Nişan", category: "Nişan" },
  { id: "t3", title: "Modern Sünnet", category: "Sünnet" },
  { id: "t4", title: "Renkli Doğum Günü", category: "Doğum Günü" },
  { id: "t5", title: "Zarif Kına", category: "Kına" },
  { id: "t6", title: "Şık Mezuniyet", category: "Mezuniyet" },
];

export default function HomeClient({ initialTemplates }: Props) {
  const effectiveTemplates = (initialTemplates && initialTemplates.length > 0) ? initialTemplates : FALLBACK_TEMPLATES;
  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <TemplateGrid templates={effectiveTemplates} />
    </section>
  );
}


