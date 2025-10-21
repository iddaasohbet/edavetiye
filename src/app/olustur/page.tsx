import { Suspense } from "react";
import BuilderClient from "./BuilderClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-16 text-white/60">Yükleniyor…</div>}>
      <BuilderClient />
    </Suspense>
  );
}
