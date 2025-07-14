import type { Metadata } from "next";
import { Kalam, Patrick_Hand, Handlee } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/lib/components/ThemeProvider";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { MainNavbar } from "@/components/MainNavbar";
import { ThemeScript } from "@/lib/components/ThemeScript";
import { SWRProvider } from "@/lib/providers/SWRProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from "react";

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
  title: "LumiDaily | Integrated Workspace for Productivity",
  description:
    "Combine task management, Pomodoro timer, music, and notes in one calming workspace. Be productive without the stress - work better while feeling better.",
  keywords:
    "productivity, pomodoro technique, task management, focus timer, wellness, work-life balance, integrated workspace, music for focus, note-taking, lumi daily",
  authors: [{ name: "thinhkhang97" }],
  openGraph: {
    title: "LumiDaily | Integrated Workspace for Productivity",
    description:
      "Combine task management, Pomodoro timer, music, and notes in one calming workspace. Be productive without the stress.",
    url: "https://lumidaily.com",
    siteName: "LumiDaily",
    images: [
      {
        url: "/public/lumidaily-og.png",
        width: 1200,
        height: 630,
        alt: "LumiDaily - Integrated Workspace for Productivity",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LumiDaily | Integrated Workspace for Productivity",
    description:
      "Combine task management, Pomodoro timer, music, and notes in one calming workspace. Be productive without the stress - work better while feeling better.",
    images: ["/public/lumidaily-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://lumidaily.com"),
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
        <link rel="canonical" href="https://lumidaily.com" />
      </head>
      <body
        className={`${kalam.variable} ${patrickHand.variable} ${handlee.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <AuthProvider>
          <ThemeProvider>
            <SWRProvider>
              <MainNavbar />
              <main className="min-h-screen">{children}</main>
              <Toaster />
            </SWRProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
