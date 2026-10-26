
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Plus,
  History,
  Bookmark,
  Settings,
  Menu,
  X,
  House,
} from "lucide-react";

// const LOGO = {
//   src: "/ropto.png",
//   width: 150,
//   height: 50,
// };

const mainNavItems = [
  {
    name: "ড্যাশবোর্ড",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "MCQ তৈরি করুন",
    href: "/dashboard/create-mcq",
    icon: Plus,
  },
  {
    name: "পূর্ববর্তী কার্যক্রম",
    href: "/dashboard/history",
    icon: History,
  },
  {
    name: "সংরক্ষিত প্রশ্ন",
    href: "/dashboard/bookmarks",
    icon: Bookmark,
  },
  {
    name: "সেটিংস",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "হোম পেজ",
    href: "/",
    icon: House,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      {/* মোবাইল হেডার */}
      <header className="bg-[#1B1A18] fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-neutral-800  px-4 md:hidden">
        <Link href="/" aria-label="রপ্ত - হোম" className="justify-self-start">
          <h1 className="text-white text-2xl font-serif font-bold italic tracking-wide">
            Ropto
            <span className="text-red-600 text-2xl not-italic">.</span>
            ai
          </h1>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={
            mobileOpen
              ? "মেনু বন্ধ করুন"
              : "মেনু খুলুন"
          }
          aria-expanded={mobileOpen}
          aria-controls="main-sidebar"
          className="flex h-10 w-10 items-center justify-center  border border-neutral-800 text-neutral-100 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          {mobileOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}
        </button>
      </header>

      {/* মোবাইল ব্যাকড্রপ */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="মেনু বন্ধ করুন"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-gray-950/40 backdrop-blur-[2px] md:hidden"
        />
      )}

      {/* সাইডবার */}
      <aside
        id="main-sidebar"
        aria-label="প্রধান নেভিগেশন"
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[260px] flex-col
          border-r border-neutral-800 bg-[#1B1A18]
          transition-transform duration-300 ease-out
          md:z-30 md:w-64 md:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* লোগো */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-neutral-800 px-6">
          <Link href="/" aria-label="রপ্ত - হোম" className="justify-self-start">
          <h1 className="text-white text-2xl font-serif font-bold italic tracking-wide">
            Ropto
            <span className="text-red-600 text-2xl not-italic">.</span>
            ai
          </h1>
        </Link>
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="সাইডবার বন্ধ করুন"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 md:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* নেভিগেশন */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wide">
            প্রধান মেনু
          </p>

          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;

              const isActive =
  item.href === "/dashboard"
    ? pathname === "/dashboard" 
    : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  aria-current={
                    isActive ? "page" : undefined
                  }
                  className={`
                    group relative flex min-h-11 items-center gap-3
                     px-3.5 py-2
                    text-[13px] font-semibold
                    transition-colors duration-200
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-red-600
                    ${
                      isActive
                        ? "bg-[#121110] text-red-600"
                        : "text-neutral-300 hover:bg-[#121110] hover:text-red-600"
                    }
                  `}
                >
                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={
                      isActive
                        ? "text-red-600"
                        : "text-neutral-300  transition-colors group-hover:text-red-600"
                    }
                  />

                  <span className="flex-1">
                    {item.name}
                  </span>

                  {isActive && (
                    <span className="absolute bottom-2.5 left-0 top-2.5 w-[3px] rounded-r-full bg-red-600" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>


        
<div className="shrink-0 p-4">
  <Link href="/dashboard/profile">
  <button
    className="flex w-full items-center gap-2  bg-[#121110] p-2 text-left transition-colors  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
  >
    <div className="relative shrink-0">
      <Image
        src="/ropto.png"
        alt="ব্যবহারকারীর ছবি"
        width={40}
        height={40}
        className="h-8 w-8  border border-gray-200 bg-gray-50 object-cover"
      />

      <span
        aria-label="অনলাইন"
        className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"
      />
    </div>

    <div className="min-w-0 flex-1 space-y-0">
      <p className="truncate text-[13px] font-semibold leading-tight text-neutral-100">
        Rakib Hossen
      </p>

      <p className="truncate text-[11px] leading-tight ">
        rakibhossen12@gmail.com
      </p>
    </div>
  </button>
  </Link>
</div>

      </aside>
    </>
  );
};

export default Sidebar;
