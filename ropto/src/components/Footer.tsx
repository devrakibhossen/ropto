"use client";
import Link from "next/link";

const LOGO = { src: "/ropto.png", width: 150, height: 50 };

// Edit the labels and hrefs to match your real pages
const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Start for free", href: "/signup" },
      { label: "Log in", href: "/login" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

/* small isometric layer stack, same language as the Features illustrations */
const LayerStack = () => (
  <svg viewBox="0 0 120 110" className="h-auto w-32" aria-hidden="true">
    <polygon points="12,74 60,98 60,106 12,82" fill="#ebe9e5" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round" />
    <polygon points="60,98 108,74 108,82 60,106" fill="#d9d6d0" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round" />
    <polygon points="60,50 108,74 60,98 12,74" fill="#fc1212" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round" />
    <polygon points="60,24 108,48 60,72 12,48" fill="#fff" fillOpacity="0.6" stroke="#a9a59f" strokeWidth="1.2" strokeDasharray="3 3" strokeLinejoin="round" />
    <polygon points="60,0 108,24 60,48 12,24" fill="#fff" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M38 24l22-11M44 28l22-11M50 32l14-7" stroke="#8d8982" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="px-4 pt-20 sm:px-6">
      <div className="mx-auto max-w-[1000] border-x border-t border-neutral-800">
        {/* ---------- Closing call to action ---------- */}
        <div className="flex items-center justify-between gap-8 border-b border-neutral-800 p-8 md:p-12">
          <div className="flex flex-col items-start gap-6">
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-neutral-100 md:text-4xl">
             আপনার পরবর্তী পড়াশোনার সেশনটি
              <span className="block font-serif font-normal italic">একটি পিডিএফ (PDF) দিয়ে শুরু হবে।</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-500">
              একটি ডকুমেন্ট আপলোড করুন এবং কয়েক সেকেন্ডের মধ্যেই ব্যাখ্যাসহ কুইজ পেয়ে যান।
            </p>
            <Link
                href="/signup"
                className="border-gray-200 bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-black"
              >
                বিনামূল্যে শুরু করুন
              </Link>
          </div>
          <div className="hidden shrink-0 pr-4 sm:block md:pr-12">
            <LayerStack />
          </div>
        </div>

        {/* ---------- Brand and links ---------- */}
        <div className="grid md:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col items-start gap-4 p-8 md:p-12">
            <Link href="/" aria-label="রপ্ত - হোম" className="justify-self-start">
                     <h1 className="text-white text-2xl font-serif font-bold italic tracking-wide">
            Ropto
            <span className="text-red-600 text-2xl not-italic">.</span>
            ai
          </h1>
                    </Link>
            <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
              যেকোনো নথিপত্রকে এমন একটি কুইজে রূপান্তর করুন যা নিজেই সবকিছু ব্যাখ্যা করে। শিক্ষার্থী, শিক্ষক এবং আজীবন শিক্ষার্থীদের জন্য এটি তৈরি করা হয়েছে।
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 border-t border-neutral-800 p-8 sm:grid-cols-3 md:border-l md:border-t-0 md:p-12"
          >
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-sm font-medium text-neutral-100">{col.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 focus-visible:text-neutral-900"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>


        <div className="flex flex-col gap-1 border-t border-neutral-800 px-8 py-5 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between md:px-12">
          <p>&copy; 2026 Anupath. All rights reserved.</p>
          <p>Upload. Quiz. Understand.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;