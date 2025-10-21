"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
  }, [fullName, email, password, password2, agree]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return setError("Ad Soyad gerekli");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Geçerli bir e‑posta girin");
    if (password.length < 6) return setError("Şifre en az 6 karakter olmalı");
    if (password !== password2) return setError("Şifreler uyuşmuyor");
    if (!agree) return setError("Şartları kabul etmelisiniz");

    try {
      setLoading(true);
      // Demo kayıt: localStorage'a yaz ve ana sayfaya yönlendir
      const user = { name: fullName, email };
      localStorage.setItem("demo_user", JSON.stringify(user));
      try { window.dispatchEvent(new CustomEvent("auth:changed")); } catch {}
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <h1 className="text-3xl font-semibold">Kayıt Ol</h1>
      <p className="mt-2 text-white/70">Hesabını oluştur, davetiyelerini yönet.</p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-card p-6">
        {error && (
          <div className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div>
        )}
        <div>
          <label className="text-xs text-white/70">Ad Soyad</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
        </div>
        <div>
          <label className="text-xs text-white/70">E‑posta</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-white/70">Şifre</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
          </div>
          <div>
            <label className="text-xs text-white/70">Şifre (Tekrar)</label>
            <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none" />
          </div>
        </div>
        <label className="mt-1 flex items-start gap-2 text-xs text-white/70">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5" />
          <span>
            KVKK ve Kullanım Koşullarını kabul ediyorum
          </span>
        </label>

        <button disabled={loading} className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
          {loading ? "Oluşturuluyor..." : "Hesap Oluştur"}
        </button>

        <div className="text-xs text-white/60">
          Zaten hesabın var mı? <a href="#giris" className="underline">Giriş yap</a>
        </div>
      </form>
    </div>
  );
}


