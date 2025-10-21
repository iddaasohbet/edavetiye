import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Şartları – eDavetiye",
  description: "Hizmetin kullanımına ilişkin kurallar, sorumluluklar ve sınırlamalar.",
  alternates: { canonical: "https://edavetiye.co/kullanim-sartlari" },
};

export default function TermsPage() {
  const updated = new Date().toISOString().slice(0, 10);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TermsOfService',
    name: 'Kullanım Şartları – eDavetiye',
    description: 'Hizmetin kullanımına ilişkin kurallar, sorumluluklar ve sınırlamalar.',
    url: 'https://edavetiye.co/kullanim-sartlari',
    dateModified: updated,
    inLanguage: 'tr-TR'
  };

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(1200px_400px_at_0%_0%,rgba(225,29,72,.10),transparent)]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 ring-1 ring-brand/30">
              <svg className="h-6 w-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold">Kullanım Şartları</h1>
              <p className="mt-2 text-white/70 max-w-2xl">Hizmetin kullanımına ilişkin kurallar ve sorumluluklar.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-8">
        <nav className="hidden lg:block rounded-xl border border-white/10 bg-card p-4 text-sm text-white/80 h-max sticky top-6">
          <div className="text-white/60 text-xs">İçindekiler</div>
          <ul className="mt-3 grid gap-2">
            <li><a href="#kabul" className="hover:text-white">Kabul ve Değişiklik</a></li>
            <li><a href="#uyelik" className="hover:text-white">Üyelik ve Hesap</a></li>
            <li><a href="#guvenlik" className="hover:text-white">Güvenlik</a></li>
            <li><a href="#fikir" className="hover:text-white">Fikri Mülkiyet</a></li>
            <li><a href="#sorumluluk" className="hover:text-white">Sorumluluk Reddi</a></li>
            <li><a href="#fesih" className="hover:text-white">Fesih</a></li>
            <li><a href="#iletisim" className="hover:text-white">İletişim</a></li>
          </ul>
        </nav>

        <article className="max-w-none">
          <h2 id="kabul" className="mt-2 text-xl font-semibold">Kabul ve Değişiklik</h2>
          <p className="mt-2 text-white/75 leading-relaxed">Bu siteyi kullanarak şartları kabul etmiş sayılırsınız. Şartlar gerektiğinde güncellenebilir; önemli değişikliklerde duyuru yapılır.</p>

          <h2 id="uyelik" className="mt-8 text-xl font-semibold">Üyelik ve Hesap</h2>
          <h3 className="mt-4 text-base font-medium text-white/90">Hesap Sorumluluğu</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Hesap bilgilerinin gizliliğinden kullanıcı sorumludur. Yetkisiz erişim şüphesinde derhal bildirim yapılmalıdır.</p>
          <h3 className="mt-4 text-base font-medium text-white/90">Doğruluk</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Sağlanan bilgiler doğru ve güncel tutulmalıdır; aksi durumda hizmet kısıtlanabilir.</p>

          <h2 id="guvenlik" className="mt-8 text-xl font-semibold">Güvenlik</h2>
          <p className="mt-2 text-white/75 leading-relaxed">Hizmete zarar verici, tersine mühendislik veya yetkisiz erişim girişimleri yasaktır.</p>

          <h2 id="fikir" className="mt-8 text-xl font-semibold">Fikri Mülkiyet</h2>
          <p className="mt-2 text-white/75 leading-relaxed">Site içeriği ve şablonlar telif hakkıyla korunur. Ticari amaçla izinsiz kopyalanamaz, dağıtılamaz.</p>

          <h2 id="sorumluluk" className="mt-8 text-xl font-semibold">Sorumluluk Reddi</h2>
          <p className="mt-2 text-white/75 leading-relaxed">Hizmet “olduğu gibi” sunulur. Dolaylı/sonuçsal zararlar için sorumluluk kabul edilmez; yasal sınırlar saklıdır.</p>

          <h2 id="fesih" className="mt-8 text-xl font-semibold">Fesih</h2>
          <p className="mt-2 text-white/75 leading-relaxed">Şartların ihlali halinde erişim kısıtlanabilir veya hesap feshedilebilir.</p>

          <h2 id="iletisim" className="mt-8 text-xl font-semibold">İletişim</h2>
          <p className="mt-2 text-white/75 leading-relaxed">E‑posta: <a className="underline" href="mailto:hello@edavetiye.co">hello@edavetiye.co</a></p>
          <p className="mt-8 text-white/50 text-sm">Güncelleme tarihi: {updated}</p>
        </article>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}


