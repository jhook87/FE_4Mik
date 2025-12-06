import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "4MIK - Weapon System Firmware",
  description: "Trust at the Edge. Unbreakable chain of custody for contested environments.",
  keywords: ["4MIK", "weapon system", "firmware", "merkle vining", "military", "defense"],
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
