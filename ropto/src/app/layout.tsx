import type { Metadata } from "next";
import { Baloo_Da_2, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import LayoutManager from "@/components/LayoutManager";
import { Suspense } from 'react';
const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
 
// Heading font: same family style as the Ropto logo.
// Use it with: className="font-[family-name:var(--font-baloo)]"
const baloo = Baloo_Da_2({
  variable: "--font-baloo",
  subsets: ["bengali", "latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "রপ্ত | এআই-চালিত এমসিকিউ (MCQ) শেখার প্ল্যাটফর্ম",
  description: "এআই-চালিত এমসিকিউ (MCQ) শেখার প্ল্যাটফর্ম",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hindSiliguri.variable} ${baloo.variable} scroll-smooth scroll-pt-20 h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-inter">
        <Suspense fallback={<div>Loading...</div>}>
        <LayoutManager>{children}</LayoutManager>
        </Suspense>
      </body>
    </html>
  );
}