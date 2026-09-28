import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Software Engineer / Fullstack Developer 15 Tháng | AI5.VN",
  description:
    "Lộ trình Software Engineer 15 tháng theo hướng thực chiến doanh nghiệp với Backend Java, React/NextJS, DevSecOps, Cloud, Security, AI và dự án thương mại.",
  metadataBase: new URL("https://ai5.vn"),
  openGraph: {
    title: "Software Engineer / Fullstack Developer · AI5.VN",
    description: "15 tháng từ code đến production.",
    type: "website",
    locale: "vi_VN",
    siteName: "AI5.VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Engineer / Fullstack Developer · AI5.VN",
    description: "15 tháng từ code đến production.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
