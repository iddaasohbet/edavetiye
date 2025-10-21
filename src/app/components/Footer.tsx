"use client";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-14 text-sm">
        {/* Cihatsoft Promo */}
        <div className="mb-10 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(1000px_300px_at_0%_0%,rgba(225,29,72,.10),transparent)] p-5 sm:p-6">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-brand" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7a5 5 0 0 1 5-5h7" />
                  <path d="M4 17a5 5 0 0 0 5 5h7" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <div className="text-white text-lg font-semibold leading-tight">Cihatsoft</div>
                <div className="text-xs text-white/70">Kurumsal yazılım ve web çözümleri</div>
                <div className="mt-2 hidden gap-2 text-[10px] text-white/60 sm:flex">
                  <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">Kurumsal</span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">Güvenilir</span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">7/24 Destek</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="https://cihatsoft.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white shadow-lg hover:bg-brand-700">Siteyi Ziyaret Et</a>
              <a href="https://cihatsoft.com#projects" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center rounded-full border border-white/15 px-5 text-sm text-white/90 hover:bg-white/10">Referanslar</a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white">
              <span className="inline-block h-3 w-3 rounded-full bg-brand" />
              <span className="font-semibold">eDavetiye</span>
            </div>
            <p className="mt-3 text-white/70">Kurumsal etkinlikler ve özel günler için profesyonel dijital davetiyeler.</p>
            <div className="mt-4 flex gap-3 text-white/70">
              <a href="#" aria-label="Twitter" className="hover:text-white">X</a>
              <a href="#" aria-label="Instagram" className="hover:text-white">Instagram</a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
          <div>
            <h3 className="text-white/80 font-medium">Ürün</h3>
            <nav className="mt-3 grid gap-2 text-white/70">
              <a href="#sablonlar" className="hover:text-white">Şablonlar</a>
              <a href="#ozellikler" className="hover:text-white">Özellikler</a>
              <a href="#nasil" className="hover:text-white">Nasıl Çalışır</a>
              <a href="#sss" className="hover:text-white">SSS</a>
            </nav>
          </div>
          <div>
            <h3 className="text-white/80 font-medium">Hukuki</h3>
            <nav className="mt-3 grid gap-2 text-white/70">
              <a href="/kvkk" className="hover:text-white">KVKK</a>
              <a href="/gizlilik-politikasi" className="hover:text-white">Gizlilik Politikası</a>
              <a href="/kullanim-sartlari" className="hover:text-white">Kullanım Şartları</a>
            </nav>
          </div>
          <div>
            <h3 className="text-white/80 font-medium">Bülten</h3>
            <p className="mt-3 text-white/70">Güncellemeleri e‑posta ile alın.</p>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="email"
                required
                placeholder="E‑posta adresiniz"
                className="min-w-0 flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/50 outline-none"
              />
              <button className="rounded-md bg-brand px-4 text-white hover:bg-brand-700">Kaydol</button>
            </form>
            <div className="mt-2 text-xs text-white/50">Abone olarak ileti izinlerini kabul etmiş olursunuz.</div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 items-center gap-4 border-t border-white/10 pt-6">
          <div className="text-xs text-white/50">© {new Date().getFullYear()} eDavetiye</div>
          <div className="text-center text-xs text-white/60">99.9% uptime • TR datacenter</div>
          <div className="text-right text-xs text-white/50">hello@edavetiye.co</div>
        </div>
      </div>
    </footer>
  );
}


