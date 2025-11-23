import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "@/styles/globals.css";
import ReactQueryProvider from "@/commons/providers/react-query/react-query.provider";
import NextThemesProvider from "@/commons/providers/next-themes/next-themes.provider";
import ModalProvider from "@/commons/providers/modal/modal.provider";
import Layout from "@/commons/layout";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "OSM RFQ Frontend",
  description: "OSM RFQ Frontend Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSans.variable}>
      <body className={notoSans.className}>
        <ReactQueryProvider>
          <NextThemesProvider>
            <ModalProvider>
              <Layout>
                {children}
              </Layout>
            </ModalProvider>
          </NextThemesProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
