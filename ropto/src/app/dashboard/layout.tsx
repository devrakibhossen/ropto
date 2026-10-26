import type { Metadata } from "next";
import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden lg:flex">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto md:ml-64 mt-15 md:mt-0">
        {children}
      </main>
    </div>
  );
}