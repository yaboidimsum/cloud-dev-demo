import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/context/theme-context";
import ThemeSwitcher from "@/components/theme-switcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kumo | Portfolio",
  description: "Web Developer, Full Stack Developer, and Freelancer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="dark-blue:bg-[#15202b] dark-blue:text-gray-200 flex min-h-screen bg-white text-gray-800 dark:bg-black dark:text-gray-200">
            <Sidebar />
            <main className=" lg: ml-16 flex-1 overflow-auto p-4 md:p-6 lg:overflow-visible lg:p-8">
              {children}
            </main>
            <ThemeSwitcher />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
