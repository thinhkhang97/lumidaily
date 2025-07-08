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
  title: "LumiDaily | Mindful Productivity Planner",
  description:
    "Transform productivity into a calming practice with LumiDaily's Pomodoro timer, task planning, and wellness features. Designed for focus and well-being.",
  keywords:
    "productivity, pomodoro technique, mindfulness, task management, focus timer, wellness, work-life balance",
  authors: [{ name: "LumiDaily Team" }],
  openGraph: {
    title: "LumiDaily | Mindful Productivity Planner",
    description:
      "Transform productivity into a calming practice with LumiDaily's Pomodoro timer, task planning, and wellness features.",
    url: "https://lumidaily.com",
    siteName: "LumiDaily",
    images: [
      {
        url: "/images/lumidaily-og.jpg",
        width: 1200,
        height: 630,
        alt: "LumiDaily - Mindful Productivity Planner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LumiDaily | Mindful Productivity Planner",
    description:
      "Transform productivity into a calming practice with LumiDaily's Pomodoro timer, task planning, and wellness features.",
    images: ["/images/lumidaily-twitter.jpg"],
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
        <GoogleAnalytics />
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
