import type { Metadata } from "next";
import "./globals.css";
import { ServiceWorkerRegister } from "./sw-register";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "KanaFlow — Learn Japanese Kana",
  description: "Master hiragana and katakana with spaced repetition.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ServiceWorkerRegister />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
