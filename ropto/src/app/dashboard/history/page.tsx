"use client";

import React, { useState } from "react";
import { Search, Filter, Calendar, ChevronRight, RotateCcw, BookOpen } from "lucide-react";

// ডেমো ডেটা (Subject বাদ দিয়ে কঠিনতা যোগ করা হয়েছে)
const historyData = [
  { id: "q1", title: "কোষ বিভাজন", difficulty: "সহজ", date: "2026-10-24", correct: 9, total: 10 },
  { id: "q2", title: "নিউটনের গতিসূত্র", difficulty: "মধ্যম", date: "2026-10-22", correct: 7, total: 10 },
  { id: "q3", title: "রাসায়নিক বন্ধন", difficulty: "কঠিন", date: "2026-10-20", correct: 12, total: 20 },
  { id: "q4", title: "ত্রিকোণমিতি পরিচিতি", difficulty: "সহজ", date: "2026-10-17", correct: 4, total: 10 },
  { id: "q5", title: "পদ ও পদের প্রকারভেদ", difficulty: "মধ্যম", date: "2026-10-15", correct: 18, total: 20 },
  { id: "q6", title: "মুক্তিযুদ্ধের ইতিহাস", difficulty: "কঠিন", date: "2026-10-12", correct: 8, total: 10 },
];

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // সার্চ ফিল্টার লজিক (শুধু টাইটেল দিয়ে খুঁজবে)
  const filteredData = historyData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatNumber = (n: number) => n.toLocaleString("bn-BD");

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
      <div>
        <h1 className="text-2xl font-bold text-neutral-100">পূর্ববর্তী কার্যক্রম</h1>
        <p className="text-sm text-neutral-400 mt-1">
          আপনার তৈরি করা সব MCQ এবং সেগুলোর ফলাফল এখানে দেখুন।
        </p>
      </div>

      {/* সার্চ এবং ফিল্টার বার */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder="টপিক দিয়ে খুঁজুন..."
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

      {/* হিস্ট্রি লিস্ট */}
      <div className="space-y-3">
        {filteredData.length > 0 ? (
          filteredData.map((item) => {
            // স্কোরের পার্সেন্টেজ বের করা
            const percentage = Math.round((item.correct / item.total) * 100);
            
            return (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between bg-[#1B1A18] border border-neutral-800 p-4 hover:border-neutral-600 transition-colors gap-4"
              >
                {/* বাম দিকের তথ্য */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0">
                    <BookOpen size={20} className="text-neutral-400" />
                  </div>
                  <div>
                    <h3 className="text-neutral-100 font-semibold text-[15px]">{item.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-400">
                      {/* Subject এর জায়গায় Difficulty */}
                      <span className={`px-2 py-0.5 rounded-sm border text-[11px] ${getDifficultyStyle(item.difficulty)}`}>
                        {item.difficulty}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ডান দিকের স্কোর এবং অ্যাকশন */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-neutral-800 sm:border-0">
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-neutral-300">
                      <span className={`font-bold ${percentage >= 80 ? 'text-emerald-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {formatNumber(item.correct)}
                      </span>
                      <span className="text-neutral-500"> / {formatNumber(item.total)}</span>
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">স্কোর ({percentage}%)</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      title="আবার দিন"
                      className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                    >
                      <RotateCcw size={18} />
                    </button>
                    <button className="flex items-center gap-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 text-xs font-medium transition-colors">
                      রিভিউ
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // কোনো ডেটা না পাওয়া গেলে
          <div className="text-center py-12 bg-[#1B1A18] border border-neutral-800">
            <p className="text-neutral-400">কোনো ফলাফল পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;