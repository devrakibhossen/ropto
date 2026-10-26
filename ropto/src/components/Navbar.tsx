"use client";

// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// const LOGO = { src: "/ropto.png", width: 150, height: 50 };

type NavLink = { label: string; href: string; id?: string };

// "/#id" works from any page, not only from the home page
const LINKS: NavLink[] = [
  { label: "হোম", href: "/" },
  { label: "ফিচার সমূহ", href: "/#features", id: "features" },
  { label: "এটি যেভাবে কাজ করে", href: "/#how-it-works", id: "how-it-works" },
];

const SECTION_IDS = LINKS.flatMap((l) => (l.id ? [l.id] : []));

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  // close the mobile menu with Escape and give focus back to the button
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // close the mobile menu when the screen grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // highlight the link of the section that is currently on screen (home page only)
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          setActiveId((prev) =>
            entry.isIntersecting ? id : prev === id ? "" : prev,
          );
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const isActive = (link: NavLink) =>
    isHome && (link.id ? link.id === activeId : activeId === "");

  const isAdmin = true;

  return (
    <nav
      aria-label="প্রধান মেনু"
      className="sticky top-0 z-50  backdrop-blur"
    >
      <div className="mx-auto grid max-w-[1000px] grid-cols-[1fr_auto] items-center p-3 md:grid-cols-[1fr_auto_1fr]">
        {/* logo */}
        <Link href="/" aria-label="রপ্ত - হোম" className="justify-self-start">
          {/* <Image
            className="h-10 w-auto object-contain"
            src={LOGO.src}
            alt=""
            width={LOGO.width}
            height={LOGO.height}
            priority
          /> */}
          <h1 className="text-white text-2xl font-serif font-bold italic tracking-wide">
            Ropto
            <span className="text-red-600 text-2xl not-italic">.</span>
            ai
          </h1>
        </Link>

        {/* desktop links, centred */}
        <ul className="hidden items-center gap-8 text-[15px] font-medium md:flex">
          {LINKS.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={
                    active ? (link.id ? "location" : "page") : undefined
                  }
                  className={`transition-colors hover:text-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 ${
                    active
                      ? "text-neutral-200"
                      : "text-neutral-300"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* desktop actions */}
        <div className="hidden items-center gap-6 justify-self-end md:flex">
          {isAdmin ? (
            <Link
              href="/dashboard"
              className="bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-300"
            >
              ড্যাশবোর্ড
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
              >
                লগইন
              </Link>
              <Link
                href="/signup"
                className="border-gray-200 bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-300"
              >
                বিনামূল্যে শুরু করুন
              </Link>
            </>
          )}
        </div>

        {/* mobile menu button (44px touch target) */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="মেনু"
          className="grid h-8 w-9 place-items-center  border border-neutral-300 bg-white text-neutral-900 md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* mobile panel */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows,visibility] duration-300 motion-reduce:transition-none md:hidden ${
          open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-5 pt-2 sm:px-6">
            <ul className="flex flex-col">
              {LINKS.map((link) => {
                const active = isActive(link);
                return (
                  <li key={link.label} className="border-b border-neutral-200">
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={
                        active ? (link.id ? "location" : "page") : undefined
                      }
                      className={`block py-3 text-neutral-200 ${
                        active
                          ? "font-bold text-neutral-200"
                          : "font-medium text-neutral-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={close}
                className=" border border-neutral-300 bg-white px-6 py-2.5 text-center text-sm font-medium text-neutral-900 hover:bg-neutral-100"
              >
                লগইন
              </Link>
              <Link
                href="/signup"
                onClick={close}
                className=" bg-[#141414] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-black"
              >
                বিনামূল্যে শুরু করুন
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
