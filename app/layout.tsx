import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MoveTopButton from "../components/MoveTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shahmotors.ie"),
  title: {
    default: "ShahMotors | Premium Car Dealership",
    template: "%s | ShahMotors Ireland",
  },
  description: "ShahMotors is a premium Irish used car dealership serving Dublin and Ireland with trusted NCT-ready vehicles, finance, and service history.",
  keywords: [
    "ShahMotors",
    "used cars Ireland",
    "Dublin car dealership",
    "premium used cars",
    "Irish car finance",
    "NCT ready cars",
    "SIMI dealer",
  ],
  authors: [{ name: "ShahMotors Ireland", url: "https://www.shahmotors.ie" }],
  themeColor: "#ffffff",
  alternates: {
    canonical: "/",
    languages: {
      "en-IE": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22 font-family=%22Arial, sans-serif%22 font-weight=%22bold%22><tspan fill=%22%23ef4444%22>S</tspan><tspan fill=%22%231f2937%22>M</tspan></text></svg>",
    shortcut: "/logo-car.png",
    apple: "/logo-car.png",
  },
  openGraph: {
    title: "ShahMotors Ireland",
    description: "A trusted Dublin car dealership offering verified used cars with full NCT history and Irish compliance.",
    url: "https://www.shahmotors.ie",
    siteName: "ShahMotors",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/logo-car.png",
        width: 1200,
        height: 630,
        alt: "ShahMotors Ireland logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShahMotors Ireland",
    description: "Find verified used cars in Dublin, Ireland with transparent pricing, finance and full service history.",
    images: ["/logo-car.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50/50 ">
        {children}
        <MoveTopButton />
      </body>
    </html>
  );
}
