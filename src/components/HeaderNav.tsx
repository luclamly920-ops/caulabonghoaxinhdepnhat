import React, { useState } from 'react';
import { Search, Sun, Moon, Sparkles, BookOpen, KeyRound, Heart, Home, Code2, Music } from 'lucide-react';

interface HeaderNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  sakuraEnabled: boolean;
  onToggleSakura: () => void;
  onOpenBloggerCode: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTab,
  onSelectTab,
  isDarkMode,
  onToggleTheme,
  onOpenSearch,
  sakuraEnabled,
  onToggleSakura,
  onOpenBloggerCode,
}) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // Gentle audio chime effect using Web Audio API (ambient summer bell/chime)
  const toggleSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();
      
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (summer wind chime notes)
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);
        gain.gain.setValueAtTime(0.08, now + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.15 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 1.3);
      });
      setIsPlayingSound(true);
      setTimeout(() => setIsPlayingSound(false), 1400);
    } catch {
      // Audio not supported or blocked by browser policy
    }
  };

  const navItems = [
    { id: 'all', label: 'Trang chủ', icon: Home },
    { id: 'completed', label: 'Truyện đã hoàn', icon: BookOpen },
    { id: 'ongoing', label: 'Truyện chưa hoàn', icon: Heart },
    { id: 'password', label: 'Password', icon: KeyRound },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-rose-100 dark:border-slate-800 transition-colors duration-300 shadow-xs">
      {/* Delicate top pastel decorative line */}
      <div className="h-1 w-full bg-gradient-to-r from-rose-300 via-amber-200 to-sky-300 dark:from-rose-500 dark:via-amber-400 dark:to-cyan-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Blog Identity */}
          <div 
            onClick={() => onSelectTab('all')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-100 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800/80 flex items-center justify-center text-rose-500 dark:text-rose-300 shadow-xs group-hover:rotate-12 transition-transform duration-300 shrink-0">
              <span className="text-xl">🌸</span>
            </div>
            <div className="min-w-0">
              <span className="font-heading-romantic text-xl sm:text-2xl font-bold tracking-wide text-rose-600 dark:text-rose-300 group-hover:text-rose-700 dark:group-hover:text-rose-200 transition-colors block truncate">
                better and better
              </span>
              <div className="text-[11px] font-cute text-amber-600 dark:text-amber-300/80 hidden sm:block -mt-1 truncate">
                ✦ mellifluous novel blog ✦
              </div>
            </div>
          </div>

          {/* Navigation Links - for Large Desktops */}
          <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-200 shadow-xs border border-rose-200 dark:border-rose-800'
                      : 'text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-500' : 'text-slate-400 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Blogger Code Shortcut for Amateur Web Designer */}
            <button
              onClick={onOpenBloggerCode}
              title="Xem mã Blogger bản miễn phí"
              className="px-3 py-1.5 rounded-full text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Mã Blogger</span>
            </button>
          </nav>

          {/* Action Buttons: Search, Theme Toggle, Blossom Breeze, Sound */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search Button */}
            <button
              id="search-blog-btn"
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all shadow-xs"
              title="Tìm kiếm trong blog"
            >
              <Search className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              <span className="hidden 2xl:inline text-slate-500 dark:text-slate-400">Tìm truyện...</span>
              <kbd className="hidden 2xl:inline-block px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-500 rounded font-mono">⌘K</kbd>
            </button>

            {/* Falling Sakura Petals Toggle */}
            <button
              id="toggle-sakura-btn"
              onClick={onToggleSakura}
              className={`p-2 rounded-full border transition-all ${
                sakuraEnabled
                  ? 'bg-rose-100 text-rose-600 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                  : 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
              }`}
              title={sakuraEnabled ? 'Tắt hoa anh đào rơi' : 'Bật hoa anh đào rơi'}
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
            </button>

            {/* Summer Chime Sound effect */}
            <button
              id="ambient-chime-btn"
              onClick={toggleSound}
              className={`p-2 rounded-full border transition-all ${
                isPlayingSound
                  ? 'bg-amber-100 text-amber-600 border-amber-300 dark:bg-amber-950 dark:text-amber-300 scale-110'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-amber-500'
              }`}
              title="Chuông gió mùa hạ (Nghe âm thanh thư giãn)"
            >
              <Music className="w-4 h-4" />
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={onToggleTheme}
              className={`p-2 rounded-full border transition-all cursor-pointer shadow-xs flex items-center justify-center ${
                isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700 hover:border-amber-400/50 shadow-amber-950/20'
                  : 'bg-amber-50 hover:bg-amber-100/80 text-amber-600 border-amber-200 hover:border-amber-300'
              }`}
              title={isDarkMode ? 'Đang là Chế độ Ban đêm ━ Bấm để chuyển sang Ban ngày Mùa hè' : 'Đang là Chế độ Ban ngày ━ Bấm để chuyển sang Đêm sao Huyền ảo'}
              aria-label="Đổi giao diện sáng tối"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-300 animate-spin-once" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          </div>

        </div>

        {/* Tablet & Mobile Navigation Bar (xl:hidden) - cleanly scrollable or centered without stretching screen */}
        <div className="flex xl:hidden overflow-x-auto py-2.5 gap-2 scrollbar-none border-t border-rose-100/80 dark:border-slate-800/80 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-all ${
                  isActive
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200 border border-rose-200 dark:border-rose-800 shadow-2xs font-semibold'
                    : 'text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-500' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={onOpenBloggerCode}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 shrink-0 shadow-2xs"
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Mã Blogger</span>
          </button>
        </div>
      </div>
    </header>
  );
};
