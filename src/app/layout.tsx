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
