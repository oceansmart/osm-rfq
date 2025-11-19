import type { Metadata } from "next";
import "@/styles/globals.css";
import ReactQueryProvider from "@/commons/providers/react-query/react-query.provider";
import NextThemesProvider from "@/commons/providers/next-themes/next-themes.provider";
import ModalProvider from "@/commons/providers/modal/modal.provider";

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
    <html lang="ko">
      <body>
        <ReactQueryProvider>
          <NextThemesProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </NextThemesProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
