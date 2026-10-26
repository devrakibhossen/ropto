import {
  Plus,
  FileUp,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  hint?: string;
  icon: LucideIcon;
};

type QuizItem = {
  id: string;
  title: string;
  difficulty: string; // Subject এর জায়গায় Difficulty
  date: string;
  correct: number;
  total: number;
};

type LeaderboardItem = {
  rank: number;
  name: string;
  score: number;
  isCurrentUser?: boolean;
};

const Page = () => {
  const initial_history: QuizItem[] = [
    { id: "q1", title: "কোষ বিভাজন", difficulty: "সহজ", date: "2026-10-24", correct: 9, total: 10 },
    { id: "q2", title: "নিউটনের গতিসূত্র", difficulty: "মধ্যম", date: "2026-10-22", correct: 7, total: 10 },
    { id: "q3", title: "রাসায়নিক বন্ধন", difficulty: "কঠিন", date: "2026-10-20", correct: 12, total: 20 },
    { id: "q4", title: "ত্রিকোণমিতি পরিচিতি", difficulty: "সহজ", date: "2026-10-17", correct: 4, total: 10 },
    { id: "q5", title: "পদ ও পদের প্রকারভেদ", difficulty: "মধ্যম", date: "2026-10-15", correct: 18, total: 20 },
    { id: "q6", title: "মুক্তিযুদ্ধের ইতিহাস", difficulty: "কঠিন", date: "2026-10-12", correct: 8, total: 10 },
  ];

  const stats: Stat[] = [
    { label: "আপলোড করা ফাইল", value: 10, icon: FileUp, hint: "PDF ও বইয়ের ছবি" },
    { label: "তৈরি করা MCQ", value: 24, icon: Sparkles, hint: "এই মাসে ৮টি" },
    { label: "গড় স্কোর", value: 78, suffix: "%", icon: Target, hint: "সব mcq মিলিয়ে" },
    { label: "Retake করা হয়েছে", value: 12, icon: RotateCcw, hint: "ভুল প্রশ্ন আবার দেওয়া" },
  ];

  const leaderboard: LeaderboardItem[] = [
    { rank: 1, name: "Lamia Akter", score: 950 },
    { rank: 2, name: "রাকিব হোসেন", score: 880, isCurrentUser: true },
    { rank: 3, name: "তানভীর আহমেদ", score: 820 },
    { rank: 4, name: "Hasan", score: 120 },
  ];

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
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h3 className="text-neutral-100 text-2xl font-semibold">Welcome back, Rakib</h3>
        <button className="flex items-center justify-center gap-2 border border-neutral-600 bg-neutral-200 text-neutral-800 px-6 py-2 font-medium transition-colors w-full sm:w-auto shadow-sm hover:bg-white">
          <Plus size={18} />
          MCQ তৈরি করুন
        </button>
      </div>

      {/* স্ট্যাটস গ্রিড */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, suffix, hint, icon: Icon }) => (
          <div key={label} className="border border-neutral-800 p-4 bg-[#1B1A18]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400">{label}</p>
              <Icon className="h-4 w-4 text-neutral-500" aria-hidden="true" />
            </div>
            <h3 className="mt-3 text-3xl font-bold text-white">
              {formatNumber(value)}
              {suffix}
            </h3>
            {hint && <p className="mt-1 text-xs text-neutral-400">{hint}</p>}
          </div>
        ))}
      </div>

      {/* নিচের সেকশন (History, Quick Action এবং Leaderboard) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* বাম দিকের Recent History (২ কলাম) */}
        <div className="lg:col-span-2 border border-neutral-800 bg-[#1B1A18] p-5">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-semibold text-lg">সাম্প্রতিক কার্যক্রম</h4>
            <button className="text-sm text-red-500 hover:text-red-400 transition-colors">সব দেখুন</button>
          </div>
          <div className="space-y-3">
            {initial_history.slice(0, 4).map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between border-b border-neutral-800 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-neutral-200 text-sm font-medium">{quiz.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {/* Subject এর জায়গায় Difficulty ট্যাগ */}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-sm border ${getDifficultyStyle(quiz.difficulty)}`}>
                      {quiz.difficulty}
                    </span>
                    <span className="text-neutral-500 text-xs">• {quiz.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white font-semibold">
                    {formatNumber(quiz.correct)} / {formatNumber(quiz.total)}
                  </p>
                  <p className="text-xs text-neutral-500">স্কোর</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ডান দিকের Quick Action ও Leaderboard (১ কলাম) */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          
          {/* Leaderboard */}
          <div className="border border-neutral-800 bg-[#1B1A18] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={20} className="text-yellow-500" />
              <h4 className="text-white font-semibold text-lg">লিডারবোর্ড</h4>
            </div>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank} 
                  className={`flex items-center justify-between p-2 rounded-md ${
                    user.isCurrentUser ? "bg-neutral-800 border border-neutral-700" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      user.rank === 1 ? "bg-yellow-500 text-black" :
                      user.rank === 2 ? "bg-gray-300 text-black" :
                      user.rank === 3 ? "bg-amber-600 text-white" :
                      "bg-neutral-700 text-neutral-300"
                    }`}>
                      {user.rank}
                    </span>
                    <p className="text-sm text-neutral-200 font-medium">
                      {user.name} {user.isCurrentUser && <span className="text-xs text-red-400">(আপনি)</span>}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-neutral-300">{formatNumber(user.score)}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;