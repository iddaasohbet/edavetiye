import HomeClient from "./HomeClient";
import { promises as fs } from "fs";
import path from "path";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import { HeartHandshake, Diamond, Gem, Sparkles, PartyPopper, Cake } from "lucide-react";
import { Suspense } from "react";
export default function Home() {
  return (
    <div className="hero-bg relative isolate overflow-hidden">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-xl shadow-black/10 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            <span className="font-medium">Kurumsal e‑Davetiye Platformu – Hızlı, Güvenilir, Şık</span>
          </div>
          <h1 className="mt-8 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
            Profesyonel Dijital Davetiyeler
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Markanıza ve etkinliğinize yakışan kurumsal şablonlar. RSVP yönetimi, konum ve takvim
            entegrasyonları tek platformda.
          </p>
          <p className="mt-2 text-sm text-white/60">Başlamak ücretsizdir, gelişmiş özellikler üyelikle.</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/olustur" className="group relative inline-flex h-14 items-center px-8 rounded-full bg-white text-black text-base font-bold shadow-2xl shadow-white/20 hover:shadow-white/30 hover:scale-105 transition-all">
              <span>Hemen Başla</span>
              <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </a>
            <a href="#sablonlar" className="inline-flex h-14 items-center px-8 rounded-full border-2 border-white/30 text-base font-semibold text-white hover:bg-white/10 hover:border-white/50 transition-all">
              Şablonları İncele
            </a>
          </div>

          <div className="mt-16">
            <p className="text-sm text-white/50 font-medium mb-6">Popüler Kategoriler</p>
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-x-0 -top-3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <a href="/?cat=Düğün#sablonlar" className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 text-white/90 text-center hover:bg-white/15 transition-all">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/15">
                  <HeartHandshake className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold">Düğün</div>
              </a>
              <a href="/?cat=Nikah#sablonlar" className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 text-white/90 text-center hover:bg-white/15 transition-all">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/15">
                  <Diamond className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold">Nikah</div>
              </a>
              <a href="/?cat=Söz#sablonlar" className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 text-white/90 text-center hover:bg-white/15 transition-all">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/15">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold">Söz</div>
              </a>
              <a href="/?cat=Nişan#sablonlar" className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 text-white/90 text-center hover:bg-white/15 transition-all">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/15">
                  <Gem className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold">Nişan</div>
              </a>
              <a href="/?cat=Sünnet#sablonlar" className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 text-white/90 text-center hover:bg-white/15 transition-all">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/15">
                  <PartyPopper className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold">Sünnet</div>
              </a>
              <a href="/?cat=Doğum Günü#sablonlar" className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 text-white/90 text-center hover:bg-white/15 transition-all">
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/15">
                  <Cake className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold">Doğum Günü</div>
              </a>
              </div>
              <div className="absolute inset-x-0 -bottom-3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </section>
      {/* Interactive search + tabs + templates */}
      {/* @ts-expect-error Server Component boundary to client component */}
      {/* Wrap client that uses useSearchParams in Suspense per Next.js guidance */}
      <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-12 text-white/60">Yükleniyor…</div>}>
        <TemplatesFromServer />
      </Suspense>
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </div>
  );
}

async function TemplatesFromServer() {
  // Only Template 8 remains
  const mapped = [
    {
      id: "t-marble",
      title: "Mermer Çiçek Düğün",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-rings",
      title: "Altın Yüzük Minimal",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-goldarch",
      title: "Altın Kemer Düğün",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-ringsrose",
      title: "Yüzük ve Yaprak",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-goldgrid",
      title: "Altın Geometri",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-silverrings",
      title: "Gümüş Yüzük",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-goldfeather",
      title: "Altın Tüy",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-whitegold",
      title: "Beyaz Altın",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-berrywreath",
      title: "Çiçekli Kemer",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-sage",
      title: "Sage Yeşil",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-goldleaf",
      title: "Altın Yaprak",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-goldpanel",
      title: "Altın Panel",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-goldblue",
      title: "Altın Çerçeve Mavi",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-calla",
      title: "Beyaz Zambak",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-crystal",
      title: "Kristal Oval",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-bluegold",
      title: "Mavi Altın",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-leaf",
      title: "Yaprak Çerçeve",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-crescent",
      title: "Hilal Mermer",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
    {
      id: "t-ulku",
      title: "Hilal & Bozkurt",
      category: "Düğün",
      image: "https://altinbilgi.com/sablonlar.png",
    },
  ];
  // @ts-expect-error Server → Client prop
  return <HomeClient initialTemplates={mapped} />;
}

// Oluşturulan Şablonlar bölümü kaldırıldı
