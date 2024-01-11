import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./_components/ConvexClientProvider";
import { ThemeProvider } from "./_components/ThemeProvider";
import { Header } from "./_components/Header";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            <Header />
            {children}
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
