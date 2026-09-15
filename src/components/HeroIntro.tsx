import React from 'react';
import { Feather, Heart, Sparkles, Wind, Sun, Compass } from 'lucide-react';

export const HeroIntro: React.FC = () => {
  return (
    <section className="relative overflow-hidden isolate rounded-3xl border-2 border-rose-200/80 dark:border-slate-800 bg-gradient-to-br from-rose-50/90 via-amber-50/70 to-sky-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 shadow-lg p-5 sm:p-8 lg:p-10 mb-8 sm:mb-10 transition-all duration-300 w-full max-w-full">
      
      {/* Decorative Summer Bokeh & Dreamy Accents */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-pink-300/25 dark:bg-pink-500/10 blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 -left-12 w-48 h-48 rounded-full bg-amber-200/30 dark:bg-amber-500/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 right-1/4 w-60 h-60 rounded-full bg-sky-200/30 dark:bg-sky-500/10 blur-2xl pointer-events-none" />

      {/* Decorative Floating Envelopes & Petals background SVG */}
      <div className="absolute top-3 right-4 opacity-40 dark:opacity-20 pointer-events-none select-none overflow-hidden">
        <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-gentle-float max-w-full">
          {/* Sakura Blossom Illustration */}
          <circle cx="150" cy="50" r="16" fill="#fbcfe8" />
          <circle cx="130" cy="40" r="14" fill="#fda4af" />
          <circle cx="170" cy="40" r="14" fill="#fda4af" />
          <circle cx="140" cy="65" r="13" fill="#f472b6" />
          <circle cx="160" cy="65" r="13" fill="#f472b6" />
          <circle cx="150" cy="50" r="6" fill="#fef08a" />
          {/* Gentle Branch */}
          <path d="M70 120 C 100 90, 130 70, 190 30" stroke="#a16207" strokeWidth="3" strokeLinecap="round" />
          <path d="M120 80 C 135 75, 145 60, 150 50" stroke="#a16207" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative z-10 w-full min-w-0">
        
        {/* Top Tagline & Concept Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-200 border border-rose-200/80 dark:border-rose-800/80 shadow-2xs">
            <span className="text-sm">🌸</span> Thanh xuân vườn trường
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border border-amber-200/80 dark:border-amber-800/80 shadow-2xs">
            <Sun className="w-3 h-3 text-amber-500" /> Mùa hè rực rỡ
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-200 border border-sky-200/80 dark:border-sky-800/80 shadow-2xs">
            <Wind className="w-3 h-3 text-sky-500" /> Bản dịch phi lợi nhuận
          </span>
        </div>

        {/* Blog Main Title */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h1 className="font-heading-romantic text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-rose-600 dark:text-rose-300 drop-shadow-xs">
              better and better
            </h1>
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse hidden sm:inline-block" />
          </div>
          <div className="h-0.5 w-24 bg-gradient-to-r from-rose-400 to-amber-300 dark:from-rose-500 dark:to-amber-400 rounded-full mt-2" />
        </div>

        {/* Intro Section Content */}
        <div className="bg-white/85 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl p-5 sm:p-7 lg:p-8 border border-rose-100 dark:border-slate-800 shadow-xs relative overflow-hidden">
          
          {/* Decorative stamp on top right */}
          <div className="absolute top-4 right-4 hidden sm:flex flex-col items-center justify-center w-14 h-16 rounded border-2 border-dashed border-rose-300 dark:border-rose-700/80 bg-rose-50/80 dark:bg-slate-800/90 rotate-6 select-none shadow-2xs pointer-events-none">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-400/50 mb-0.5" />
            <span className="text-[9px] font-cute text-rose-600 dark:text-rose-300 font-bold uppercase tracking-wider">Summer</span>
            <span className="text-[8px] text-slate-400 dark:text-slate-400">2026</span>
          </div>

          {/* Title: Xin chào, tớ là Mellifluous */}
          <div className="flex items-center gap-2 mb-1">
            <Feather className="w-5 h-5 text-rose-500 shrink-0" />
            <h2 className="font-heading-romantic text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Xin chào, tớ là Mellifluous
            </h2>
          </div>

          {/* Subtitle: ━ Một chiếc thuyền nhỏ lênh đênh ngược gió */}
          <div className="font-serif-dreamy text-base sm:text-lg font-semibold text-rose-600 dark:text-rose-300 mb-3 sm:pl-7 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-500 shrink-0" />
            <span>━ Một chiếc thuyền nhỏ lênh đênh ngược gió</span>
          </div>

          {/* Description */}
          <p className="font-serif-dreamy text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-4 sm:pl-7">
            Đây là trang phụ của tớ, đăng linh ta linh tinh. Đăng truyện song song với trang chính, cập nhật muộn và không thường xuyên, phòng ngừa trang chính bị khóa.
          </p>

          {/* Note in Italics */}
          <div className="sm:pl-7 pt-3 border-t border-rose-100 dark:border-slate-800">
            <p className="font-serif-dreamy italic text-xs sm:text-sm text-rose-800 dark:text-rose-200 bg-rose-50/70 dark:bg-rose-950/50 px-4 py-2.5 rounded-xl border-l-4 border-rose-400 dark:border-rose-500">
              * Truyện trong nhà được chuyển ngữ dưới sự cho phép của tác giả với mục đích phi lợi nhuận, sẽ có mật khẩu để đảm bảo công sức của tác giả lẫn dịch giả.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
