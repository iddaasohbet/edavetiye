"use client";
import { useState } from "react";

const QA = [
  {
    q: "Davetiyemi nasıl paylaşırım?",
    a: "Oluşturduğunuz bağlantıyı WhatsApp, SMS veya e‑posta ile tek tıkla paylaşabilirsiniz.",
  },
  {
    q: "Misafirler RSVP yanıtlarını nasıl verir?",
    a: "Davetiye sayfasında ad, kişi sayısı ve not alanı ile hızlıca yanıt verebilirler.",
  },
  {
    q: "Tasarımı özelleştirebilir miyim?",
    a: "Tema rengi, yazı tipi, arka plan görseli ve müzik gibi seçenekler mevcuttur.",
  },
  {
    q: "Ödemeler güvenli mi?",
    a: "Güncel güvenlik standartlarına uyumlu altyapı kullanıyoruz.",
  },
  {
    q: "KVKK uyumluluğu var mı?",
    a: "Evet, kişisel veriler KVKK/GDPR kapsamında korunur.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="sss" className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-xl font-semibold">Sık Sorulan Sorular</h2>
      <div className="mt-6 grid gap-3">
        {QA.map((item, idx) => {
          const isOpen = open === idx;
          return (
            <div key={item.q} className="rounded-xl border border-white/10 bg-card">
              <button
                className="w-full px-4 py-3 text-left flex items-center justify-between"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : idx)}
              >
                <span className="text-sm font-medium">{item.q}</span>
                <span className="text-white/60">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 -mt-1 text-sm text-white/70">{item.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}


