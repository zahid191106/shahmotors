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
  title: "ShahMotors | Premium Car Dealership",
  description: "Find the best deals on luxury and performance cars in Ireland.",

 icons: {
    icon: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22 font-family=%22Arial, sans-serif%22 font-weight=%22bold%22><tspan fill=%22%23ef4444%22>S</tspan><tspan fill=%22%231f2937%22>M</tspan></text></svg>`,
  },
  openGraph: {
    title: "ShahMotors",
    description: "Your trusted partner for quality vehicles.",
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
