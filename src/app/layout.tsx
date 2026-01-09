import type { Metadata } from "next";
import { Work_Sans, Playfair_Display, Kaushan_Script } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const kaushan = Kaushan_Script({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koe Digital | Donde las marcas encuentran su voz",
  description: "Estrategia, contenido y publicidad pensados a medida. Koe Digital es una agencia de marketing orientada a resultados reales.",
  keywords: ["marketing digital", "estrategia de marca", "publicidad", "social media", "diseño web", "agencia creativa", "buenos aires", "ads"],
  authors: [{ name: "Koe Digital" }],
  openGraph: {
    title: "Koe Digital | Donde las marcas encuentran su voz",
    description: "Estrategia, contenido y publicidad pensados a medida.",
    url: "https://koedigital.com", // TODO: Update with actual domain
    siteName: "Koe Digital",
    images: [
      {
        url: "/koe-logo.png", // Ideally a larger OG image (1200x630)
        width: 1200,
        height: 630,
        alt: "Koe Digital Agency",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koe Digital",
    description: "Estrategia, contenido y publicidad pensados a medida.",
    images: ["/koe-logo.png"], // TODO: Update with OG image
  },
  icons: {
    icon: '/koe-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${workSans.variable} ${playfair.variable} ${kaushan.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
