"use client";

import React from "react";
import { 
  Mail, 
  MapPin, 
  Calendar, 
  Edit3, 
  BookOpen, 
  Target, 
  Trophy, 
  Sparkles,
  ChevronRight
} from "lucide-react";

const ProfilePage = () => {
  // ডেমো ইউজার ডেটা
  const user = {
    name: "Rakib Hossen",
    email: "rakibhossen12@gmail.com",
    location: "Dhaka, Bangladesh",
    joinDate: "জানুয়ারি ২০২৫",
    bio: "শিক্ষার্থী এবং টেক এনথুসিয়াস্ট। প্রতিদিন নতুন কিছু শিখতে ভালোবাসি।",
    initials: "RH",
  };

  // ডেমো স্ট্যাটস
  const stats = [
    { label: "মোট MCQ", value: "২৪", icon: BookOpen },
    { label: "গড় স্কোর", value: "৭৮%", icon: Target },
    { label: "লিডারবোর্ড র‍্যাংক", value: "#২", icon: Trophy },
  ];

  // ডেমো সাম্প্রতিক কার্যক্রম
  const recentActivity = [
    { id: 1, title: "কোষ বিভাজন", score: "৯/১০", date: "২৪ অক্টো, ২০২৬" },
    { id: 2, title: "নিউটনের গতিসূত্র", score: "৭/১০", date: "২২ অক্টো, ২০২৬" },
    { id: 3, title: "রাসায়নিক বন্ধন", score: "১২/২০", date: "২০ অক্টো, ২০২৬" },
  ];

  return (
    <div className="lg:p-8 p-5 space-y-6">
      
      {/* প্রোফাইল কার্ড (হেডার) */}
      <div className="bg-[#1B1A18] border border-neutral-800 overflow-hidden">
        {/* কভার ফটো (ব্যাকগ্রাউন্ড) */}
        <div className="h-32 w-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 relative">
          {/* এখানে চাইলে একটি কভার ইমেজ বসাতে পারেন */}
        </div>

        <div className="px-5 sm:px-8 pb-6 relative">
          {/* প্রোফাইল ছবি এবং এডিট বাটন */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-neutral-800 border-4 border-[#1B1A18] flex items-center justify-center text-3xl font-bold text-neutral-400 shadow-lg z-10">
                {user.initials}
              </div>
              <div className="pb-1 sm:pb-2">
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-100">{user.name}</h1>
                <p className="text-sm text-neutral-400 flex items-center gap-1.5 mt-1">
                  <Mail size={14} /> {user.email}
                </p>
              </div>
            </div>
            
            <button className="flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-4 py-2 text-sm font-medium transition-colors border border-neutral-700 self-start sm:self-end mb-1">
              <Edit3 size={16} /> প্রোফাইল এডিট
            </button>
          </div>

          {/* বায়ো এবং অন্যান্য তথ্য */}
          <div className="mt-6 space-y-4">
            <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
              {user.bio}
            </p>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {user.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> যোগদান: {user.joinDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* স্ট্যাটস গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-[#1B1A18] border border-neutral-800 p-4 flex items-center gap-4">
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0">
              <Icon size={20} className="text-red-500" />
            </div>
            <div>
              <p className="text-xs text-neutral-400">{label}</p>
              <p className="text-xl font-bold text-white mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* সাম্প্রতিক কার্যক্রম */}
      <div className="bg-[#1B1A18] border border-neutral-800 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            <Sparkles size={18} className="text-red-500" />
            সাম্প্রতিক কার্যক্রম
          </h3>
          <button className="text-sm text-red-500 hover:text-red-400 transition-colors flex items-center gap-1">
            সব দেখুন <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="space-y-1">
          {recentActivity.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center justify-between p-3 hover:bg-neutral-900/50 transition-colors border-b border-neutral-800/50 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <div>
                  <p className="text-sm text-neutral-200 font-medium">{activity.title}</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">{activity.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-neutral-300">{activity.score}</p>
                <p className="text-[11px] text-neutral-500">স্কোর</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;