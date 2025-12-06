import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "4mik.com",
  description: "Welcome to 4mik.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
