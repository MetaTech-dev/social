import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Providers } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export const metadata: Metadata = {
  title: "social",
  description: "A social network built with Convex.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <Breadcrumbs />
          {children}
        </Providers>
      </body>
    </html>
  );
}
