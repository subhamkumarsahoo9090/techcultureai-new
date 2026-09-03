import { Inter } from "next/font/google";
import AppProviders from "@/providers/AppProviders";
import "./globals.css";
import "./globals1.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "TechCulture AI | Web Development & Digital Solutions",
  description:
    "Scalable web, mobile, and AI-powered solutions — KYC, automation, middleware, and enterprise digital products.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      data-theme="tealOrange"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
