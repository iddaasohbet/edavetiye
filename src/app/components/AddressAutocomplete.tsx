"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Suggestion = {
  display_name: string;
  lat: string;
  lon: string;
};

type Props = {
  value: string;
  onChange: (v: string) => void;
  onPick: (v: { text: string; lat: number; lon: number }) => void;
};

export default function AddressAutocomplete({ value, onChange, onPick }: Props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Suggestion[]>([]);
  const ctrl = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!value || value.length < 1) {
      setItems([]);
      return;
    }
    ctrl.current?.abort();
    const c = new AbortController();
    ctrl.current = c;
    const q = encodeURIComponent(value);
    // Restrict to Türkiye via countrycodes and bounding box
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&countrycodes=tr&addressdetails=0&limit=8&viewbox=26,42,45,36&bounded=1&q=${q}`;
    fetch(url, {
      headers: { "Accept-Language": "tr" },
      signal: c.signal,
    })
      .then((r) => r.json())
      .then((data) => setItems(data || []))
      .catch(() => {});
  }, [value]);

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none"
        placeholder="Türkiye içinde adres yazın (örn: Sahil Garden İstanbul)"
        aria-autocomplete="list"
        aria-expanded={open}
      />
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-white/15 bg-white/5 px-2 py-1 text-xs text-white/80 hover:bg-white/10"
          onClick={async () => {
            try {
              if (!navigator.geolocation) return;
              navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                  const r = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=0&accept-language=tr`
                  );
                  const data = await r.json();
                  const text = data.display_name || `${latitude}, ${longitude}`;
                  onChange(text);
                  onPick({ text, lat: latitude, lon: longitude });
                } catch {}
              });
            } catch {}
          }}
        >
          Mevcut konumumu kullan
        </button>
      </div>
      {open && items.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md border border-white/15 bg-card p-1 text-sm shadow-lg">
          {items.map((s) => (
            <li
              key={`${s.lat}-${s.lon}`}
              className="cursor-pointer rounded px-2 py-1 hover:bg-white/5"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setOpen(false);
                onPick({ text: s.display_name, lat: parseFloat(s.lat), lon: parseFloat(s.lon) });
              }}
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


