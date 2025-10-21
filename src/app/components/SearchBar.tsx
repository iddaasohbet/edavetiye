"use client";
import { useState } from "react";

type Props = {
  placeholder?: string;
  value: string;
  onChange: (q: string) => void;
  onSubmit: () => void;
};

export default function SearchBar({ placeholder = "Arayın...", value, onChange, onSubmit }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={
        "flex w-full items-center gap-2 rounded-xl border px-3 sm:px-4 py-2 sm:py-2.5 transition " +
        (focused ? "border-brand shadow-[0_0_0_3px] shadow-brand/20" : "border-white/15 bg-white/5")
      }
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-white placeholder:text-white/50 outline-none text-sm sm:text-base"
        aria-label="Şablon ara"
      />
      <button
        onClick={onSubmit}
        className="inline-flex h-9 items-center rounded-md bg-brand px-3 text-sm font-medium text-white hover:bg-brand-700"
      >
        Ara
      </button>
    </div>
  );
}


