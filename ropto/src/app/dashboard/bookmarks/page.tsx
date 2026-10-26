"use client";

import React, { useState } from "react";
import { Bookmark, Search, Filter, Trash2, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

// ডেমো ডেটা (Subject বাদ দিয়ে Difficulty যোগ করা হয়েছে)
const savedQuestions = [
  {
    id: "b1",
    difficulty: "সহজ",
    question: "কোষ বিভাজনের কোন ধাপে ক্রোমোজোমের সংখ্যা অর্ধেক হয়?",
    options: ["মাইটোসিস", "মায়োসিস", "অ্যামাইটোসিস", "সাইটোকাইনেসিস"],
    correctAnswer: "মায়োসিস",
    date: "2026-10-24",
  },
  {
    id: "b2",
    difficulty: "মধ্যম",
    question: "নিউটনের দ্বিতীয় সূত্র অনুযায়ী বলের একক কী?",
    options: ["জুল", "ওয়াট", "নিউটন", "প্যাসকেল"],
    correctAnswer: "নিউটন",
    date: "2026-10-22",
  },
  {
    id: "b3",
    difficulty: "কঠিন",
    question: "পানির রাসায়নিক সংকেত কোনটি?",
    options: ["H2O2", "CO2", "H2O", "NaCl"],
    correctAnswer: "H2O",
    date: "2026-10-20",
  },
  {
    id: "b4",
    difficulty: "সহজ",
    question: "'সোনার তরী' কবিতাটি কার লেখা?",
    options: ["কাজী নজরুল ইসলাম", "রবীন্দ্রনাথ ঠাকুর", "জসীম উদ্‌দীন", "জীবনানন্দ দাশ"],
    correctAnswer: "রবীন্দ্রনাথ ঠাকুর",
    date: "2026-10-18",
  },
];

const BookmarksPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // সার্চ ফিল্টার (শুধু প্রশ্ন দিয়ে খুঁজবে)
  const filteredData = savedQuestions.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // উত্তর দেখানো/লুকানোর টগল
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // কঠিনতা অনুযায়ী রঙ নির্ধারণ
  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case "সহজ":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "মধ্যম":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "কঠিন":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-neutral-800 text-neutral-300 border-neutral-700";
    }
  };

  return (
    <div className="lg:p-8 p-5 space-y-6">
      {/* হেডার সেকশন */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-100 flex items-center gap-2">
            <Bookmark className="text-red-500" size={24} />
            সংরক্ষিত প্রশ্ন
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            আপনার পরবর্তী রিভিশনের জন্য সংরক্ষিত MCQ গুলো এখানে আছে।
          </p>
        </div>
      </div>

      {/* সার্চ এবং ফিল্টার বার */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder="প্রশ্ন দিয়ে খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1B1A18] border border-neutral-800 text-neutral-200 text-sm pl-10 pr-4 py-2.5 focus:outline-none focus:border-red-600 transition-colors"
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#1B1A18] border border-neutral-800 text-neutral-300 px-4 py-2.5 text-sm font-medium hover:bg-neutral-800 transition-colors">
          <Filter size={16} />
          ফিল্টার
        </button>
      </div>

      {/* সংরক্ষিত প্রশ্নের লিস্ট */}
      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-[#1B1A18] border border-neutral-800 overflow-hidden transition-colors hover:border-neutral-700"
              >
                {/* কার্ড হেডার */}
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Subject এর জায়গায় Difficulty */}
                    <span className={`inline-block border text-[11px] px-2 py-0.5 rounded-sm mb-2 ${getDifficultyStyle(item.difficulty)}`}>
                      {item.difficulty}
                    </span>
                    <h3 className="text-neutral-100 font-medium text-[15px] leading-relaxed">
                      {item.question}
                    </h3>
                  </div>
                  <button
                    title="বুকমার্ক সরান"
                    className="p-2 text-neutral-500 hover:text-red-500 hover:bg-neutral-900 rounded-md transition-colors shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* টগল বাটন (উত্তর দেখুন) */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-neutral-900/50 border-t border-neutral-800/80 text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  <span>{isExpanded ? "উত্তর লুকান" : "উত্তর দেখুন"}</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {/* অপশন এবং উত্তর (এক্সপ্যান্ড হলে দেখাবে) */}
                {isExpanded && (
                  <div className="p-4 border-t border-neutral-800 bg-[#121110]">
                    <div className="space-y-2">
                      {item.options.map((option, index) => {
                        const isCorrect = option === item.correctAnswer;
                        return (
                          <div
                            key={index}
                            className={`flex items-center gap-3 text-sm p-2.5 border ${
                              isCorrect
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                : "bg-neutral-900 border-neutral-800 text-neutral-400"
                            }`}
                          >
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-neutral-800 text-[11px] font-bold shrink-0">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="flex-1">{option}</span>
                            {isCorrect && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-[#1B1A18] border border-neutral-800">
            <Bookmark size={40} className="mx-auto text-neutral-700 mb-3" />
            <p className="text-neutral-400">কোনো সংরক্ষিত প্রশ্ন পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;