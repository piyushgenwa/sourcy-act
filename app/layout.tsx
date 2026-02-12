import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sourcy - Find Your Perfect Products",
  description:
    "Cross-border sourcing for digital-first consumer brands. Discover products tailored to your style in 60 seconds.",
  openGraph: {
    title: "Sourcy - Find Your Perfect Products",
    description:
      "Cross-border sourcing for digital-first consumer brands.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
