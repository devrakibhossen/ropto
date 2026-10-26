const Hero = () => {
  return (
    <section 
      className="w-full pt-24 pb-20 flex flex-col items-center justify-center text-center px-4 relative"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '70px 70px'
      }}
    >
      
      <div className="mb-8 relative z-10">
        <div className="inline-flex items-center gap-2  border border-neutral-800 hover:border-gray-300 transition-colors px-2 py-1.5 text-xs font-medium text-neutral-200 shadow-sm">
          <span className="bg-red-600 text-white text-[8px] px-2 py-0.5  uppercase tracking-wide">
            New
          </span>
          <span className="font-serif font-normal italic">এআই এমসিকিউ জেনারেশন এসে গেছে!</span>
        </div>
      </div>

      <h1 className="relative z-10 lg:text-5xl text-4xl font-serif font-bold italic tracking-tight text-white leading-[1.4] md:leading-[1.5] max-w-4xl mx-auto mb-6">
         আপনার সাধারণ docs বা Image কে<br/>এমসিকিউতে Convert করুন
        <span className="text-red-600"> তাৎক্ষণিকভাবে ।</span>
      </h1>

      {/* টেক্সট কালার white/neutral-400 করা হয়েছে যাতে ডার্ক ব্যাকগ্রাউন্ডে পড়া যায় */}
      <p className="relative z-10 text-sm mb-10 max-w-2xl mx-auto leading-relaxed text-neutral-300">
        যেকোনো ডকুমেন্টকে একটি কার্যকর শেখার অভিজ্ঞতায় রূপান্তর করুন। আপনার পিডিএফ (PDF), নোট বা পড়াশোনার উপকরণ আপলোড করুন এবং এআই (AI)-এর মাধ্যমে তাৎক্ষণিকভাবে ইন্টারঅ্যাক্টিভ কুইজ তৈরি করে নিন। এটি শিক্ষার্থী, শিক্ষক এবং আজীবন জ্ঞানপিপাসুদের জন্য তৈরি করা হয়েছে, যারা দ্রুত শিখতে এবং অর্জিত জ্ঞান দীর্ঘস্থায়ীভাবে মনে রাখতে চান।
      </p>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white px-6 py-2 font-medium transition-colors w-full sm:w-auto shadow-md">
          বিনামূল্যে শুরু করুন
        </button>

        <button className="flex items-center justify-center gap-2 border border-neutral-600 bg-neutral-200 text-neutral-800 px-6 py-2 font-medium transition-colors w-full sm:w-auto shadow-sm">
          যেভাবে কাজ করে
        </button>
      </div>
    </section>
  );
};

export default Hero;