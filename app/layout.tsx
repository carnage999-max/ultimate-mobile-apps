import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ultimate Mobile Apps - Premium Apps. Unified Vision.",
  description: "Ultimate Mobile Apps develops advanced, secure, user-friendly tools across health, legal, social, and productivity sectors.",
  keywords: "mobile apps, iOS apps, Android apps, VitaChoice, Timer for Life, FreedomTek, LibertySocial, LegalTraker",
  icons: {
    icon: '/icons/icon.jpeg',
    apple: '/icons/icon.jpeg',
  },
  openGraph: {
    title: "Ultimate Mobile Apps - Premium Apps. Unified Vision.",
    description: "Ultimate Mobile Apps develops advanced, secure, user-friendly tools across health, legal, social, and productivity sectors.",
    type: "website",
    images: [
      {
        url: '/icons/icon.jpeg',
        width: 1200,
        height: 630,
        alt: 'Ultimate Mobile Apps',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ultimate Mobile Apps - Premium Apps. Unified Vision.",
    description: "Ultimate Mobile Apps develops advanced, secure, user-friendly tools across health, legal, social, and productivity sectors.",
    images: ['/icons/icon.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
