"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Star } from "lucide-react";

type T = { name: string; surname: string; text: string; rating: number };

const RAW: T[] = [
  { name: "Zeynep", surname: "Kaya", text: "Davetiyemizi dakikalar içinde hazırladık. Herkes çok beğendi.", rating: 5 },
  { name: "Emre", surname: "Yılmaz", text: "RSVP takibi tam ihtiyacımız olan şeydi.", rating: 5 },
  { name: "Ayşe", surname: "Demir", text: "Tema ve müzik seçenekleri şahaneydi.", rating: 5 },
  { name: "Mert", surname: "Aydın", text: "Adres, harita ve takvim tek yerde — çok pratik.", rating: 4 },
  { name: "Elif", surname: "Çelik", text: "Paylaşması kolay, kurumsal görünüyor.", rating: 5 },
  { name: "Burak", surname: "Arslan", text: "Kısa link ve QR desteği işimizi hızlandırdı.", rating: 5 },
  { name: "Seda", surname: "Koç", text: "Misafirler hemen yanıt verdi, harika.", rating: 5 },
  { name: "Can", surname: "Polat", text: "Arayüz sade ve çok akıcı.", rating: 4 },
  { name: "Ece", surname: "Şahin", text: "Kişiselleştirme seçenekleri tam ayarında.", rating: 5 },
  { name: "Kerem", surname: "Aksoy", text: "Destek hızlı, kurulum kolay.", rating: 5 },
];

function maskSurname(s: string): string {
  if (!s) return "";
  return s.charAt(0) + ".";
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} yıldız`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < rating;
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${filled ? "text-yellow-400 fill-yellow-400" : "text-white/25"}`}
          />
        );
      })}
    </div>
  );
}

export default function Testimonials() {
  const items = useMemo(() => RAW.slice(0, 10), []);
  const GAP = 16; // gap-4
  const [active, setActive] = useState(0);
  const [cardWidth, setCardWidth] = useState(360);
  const firstCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = firstCardRef.current;
    if (!el) return;
    const measure = () => setCardWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = setInterval(() => {
      setActive((v) => (v + 1) % items.length);
    }, 3500);
    return () => clearInterval(id);
  }, [items.length]);

  // Duplicate items to allow seamless loop visual
  const looped = useMemo(() => [...items, ...items, ...items], [items]);
  const startIndex = items.length; // middle chunk start
  const translateX = (active + startIndex) * (cardWidth + GAP);
  const normalizedActive = active % items.length;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-brand/20 to-transparent p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-center">Kullanıcılar Ne Diyor?</h2>
        <div
          className="relative mt-6 overflow-hidden"
          aria-roledescription="carousel"
          aria-label="Kullanıcı yorumları"
        >
          <div
            className="flex items-stretch gap-4 transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${translateX}px)` }}
          >
            {looped.map((t, i) => {
              return (
                <div
                  key={`${t.name}-${i}`}
                  ref={i === 0 ? firstCardRef : undefined}
                  className={"shrink-0 w-[280px] sm:w-[360px] md:w-[420px]"}
                >
                  <figure className="h-full rounded-2xl border border-white/12 bg-card p-6">
                    <Stars rating={t.rating} />
                    <blockquote className="mt-3 text-base text-white/85">“{t.text}”</blockquote>
                    <figcaption className="mt-5 text-sm text-white/70">
                      — {t.name} {maskSurname(t.surname)}
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
        {/* Dots pagination */}
        <div className="mt-6 flex items-center justify-center gap-2" aria-hidden>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={
                "h-2.5 w-2.5 rounded-full transition-colors " +
                (normalizedActive === idx ? "bg-brand" : "bg-white/30 hover:bg-white/50")
              }
              aria-label={`Slayt ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


