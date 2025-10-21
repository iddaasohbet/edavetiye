import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası – eDavetiye",
  description: "Kullanıcı gizliliği, veri güvenliği ve çerezlere ilişkin politikamız.",
  alternates: { canonical: "https://edavetiye.co/gizlilik-politikasi" },
};

export default function PrivacyPolicyPage() {
  const updated = new Date().toISOString().slice(0, 10);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PrivacyPolicy',
    name: 'Gizlilik Politikası – eDavetiye',
    description: 'Kullanıcı gizliliği, veri güvenliği ve çerezlere ilişkin politikamız.',
    url: 'https://edavetiye.co/gizlilik-politikasi',
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
                <path d="M12 17l-5 3 1.9-5.6L4 9l5.8-.2L12 3l2.2 5.8L20 9l-4.9 5.4L17 20z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold">Gizlilik Politikası</h1>
              <p className="mt-2 text-white/70 max-w-2xl">Gizliliğinizi önemsiyoruz. Hangi verileri neden topladığımız ve nasıl koruduğumuz.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-8">
        <nav className="hidden lg:block rounded-xl border border-white/10 bg-card p-4 text-sm text-white/80 h-max sticky top-6">
          <div className="text-white/60 text-xs">İçindekiler</div>
          <ul className="mt-3 grid gap-2">
            <li><a href="#veriler" className="hover:text-white">Toplanan Veriler</a></li>
            <li><a href="#cerez" className="hover:text-white">Çerezler</a></li>
            <li><a href="#paylasim" className="hover:text-white">Paylaşımlar</a></li>
            <li><a href="#saklama" className="hover:text-white">Veri Saklama</a></li>
            <li><a href="#guvenlik" className="hover:text-white">Güvenlik</a></li>
            <li><a href="#iletisim" className="hover:text-white">İletişim</a></li>
          </ul>
        </nav>

        <article className="max-w-none">
          <h2 id="veriler" className="mt-2 text-xl font-semibold">Toplanan Veriler</h2>
          <h3 className="mt-4 text-base font-medium text-white/90">Hesap ve İletişim Bilgileri</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Ad‑soyad, e‑posta adresi ve kullanıcı tercihleri.</p>
          <h3 className="mt-4 text-base font-medium text-white/90">Kullanım ve Cihaz Verileri</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Oturum bilgileri, cihaz/tarayıcı türü, yaklaşık konum ve etkinlik kayıtları.</p>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-white/75">
            <li>Özel nitelikli kişisel veriler işlenmez.</li>
            <li>Yasal yükümlülükler kapsamında sınırlı veri saklanabilir.</li>
          </ul>

          <h2 id="cerez" className="mt-8 text-xl font-semibold">Çerezler</h2>
          <h3 className="mt-4 text-base font-medium text-white/90">Zorunlu Çerezler</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Oturumun sürdürülmesi ve temel işlevler için gereklidir.</p>
          <h3 className="mt-4 text-base font-medium text-white/90">Analitik Çerezler</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Kullanım ölçümü ve performans analizi sağlar.</p>
          <h3 className="mt-4 text-base font-medium text-white/90">İşlevsel Çerezler</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Tercihlerin hatırlanmasına yardımcı olur.</p>
          <p className="mt-2 text-white/75 leading-relaxed">Tercihlerinizi sayfa altındaki çerez bileşeninden yönetebilirsiniz.</p>

          <h2 id="paylasim" className="mt-8 text-xl font-semibold">Paylaşımlar</h2>
          <p className="mt-2 text-white/75 leading-relaxed">Barındırma, analiz ve e‑posta gibi tedarikçilerle sınırlı ve sözleşmesel güvenceler altında veri paylaşımı yapılabilir.</p>

          <h2 id="saklama" className="mt-8 text-xl font-semibold">Veri Saklama</h2>
          <p className="mt-2 text-white/75 leading-relaxed">Mevzuat ve meşru menfaat gereği makul sürelerle saklanır; süre sonunda güvenli şekilde imha edilir.</p>

          <h2 id="guvenlik" className="mt-8 text-xl font-semibold">Güvenlik</h2>
          <h3 className="mt-4 text-base font-medium text-white/90">Teknik ve Organizasyonel Önlemler</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-white/75">
            <li>Erişim kontrolü ve en az yetki prensibi</li>
            <li>Aktarım/saklama sırasında şifreleme (uygulanabilir olduğu ölçüde)</li>
            <li>Güncel altyapı ve zafiyet yönetimi</li>
          </ul>

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


