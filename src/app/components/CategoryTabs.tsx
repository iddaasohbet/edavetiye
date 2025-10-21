"use client";
import { useId } from "react";

type Props = {
  categories: string[];
  value: string;
  onChange: (category: string) => void;
};

export default function CategoryTabs({ categories, value, onChange }: Props) {
  const id = useId();
  return (
    <div role="tablist" aria-label="Kategoriler" className="w-full overflow-x-auto">
      <div className="inline-flex min-w-full items-center gap-2">
        {categories.map((category) => {
          const selected = category === value;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-${category}`}
              onClick={() => onChange(category)}
              className={
                "whitespace-nowrap rounded-md border px-3 py-2 text-sm transition-colors " +
                (selected
                  ? "border-brand bg-brand text-white"
                  : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10")
              }
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}


