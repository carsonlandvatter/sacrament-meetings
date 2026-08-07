import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sacrament-meetings-ten-nu.vercel.app/'),
  title: {
    default: 'Seaside Ward Sacrament Meetings',
    template: '%s | Seaside Ward'
  },
  description:
    'Sacrament meeting agendas, speakers, hymns, and prayers for the Seaside Ward',
  openGraph: {
    title: 'Seaside Ward Sacrament Meetings',
    description: 'Sacrament meeting agendas for the Seaside Ward',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-center"><Header />
      <main className="flex-1">{children}</main>
      <Footer />
      </body>
    </html>
  );
}
