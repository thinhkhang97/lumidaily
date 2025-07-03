import type { Metadata } from "next";
import { Kalam, Patrick_Hand, Handlee } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/lib/components/ThemeProvider";
import { ThemeSwitcher } from "@/lib/components/ThemeSwitcher";
import Link from "next/link";

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["400"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  weight: ["400"],
});

const handlee = Handlee({
  variable: "--font-handlee",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "LumiDaily",
  description:
    "Your mindful daily pomodoro companion - designed for focus and well-being",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${kalam.variable} ${patrickHand.variable} ${handlee.variable} antialiased`}
      >
        <ThemeProvider>
          <header className="border-b border-border/30 paper-shadow">
            <div className="container mx-auto flex h-16 items-center justify-between p-grid-2">
              <div className="flex items-center gap-grid-3">
                <Link
                  href="/"
                  className="font-heading text-xl font-normal gentle-hover gentle-wobble"
                >
                  LumiDaily
                </Link>
                <nav className="flex space-x-6 text-sm">
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors duration-200 ease-out"
                  >
                    Home
                  </Link>
                  <Link
                    href="/components"
                    className="hover:text-primary transition-colors duration-200 ease-out"
                  >
                    Components
                  </Link>
                </nav>
              </div>
              <ThemeSwitcher />
            </div>
          </header>
          <main className="min-h-screen">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
