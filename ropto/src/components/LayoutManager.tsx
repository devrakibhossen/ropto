"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LayoutManager = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isNoLayout =
    pathname.startsWith("/dashboard"); // অথবা exact list + /dashboard/exam/ prefix

  if (isNoLayout) return <>{children}</>;

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutManager;