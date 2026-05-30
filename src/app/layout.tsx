import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import { AppProviders } from "./providers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SemanticMatch AI | Find Jobs with Semantic Precision",
  description:
    "Leverage vector embeddings and hybrid retrieval to find your perfect role based on meaning, not just keywords.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geist.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased selection:bg-primary/30">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
