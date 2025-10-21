"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) return setError("E‑posta ve şifre gerekli");
    try {
      setLoading(true);
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const json = await res.json();
      if (!res.ok || !json?.ok) { setError("E‑posta veya şifre hatalı"); return; }
      try { localStorage.setItem('demo_user', JSON.stringify(json.user || { email })); } catch {}
      try { window.dispatchEvent(new CustomEvent("auth:changed")); } catch {}
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <h1 className="text-3xl font-semibold">Giriş Yap</h1>
      <p className="mt-2 text-white/70">Hesabına giriş yap ve devam et.</p>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-card p-6">
        {error && <div className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div>}
        <div>
          <label className="text-xs text-white/70">E‑posta</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
        </div>
        <div>
          <label className="text-xs text-white/70">Şifre</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
        </div>
        <button disabled={loading} className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
        <div className="text-xs text-white/60">Hesabın yok mu? <a href="/kayit" className="underline">Kayıt ol</a></div>
      </form>
    </div>
  );
}


