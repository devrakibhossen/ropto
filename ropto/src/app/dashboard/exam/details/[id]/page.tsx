"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, CheckCircle2, XCircle, Loader2, BookOpen, Lightbulb
} from "lucide-react";

type QuestionResult = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer: string | null;
  isCorrect: boolean;
  explanation: string; // নতুন: ব্যাখ্যা
};

const DetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const attemptId = params.id as string;

  const [questions, setQuestions] = useState<QuestionResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // এখানে আপনার API কল হবে: fetch(`/api/results/${attemptId}/details`)
    const fetchDetails = async () => {
      setTimeout(() => {
        const demoData: QuestionResult[] = [
          {
            id: 1,
            question: "কোষ বিভাজনের কোন ধাপে ক্রোমোজোমের সংখ্যা অর্ধেক হয়?",
            options: ["মাইটোসিস", "মায়োসিস", "অ্যামাইটোসিস", "সাইটোকাইনেসিস"],
            correctAnswer: "মায়োসিস",
            userAnswer: "মায়োসিস",
            isCorrect: true,
            explanation: "মায়োসিস প্রক্রিয়ায় একটি ডিপ্লয়েড (2n) কোষ থেকে চারটি হ্যাপ্লয়েড (n) কোষ তৈরি হয়। এর ফলে ক্রোমোজোমের সংখ্যা অর্ধেক হয়ে যায়। এটি জনন কোষ সৃষ্টির জন্য প্রয়োজনীয়।"
          },
          {
            id: 2,
            question: "নিউটনের দ্বিতীয় সূত্র অনুযায়ী বলের একক কী?",
            options: ["জুল", "ওয়াট", "নিউটন", "প্যাসকেল"],
            correctAnswer: "নিউটন",
            userAnswer: "জুল",
            isCorrect: false,
            explanation: "নিউটনের দ্বিতীয় সূত্র অনুযায়ী, বল = ভর × ত্বরণ। ভরের একক কেজি এবং ত্বরণের একক মিটার/সেকেন্ড² হলে বলের একক হয় কেজি·মিটার/সেকেন্ড², যা 'নিউটন' নামে পরিচিত। অন্যদিকে, জুল হলো কাজ বা শক্তির একক।"
          },
          {
            id: 3,
            question: "পানির রাসায়নিক সংকেত কোনটি?",
            options: ["H2O2", "CO2", "H2O", "NaCl"],
            correctAnswer: "H2O",
            userAnswer: "H2O",
            isCorrect: true,
            explanation: "পানির অণুতে দুটি হাইড্রোজেন (H) পরমাণু এবং একটি অক্সিজেন (O) পরমাণু থাকে। তাই এর রাসায়নিক সংকেত H2O। H2O2 হলো হাইড্রোজেন পারঅক্সাইড, CO2 কার্বন ডাইঅক্সাইড এবং NaCl হলো খাবার লবণ।"
          },
          {
            id: 4,
            question: "'সোনার তরী' কবিতাটি কার লেখা?",
            options: ["কাজী নজরুল ইসলাম", "রবীন্দ্রনাথ ঠাকুর", "জসীম উদ্‌দীন", "জীবনানন্দ দাশ"],
            correctAnswer: "রবীন্দ্রনাথ ঠাকুর",
            userAnswer: "রবীন্দ্রনাথ ঠাকুর",
            isCorrect: true,
            explanation: "'সোনার তরী' কবিতাটি বিশ্বকবি রবীন্দ্রনাথ ঠাকুর রচিত। এটি তাঁর 'সোনার তরী' কাব্যগ্রন্থের অন্তর্গত একটি বিখ্যাত কবিতা, যেখানে কবি জীবনের চূড়ান্ত বিচারের কথা ব্যক্ত করেছেন।"
          },
          {
            id: 5,
            question: "বাংলাদেশের জাতীয় ফুল কোনটি?",
            options: ["গোলাপ", "শাপলা", "জবা", "পদ্ম"],
            correctAnswer: "শাপলা",
            userAnswer: "গোলাপ",
            isCorrect: false,
            explanation: "বাংলাদেশের জাতীয় ফুল হলো 'শাপলা' (সাদা শাপলা)। এটি দেশের জলাশয়ে সহজলভ্য এবং জাতীয় প্রতীকের অংশ হিসেবে স্বীকৃত। গোলাপ একটি সাধারণ ফুল, কিন্তু জাতীয় ফুল নয়।"
          },
        ];
        setQuestions(demoData);
        setIsLoading(false);
      }, 1000);
    };
    if (attemptId) fetchDetails();
  }, [attemptId]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-neutral-400">
        <Loader2 className="animate-spin text-red-500 mb-4" size={32} />
        <p>বিস্তারিত লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="lg:p-8 p-5 max-w-4xl mx-auto space-y-6">
      {/* হেডার */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-neutral-800 rounded-md transition-colors text-neutral-400 hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-100 flex items-center gap-2">
            <BookOpen className="text-red-500" size={24} />
            বিস্তারিত উত্তরপত্র
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            অ্যাটেম্পট আইডি: <span className="font-mono text-neutral-300">{attemptId}</span>
          </p>
        </div>
      </div>

      {/* প্রশ্নের লিস্ট */}
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-[#1B1A18] border border-neutral-800 p-4 sm:p-5">
            <div className="flex items-start gap-3 mb-4">
              <span className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${
                q.isCorrect ? "bg-emerald-500/20 text-emerald-500" : "bg-red-500/20 text-red-500"
              }`}>
                {index + 1}
              </span>
              <h3 className="text-sm sm:text-[15px] text-neutral-100 font-medium leading-relaxed pt-1">
                {q.question}
              </h3>
            </div>

            <div className="space-y-2 pl-0 sm:pl-10">
              {q.options.map((option, oIndex) => {
                const isCorrectOption = option === q.correctAnswer;
                const isUserSelected = option === q.userAnswer;

                let optionClass = "bg-neutral-900 border-neutral-800 text-neutral-400";
                if (isCorrectOption) optionClass = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
                else if (isUserSelected && !isCorrectOption) optionClass = "bg-red-500/10 border-red-500/30 text-red-400";

                return (
                  <div key={oIndex} className={`flex items-center gap-3 text-sm p-2.5 border ${optionClass}`}>
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-neutral-800 text-[11px] font-bold shrink-0">
                      {String.fromCharCode(65 + oIndex)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {isCorrectOption && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
                    {isUserSelected && !isCorrectOption && <XCircle size={16} className="text-red-500 shrink-0" />}
                  </div>
                );
              })}
            </div>

            {!q.isCorrect && (
              <div className="mt-3 pl-0 sm:pl-10 text-xs text-neutral-400">
                আপনার উত্তর: <span className="text-red-400">{q.userAnswer || "দেওয়া হয়নি"}</span> • 
                সঠিক উত্তর: <span className="text-emerald-400">{q.correctAnswer}</span>
              </div>
            )}

            {/* নতুন: Explanation (ব্যাখ্যা) */}
            <div className="mt-4 pl-0 sm:pl-10">
              <div className="flex items-start gap-2 bg-neutral-900/60 border border-neutral-800 p-3">
                <Lightbulb size={16} className="text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-semibold text-yellow-500/80 uppercase tracking-wide mb-1">
                    ব্যাখ্যা
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* নিচের বাটন */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-6 py-2.5 text-sm font-semibold transition-colors border border-neutral-700"
        >
          ড্যাশবোর্ডে ফিরে যান
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;