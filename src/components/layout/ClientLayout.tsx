"use client";

import { LocaleProvider } from "@/i18n";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </LocaleProvider>
    </ThemeProvider>
  );
}
