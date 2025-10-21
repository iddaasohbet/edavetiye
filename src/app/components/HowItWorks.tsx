import { ClipboardCheck, Share2, LineChart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { icon: ClipboardCheck, title: "Seç & Özelleştir", desc: "Kurumsal şablonu seçin, içerikleri ekleyin." },
    { icon: Share2, title: "Paylaş", desc: "Bağlantıyı güvenle iletin; QR ve kısa link desteği." },
    { icon: LineChart, title: "Takip", desc: "RSVP ve görüntülenme verilerini tek panelde izleyin." },
  ];
  return (
    <section id="nasil" className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-semibold">Nasıl Çalışır?</h2>
        <span className="text-xs text-white/50">PRO</span>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <article key={s.title} className="rounded-xl border border-white/12 bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5">
                  <Icon aria-hidden className="h-5 w-5 text-white/90" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{s.desc}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}


