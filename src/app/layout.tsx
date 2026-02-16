import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "지능형 보안 연구실 | Intelligent Security Lab",
    template: "%s | SecLab",
  },
  description:
    "국립군산대학교 컴퓨터정보공학과 지능형 보안 연구실. 암호학, 부채널 분석, 인공지능 보안을 연구합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
