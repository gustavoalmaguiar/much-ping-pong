import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "@/app/(pages)/provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "much. Ping Pong Hub",
  description:
    "Ping Pong Hub is a platform for much. employees ping pong enthusiasts to track their matches and stats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Provider>
            <Navbar />
            {children}
            <Toaster />
          </Provider>
        </body>
      </html>
    </SessionProvider>
  );
}