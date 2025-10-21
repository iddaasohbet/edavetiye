export default function Pricing() {
  const plans = [
    {
      name: "Başlangıç",
      price: "Ücretsiz",
      desc: "Kişisel kullanım için temel özellikler",
      features: ["Sınırlı şablonlar", "Paylaşım linki", "RSVP toplama"],
      cta: "Ücretsiz Dene",
      popular: false,
    },
    {
      name: "Standart",
      price: "₺149",
      desc: "Çoğu kullanıcı için ideal",
      features: ["Tüm şablonlar", "Takvim kaydı", "Harita & Yol tarifi", "Müzik & tema"],
      cta: "Hemen Başla",
      popular: true,
    },
    {
      name: "Pro",
      price: "₺299",
      desc: "İleri seviye kişiselleştirme",
      features: ["Çok dilli", "Parola koruma", "QR giriş", "Bildirimler"],
      cta: "Başvur",
      popular: false,
    },
  ];

  return (
    <section id="fiyat" className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-xl font-semibold">Fiyatlandırma</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className={
              "rounded-xl border bg-card p-5 " +
              (p.popular ? "border-brand shadow-[0_0_0_3px] shadow-brand/15" : "border-white/10")
            }
          >
            {p.popular && (
              <div className="mb-2 inline-flex items-center rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-medium text-brand">
                En Popüler
              </div>
            )}
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-medium">{p.name}</h3>
              <div className="text-lg font-semibold">{p.price}</div>
            </div>
            <p className="mt-1 text-sm text-white/70">{p.desc}</p>
            <ul className="mt-4 grid gap-2 text-sm text-white/80">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 rounded-full bg-brand/20 text-[10px] leading-4 text-center">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#olustur"
              className={
                "mt-4 inline-flex h-10 w-full items-center justify-center rounded-md text-sm font-medium " +
                (p.popular
                  ? "bg-brand text-white hover:bg-brand-700"
                  : "border border-white/15 text-white/90 hover:bg-white/5")
              }
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
