import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "4MIK | Cryptographic Trust at the Edge",
  description: "4MIK provides firmware and software solutions that establish unbreakable chains of custody for mission-critical data in contested environments.",
  keywords: ["4MIK", "cryptography", "edge computing", "firmware", "data integrity", "defense technology", "MerkleVining"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-carbon-900 text-tungsten antialiased">
        {children}
      </body>
    </html>
  );
}
