"use client";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]">
      <div className="w-[min(56rem,calc(100%-1.5rem))] rounded-2xl border border-white/10 bg-card/95 p-6 md:p-7 shadow-2xl backdrop-blur">
        <div className="md:flex items-center justify-between gap-6">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
              <svg className="h-5 w-5 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-white">Çerez Tercihleri</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                Deneyiminizi iyileştirmek için zorunlu ve analitik çerezleri kullanıyoruz.
                <a href="/kullanim-sartlari" className="ml-1 underline">Detaylar</a>
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-white/70">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Zorunlu</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Analitik</span>
              </div>
              <p className="mt-3 hidden md:block text-[11px] text-white/50">
                Kabul ederek <a href="/kvkk" className="underline">KVKK</a> ve <a href="/kullanim-sartlari" className="underline">Çerez Politikası</a> hükümlerini onaylamış olursunuz.
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center justify-end gap-2 shrink-0">
            <button
              onClick={handleReject}
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-xs md:text-sm font-semibold text-white/90 transition-all duration-200 hover:bg-white/10 active:scale-95"
            >
              Yalnızca Gerekli
            </button>
            <button
              onClick={handleAccept}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-rose-600 px-6 text-xs md:text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all duration-200 hover:shadow-xl hover:shadow-brand/50 hover:scale-[1.02] active:scale-95"
            >
              Tümünü Kabul Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

