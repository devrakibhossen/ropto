"use client";

import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Save, 
  Camera,
  ShieldCheck,
  Moon
} from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // প্রোফাইল ফর্ম স্টেট (ডেমো)
  const [name, setName] = useState("Rakib Hossen");
  const [email, setEmail] = useState("rakibhossen12@gmail.com");


  // সেভ বাটন হ্যান্ডলার
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  // ট্যাব কনটেন্ট রেন্ডার
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-300">
            {/* প্রোফাইল ছবি */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-neutral-800">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center text-2xl font-bold text-neutral-400 overflow-hidden">
                  RH {/* ছবি না থাকলে ইনিশিয়াল */}
                </div>
                <button type="button" className="absolute bottom-0 right-0 p-1.5 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors shadow-sm">
                  <Camera size={14} />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-neutral-200 font-medium">প্রোফাইল ছবি</h3>
                <p className="text-xs text-neutral-500 mt-1">JPG, PNG অথবা GIF (সর্বোচ্চ ২MB)</p>
              </div>
            </div>

            {/* নাম এবং ইমেইল */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <User size={12} /> পুরো নাম
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm px-3 py-2.5 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <Mail size={12} /> ইমেইল অ্যাড্রেস
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm px-3 py-2.5 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            {/* বায়ো */}
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400">বায়ো (সংক্ষিপ্ত পরিচিতি)</label>
              <textarea
                rows={3}
                placeholder="আপনার সম্পর্কে কিছু লিখুন..."
                className="w-full bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm px-3 py-2.5 focus:outline-none focus:border-red-500 transition-colors resize-none"
              ></textarea>
            </div>

            {/* সেভ বাটন */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold transition-all ${
                  isSaving ? "bg-red-500/80 text-white cursor-wait" : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    সেভ হচ্ছে...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    পরিবর্তন সেভ করুন
                  </>
                )}
              </button>
            </div>
          </form>
        );

      case "security":
        return (
          <form onSubmit={handleSave} className="space-y-5 animate-in fade-in duration-300">
            <div className="bg-neutral-900/50 border border-neutral-800 p-4 flex items-start gap-3 mb-6">
              <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm text-neutral-200 font-medium">আপনার অ্যাকাউন্ট সুরক্ষিত আছে</p>
                <p className="text-xs text-neutral-500 mt-1">শেষবার পাসওয়ার্ড পরিবর্তন করা হয়েছে ২ মাস আগে।</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400 flex items-center gap-1.5">
                <Lock size={12} /> বর্তমান পাসওয়ার্ড
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm px-3 py-2.5 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <Lock size={12} /> নতুন পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm px-3 py-2.5 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <Lock size={12} /> নতুন পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm px-3 py-2.5 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-all"
              >
                <Save size={16} />
                পাসওয়ার্ড আপডেট করুন
              </button>
            </div>
          </form>
        );

      case "appearance":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-sm text-neutral-200 font-medium mb-3">থিম সিলেক্ট করুন</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* ডার্ক থিম */}
                <button
                  className="border-2 border-red-500 bg-[#1B1A18] p-4 flex flex-col items-center justify-center gap-2 relative"
                >
                  <Moon size={24} className="text-neutral-300" />
                  <span className="text-sm text-neutral-200">ডার্ক (ডিফল্ট)</span>
                  <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full" />
                </button>
                {/* লাইট থিম (ডিজেবল করা আছে) */}
                <button
                  disabled
                  className="border border-neutral-800 bg-neutral-900/30 p-4 flex flex-col items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-neutral-600" />
                  <span className="text-sm text-neutral-500">লাইট (শীঘ্রই আসছে)</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="lg:p-8 p-5  space-y-6">
      {/* হেডার */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-100">সেটিংস</h1>
        <p className="text-sm text-neutral-400 mt-1">
          আপনার অ্যাকাউন্ট এবং অ্যাপ্লিকেশন সেটিংস এখান থেকে পরিচালনা করুন।
        </p>
      </div>

      {/* সাকসেস মেসেজ */}
      {showSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm p-3 flex items-center gap-2">
          <ShieldCheck size={16} /> সফলভাবে সেভ হয়েছে!
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* সাইড ট্যাব মেনু */}
        <div className="w-full md:w-64 shrink-0">
          <div className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap border-l-2 ${
                activeTab === "profile"
                  ? "bg-[#1B1A18] text-red-500 border-red-500"
                  : "text-neutral-400 border-transparent hover:bg-[#1B1A18]/50 hover:text-neutral-200"
              }`}
            >
              <User size={18} /> প্রোফাইল
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap border-l-2 ${
                activeTab === "security"
                  ? "bg-[#1B1A18] text-red-500 border-red-500"
                  : "text-neutral-400 border-transparent hover:bg-[#1B1A18]/50 hover:text-neutral-200"
              }`}
            >
              <ShieldCheck size={18} /> সিকিউরিটি
            </button>

            <button
              onClick={() => setActiveTab("appearance")}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap border-l-2 ${
                activeTab === "appearance"
                  ? "bg-[#1B1A18] text-red-500 border-red-500"
                  : "text-neutral-400 border-transparent hover:bg-[#1B1A18]/50 hover:text-neutral-200"
              }`}
            >
              <Moon size={18} /> অ্যাপিয়ারেন্স
            </button>
          </div>
        </div>

        {/* কনটেন্ট এরিয়া */}
        <div className="flex-1 bg-[#1B1A18] border border-neutral-800 p-5 sm:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;