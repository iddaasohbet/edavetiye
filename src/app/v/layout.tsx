import { Suspense } from "react";

export default function VLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-16 text-white/60">Yükleniyor…</div>}>
      {children}
    </Suspense>
  );
}

