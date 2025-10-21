import type { Metadata } from "next";
import BuilderPage from "../page";
import { Suspense } from "react";

const TEMPLATE_LABELS: Record<string, { title: string; description: string }> = {
  "t-marble": { title: "Mermer Çiçek", description: "Mermer dokulu zarif çiçek tasarımıyla modern davetiye şablonu." },
  "t-rings": { title: "Altın Yüzük", description: "Altın yüzük temalı klasik ve şık davetiye şablonu." },
  "t-goldarch": { title: "Altın Kemer", description: "Altın kemer detaylarıyla göz alıcı davetiye şablonu." },
  "t-ringsrose": { title: "Yüzük & Yaprak", description: "Yüzük ve yaprak motiflerinin uyumuyla romantik bir şablon." },
  "t-goldgrid": { title: "Altın Geometri", description: "Geometrik altın çizgilerle modern ve net bir tasarım." },
  "t-silverrings": { title: "Gümüş Yüzük", description: "Gümüş detaylarla zarif ve sade davetiye şablonu." },
  "t-goldfeather": { title: "Altın Tüy", description: "Altın tüy dokunuşlarıyla hafif ve zarif bir stil." },
  "t-whitegold": { title: "Beyaz Altın", description: "Beyaz ve altın kontrastıyla premium davetiye şablonu." },
  "t-berrywreath": { title: "Çiçekli Kemer", description: "Çiçekli çelenk kompozisyonuyla doğal bir görünüm." },
  "t-sage": { title: "Sage Yeşil", description: "Sage yeşili tonlarında dengeli ve ferah bir tasarım." },
  "t-goldleaf": { title: "Altın Yaprak", description: "Altın yaprak motifleriyle zarif ve çok satan şablon." },
  "t-goldpanel": { title: "Altın Panel", description: "Altın panelli çerçeveyle kurumsal ve şık görünüm." },
  "t-goldblue": { title: "Altın Çerçeve Mavi", description: "Mavi ve altın uyumuyla modern bir çerçeve şablonu." },
  "t-calla": { title: "Beyaz Zambak", description: "Beyaz zambak detaylarıyla sade ve zarif bir davetiye." },
  "t-crystal": { title: "Kristal Oval", description: "Kristal oval formlarla premium bir his." },
  "t-bluegold": { title: "Mavi Altın", description: "Mavi ve altın tonlarında dengeli ve etkileyici tasarım." },
  "t-leaf": { title: "Yaprak Çerçeve", description: "Doğal yaprak çerçevesiyle ferah ve minimal bir şablon." },
  "t-crescent": { title: "Hilal Mermer", description: "Mermer dokuda hilal motifiyle minimal ve zarif tasarım." },
  "t-ulku": { title: "Hilal & Bozkurt", description: "Kırmızı beyaz tonlarda hilal ve bozkurt motifli şablon." },
};

export async function generateMetadata({ params }: { params: Promise<{ template: string }> }): Promise<Metadata> {
  const { template: slug } = await params;
  const info = TEMPLATE_LABELS[slug] || { title: slug, description: "Dijital davetiye şablonu ile hızlıca oluşturun ve paylaşın." };
  const title = `${info.title} Davetiye Şablonu – eDavetiye`;
  const url = `https://edavetiye.co/olustur/${encodeURIComponent(slug)}`;
  return {
    title,
    description: info.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: info.description,
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: info.description,
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-16 text-white/60">Yükleniyor…</div>}>
      <BuilderPage />
    </Suspense>
  );
}


