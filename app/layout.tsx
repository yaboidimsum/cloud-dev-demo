import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/context/theme-context";
import ThemeSwitcher from "@/components/theme-switcher";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kumo | Portfolio",
  description: "UI/UX Designer, Frontend Developer, and Freelancer",
  icons: {
    icon: "/favicon_io/favicon.ico",
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
    >
      <body className={inter.className}>
        <ThemeProvider initialTheme={theme}>
          <div className="dark-blue:bg-[#15202b] dark-blue:text-gray-200 flex min-h-screen bg-white text-gray-800 dark:bg-black dark:text-gray-200">
            <Sidebar />
            <main className=" lg: ml-16 flex-1 overflow-auto p-4 pt-0 md:p-6 lg:overflow-visible lg:p-8 ">
              {children}
            </main>
            <ThemeSwitcher />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
