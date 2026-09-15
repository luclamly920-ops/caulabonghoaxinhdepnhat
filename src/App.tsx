/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { HeroIntro } from './components/HeroIntro';
import { LetterNavigation } from './components/LetterNavigation';
import { RightSidebar } from './components/RightSidebar';
import { NovelCard } from './components/NovelCard';
import { NovelDetailModal } from './components/NovelDetailModal';
import { ChapterReaderModal } from './components/ChapterReaderModal';
import { PasswordHintSection } from './components/PasswordHintSection';
import { OtherSection } from './components/OtherSection';
import { BloggerExporterModal } from './components/BloggerExporterModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { SakuraCanvas } from './components/SakuraCanvas';
import { NOVELS, ANNOUNCEMENTS, PASSWORD_HINTS, INITIAL_VISITOR_STATS } from './data/blogData';
import { Novel, Chapter, VisitorStats } from './types';
import { BookOpen, Sparkles, Filter, CheckCircle2, Clock } from 'lucide-react';
import {
  enhanceNovel,
  getVisitorStats,
  recordSiteVisit,
  recordNovelView,
} from './utils/statsStore';

export default function App() {
  // Theme state (default to romantic summer daylight, saved in localStorage)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('mellifluous_theme') === 'dark';
  });

  // Real-time dynamic novels with views, favorites & ratings from statsStore
  const [novelsList, setNovelsList] = useState<Novel[]>(() => NOVELS.map((n) => enhanceNovel(n)));
  const [visitorStats, setVisitorStats] = useState<VisitorStats>(() => getVisitorStats());

  // Current active navigation section
  const [currentTab, setCurrentTab] = useState<string>('all');

  // Selected category filter from sidebar or filters
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Sakura falling animation state
  const [sakuraEnabled, setSakuraEnabled] = useState(true);

  // Modals state
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [readingState, setReadingState] = useState<{ novel: Novel; chapter: Chapter } | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bloggerModalOpen, setBloggerModalOpen] = useState(false);

  // Record site visit on mount and listen to stats updates
  useEffect(() => {
    recordSiteVisit();
    setVisitorStats(getVisitorStats());
    setNovelsList(NOVELS.map((n) => enhanceNovel(n)));

    const handleStatsUpdate = () => {
      setVisitorStats(getVisitorStats());
      setNovelsList(NOVELS.map((n) => enhanceNovel(n)));
      setSelectedNovel((current) => {
        if (!current) return null;
        const fresh = NOVELS.find((n) => n.id === current.id);
        return fresh ? enhanceNovel(fresh) : current;
      });
    };

    window.addEventListener('blog_stats_updated', handleStatsUpdate);
    return () => window.removeEventListener('blog_stats_updated', handleStatsUpdate);
  }, []);

  // Handle Dark mode class on html and body elements
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('mellifluous_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('mellifluous_theme', 'light');
    }
  }, [isDarkMode]);

  // Keyboard shortcut ⌘K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSelectedNovel(null);
        setBloggerModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter novels according to active tab and category
  const filteredNovels = novelsList.filter((novel) => {
    if (currentTab === 'completed' && novel.status !== 'completed') return false;
    if (currentTab === 'ongoing' && novel.status !== 'ongoing') return false;
    if (selectedCategory && novel.category !== selectedCategory && !novel.tags.includes(selectedCategory)) {
      return false;
    }
    return true;
  });

  const completedCount = novelsList.filter((n) => n.status === 'completed').length;
  const ongoingCount = novelsList.filter((n) => n.status === 'ongoing').length;

  const handleSelectNovel = (novel: Novel) => {
    recordNovelView(novel.id);
    setSelectedNovel(enhanceNovel(novel));
  };

  const handleReadFirstChapter = (novel: Novel) => {
    recordNovelView(novel.id);
    const enhanced = enhanceNovel(novel);
    const firstCh = enhanced.chapters[0];
    if (firstCh) {
      setReadingState({ novel: enhanced, chapter: firstCh });
    } else {
      setSelectedNovel(enhanced);
    }
  };

  const handleReadChapterDirect = (novel: Novel, chapterId: string) => {
    recordNovelView(novel.id);
    const enhanced = enhanceNovel(novel);
    const target = enhanced.chapters.find((c) => c.id === chapterId) || enhanced.chapters[0];
    if (target) {
      setReadingState({ novel: enhanced, chapter: target });
    }
  };

  const handleSwitchChapter = (targetChapter: Chapter) => {
    if (!readingState) return;
    setReadingState({ novel: readingState.novel, chapter: targetChapter });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-[#fffcf7] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 relative selection:bg-rose-200 selection:text-rose-900 w-full max-w-full overflow-x-hidden`}>
      
      {/* 🌸 Sakura Petals Canvas Effect */}
      <SakuraCanvas enabled={sakuraEnabled} />

      {/* Top Header Navigation */}
      <HeaderNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenSearch={() => setSearchOpen(true)}
        sakuraEnabled={sakuraEnabled}
        onToggleSakura={() => setSakuraEnabled(!sakuraEnabled)}
        onOpenBloggerCode={() => setBloggerModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 w-full max-w-full overflow-x-hidden">
        
        {/* Intro Banner: "better and better", "Xin chào, tớ là Mellifluous..." */}
        <HeroIntro />

        {/* Floating Love Letters & Stationery Navigation */}
        <LetterNavigation
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            // Smoothly scroll to content if needed
          }}
          completedCount={completedCount}
          ongoingCount={ongoingCount}
          passwordCount={PASSWORD_HINTS.length}
          onOpenBloggerCode={() => setBloggerModalOpen(true)}
        />

        {/* Content Layout Grid (Left: Novel list or section; Right: Sidebar) */}
        <div className="flex flex-col xl:flex-row gap-8 items-start w-full min-w-0">
          
          {/* Main Left Section */}
          <div className="flex-1 w-full min-w-0">
            
            {/* View 1: Password hints section */}
            {currentTab === 'password' ? (
              <PasswordHintSection
                hints={PASSWORD_HINTS}
                onReadNovel={(novelId) => {
                  const target = NOVELS.find((n) => n.id === novelId);
                  if (target) setSelectedNovel(target);
                }}
              />
            ) : currentTab === 'other' ? (
              /* View 2: Guestbook & Other FAQ section */
              <OtherSection />
            ) : (
              /* View 3: Novels List (All, Completed, or Ongoing) */
              <div>
                {/* Section Title & Sub-filters */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
                  <div>
                    <h2 className="font-heading-romantic text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-rose-500" />
                      <span>
                        {currentTab === 'completed'
                          ? 'Truyện Đã Hoàn Thành'
                          : currentTab === 'ongoing'
                          ? 'Truyện Chưa Hoàn Thành'
                          : 'Tất Cả Tác Phẩm Truyện'}
                      </span>
                      <span className="text-xs font-cute text-rose-500 font-normal">
                        ({filteredNovels.length} bộ)
                      </span>
                    </h2>
                    <p className="font-cute text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {currentTab === 'completed'
                        ? 'Các câu chuyện đã trọn vẹn 100%, thỏa sức đọc liền mạch'
                        : currentTab === 'ongoing'
                        ? 'Các bộ truyện đang cập nhật chương mới đều đặn hàng tuần'
                        : 'Tuyển tập truyện thanh xuân học đường, mùa hè ngọt ngào'}
                    </p>
                  </div>

                  {/* Filter Status Pills */}
                  <div className="flex items-center gap-1.5 bg-rose-50/70 dark:bg-slate-800 p-1 rounded-xl border border-rose-100 dark:border-slate-700 text-xs">
                    <button
                      onClick={() => setCurrentTab('all')}
                      className={`px-3 py-1 rounded-lg font-medium transition-all ${
                        currentTab === 'all'
                          ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-2xs font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-rose-500'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setCurrentTab('completed')}
                      className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                        currentTab === 'completed'
                          ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-2xs font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-rose-500'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3 text-rose-500" />
                      <span>Đã hoàn</span>
                    </button>
                    <button
                      onClick={() => setCurrentTab('ongoing')}
                      className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                        currentTab === 'ongoing'
                          ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-2xs font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-rose-500'
                      }`}
                    >
                      <Clock className="w-3 h-3 text-emerald-500" />
                      <span>Đang ra</span>
                    </button>
                  </div>
                </div>

                {/* Novels Grid */}
                {filteredNovels.length === 0 ? (
                  <div className="py-16 text-center bg-white/70 dark:bg-slate-800/50 rounded-3xl border border-rose-100 dark:border-slate-700">
                    <span className="text-4xl">🎐</span>
                    <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mt-2">
                      Chưa có truyện nào trong mục này
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        setCurrentTab('all');
                      }}
                      className="mt-3 text-xs font-semibold text-rose-600 hover:underline"
                    >
                      Xem tất cả truyện ➔
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredNovels.map((novel) => (
                      <NovelCard
                        key={novel.id}
                        novel={novel}
                        onSelect={(n) => handleSelectNovel(n)}
                        onReadFirstChapter={(n) => handleReadFirstChapter(n)}
                      />
                    ))}
                  </div>
                )}

                {/* Romantic Summer Quote Card */}
                <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-rose-100/60 via-amber-100/50 to-sky-100/60 dark:from-slate-800 dark:to-slate-900 border border-rose-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div>
                      <h4 className="font-heading-romantic text-sm font-bold text-slate-800 dark:text-slate-100">
                        Bạn chưa tìm thấy bộ truyện hợp gu?
                      </h4>
                      <p className="font-serif-dreamy text-xs text-slate-600 dark:text-slate-300">
                        Hãy ghé mục lưu bút để gợi ý tên truyện hoặc để lại lời nhắn cho Mellifluous nhé!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentTab('other')}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-50 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-slate-700 text-xs font-semibold shadow-2xs whitespace-nowrap"
                  >
                    Ghé góc lưu bút ➔
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Right Sidebar (Announcement board, Dropdown category selector, Recent chapters) */}
          <RightSidebar
            announcements={ANNOUNCEMENTS}
            novels={novelsList}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              if (currentTab === 'password' || currentTab === 'other') {
                setCurrentTab('all');
              }
            }}
            onSelectNovel={(novel) => handleSelectNovel(novel)}
            onReadChapter={(novel, chapterId) => handleReadChapterDirect(novel, chapterId)}
          />

        </div>

      </main>

      {/* Novel Detail / TOC Modal */}
      {selectedNovel && (
        <NovelDetailModal
          novel={selectedNovel}
          onClose={() => setSelectedNovel(null)}
          onReadChapter={(chapter) => {
            setReadingState({ novel: selectedNovel, chapter });
          }}
        />
      )}

      {/* Chapter Reader Modal */}
      {readingState && (
        <ChapterReaderModal
          novel={readingState.novel}
          chapter={readingState.chapter}
          onClose={() => setReadingState(null)}
          onSwitchChapter={handleSwitchChapter}
          onOpenPasswordHints={() => {
            setReadingState(null);
            setCurrentTab('password');
          }}
        />
      )}

      {/* Search Modal */}
      {searchOpen && (
        <SearchModal
          novels={novelsList}
          onClose={() => setSearchOpen(false)}
          onSelectNovel={(novel) => handleSelectNovel(novel)}
        />
      )}

      {/* Blogger Code Exporter Modal */}
      {bloggerModalOpen && (
        <BloggerExporterModal
          onClose={() => setBloggerModalOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer
        stats={visitorStats}
        onOpenBloggerCode={() => setBloggerModalOpen(true)}
      />

    </div>
  );
}
