import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Car Rental Service | RentalCar",
  description:
    "Reliable car rental service. Wide selection of cars, easy search, and quick booking.",
  openGraph: {
    title: "RentalCar — Car Rental Service",
    description: "Find your perfect rental car today.",
    images: [
      {
        url: "/public/home/hero.webp",
        width: 1200,
        height: 630,
        alt: "rental car",
      },
    ],
  },
};

const manrope = Manrope({
  variable: "--font-family",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable}`}
      data-scroll-behavior="smooth"
    >
      <TanStackProvider>
        <body>
          <Header />
          {children}
          <ReactQueryDevtools />
          <Toaster position="top-right" />
        </body>
      </TanStackProvider>
    </html>
  );
}
