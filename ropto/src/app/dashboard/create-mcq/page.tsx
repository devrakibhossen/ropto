"use client";

import React, { useState, useRef } from "react";
import { 
  UploadCloud, 
  FileText, 
  X, 
  Sparkles, 
  ChevronDown, 
  BookOpen, 
  Hash, 
  Wand2,
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react";
import { useRouter } from "next/navigation";

const CreateMCQPage = () => {
  const router = useRouter();
  // স্টেট: একটি PDF অথবা একাধিক ইমেজের জন্য
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // চেক করা হচ্ছে কোনো ফাইল আপলোড করা আছে কি না
  const hasPdf = !!pdfFile;
  const hasImages = imageFiles.length > 0;
  const hasAnyFile = hasPdf || hasImages;

  // PDF ফাইল হ্যান্ডলার
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        return alert("অনুগ্রহ করে শুধুমাত্র PDF ফাইল আপলোড করুন।");
      }
      // যদি আগে থেকে ইমেজ থাকে, তবে ইমেজ ক্লিয়ার করে দিবে
      if (hasImages) {
        setImageFiles([]);
      }
      setPdfFile(file);
    }
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  };

  // ইমেজ ফাইল হ্যান্ডলার (সর্বোচ্চ ১০টি)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validImages = newFiles.filter(file => file.type.startsWith("image/"));
      
      if (validImages.length !== newFiles.length) {
        alert("কিছু ফাইল বাদ পড়েছে কারণ সেগুলো ইমেজ নয়।");
      }

      if (imageFiles.length + validImages.length > 10) {
        return alert("আপনি সর্বোচ্চ ১০টি ইমেজ আপলোড করতে পারবেন।");
      }

      // যদি আগে থেকে PDF থাকে, তবে PDF ক্লিয়ার করে দিবে
      if (hasPdf) {
        setPdfFile(null);
      }

      setImageFiles((prev) => [...prev, ...validImages]);
    }
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  // ড্র্যাগ অ্যান্ড ড্রপ হ্যান্ডলার
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    const pdfs = files.filter(f => f.type === "application/pdf");
    const images = files.filter(f => f.type.startsWith("image/"));

    // যদি একসাথে PDF এবং ইমেজ ড্রপ করা হয়
    if (pdfs.length > 0 && images.length > 0) {
      return alert("আপনি একসাথে PDF এবং ইমেজ আপলোড করতে পারবেন না। যেকোনো একটি বেছে নিন।");
    }

    // শুধু PDF হ্যান্ডলিং
    if (pdfs.length > 0) {
      if (hasPdf) {
        alert("আপনি ইতিমধ্যে একটি PDF আপলোড করেছেন।");
      } else {
        setImageFiles([]); // ইমেজ ক্লিয়ার
        setPdfFile(pdfs[0]);
      }
    }

    // শুধু ইমেজ হ্যান্ডলিং
    if (images.length > 0) {
      if (imageFiles.length + images.length > 10) {
        alert("আপনি সর্বোচ্চ ১০টি ইমেজ আপলোড করতে পারবেন।");
      } else {
        setPdfFile(null); // PDF ক্লিয়ার
        setImageFiles((prev) => [...prev, ...images]);
      }
    }
  };

  // ফাইল রিমুভ হ্যান্ডলার
  const removePdf = () => setPdfFile(null);
  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ফর্ম সাবমিট
  const handleGenerate = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!hasAnyFile) {
    return alert("অনুগ্রহ করে আগে একটি PDF অথবা ইমেজ আপলোড করুন।");
  }

  setIsGenerating(true);
  
  // ডেমো লোডিং সিমুলেশন (আসল API কল এখানে বসবে)
  setTimeout(() => {
    setIsGenerating(false);
    
    // MCQ জেনারেট হওয়ার পর সরাসরি এক্সাম পেজে রিডাইরেক্ট
    router.push("/dashboard/exam/1");
  }, 2500);
};

  return (
    <div className="lg:p-8 p-5 space-y-6">
      {/* হেডার */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-100 flex items-center gap-2">
          <Sparkles className="text-red-500" size={24} />
          নতুন MCQ তৈরি করুন
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          আপনার পড়ার বই বা নোট আপলোড করুন, AI মুহূর্তেই প্রশ্ন তৈরি করে দিবে।
        </p>
      </div>

      {/* মেইন ফর্ম কার্ড */}
      <form onSubmit={handleGenerate} className="bg-[#1B1A18] border border-neutral-800 p-5 sm:p-6 space-y-6">
        
        {/* স্টেপ ১: ফাইল আপলোড */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-neutral-200 flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 text-red-500 text-xs font-bold">১</span>
            সোর্স ফাইল আপলোড করুন
          </label>
          
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-neutral-700 bg-neutral-900/50 p-6 flex flex-col items-center justify-center text-center"
          >
            <UploadCloud size={36} className="text-neutral-500 mb-3" />
            <p className="text-neutral-300 text-sm font-medium mb-1">ফাইল ড্র্যাগ করে এখানে ছেড়ে দিন</p>
            <p className="text-neutral-500 text-xs mb-4">(PDF অথবা ইমেজ, একসাথে দুটি নয়)</p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
              {/* PDF আপলোড বাটন (ইমেজ থাকলে ডিজেবল) */}
              <button
                type="button"
                onClick={() => pdfInputRef.current?.click()}
                disabled={hasImages || hasPdf}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm border transition-colors ${
                  hasImages || hasPdf
                    ? "bg-neutral-800/50 border-neutral-800 text-neutral-600 cursor-not-allowed" 
                    : "bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700"
                }`}
              >
                <FileText size={16} /> PDF (১টি)
              </button>
              
              {/* ইমেজ আপলোড বাটন (PDF থাকলে ডিজেবল) */}
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                disabled={hasPdf || imageFiles.length >= 10}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm border transition-colors ${
                  hasPdf || imageFiles.length >= 10
                    ? "bg-neutral-800/50 border-neutral-800 text-neutral-600 cursor-not-allowed" 
                    : "bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700"
                }`}
              >
                <ImageIcon size={16} /> ইমেজ ({imageFiles.length}/১০)
              </button>
            </div>
          </div>

          {/* হিডেন ইনপুট */}
          <input type="file" ref={pdfInputRef} onChange={handlePdfChange} accept=".pdf" className="hidden" />
          <input type="file" ref={imageInputRef} onChange={handleImageChange} accept="image/*" multiple className="hidden" />

          {/* ফাইল লিস্ট */}
          {(pdfFile || imageFiles.length > 0) && (
            <div className="space-y-2 mt-4">
              <p className="text-xs text-neutral-400 font-medium mb-2">আপলোড করা ফাইল:</p>
              
              {pdfFile && (
                <div className="flex items-center justify-between bg-neutral-900 border border-neutral-700 p-2.5">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-1.5 bg-red-500/10 rounded-md shrink-0">
                      <FileText size={16} className="text-red-400" />
                    </div>
                    <div className="truncate">
                      <p className="text-sm text-neutral-200 font-medium truncate">{pdfFile.name}</p>
                      <p className="text-[11px] text-neutral-500">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB • PDF</p>
                    </div>
                  </div>
                  <button type="button" onClick={removePdf} className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-neutral-800 rounded-md transition-colors">
                    <X size={16} />
                  </button>
                </div>
              )}

              {imageFiles.map((img, index) => (
                <div key={index} className="flex items-center justify-between bg-neutral-900 border border-neutral-700 p-2.5">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-1.5 bg-blue-500/10 rounded-md shrink-0">
                      <ImageIcon size={16} className="text-blue-400" />
                    </div>
                    <div className="truncate">
                      <p className="text-sm text-neutral-200 font-medium truncate">{img.name}</p>
                      <p className="text-[11px] text-neutral-500">{(img.size / 1024 / 1024).toFixed(2)} MB • Image</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeImage(index)} className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-neutral-800 rounded-md transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-px bg-neutral-800 w-full" />

        {/* স্টেপ ২: সেটিংস */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-neutral-200 flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 text-red-500 text-xs font-bold">২</span>
            প্রশ্নের ধরন সেট করুন
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400 flex items-center gap-1.5">
                <BookOpen size={12} /> ভাষা (Language)
              </label>
              <div className="relative">
                <select className="w-full appearance-none bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm px-3 py-2.5 focus:outline-none focus:border-red-500 transition-colors">
                  <option value="bangla">বাংলা (Bangla)</option>
                  <option value="english">English</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400 flex items-center gap-1.5">
                <Hash size={12} /> প্রশ্নের সংখ্যা
              </label>
              <div className="relative">
                <select className="w-full appearance-none bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm px-3 py-2.5 focus:outline-none focus:border-red-500 transition-colors">
                  <option>১০ টি</option>
                  <option>২০ টি</option>
                  <option>৩০ টি</option>
                  <option>৫০ টি</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400 flex items-center gap-1.5">
                <Wand2 size={12} /> কঠিনতা (Difficulty)
              </label>
              <div className="relative">
                <select className="w-full appearance-none bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm px-3 py-2.5 focus:outline-none focus:border-red-500 transition-colors">
                  <option>সহজ (Easy)</option>
                  <option>মধ্যম (Medium)</option>
                  <option>কঠিন (Hard)</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* সাবমিট বাটন */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!hasAnyFile || isGenerating}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-all shadow-sm ${
              !hasAnyFile
                ? "bg-neutral-800 text-neutral-500 cursor-not-allowed" 
                : isGenerating 
                  ? "bg-red-500/80 text-white cursor-wait" 
                  : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                MCQ তৈরি হচ্ছে...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 size={18} />
                সফলভাবে তৈরি হয়েছে!
              </>
            ) : (
              <>
                <Sparkles size={18} />
                MCQ জেনারেট করুন
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateMCQPage;