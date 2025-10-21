import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni – eDavetiye",
  description: "6698 sayılı KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.",
  alternates: { canonical: "https://edavetiye.co/kvkk" },
};

export default function KVKKPage() {
  const updated = new Date().toISOString().slice(0, 10);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'KVKK Aydınlatma Metni – eDavetiye',
    description: '6698 sayılı KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.',
    url: 'https://edavetiye.co/kvkk',
    dateModified: updated,
    inLanguage: 'tr-TR',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: 'https://edavetiye.co' },
        { '@type': 'ListItem', position: 2, name: 'KVKK', item: 'https://edavetiye.co/kvkk' }
      ]
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(1200px_400px_at_0%_0%,rgba(225,29,72,.10),transparent)]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 ring-1 ring-brand/30">
              <svg className="h-6 w-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold">KVKK Aydınlatma Metni</h1>
              <p className="mt-2 text-white/70 max-w-2xl">Kişisel verilerinizin işlenmesi, saklanması ve haklarınıza ilişkin kurumsal bilgilendirme.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-8">
        {/* TOC */}
        <nav className="hidden lg:block rounded-xl border border-white/10 bg-card p-4 text-sm text-white/80 h-max sticky top-6">
          <div className="text-white/60 text-xs">İçindekiler</div>
          <ul className="mt-3 grid gap-2">
            <li><a href="#ozet" className="hover:text-white">Özet</a></li>
            <li><a href="#veriler" className="hover:text-white">İşlenen Kişisel Veriler</a></li>
            <li><a href="#amaclar" className="hover:text-white">İşleme Amaçları</a></li>
            <li><a href="#hukuki" className="hover:text-white">Hukuki Sebep & Yöntem</a></li>
            <li><a href="#aktarim" className="hover:text-white">Aktarımlar</a></li>
            <li><a href="#saklama" className="hover:text-white">Saklama Süreleri</a></li>
            <li><a href="#haklar" className="hover:text-white">Haklar ve Başvuru</a></li>
            <li><a href="#iletisim" className="hover:text-white">İletişim</a></li>
          </ul>
        </nav>

        <article className="max-w-none">
          <h2 id="ozet" className="mt-2 text-xl font-semibold">Özet</h2>
          <p className="mt-3 text-white/75 leading-relaxed">
            Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında eDavetiye tarafından
            yürütülen kişisel veri işleme faaliyetlerine ilişkin şeffaf bir bilgilendirme sağlamak amacıyla
            hazırlanmıştır. Aşağıda hangi verileri, hangi amaçlarla ve hangi hukuki sebeplere dayanarak işlediğimizi
            ayrıntılı biçimde bulabilirsiniz.
          </p>

          <h2 id="veriler" className="mt-8 text-xl font-semibold">İşlenen Kişisel Veriler</h2>
          <h3 className="mt-4 text-base font-medium text-white/90">Temel Kimlik ve İletişim Bilgileri</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Ad‑soyad, e‑posta adresi.</p>
          <h3 className="mt-4 text-base font-medium text-white/90">Kullanım ve İşlem Kayıtları</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Hesap hareketleri, oturum ve etkinlik kayıtları, tarih/saat damgaları.</p>
          <h3 className="mt-4 text-base font-medium text-white/90">Teknik Veriler</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Cihaz/ tarayıcı bilgileri ve IP gibi sınırlı teknik veriler.</p>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-white/75">
            <li>Özel nitelikli kişisel veriler rutin olarak işlenmez.</li>
            <li>18 yaş altı kullanıcıların veli/vasi izni olmadan veri sağlamaması beklenir.</li>
          </ul>

          <h2 id="amaclar" className="mt-8 text-xl font-semibold">İşleme Amaçları</h2>
          <h3 className="mt-4 text-base font-medium text-white/90">Hizmet Sunumu ve Sözleşme İfası</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Üyelik, davetiye oluşturma, paylaşım ve bildirim işlemlerinin yürütülmesi.</p>
          <h3 className="mt-4 text-base font-medium text-white/90">Güvenlik ve Suistimal Önleme</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Oturum güvenliği, yetkisiz erişim tespiti, kayıtların incelenmesi.</p>
          <h3 className="mt-4 text-base font-medium text-white/90">İyileştirme ve Analitik</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Ürün performansının ölçülmesi ve kullanıcı deneyiminin iyileştirilmesi.</p>

          <h2 id="hukuki" className="mt-8 text-xl font-semibold">Hukuki Sebep ve Toplama Yöntemi</h2>
          <p className="mt-2 text-white/75 leading-relaxed">
            Veriler; elektronik ortamda, KVKK m.5/2 (sözleşmenin kurulması/ifası, meşru menfaat) ve gerekli hallerde m.5/1 (açık rıza)
            hükümlerine dayanılarak toplanır ve işlenir.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-white/75">
            <li>Sözleşme: Üyelik ve hizmetin gerektirdiği zorunlu işlemler.</li>
            <li>Meşru menfaat: Güvenlik ve ürün geliştirme.</li>
            <li>Açık rıza: Zorunlu olmayan analitik/iletişim tercihleri.</li>
          </ul>

          <h2 id="aktarim" className="mt-8 text-xl font-semibold">Aktarımlar</h2>
          <h3 className="mt-4 text-base font-medium text-white/90">Tedarikçiler</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Barındırma, analiz ve e‑posta servis sağlayıcılarına, sözleşmeler ve veri güvenliği taahhütleri kapsamında sınırlı aktarım yapılabilir.</p>
          <h3 className="mt-4 text-base font-medium text-white/90">Yetkili Kurumlar</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Kanuni yükümlülüklerin gerektirdiği hallerde mevzuata uygun paylaşım yapılır.</p>

          <h2 id="saklama" className="mt-8 text-xl font-semibold">Saklama ve İmha</h2>
          <p className="mt-2 text-white/75 leading-relaxed">Veriler, mevzuatta öngörülen veya işleme amacı için gerekli makul süre boyunca saklanır; süresi dolan veriler periyodik olarak güvenli şekilde imha edilir.</p>

          <h2 id="haklar" className="mt-8 text-xl font-semibold">Haklar ve Başvuru</h2>
          <h3 className="mt-4 text-base font-medium text-white/90">KVKK m.11 Kapsamındaki Haklar</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-white/75">
            <li>İşlenip işlenmediğini öğrenme ve bilgi talebi</li>
            <li>Amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Düzeltme, silme, anonimleştirme ve itiraz</li>
          </ul>
          <h3 className="mt-4 text-base font-medium text-white/90">Başvuru Kanalları</h3>
          <p className="mt-2 text-white/75 leading-relaxed">Taleplerinizi <a className="underline" href="mailto:hello@edavetiye.co">hello@edavetiye.co</a> adresine iletebilirsiniz.</p>

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


