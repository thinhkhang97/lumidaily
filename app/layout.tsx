import type { Metadata } from "next";
import { Poppins, Comfortaa } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/lib/components/ThemeProvider";
import Link from "next/link";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Daily Pomo",
  description: "Your beautiful daily pomodoro companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${comfortaa.variable} antialiased`}>
        <ThemeProvider>
          <header className="border-b">
            <div className="container mx-auto flex h-14 items-center">
              <Link href="/" className="font-bold">
                LumiDaily
              </Link>
              <nav className="ml-6 flex space-x-4 text-sm">
                <Link href="/" className="hover:text-foreground/80">
                  Home
                </Link>
                <Link href="/components" className="hover:text-foreground/80">
                  Components
                </Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
