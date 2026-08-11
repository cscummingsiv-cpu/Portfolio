import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import Providers from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://charlieautomates.co"),
  title: {
    default: "Charlie Cummings | Enterprise AI Leader & Builder",
    template: "%s | Charlie Cummings",
  },
  description:
    "Enterprise AI strategy, adoption, internal tooling, and production systems built for measurable business impact.",
  openGraph: {
    type: "website",
    url: "https://charlieautomates.co",
    siteName: "Charlie Cummings",
    title: "Charlie Cummings | Enterprise AI Leader & Builder",
    description:
      "Enterprise AI strategy, adoption, internal tooling, and production systems built for measurable business impact.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Charlie Cummings — Enterprise AI Leader & Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Charlie Cummings | Enterprise AI Leader & Builder",
    description:
      "Enterprise AI strategy, adoption, internal tooling, and production systems built for measurable business impact.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}>
        <LanguageProvider>
          <Providers>{children}</Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
