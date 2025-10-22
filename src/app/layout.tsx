import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ücretsiz Davetiye Şablonları – eDavetiye",
    template: "%s | eDavetiye",
  },
  description:
    "Ücretsiz davetiye şablonlarıyla saniyeler içinde dijital davetiye oluşturun. Paylaşın, RSVP toplayın, konum yönlendirin. Üyelikle hemen başlayın.",
  metadataBase: new URL("https://edavetiye.co"),
  openGraph: {
    title: "Ücretsiz Davetiye Şablonları – eDavetiye",
    description:
      "Ücretsiz şablonlarla dijital davetiye oluşturun. Üyelik gerekli, ücret yok. Paylaşım ve RSVP destekli.",
    type: "website",
    url: "https://edavetiye.co",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ücretsiz Davetiye Şablonları – eDavetiye",
    description: "Üyelikle ücretsiz dijital davetiye oluşturun ve paylaşın.",
  },
  icons: { icon: "/globe.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${plusJakarta.variable} antialiased bg-background text-foreground`} style={{ WebkitTextSizeAdjust: '100%', colorScheme: 'dark' }}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'eDavetiye',
              url: 'https://edavetiye.co',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://edavetiye.co/?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
