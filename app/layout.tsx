import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./output.css";

export const metadata: Metadata = {
  title: "Nathan Barcroft - Full Stack Developer",
  description: "Nathan Barcroft is a full stack developer with a front-end focus, building accessible web experiences with modern React and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
