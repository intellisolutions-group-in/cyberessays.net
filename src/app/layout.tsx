import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyberEssays Digital Services - Next Generation Digital Transformation Platform",
  description: "Enterprise-grade software engineering, AI solutions, and digital transformation for ambitious companies. We build software that creates competitive advantage.",
  keywords: [
    "Software Engineering",
    "AI Solutions",
    "Digital Transformation",
    "SaaS Development",
    "Cloud Engineering",
    "Enterprise Software",
    "DevOps",
    "Cybersecurity"
  ],
  authors: [{ name: "CyberEssays Digital Services" }],
  openGraph: {
    title: "CyberEssays Digital Services - Digital Transformation Platform",
    description: "Enterprise-grade software engineering, AI solutions, and digital transformation for ambitious companies.",
    url: "https://cyberessays.net",
    siteName: "CyberEssays Digital Services",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body>
        <BackgroundEffects />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
