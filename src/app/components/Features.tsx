import { CheckCircle2, ShieldCheck, CalendarDays, Globe, Bell, Palette } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: CheckCircle2,
      title: "RSVP & Analitik",
      desc: "Katılım yanıtları ve görünürlük verileri tek ekranda.",
    },
    {
      icon: ShieldCheck,
      title: "Güvenli Erişim",
      desc: "KVKK uyumlu, parola/bağlantı korumalı davetiyeler.",
    },
    {
      icon: CalendarDays,
      title: "Takvim & Konum",
      desc: "iCal/Google Calendar, harita ve yol tarifi entegrasyonu.",
    },
    {
      icon: Palette,
      title: "Kurumsal Marka",
      desc: "Tema rengi, tipografi ve görsel kimlik uyumu.",
    },
    {
      icon: Bell,
      title: "Bildirimler",
      desc: "RSVP ve değişikliklerde anlık bilgilendirme.",
    },
    {
      icon: Globe,
      title: "Çok Dilli",
      desc: "Birden çok dilde profesyonel deneyim.",
    },
  ];

  return (
    <section id="ozellikler" className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Özellikler</h2>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" /> PRO
        </span>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <article key={f.title} className="rounded-2xl border border-white/12 bg-card p-5 transition-all hover:bg-white/[0.04] hover:translate-y-[-2px] shadow-soft">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 border border-white/15">
                  <Icon aria-hidden className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-1 text-sm text-white/70 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}


