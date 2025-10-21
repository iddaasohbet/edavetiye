"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Template = {
  id: string;
  title: string;
  category: string;
  image?: string;
};

type Props = {
  template: Template;
  brideName?: string;
  groomName?: string;
  eventType?: string; // Merasim/Düğün/Nikah/Söz
  dateTime?: string; // ISO string
  dateText?: string; // Display text override
  locationText?: string; // Display location override
  orientation?: "portrait" | "landscape";
  fit?: "contain" | "cover";
  backgroundUrl?: string;
  messageText?: string; // main message paragraph
  noteText?: string; // small note paragraph
  accentColor?: string; // user override for theme accent
  textColor?: string; // user override for main text
  fontFamily?: string; // user-chosen font family
  nameScale?: number; // 0.6 - 1.6
  letterSpacing?: number; // in em
  lineHeight?: number; // content line-height
  radius?: number; // px radius for panels/buttons
  countdownScale?: number; // 0.6 - 1.6
  uppercaseEvent?: boolean; // default true
  preview?: boolean; // compact preview mode (no internal scroll)
  previewUntilAddress?: boolean; // when true, render only up to address (for small previews)
};

export default function TemplateDemo({ template, brideName, groomName, eventType, dateTime, dateText, locationText, orientation = "landscape", fit = "contain", backgroundUrl, messageText, noteText, accentColor, textColor, fontFamily, nameScale = 1, letterSpacing = 0, lineHeight = 1.6, radius = 12, countdownScale = 1, uppercaseEvent = true, preview = false, previewUntilAddress = false }: Props): JSX.Element {
  const demoDefaults = getDemoContent(template.category);
  const demo = useMemo(() => {
    const title = brideName && groomName ? `${brideName} & ${groomName}` : demoDefaults.title;
    const event = eventType ? eventType : demoDefaults.event;
    const date = dateText ? dateText : demoDefaults.date;
    const location = locationText ? locationText : demoDefaults.location;
    return { ...demoDefaults, title, event, date, location };
  }, [brideName, groomName, eventType, dateText, locationText, demoDefaults]);

  // Theme palette derived from background
  const theme = useMemo(() => {
    const isGoldMaroon = (backgroundUrl || "").includes("/2.jpg");
    const isGoldRingsClean = (backgroundUrl || "").includes("/1.png");
    const isFlowerFrame = (backgroundUrl || "").includes("/3.jpg");
    const isGoldArch = (backgroundUrl || "").includes("/4.jpg");
    const isRings = (backgroundUrl || "").includes("/5.jpg");
    const isGoldGrid = (backgroundUrl || "").includes("/6.jpg");
    const isGoldRingsMinimal = (backgroundUrl || "").includes("/7.jpg");
    const isMarble = (backgroundUrl || "").includes("/8.jpg");
    const isBlush = (backgroundUrl || "").includes("/9.jpg");
    const isSilver = (backgroundUrl || "").includes("/10.jpg");
    const isGoldFeather = (backgroundUrl || "").includes("/11.jpg");
    const isWhiteGold = (backgroundUrl || "").includes("/12.jpg");
    const isBerryWreath = (backgroundUrl || "").includes("/13.jpg");
    const isSage = (backgroundUrl || "").includes("/14.jpg");
    const isGoldLeaf = (backgroundUrl || "").includes("/15.jpg");
    const isGoldPanel = (backgroundUrl || "").includes("/16.jpg");
    const isGoldBlue = (backgroundUrl || "").includes("/17.png");
    const isCalla = (backgroundUrl || "").includes("/18.jpg");
    const isCrystal = (backgroundUrl || "").includes("/19.jpg");
    const isBlueGold = (backgroundUrl || "").includes("/20.jpg");
    const isDriedBlush = (backgroundUrl || "").includes("/21.png");
    const isLeafBorder = (backgroundUrl || "").includes("/22.jpg");
    const isLotus = (backgroundUrl || "").includes("/23.jpg");
    const isThaiGarden = (backgroundUrl || "").includes("/24.jpg");
    const isCrescent = (backgroundUrl || "").includes("/25.png");
    const isUlku = (backgroundUrl || "").includes("/ulku.png");
    if (isGoldMaroon) {
      return { accent: "#d4af37", secondary: "#7a1731", text: "#3a2a2a", compact: true } as const;
    }
    if (isFlowerFrame) {
      return { accent: "#1f2937", secondary: "#7a1731", text: "#1f2937", compact: false } as const; // koyu gri + bordo uyumu
    }
    if (isGoldArch) {
      return { accent: "#cfae62", secondary: "#cfae62", text: "#2b2b2b", compact: false, shiftCm: 7 } as const;
    }
    if (isRings || isGoldRingsClean) {
      return { accent: "#cfae62", secondary: "#cfae62", text: "#2b2b2b", compact: false } as const;
    }
    if (isGoldGrid) {
      return { accent: "#cfae62", secondary: "#cfae62", text: "#2b2b2b", compact: false } as const;
    }
    if (isGoldRingsMinimal) {
      return { accent: "#cfae62", secondary: "#cfae62", text: "#2b2b2b", compact: false } as const;
    }
    if (isMarble) {
      return { accent: "#8c6d3f", secondary: "#8c6d3f", text: "#2b2b2b", compact: false } as const;
    }
    if (isBlush) {
      // Blush (rose) palette: stronger rose accent for headings and strokes, same tone for CTA
      return { accent: "#b76e79", secondary: "#b76e79", text: "#3a2a2a", compact: false } as const;
    }
    if (isSilver) {
      return { accent: "#6b7280", secondary: "#6b7280", text: "#1f2937", compact: false } as const; // cool gray for silver theme
    }
    if (isGoldFeather) {
      return { accent: "#cfae62", secondary: "#cfae62", text: "#2b2b2b", compact: false } as const;
    }
    if (isWhiteGold) {
      return { accent: "#bfa06a", secondary: "#bfa06a", text: "#2b2b2b", compact: false } as const;
    }
    if (isBerryWreath) {
      return { accent: "#8b1e3f", secondary: "#8b1e3f", text: "#2b2b2b", compact: false } as const; // bordeaux
    }
    if (isSage) {
      // Updated sage palette: deeper green accent, darker readable text
      return { accent: "#4a7d66", secondary: "#4a7d66", text: "#203228", compact: false } as const;
    }
    if (isGoldLeaf) {
      return { accent: "#c8943d", secondary: "#c8943d", text: "#2b2b2b", compact: false } as const; // warm gold
    }
    if (isGoldPanel) {
      // Gold Panel (16.jpg) - stronger contrast (dark text, deeper gold)
      return { accent: "#8a5a10", secondary: "#8a5a10", text: "#111111", compact: false } as const;
    }
    if (isGoldBlue) {
      return { accent: "#1f4f7b", secondary: "#d4af37", text: "#1f2937", compact: false } as const; // deep blue + gold
    }
    if (isCalla) {
      return { accent: "#2e7d32", secondary: "#2e7d32", text: "#2b2b2b", compact: false } as const; // fresh green
    }
    if (isCrystal) {
      return { accent: "#bfa06a", secondary: "#bfa06a", text: "#2b2b2b", compact: false } as const; // soft gold on marble
    }
    if (isBlueGold) {
      return { accent: "#1e3a8a", secondary: "#d4af37", text: "#0f172a", compact: false } as const; // blue with gold accents
    }
    if (isDriedBlush) {
      return { accent: "#c98f8a", secondary: "#c98f8a", text: "#3a2a2a", compact: false } as const; // blush-gold
    }
    if (isLeafBorder) {
      return { accent: "#6c8a6b", secondary: "#bfa06a", text: "#2f3b32", compact: false } as const; // sage green + soft gold
    }
    if (isLotus) {
      return { accent: "#cc7a7a", secondary: "#cc7a7a", text: "#3a2a2a", compact: false } as const; // soft pink + warm
    }
    if (isThaiGarden) {
      return { accent: "#86643a", secondary: "#86643a", text: "#2f3b32", compact: false } as const; // earthy golds/greens
    }
    if (isCrescent) {
      // Crescent marble: soft gold accent, dark readable text, slight top shift
      return { accent: "#9f7b45", secondary: "#9f7b45", text: "#1f2937", compact: false, shiftCm: 5 } as const;
    }
    if (isUlku) {
      // Ülkü teması: kırmızı-beyaz
      return { accent: "#d11f2b", secondary: "#ffffff", text: "#b91c1c", compact: false, shiftCm: 4 } as const;
    }
    return { accent: "#eaa48b", secondary: "#be123c", text: "#444444", compact: false } as const;
  }, [backgroundUrl]);

  // Apply user overrides if provided
  const ACCENT = accentColor || (theme as any).accent;
  const TEXT = textColor || (theme as any).text;
  // Enforce uniform layout and typography like template 8 across all templates
  const baseNameRem = 3.2;
  const computedNameFontSize = `calc(${baseNameRem}rem * ${Math.max(0.6, Math.min(1.6, nameScale))})`;

  // Ensure elegant script font for names is available (wedding-style)
  useEffect(() => {
    const id = 'template-name-font-link';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id; link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@600&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const [remaining, setRemaining] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    if (!dateTime) return;
    const target = new Date(dateTime).getTime();
    if (!isFinite(target)) return;
    const tick = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setRemaining({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      const sec = Math.floor(diff / 1000);
      const d = Math.floor(sec / 86400);
      const h = Math.floor((sec % 86400) / 3600);
      const m = Math.floor((sec % 3600) / 60);
      const s = sec % 60;
      setRemaining({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [dateTime]);

  const defaultAspect = orientation === "portrait" ? 9 / 16 : 16 / 9;
  
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const recompute = () => {
      if (typeof window === 'undefined') return;
      const c = containerRef.current;
      const i = contentRef.current;
      if (!c || !i) return;
      const available = c.clientHeight;
      const needed = i.scrollHeight;
      if (available && needed) {
        let s = Math.min(1, (available - 2) / needed);
        const isTen = (backgroundUrl || '').includes('/10.jpg');
        if (isTen) {
          s = s * 0.98; // slight shrink for template 10 to avoid overlap
        }
        setScale(s > 0 && Number.isFinite(s) ? s : 1);
      }
    };
    recompute();
    window.addEventListener('resize', recompute);
    const id = setInterval(recompute, 300); // fonts/images late load
    return () => { window.removeEventListener('resize', recompute); clearInterval(id); };
  }, [dateTime, dateText, locationText, messageText, noteText, fontFamily, nameScale, letterSpacing, lineHeight, radius, countdownScale, uppercaseEvent, backgroundUrl]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-transparent mx-auto sm:mx-0`} style={{ aspectRatio: defaultAspect, maxWidth: '100%', width: '100%', backgroundColor: 'transparent' }}>
      {/* Foreground image (no color shift, no crop) */}
      <div className="absolute inset-0">
        <Image
          key={backgroundUrl || "https://altinbilgi.com/1.png"}
          src={backgroundUrl || "https://altinbilgi.com/1.png"}
          alt="Arka plan"
          fill
          className={fit === "cover" ? "object-cover" : "object-contain object-center"}
          sizes="100vw"
          priority
          unoptimized
        />
      </div>
      {/* No overlay; background handled by blurred underlay */}

      {/* Content wrapper */}
      <div
        ref={contentRef}
        className={`absolute inset-0 flex flex-col items-center ${preview ? 'overflow-hidden' : 'overflow-hidden sm:overflow-y-auto'}`}
        style={Object.assign(
          {},
          fontFamily ? { fontFamily } : undefined,
          {
            transform: (() => {
              const url = backgroundUrl || '';
              const isSageTemplate = url.includes('/14.jpg');
              const isCrescent = url.includes('/25.png');
              const isUlku = url.includes('/ulku.png');
              const translate = isSageTemplate ? '-1cm' : (isCrescent ? '1.5cm' : (isUlku ? '1.2cm' : '0'));
              return `scale(${scale})${translate !== '0' ? ` translateY(${translate})` : ''}`;
            })(),
            transformOrigin: 'top center',
            paddingTop: (() => {
              const url = backgroundUrl || '';
              const isTight = /\/6\.jpg|\/7\.jpg|\/8\.jpg|\/9\.jpg|\/10\.jpg/.test(url);
              const isLong = /\/10\.jpg|\/14\.jpg/.test(url);
              if (preview) return isLong ? 88 : (isTight ? 48 : 56);
              return isLong ? 120 : (isTight ? 64 : 80);
            })(),
            paddingLeft: preview ? 12 : 16,
            paddingRight: preview ? 12 : 16,
            paddingBottom: (() => {
              const url = backgroundUrl || '';
              const isLong = /\/10\.jpg|\/14\.jpg/.test(url);
              if (preview) return isLong ? 40 : 16;
              return isLong ? 56 : 20;
            })(),
          }
        )}
      >
        {/* Global extra offset for all templates */}
        <div style={{ height: '1.4cm' }} />
        {/* Removed contrast panel per user request */}
        {/* Names - wedding style (script font for names, serif ampersand) */}
        <div className="text-center" style={{ color: ACCENT }}>
          {(() => {
            const parts = (demo.title || '').split('&').map(p => p.trim()).filter(Boolean);
            if (parts.length === 2) {
              const blackNames = (backgroundUrl || '').includes('/18.jpg') || (backgroundUrl || '').includes('/22.jpg');
              return (
                <div className="leading-none" style={{ fontSize: computedNameFontSize }}>
                  <span style={{ fontFamily: `'Great Vibes', 'Playfair Display', serif`, fontWeight: 400, letterSpacing: 0, color: blackNames ? '#000000' : undefined }}>{parts[0]}</span>
                  <span style={{ fontFamily: `'Playfair Display', serif`, fontWeight: 700, margin: '0 0.35em', color: '#000000' }}>&</span>
                  <span style={{ fontFamily: `'Great Vibes', 'Playfair Display', serif`, fontWeight: 400, letterSpacing: 0, color: blackNames ? '#000000' : undefined }}>{parts[1]}</span>
                </div>
              );
            }
            return (
              <div className={`sm:text-[3.5rem] leading-none font-semibold`} style={{ fontSize: computedNameFontSize, letterSpacing: `${letterSpacing}em` }}>{demo.title}</div>
            );
          })()}
        </div>

        {/* Message */}
        <p className={`mt-3 text-center text-[1.05rem] max-w-md px-6`} style={{ color: TEXT, lineHeight }}>
          {messageText || "Ailemizin bu özel gününde sizleri aramızda görmekten mutluluk duyarız."}
        </p>

        {/* Event type */}
        <div className="mt-5 text-center">
          <div className={`mx-auto inline-block text-[1.1rem] sm:text-[1.2rem] font-bold ${uppercaseEvent ? 'uppercase' : ''} tracking-wider`} style={{ color: ACCENT, letterSpacing: `${letterSpacing/2}em` }}>
            {demo.event}
            <div className="mx-auto mt-2 w-20 border-b-2 border-dashed" style={{ borderColor: ACCENT }} />
          </div>
        </div>

        {/* Date/Address */}
        <div className="mt-4 w-full max-w-md text-center">
          <div>
            <div className={`text-base font-extrabold`} style={{ color: ACCENT }}>Tarih / Saat</div>
            <div className={`mt-1 text-[1.05rem]`} style={{ color: (backgroundUrl || '').includes('/ulku.png') ? '#b91c1c' : '#222' }}>{demo.date}</div>
          </div>
          <div className="mt-4">
            <div className={`text-base font-extrabold`} style={{ color: ACCENT }}>Etkinlik Adresi</div>
            <div className={`mt-1 text-[1.05rem]`} style={{ color: (backgroundUrl || '').includes('/ulku.png') ? '#b91c1c' : '#222' }}>{demo.location}</div>
          </div>
        </div>

        {!previewUntilAddress && (
          <div className={`mt-3 mx-auto text-[0.92rem] italic text-center`} style={{ background: ACCENT + "33", color: TEXT, borderRadius: radius, padding: '8px 14px', width: 'min(300px, calc(100% - 40px))', maxWidth: '300px' }}>
            {noteText || "Lütfen saatinde aramızda olunuz. Çocuklar için alan mevcuttur."}
          </div>
        )}

        {!previewUntilAddress && (
        <div className="mt-3 text-center">
          <div className={`text-[1.25rem] font-extrabold uppercase tracking-wide`} style={{ color: ACCENT }}>Geri Sayım</div>
          {dateTime && remaining ? (
            <div className="mt-3 grid grid-cols-4 gap-2 place-items-center" style={(backgroundUrl || '').includes('/16.jpg') ? { marginLeft: 4, marginRight: 4 } : undefined}>
              {renderProDial(
                remaining.d,
                "Gün",
                30,
                (backgroundUrl || '').includes('/ulku.png') ? '#000' : ACCENT,
                72 * Math.max(0.6, Math.min(1.6, countdownScale)) * ((backgroundUrl || '').includes('/11.jpg') ? 0.85 : 1),
                false,
                (backgroundUrl || '').includes('/ulku.png') ? '#000' : ((backgroundUrl || '').includes('/11.jpg') ? '#000' : undefined)
              )}
              {renderProDial(
                remaining.h,
                "Saat",
                24,
                (backgroundUrl || '').includes('/ulku.png') ? '#000' : ACCENT,
                72 * Math.max(0.6, Math.min(1.6, countdownScale)) * ((backgroundUrl || '').includes('/11.jpg') ? 0.85 : 1),
                false,
                (backgroundUrl || '').includes('/ulku.png') ? '#000' : ((backgroundUrl || '').includes('/11.jpg') ? '#000' : undefined)
              )}
              {renderProDial(
                remaining.m,
                "Dak.",
                60,
                (backgroundUrl || '').includes('/ulku.png') ? '#000' : ACCENT,
                72 * Math.max(0.6, Math.min(1.6, countdownScale)) * ((backgroundUrl || '').includes('/11.jpg') ? 0.85 : 1),
                false,
                (backgroundUrl || '').includes('/ulku.png') ? '#000' : ((backgroundUrl || '').includes('/11.jpg') ? '#000' : undefined)
              )}
              {renderProDial(
                remaining.s,
                "Sn.",
                60,
                (backgroundUrl || '').includes('/ulku.png') ? '#000' : ACCENT,
                72 * Math.max(0.6, Math.min(1.6, countdownScale)) * ((backgroundUrl || '').includes('/11.jpg') ? 0.85 : 1),
                false,
                (backgroundUrl || '').includes('/ulku.png') ? '#000' : ((backgroundUrl || '').includes('/11.jpg') ? '#000' : undefined)
              )}
            </div>
          ) : (
            <div className="mt-2 text-sm text-black/70">Tarih bekleniyor</div>
          )}
        </div>
        )}

        {/* Konuma Git butonu kaldırıldı */}

        {/* Removed bottom home-indicator bar */}
      </div>

      {/* Üst sağ kalan etiketi kaldırıldı */}

      {/* QR kod kaldırıldı */}
    </div>
  );
}

function pad2(n: number) { return String(n).padStart(2, '0'); }

function renderPremiumBox(value: number, label: string) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/75 p-3 backdrop-blur shadow-[0_8px_20px_rgba(0,0,0,.15)]">
      <div className="text-center text-3xl font-extrabold text-[color:#eaa48b]">{pad2(value)}</div>
      <div className="mt-0.5 text-center text-[10px] uppercase tracking-wide text-black/70">{label}</div>
    </div>
  );
}

function renderProDial(value: number, label: string, max: number, color: string, size: number = 24, dark: boolean = false, numColor?: string) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  if (dark) {
    return (
      <div className="relative rounded-2xl bg-black/95 p-1" style={{ width: size + 18 + 'px', height: size + 30 + 'px' }}>
        <div className="mx-auto" style={{ width: size + 6 + 'px', height: size + 6 + 'px' }}>
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <circle cx="50" cy="50" r="42" className="fill-none" strokeWidth="8" style={{ stroke: 'rgba(255,255,255,0.2)' }} />
            <circle cx="50" cy="50" r="42" className="fill-none" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(pct * 2.64).toFixed(1)} 999`} transform="rotate(-90 50 50)" style={{ stroke: color }} />
          </svg>
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="font-extrabold leading-none text-white" style={{ fontSize: size * 0.6 }}>{pad2(value)}</div>
            <div className="mt-0.5 text-[10px] uppercase tracking-wide text-white/80">{label}</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative" style={{ width: size + 6 + 'px', height: size + 6 + 'px' }}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="42" className="stroke-black/10 fill-none" strokeWidth="8" />
        <circle cx="50" cy="50" r="42" className="fill-none" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(pct * 2.64).toFixed(1)} 999`} transform="rotate(-90 50 50)" style={{ stroke: color }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-extrabold leading-none" style={{ color: numColor || color, fontSize: size * 0.6 }}>{pad2(value)}</div>
          <div className="mt-0.5 text-[10px] uppercase tracking-wide text-black/70">{label}</div>
        </div>
      </div>
    </div>
  );
}

function downloadIcs(title?: string, location?: string, dateTime?: string) {
  try {
    if (!dateTime) return;
    const start = new Date(dateTime);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const fmt = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//eDavetiye//Calendar//TR",
      "BEGIN:VEVENT",
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${title || "Etkinlik"}`,
      location ? `LOCATION:${location}` : undefined,
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .filter(Boolean)
      .join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "davetiye.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch {}
}

function getDemoContent(category: string) {
  switch (category) {
    case "Düğün":
      return { event: "Düğün Davetiyesi", title: "Elif & Mert", date: "24 Ağustos 2026, 19:00", location: "Sahil Garden, İstanbul" };
    case "Nişan":
      return { event: "Nişan Töreni", title: "Zeynep & Emre", date: "12 Temmuz 2026, 18:00", location: "Ada Teras, Büyükada" };
    case "Sünnet":
      return { event: "Sünnet Düğünü", title: "Arda'nın Mutlu Günü", date: "5 Haziran 2026, 13:00", location: "Gölpark, Kocaeli" };
    case "Doğum Günü":
      return { event: "Doğum Günü", title: "Eylül 7 Yaşında", date: "3 Mayıs 2026, 16:00", location: "KidsLand, Ataşehir" };
    case "Kına":
      return { event: "Kına Gecesi", title: "Ayşe'nin Kınası", date: "14 Eylül 2026, 20:00", location: "Pera Salonu, İstanbul" };
    case "Mezuniyet":
      return { event: "Mezuniyet Kutlaması", title: "2026 Sınıfı", date: "30 Haziran 2026, 20:00", location: "Kampüs Meydanı" };
    default:
      return { event: "Davet", title: "Örnek Başlık", date: "1 Ocak 2026", location: "İstanbul" };
  }
}

function pickStyle(category: string): "centerNames" | "leftCard" | "bottomBar" | "splitTopBottom" | "badge" | "rightAlign" {
  switch (category) {
    case "Düğün":
      return "centerNames";
    case "Nişan":
      return "leftCard";
    case "Sünnet":
      return "bottomBar";
    case "Doğum Günü":
      return "splitTopBottom";
    case "Kına":
      return "badge";
    case "Mezuniyet":
      return "rightAlign";
    default:
      return "bottomBar";
  }
}


