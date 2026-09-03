"use client";

import DirectConsultationPopup from "@/components/DirectConsultationPopup";
import Footer from "@/components/forWebDevelopment/Footer";
import Header from "@/components/Header";
import WhatsAppChat from "@/components/whatsappChat";
import { useTheme } from "@/context/ThemeContext";

export default function MyLayout({ children }) {
  const { themeId } = useTheme();

  return (
    <div
      className="theme-root flex min-h-screen flex-col"
      data-theme={themeId}
    >
      <Header />
      <main className="theme-main w-full flex-1 pt-20">{children}</main>
      <Footer />
      <WhatsAppChat />
      <DirectConsultationPopup />
    </div>
  );
}
