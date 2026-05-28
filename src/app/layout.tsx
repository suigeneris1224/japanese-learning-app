import type { Metadata } from "next";
import "./globals.css";
import { ServiceWorkerRegister } from "./sw-register";

export const metadata: Metadata = {
  title: "Japanese Learning App",
  description: "Learn Japanese Kana with spaced repetition.",
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
