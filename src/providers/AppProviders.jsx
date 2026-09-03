"use client";

import AppToaster from "@/components/ui/AppToaster";
import { SiteProvider } from "@/context/siteContext";
import { ThemeProvider } from "@/context/ThemeContext";
import MyLayout from "@/app/MyLayout";

export default function AppProviders({ children }) {
  return (
    <SiteProvider>
      <ThemeProvider>
        <MyLayout>{children}</MyLayout>
        <AppToaster />
      </ThemeProvider>
    </SiteProvider>
  );
}
