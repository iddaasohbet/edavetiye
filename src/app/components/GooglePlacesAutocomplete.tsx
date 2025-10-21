"use client";
import { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onPick: (v: { text: string; lat?: number; lon?: number }) => void;
};

declare global {
  interface Window {
    google?: any;
    __gp_loaded__?: boolean;
  }
}

export default function GooglePlacesAutocomplete({ value, onChange, onPick }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let cleaned = false;

    async function ensureScript() {
      if (window.google?.maps?.places) return true;
      if (window.__gp_loaded__) return false; // script loading; wait below
      const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!key) return false;
      window.__gp_loaded__ = true;
      return new Promise<boolean>((resolve) => {
        const s = document.createElement("script");
        s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&language=tr&region=TR`;
        s.async = true;
        s.onload = () => resolve(true);
        s.onerror = () => resolve(false);
        document.head.appendChild(s);
      });
    }

    async function init() {
      const ok = await ensureScript();
      if (!ok || !inputRef.current || !window.google?.maps?.places) return;
      const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "tr" },
        fields: ["formatted_address", "geometry", "name"],
        types: ["geocode"],
      });
      const listener = ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        const text = place?.formatted_address || place?.name || inputRef.current?.value || "";
        const lat = place?.geometry?.location?.lat?.();
        const lon = place?.geometry?.location?.lng?.();
        onChange(text);
        onPick({ text, lat, lon });
      });
      // cleanup
      return () => {
        if (!cleaned) listener?.remove?.();
      };
    }

    const cleanupPromise = init();
    return () => {
      cleaned = true;
      // best-effort cleanup
      cleanupPromise?.then((fn: any) => fn && fn());
    };
  }, [onChange, onPick]);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none"
      placeholder="Google ile Türkiye içinde adres arayın"
    />
  );
}


