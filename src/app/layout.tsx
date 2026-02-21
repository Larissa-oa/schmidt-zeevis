import type { Metadata } from "next";
import "@/index.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Schmidt Zeevis",
  description:
    "Premium verse vis en zeevruchten, rechtstreeks van Nederlandse vissers naar uw deur.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
