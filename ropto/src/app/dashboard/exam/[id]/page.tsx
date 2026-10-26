"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Flag,
  ListChecks
} from "lucide-react";
import { useRouter } from "next/navigation";

const examQuestions = [
  {
    id: 1,
    question: "কোষ বিভাজনের কোন ধাপে ক্রোমোজোমের সংখ্যা অর্ধেক হয়?",
    options: ["মাইটোসিস", "মায়োসিস", "অ্যামাইটোসিস", "সাইটোকাইনেসিস"],
    correctAnswer: "মায়োসিস",
  },
  {
    id: 2,
    question: "নিউটনের দ্বিতীয় সূত্র অনুযায়ী বলের একক কী?",
    options: ["জুল", "ওয়াট", "নিউটন", "প্যাসকেল"],
    correctAnswer: "নিউটন",
  },
  {
    id: 3,
    question: "পানির রাসায়নিক সংকেত কোনটি?",
    options: ["H2O2", "CO2", "H2O", "NaCl"],
    correctAnswer: "H2O",
  },
  {
    id: 4,
    question: "'সোনার তরী' কবিতাটি কার লেখা?",
    options: ["কাজী নজরুল ইসলাম", "রবীন্দ্রনাথ ঠাকুর", "জসীম উদ্‌দীন", "জীবনানন্দ দাশ"],
    correctAnswer: "রবীন্দ্রনাথ ঠাকুর",
  },
  {
    id: 5,
    question: "বাংলাদেশের জাতীয় ফুল কোনটি?",
    options: ["গোলাপ", "শাপলা", "জবা", "পদ্ম"],
    correctAnswer: "শাপলা",
  },
];

const ExamPage = () => {
  const router = useRouter();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(600); // ১০ মিনিট
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (questionId: number, option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option,
    });
  };

  const handleSubmit = () => {
  setIsSubmitting(true);
  
  // এখানে আপনার API কল হবে যা রেজাল্ট সেভ করে একটি ID রিটার্ন করবে
  setTimeout(() => {
    const demoAttemptId = "att_12345"; // ডেমো আইডি (আসল API থেকে আসবে)
    
    // ডাইনামিক রাউটে রিডাইরেক্ট
    router.push(`/dashboard/exam/result/${demoAttemptId}`);
  }, 1500);
};

useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="lg:p-8 p-5 max-w-4xl mx-auto space-y-6 pb-24">
      {/* স্টিকি হেডার (টাইমার এবং প্রোগ্রেস) */}
      <div className="sticky top-0 z-30 bg-[#121110]/95 backdrop-blur-sm border border-neutral-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <Clock className="text-red-500" size={20} />
          </div>
          <div>
            <p className="text-xs text-neutral-400">বাকি সময়</p>
            <p className={`text-xl font-bold font-mono ${timeLeft < 60 ? "text-red-500 animate-pulse" : "text-white"}`}>
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-sm text-neutral-300 flex items-center gap-2">
            <ListChecks size={16} className="text-neutral-500" />
            উত্তর দেওয়া হয়েছে: <span className="font-bold text-white">{answeredCount}</span> / {examQuestions.length}
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-semibold transition-colors"
          >
            <Flag size={16} /> সাবমিট
          </button>
        </div>
      </div>

      {/* সব প্রশ্নের লিস্ট */}
      <div className="space-y-6">
        {examQuestions.map((q, qIndex) => (
          <div key={q.id} className="bg-[#1B1A18] border border-neutral-800 p-5 sm:p-6">
            <div className="flex items-start gap-4 mb-5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-800 text-red-500 font-bold text-sm shrink-0">
                {qIndex + 1}
              </span>
              <h2 className="text-lg text-neutral-100 font-medium leading-relaxed pt-1">
                {q.question}
              </h2>
            </div>

            <div className="space-y-2.5 pl-0 sm:pl-12">
              {q.options.map((option, oIndex) => {
                const isSelected = selectedAnswers[q.id] === option;
                return (
                  <button
                    key={oIndex}
                    onClick={() => handleOptionSelect(q.id, option)}
                    className={`w-full flex items-center gap-3 p-3 border text-left transition-all ${
                      isSelected
                        ? "bg-red-500/10 border-red-500/50 text-neutral-100"
                        : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/50"
                    }`}
                  >
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${
                      isSelected ? "bg-red-600 text-white" : "bg-neutral-800 text-neutral-400"
                    }`}>
                      {String.fromCharCode(65 + oIndex)}
                    </span>
                    <span className="text-sm">{option}</span>
                    {isSelected && <CheckCircle2 size={16} className="ml-auto text-red-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* নিচের সাবমিট বাটন (স্ক্রল করে নিচে গেলে দেখা যাবে) */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-sm font-semibold transition-colors shadow-lg"
        >
          <Flag size={18} /> পরীক্ষা শেষ করুন
        </button>
      </div>

      {/* কনফার্ম মডাল */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1B1A18] border border-neutral-800 p-6 max-w-md w-full space-y-5">
            <div className="flex items-center gap-3 text-yellow-500">
              <AlertCircle size={24} />
              <h3 className="text-lg font-semibold text-white">পরীক্ষা সাবমিট করবেন?</h3>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              আপনি {examQuestions.length} টির মধ্যে <span className="text-white font-bold">{answeredCount}</span> টি প্রশ্নের উত্তর দিয়েছেন। 
              নিশ্চিতভাবে সাবমিট করতে চাইলে নিচের বাটনে ক্লিক করুন।
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                বাতিল করুন
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 text-sm font-semibold transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    সাবমিট হচ্ছে...
                  </>
                ) : (
                  "হ্যাঁ, সাবমিট করুন"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;