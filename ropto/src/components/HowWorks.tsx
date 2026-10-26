import React from "react";

const STEPS = [
  {
    icon: "M12 16V4m0 0L7 9m5-5l5 5M4 20h16",
    title: "আপনার পিডিএফ আপলোড করুন",
    text: "লেকচার নোট, পাঠ্যবইয়ের কোনো অধ্যায় বা গবেষণাপত্র এখানে দিন।",
  },
  {
    icon: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
    title: "এআই (AI) বিষয়বস্তু পড়ে।",
    text: "এটি প্রতিটি পৃষ্ঠা থেকে মূল ধারণা, সংজ্ঞা এবং তথ্যগুলো খুঁজে বের করে।",
  },
  {
    icon: "M9 9a3 3 0 115 2c-1 1-2 1.5-2 3M12 18h.01",
    title: "কুইজ তৈরি করা হয়।",
    text: "আপনি আপনার নিজের doc থেকে তৈরি multiple-choice questions পাবেন।",
  },
  {
    icon: "M5 5h14v10H9l-4 4z",
    title: "উত্তর দিন ও শিখুন",
    text: "একটি উত্তর বেছে নিন এবং তাৎক্ষণিকভাবে দেখে নিন কেন সেটি সঠিক বা ভুল।",
  },
];

const LEAVES = ["Review missed questions", "Practise weak topics", "Track your score"];

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const HowWorks = () => {
  return (
    <section id="how-it-works" className="px-4 pb-20 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* ---------- Heading ---------- */}
        <div className="mb-14 flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center  border border-neutral-800 bg-white px-3 py-1 text-xs text-neutral-700 shadow-sm">
            How it works
          </span>
          <h2 className="text-4xl  tracking-tight text-neutral-100">
            একটি পিডিএফ থেকেই,
            <span className="block font-serif font-normal italic">সবকিছুর বিস্তার ঘটে।</span>
          </h2>
        </div>

        {/* ---------- Trunk, root and branches ---------- */}
        <div className="relative">
          {/* trunk */}
          <div aria-hidden="true" className="absolute bottom-0 left-5 top-10 w-px bg-neutral-300 md:left-1/2 md:-translate-x-1/2" />

          {/* root */}
          <div className="relative h-10">
            <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-[#141414] text-[10px] font-bold text-white md:left-1/2 md:-translate-x-1/2">
              PDF
            </span>
            <span className="absolute left-14 top-2.5 text-sm font-medium  md:left-1/2 md:ml-8">
              Start with any document
            </span>
          </div>

          <ol className="mt-8 flex flex-col">
            {STEPS.map((step, i) => {
              const right = i % 2 === 0; // desktop: steps alternate right / left of the trunk
              return (
                <li key={step.title} className="relative pb-10 pl-14 md:grid md:grid-cols-2 md:pb-14 md:pl-0">
                  {/* junction on the trunk */}
                  <span aria-hidden="true" className="absolute left-[15.5px] top-6 z-10 h-2.5 w-2.5 rounded-full border-2 border-[#141414] bg-[#f8f7f5] md:left-1/2 md:-translate-x-1/2" />
                  {/* branch line */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-5 top-[29px] h-px w-9 bg-neutral-300 ${
                      right ? "md:left-1/2 md:w-10" : "md:left-auto md:right-1/2 md:w-10"
                    }`}
                  />
                  <div
                    className={` border border-neutral-200 bg-neutral-100 p-6 shadow-sm ${
                      right ? "md:col-start-2 md:ml-10" : "md:col-start-1 md:mr-10"
                    }`}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center  border border-neutral-300 bg-[#f8f7f5] text-neutral-900">
                        <Icon d={step.icon} />
                      </span>
                      <span className="text-xs text-neutral-500">Step {i + 1}</span>
                    </div>
                    <h3 className="text-lg font-medium text-neutral-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* ---------- Fork into leaves ---------- */}
          <div className="relative flex flex-wrap gap-2 pl-14 md:grid md:grid-cols-3 md:gap-0 md:pl-0">
            <span aria-hidden="true" className="absolute left-[16.667%] right-[16.667%] top-0 hidden h-px bg-neutral-300 md:block" />
            {LEAVES.map((leaf) => (
              <div key={leaf} className="relative md:pt-10">
                <span aria-hidden="true" className="absolute left-1/2 top-0 hidden h-10 w-px -translate-x-1/2 bg-neutral-300 md:block" />
                <span className="inline-flex items-center gap-2  border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 shadow-sm md:mx-auto md:flex md:w-fit">
                  <span aria-hidden="true" className="h-1.5 w-1.5  bg-[#FF4A00]" />
                  {leaf}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWorks;