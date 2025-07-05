import type { Metadata } from "next";
import { Kalam, Patrick_Hand, Handlee } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/lib/components/ThemeProvider";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { MainNavbar } from "@/components/MainNavbar";
import { ThemeScript } from "@/lib/components/ThemeScript";

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
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${kalam.variable} ${patrickHand.variable} ${handlee.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider>
            <MainNavbar />
            <main className="min-h-screen">{children}</main>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
