import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/github-dark.css";
import BottomNavDock from "@/components/bottom-nav-dock";
import { ThemeProvider } from "@/context/theme-context";
import { cookies } from "next/headers";
import LenisProvider from "@/context/LenisProvider";



export const metadata: Metadata = {
  metadataBase: new URL("https://cloudev.netlify.app/"),
  title: "Kumo | Portfolio",
  description: "Hi! It's Awan your design and code partner",
  icons: {
    icon: "/favicon_io/favicon.ico",
  },
  openGraph: {
    title: "Kumo | Portfolio",
    description: "Hi! It's Awan your design and code partner",
    images: {
      url: "/open-graph.png",
      width: 1200,
      height: 630,
      alt: "Kumo Portfolio",
    },
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const savedTheme = (await cookies()).get("color-theme");
  const themeValue = savedTheme?.value || "light";

  // Validate theme from cookie
  const isValidTheme = themeValue === "light" || themeValue === "dark";
  const theme: "light" | "dark" = isValidTheme ? themeValue : "light";

  return (
    <html
      lang="en"
      className={`scroll-smooth ${theme === "dark" ? "dark" : "light"}`}
      suppressHydrationWarning
    >
      <LenisProvider>
        <body className="antialiased">
          <ThemeProvider initialTheme={theme}>
            <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
              <BottomNavDock />
              <main className="flex-1 overflow-auto p-4 pt-0 pb-28 md:p-6 md:pb-28 lg:overflow-visible lg:p-8 lg:pb-28">
                <div className="mx-auto max-w-[732px] w-full px-4">
                  {children}
                </div>
              </main>
            </div>
          </ThemeProvider>
        </body>
      </LenisProvider>
    </html>
  );
}
