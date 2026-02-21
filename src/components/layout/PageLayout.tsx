/**
 * Shared page layout wrapping Header, main content area, and Footer.
 * Eliminates repeated layout boilerplate across all pages.
 */
import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface PageLayoutProps {
  children: ReactNode;
  /** Extra class names on the <main> element */
  mainClassName?: string;
}

const PageLayout = ({ children, mainClassName = "" }: PageLayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className={`flex-1 ${mainClassName}`}>{children}</main>
    <Footer />
  </div>
);

export default PageLayout;
