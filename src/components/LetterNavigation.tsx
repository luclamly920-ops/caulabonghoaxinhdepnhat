import React from 'react';
import { Mail, CheckCircle2, Clock, Key, HeartHandshake, Code } from 'lucide-react';

interface LetterNavigationProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  completedCount: number;
  ongoingCount: number;
  passwordCount: number;
  onOpenBloggerCode: () => void;
}

export const LetterNavigation: React.FC<LetterNavigationProps> = ({
  currentTab,
  onSelectTab,
  completedCount,
  ongoingCount,
  passwordCount,
  onOpenBloggerCode,
}) => {
  const letters = [
    {
      id: 'completed',
      title: 'Truyện đã hoàn thành',
      subtitle: 'Trọn vẹn 100% bản dịch',
      icon: CheckCircle2,
      badgeText: `${completedCount} bộ`,
      bgGradient: 'from-pink-50/90 via-rose-50 to-pink-100/80 dark:from-slate-900 dark:via-rose-950/40 dark:to-slate-900',
      borderAccent: 'border-rose-200 dark:border-rose-800/80',
      textColor: 'text-rose-950 dark:text-rose-100',
      accentColor: 'text-rose-600 dark:text-rose-300',
      tapeColor: 'bg-rose-300/80 dark:bg-rose-800/80',
      stamp: '🌸',
      stampLabel: 'HE · END',
    },
    {
      id: 'ongoing',
      title: 'Truyện chưa hoàn thành',
      subtitle: 'Đang ra chương mới tuần này',
      icon: Clock,
      badgeText: `${ongoingCount} bộ`,
      bgGradient: 'from-emerald-50/90 via-teal-50 to-green-100/70 dark:from-slate-900 dark:via-emerald-950/40 dark:to-slate-900',
      borderAccent: 'border-emerald-200 dark:border-emerald-800/80',
      textColor: 'text-emerald-950 dark:text-emerald-100',
      accentColor: 'text-emerald-600 dark:text-emerald-300',
      tapeColor: 'bg-emerald-300/80 dark:bg-emerald-800/80',
      stamp: '🍃',
      stampLabel: 'ONGOING',
    },
    {
      id: 'password',
      title: 'Password',
      subtitle: 'Gợi ý giải đố & Pass chương',
      icon: Key,
      badgeText: `${passwordCount} gợi ý`,
      bgGradient: 'from-sky-50/90 via-blue-50 to-indigo-100/70 dark:from-slate-900 dark:via-sky-950/40 dark:to-slate-900',
      borderAccent: 'border-sky-200 dark:border-sky-800/80',
      textColor: 'text-sky-950 dark:text-sky-100',
      accentColor: 'text-sky-600 dark:text-sky-300',
      tapeColor: 'bg-sky-300/80 dark:bg-sky-800/80',
      stamp: '🔑',
      stampLabel: 'HINT · KEY',
    },
    {
      id: 'other',
      title: 'Một số mục khác',
      subtitle: 'Lưu bút, tâm sự & hỏi đáp',
      icon: HeartHandshake,
      badgeText: 'Góc nhỏ',
      bgGradient: 'from-amber-50/90 via-yellow-50 to-orange-100/70 dark:from-slate-900 dark:via-amber-950/40 dark:to-slate-900',
      borderAccent: 'border-amber-200 dark:border-amber-800/80',
      textColor: 'text-amber-950 dark:text-amber-100',
      accentColor: 'text-amber-600 dark:text-amber-300',
      tapeColor: 'bg-amber-300/80 dark:bg-amber-800/80',
      stamp: '💌',
      stampLabel: 'MEMO',
    },
  ];

  return (
    <div className="mb-10 sm:mb-12 w-full">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-rose-500 animate-bounce" />
          <h2 className="font-heading-romantic text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Những Lá Thư Chuyển Hướng
          </h2>
          <span className="text-xs font-cute text-rose-600 dark:text-rose-300 hidden sm:inline">
            (Bấm vào từng lá thư để mở chuyên mục)
          </span>
        </div>

        {/* Shortcut to code for blogger */}
        <button
          onClick={onOpenBloggerCode}
          className="text-xs font-medium text-emerald-700 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 transition-all flex items-center gap-1.5 shadow-xs"
        >
          <Code className="w-3.5 h-3.5" />
          <span>Lấy Code Cho Blogger Free</span>
        </button>
      </div>

      {/* Letters Grid - Clean, symmetrical, responsive on iPad and Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 w-full">
        {letters.map((letter) => {
          const Icon = letter.icon;
          const isSelected = currentTab === letter.id;

          return (
            <div
              key={letter.id}
              onClick={() => onSelectTab(letter.id)}
              className={`group cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'ring-2 ring-rose-400 dark:ring-rose-500 shadow-md -translate-y-1'
                  : 'hover:-translate-y-1 hover:shadow-md'
              } rounded-2xl w-full`}
            >
              {/* Envelope / Note Card Body */}
              <div
                className={`relative rounded-2xl border-2 ${letter.borderAccent} bg-gradient-to-b ${letter.bgGradient} p-4 sm:p-6 shadow-xs transition-all overflow-hidden flex flex-col justify-between min-h-[175px] h-full w-full`}
              >
                {/* Washi Tape / Decorative Masking Tape on top */}
                <div
                  className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 ${letter.tapeColor} opacity-90 rounded-xs shadow-2xs pointer-events-none`}
                />

                {/* Top Row: Stamp & Badge */}
                <div className="flex items-start justify-between mb-3 gap-2 w-full">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl bg-white/95 dark:bg-slate-800 shadow-xs border border-white/80 dark:border-slate-700 flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${letter.accentColor}`} />
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 truncate block">
                      {letter.badgeText}
                    </span>
                  </div>

                  {/* Postage Stamp */}
                  <div className="flex flex-col items-center justify-center w-8 h-10 sm:w-9 sm:h-11 shrink-0 bg-white/95 dark:bg-slate-800 border border-dashed border-rose-300 dark:border-slate-600 rounded-sm shadow-2xs select-none">
                    <span className="text-xs sm:text-sm leading-none">{letter.stamp}</span>
                    <span className="text-[7px] font-mono font-bold tracking-tighter text-slate-500 dark:text-slate-400 mt-0.5">
                      {letter.stampLabel}
                    </span>
                  </div>
                </div>

                {/* Center Title & Concept */}
                <div className="my-2">
                  <h3 className={`font-serif-dreamy text-base sm:text-lg font-bold ${letter.textColor} group-hover:underline decoration-rose-400 underline-offset-4 transition-all leading-snug line-clamp-1`}>
                    {letter.title}
                  </h3>
                  <p className="font-serif-dreamy text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1 leading-normal line-clamp-2">
                    {letter.subtitle}
                  </p>
                </div>

                {/* Bottom Action Note */}
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/70 flex items-center justify-between text-xs mt-2">
                  <span className="font-cute text-slate-500 dark:text-slate-400 text-[11px]">
                    {isSelected ? '✓ Đang xem mục này' : 'Bấm để mở thư ➔'}
                  </span>
                  <span className="text-xs opacity-70">💌</span>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
