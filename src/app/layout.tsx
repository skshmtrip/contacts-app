import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sansdiego = localFont({
  src: [
    {
      path: "../../sansdiego/Sansdiego-MAzge.ttf",
      weight: "400",
    },
    {
      path: "../../sansdiego/SansdiegoItalic-rvVLO.ttf",
      weight: "700",
    },
  ],
  variable: "--font-sansdiego",
});

export const metadata: Metadata = {
  title: "Saksham's Contacts",
  description: "Contact me!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sansdiego.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}