"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [user, setUser] = useState<null | { name: string }>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const syncLocal = () => {
      try {
        const raw = localStorage.getItem("demo_user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch { setUser(null); }
    };
    const syncRemote = async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        const j = await res.json();
        if (j?.user) {
          setUser(j.user);
          try { localStorage.setItem('demo_user', JSON.stringify(j.user)); } catch {}
          return;
        }
      } catch {}
      syncLocal();
    };
    const sync = () => { void syncRemote(); };
    sync();
    const onAuthChanged = () => sync();
    const onFocus = () => sync();
    window.addEventListener("auth:changed", onAuthChanged as EventListener);
    window.addEventListener("storage", onAuthChanged);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("auth:changed", onAuthChanged as EventListener);
      window.removeEventListener("storage", onAuthChanged);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setUserMenu(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const fakeLogin = () => {
    const demo = { name: "Kullanıcı" };
    setUser(demo);
    try { localStorage.setItem("demo_user", JSON.stringify(demo)); } catch {}
    setUserMenu(false);
  };
  const logout = async () => {
    try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
    setUser(null);
    try { localStorage.removeItem("demo_user"); } catch {}
    try { window.dispatchEvent(new CustomEvent("auth:changed")); } catch {}
    setUserMenu(false);
  };
  const headerClass = `sticky top-0 z-50 w-full transition-all ${mounted && scrolled ? 'bg-background/95 backdrop-blur-xl border-b border-white/15 shadow-lg shadow-black/10' : 'bg-background/70 backdrop-blur border-b border-white/10'}`;
  return (
    <>
    <header suppressHydrationWarning className={headerClass}>
      <div className="mx-auto max-w-7xl px-6 h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-rose-700 shadow-md shadow-brand/30">
            <span className="text-sm font-bold">eD</span>
            <span className="absolute inset-0 rounded-lg bg-white/10" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">eDavetiye</div>
            <div className="text-[10px] text-white/60">Kurumsal Davet Platformu</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1 text-sm text-white/80">
          <Link href="/?all=1#sablonlar" className="px-4 py-2 rounded-lg hover:text-white hover:bg-white/10 transition-colors">Şablonlar</Link>
          <Link href="#ozellikler" className="px-4 py-2 rounded-lg hover:text-white hover:bg-white/10 transition-colors">Özellikler</Link>
          <Link href="#nasil" className="px-4 py-2 rounded-lg hover:text-white hover:bg-white/10 transition-colors">Nasıl Çalışır</Link>
          <Link href="/olustur" className="px-4 py-2 rounded-lg hover:text-white hover:bg-white/10 transition-colors">Oluştur</Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {/* Profile dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setUserMenu((v) => !v)}
              aria-label="Profil menüsü"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              {/* simple user icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
            {userMenu && (
              <div className="absolute right-0 mt-3 w-48 overflow-hidden rounded-xl border border-white/15 bg-background/98 shadow-2xl backdrop-blur-xl">
                {!user ? (
                  <div className="py-2 text-sm">
                    <Link href="/giris" className="block px-4 py-2.5 text-white/90 hover:bg-white/10">Giriş Yap</Link>
                    <Link href="/kayit" className="block px-4 py-2.5 text-white/90 hover:bg-white/10">Kayıt Ol</Link>
                  </div>
                ) : (
                  <div className="py-2 text-sm">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-xs text-white/60">Hoşgeldin</p>
                      <p className="font-medium text-white">{user.name}</p>
                    </div>
                    <Link href="/profil" className="block px-4 py-2.5 text-white/90 hover:bg-white/10">Profil</Link>
                    <button onClick={logout} className="block w-full px-4 py-2.5 text-left text-white/90 hover:bg-white/10">Çıkış Yap</button>
                  </div>
                )}
              </div>
            )}
          </div>
          <Link href="/olustur" className="px-6 h-10 inline-flex items-center rounded-full bg-white text-black text-sm font-bold shadow-md hover:shadow-lg hover:bg-white/90 transition">
            Hemen Oluştur
          </Link>
        </div>
        <button aria-label="Menüyü aç/kapat" onClick={() => setOpen((v) => !v)} className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white/90">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
          </svg>
        </button>
      </div>
    </header>
    {mounted && open ? createPortal(
      <div className="fixed inset-0 z-[2147483647] md:hidden" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
        {/* Right drawer */}
        <div className="absolute right-0 top-0 h-full w-[86%] max-w-[380px] bg-white text-black shadow-2xl transition-transform duration-300 translate-x-0">
          <div className="pt-[72px] px-6 py-4 grid gap-2 text-sm">
          <Link href="/?all=1#sablonlar" className="px-3 py-2 rounded-lg hover:bg-white/10" onClick={() => setOpen(false)}>Şablonlar</Link>
          <Link href="#ozellikler" className="px-3 py-2 rounded-lg hover:bg-white/10" onClick={() => setOpen(false)}>Özellikler</Link>
          <Link href="#nasil" className="px-3 py-2 rounded-lg hover:bg-white/10" onClick={() => setOpen(false)}>Nasıl Çalışır</Link>
          <div className="h-px bg-white/10 my-2" />
          {!user ? (
            <>
              <Link href="/giris" className="px-3 py-2 rounded-lg hover:bg-white/10" onClick={() => setOpen(false)}>Giriş Yap</Link>
              <Link href="/kayit" className="px-3 py-2 rounded-lg hover:bg-white/10" onClick={() => setOpen(false)}>Kayıt Ol</Link>
            </>
          ) : (
            <>
              <Link href="/profil" className="px-3 py-2 rounded-lg hover:bg-white/10" onClick={() => setOpen(false)}>Profil</Link>
              <button onClick={() => { setOpen(false); logout(); }} className="text-left px-3 py-2 rounded-lg hover:bg-white/10">Çıkış Yap</button>
            </>
          )}
          <Link href="/olustur" className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-black text-white font-bold shadow-md hover:shadow-lg transition" onClick={() => setOpen(false)}>
            Hemen Oluştur
          </Link>
          <button onClick={() => setOpen(false)} className="mt-2 h-10 rounded-lg border border-black/20">Kapat</button>
          </div>
        </div>
      </div>, document.body) : null}
    </>
  );
}


