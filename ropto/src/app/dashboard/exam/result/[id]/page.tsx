"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Trophy, Target, RotateCcw, Home, CheckCircle2, XCircle, TrendingUp, Loader2, ListChecks
} from "lucide-react";

type ResultData = {
  score: number;
  total: number;
  correct: number;
  wrong: number;
  percentage: number;
};

const ResultPage = () => {
  const params = useParams();
  const router = useRouter();
  const attemptId = params.id as string;

  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // এখানে আপনার API কল হবে
    const fetchResult = async () => {
      setTimeout(() => {
        setResult({ score: 3, total: 5, correct: 3, wrong: 2, percentage: 60 });
        setIsLoading(false);
      }, 1000);
    };
    if (attemptId) fetchResult();
  }, [attemptId]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-neutral-400">
        <Loader2 className="animate-spin text-red-500 mb-4" size={32} />
        <p>ফলাফল লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!result) return <div className="text-center py-20 text-neutral-400">ফলাফল পাওয়া যায়নি।</div>;

  const getResultMessage = () => {
    if (result.percentage >= 80) return { msg: "অসাধারণ! আপনি দুর্দান্ত করেছেন।", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/30" };
    if (result.percentage >= 50) return { msg: "ভালো করেছেন! আরেকটু চেষ্টা করলেই পারবেন।", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/30" };
    return { msg: "চিন্তা করবেন না! আবার চেষ্টা করুন।", color: "text-red-500", bg: "bg-red-500/10 border-red-500/30" };
  };

  const resultMsg = getResultMessage();

  return (
    <div className="lg:p-8 p-5 max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2 pt-4">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-neutral-800/50 rounded-full border border-neutral-700">
            <Trophy size={48} className={result.percentage >= 80 ? "text-yellow-500" : result.percentage >= 50 ? "text-gray-300" : "text-amber-600"} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-neutral-100">পরীক্ষার ফলাফল</h1>
      </div>

      <div className={`border p-6 sm:p-8 text-center ${resultMsg.bg}`}>
        <p className={`text-sm font-medium mb-2 ${resultMsg.color}`}>{resultMsg.msg}</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-5xl sm:text-6xl font-bold text-white">{result.correct}</span>
          <span className="text-2xl text-neutral-500 font-medium">/ {result.total}</span>
        </div>
        <p className="text-neutral-400 text-sm mt-3">আপনি <span className="font-bold text-white">{result.percentage}%</span> নম্বর পেয়েছেন</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#1B1A18] border border-neutral-800 p-4 flex flex-col items-center justify-center text-center">
          <Target className="text-blue-500 mb-2" size={24} />
          <p className="text-2xl font-bold text-white">{result.total}</p>
          <p className="text-xs text-neutral-400 mt-1">মোট প্রশ্ন</p>
        </div>
        <div className="bg-[#1B1A18] border border-neutral-800 p-4 flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="text-emerald-500 mb-2" size={24} />
          <p className="text-2xl font-bold text-emerald-500">{result.correct}</p>
          <p className="text-xs text-neutral-400 mt-1">সঠিক উত্তর</p>
        </div>
        <div className="bg-[#1B1A18] border border-neutral-800 p-4 flex flex-col items-center justify-center text-center">
          <XCircle className="text-red-500 mb-2" size={24} />
          <p className="text-2xl font-bold text-red-500">{result.wrong}</p>
          <p className="text-xs text-neutral-400 mt-1">ভুল উত্তর</p>
        </div>
      </div>

      {/* নতুন: See Result বাটন যা আলাদা পেজে নিয়ে যাবে */}
      <button
        onClick={() => router.push(`/dashboard/exam/details/${attemptId}`)}
        className="w-full flex items-center justify-center gap-2 bg-[#1B1A18] border border-neutral-800 p-4 text-neutral-200 hover:bg-neutral-800/50 transition-colors font-medium"
      >
        <ListChecks size={18} className="text-red-500" />
        See Result (বিস্তারিত উত্তরপত্র দেখুন)
      </button>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={() => router.push("/dashboard/exam")}
          className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-sm font-semibold transition-colors"
        >
          <RotateCcw size={18} /> আবার পরীক্ষা দিন
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="flex-1 flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-6 py-3 text-sm font-semibold transition-colors border border-neutral-700"
        >
          <Home size={18} /> ড্যাশবোর্ডে ফিরে যান
        </button>
      </div>
    </div>
  );
};

export default ResultPage;