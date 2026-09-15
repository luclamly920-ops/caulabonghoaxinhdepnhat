import React, { useState, useEffect } from 'react';
import { Pin, Bell, Sparkles, ChevronDown, Clock, BookMarked, Filter, ExternalLink, Heart, MessageSquare } from 'lucide-react';
import { Announcement, Novel, CommentItem } from '../types';
import { getStoredComments } from '../utils/commentStore';

interface RightSidebarProps {
  announcements: Announcement[];
  novels: Novel[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectNovel: (novel: Novel) => void;
  onReadChapter: (novel: Novel, chapterId: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  announcements,
  novels,
  selectedCategory,
  onSelectCategory,
  onSelectNovel,
  onReadChapter,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [recentComments, setRecentComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    const loadRecent = () => {
      const all = getStoredComments();
      setRecentComments(all.slice(0, 4));
    };
    loadRecent();

    const handleUpdate = () => loadRecent();
    window.addEventListener('blog_comments_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('blog_comments_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Extract all categories & unique tags
  const categories = ['Tất cả thể loại', 'Thanh xuân vườn trường', 'Thanh mai trúc mã', 'Gương vỡ lại lành', 'Ngọt sủng', 'Chữa lành', 'Cứu rỗi', 'Đô thị'];

  // Flatten latest chapters from all novels with relative time simulation
  const latestUpdates = novels.map((n, idx) => {
    const latestChapter = n.chapters[n.chapters.length - 1] || n.chapters[0];
    const times = ['Vừa xong (09:30)', '2 giờ trước', 'Hôm qua 21:15', '3 ngày trước', 'Tuần trước'];
    return {
      novel: n,
      chapterNumber: latestChapter?.number || 1,
      chapterTitle: latestChapter?.title || 'Chương 1',
      chapterId: latestChapter?.id || '',
      timeAgo: times[idx % times.length],
      isNew: idx < 2,
    };
  });

  return (
    <aside className="w-full xl:w-80 2xl:w-88 shrink-0 grid grid-cols-1 md:grid-cols-2 xl:flex xl:flex-col gap-6">
      
      {/* Column 1 for iPad / Top on Mobile & Desktop */}
      <div className="space-y-6">
        {/* 1. Mellifluous Host Card */}
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl border-2 border-rose-100 dark:border-slate-800 p-5 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-r from-rose-200 via-amber-100 to-sky-200 dark:from-rose-900/40 dark:via-amber-900/20 dark:to-sky-900/40" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-18 h-18 rounded-full bg-white dark:bg-slate-800 p-1 shadow-md border-2 border-rose-300 dark:border-rose-500 mb-2">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-rose-100 to-pink-200 dark:from-rose-900 dark:to-pink-800 flex items-center justify-center text-2xl">
                🌸
              </div>
            </div>
            <h3 className="font-heading-romantic text-lg font-bold text-slate-900 dark:text-white">
              Mellifluous
            </h3>
            <p className="font-cute text-xs text-rose-600 dark:text-rose-300 font-medium">
              ━ Chủ tiệm sách mùa hè
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-serif-dreamy italic mt-2 px-2 leading-relaxed">
              "Chúc bạn có một mùa hè thật dịu dàng giữa những trang truyện ngọt ngào."
            </p>
            <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-500 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-400" /> 5 bộ truyện
              </span>
              <span>•</span>
              <span>120+ chương dịch</span>
            </div>
          </div>
        </div>

        {/* 2. THÔNG BÁO CHÍNH (Notice Board) */}
        <div className="bg-amber-50/70 dark:bg-slate-900/90 rounded-2xl border-2 border-amber-200/80 dark:border-slate-800 p-5 shadow-sm relative">
          {/* Decorative push pin */}
          <div className="absolute -top-3 left-6 flex items-center gap-1 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-amber-300 dark:border-slate-600 shadow-xs">
            <Pin className="w-3.5 h-3.5 text-rose-500 fill-rose-400 -rotate-45" />
            <span className="text-[10px] font-cute font-bold text-amber-800 dark:text-amber-300">Ghim</span>
          </div>

          <div className="flex items-center gap-2 mb-3 mt-1">
            <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h3 className="font-heading-romantic text-base font-bold text-amber-950 dark:text-amber-200">
              Thông Báo Chính Của Blog
            </h3>
          </div>

          {/* Announcement items */}
          <div className="space-y-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white/95 dark:bg-slate-800/90 p-3 rounded-xl border border-amber-200/70 dark:border-slate-700/80 shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${ann.badgeColor}`}>
                    {ann.badge}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {ann.date}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  {ann.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-serif-dreamy">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Column 2 for iPad / Bottom on Mobile & Desktop */}
      <div className="space-y-6">
        {/* 3. DANH MỤC ĐỔ XUỐNG ĐỂ CHỌN TÁC PHẨM TRUYỆN / CHUYÊN MỤC */}
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl border-2 border-rose-100 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-rose-500" />
              <h3 className="font-heading-romantic text-base font-bold text-slate-900 dark:text-white">
                Chọn Tác Phẩm & Thể Loại
              </h3>
            </div>
            <span className="text-xs">🌸</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 font-serif-dreamy mb-3">
            Dùng danh mục đổ xuống bên dưới để lọc nhanh các tác phẩm truyện hoặc thẻ chuyên mục:
          </p>

          {/* Custom Decorative Dropdown */}
          <div className="relative mb-3">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-rose-50/80 dark:bg-slate-800/90 hover:bg-rose-100/70 dark:hover:bg-slate-800 border-2 border-rose-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 shadow-2xs transition-all text-left"
            >
              <span className="truncate flex items-center gap-2">
                <span className="text-rose-500">✿</span>
                <span>{selectedCategory || 'Tất cả tác phẩm truyện'}</span>
              </span>
              
              {/* Trang trí dấu mũi tên đổ xuống hoa văn */}
              <div className="flex items-center gap-1 shrink-0 text-rose-500 dark:text-rose-400">
                <span className="text-[10px]">🌸</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-rose-600' : ''}`} />
              </div>
            </button>

            {/* Dropdown Menu Options */}
            {dropdownOpen && (
              <div className="absolute left-0 right-0 mt-1.5 z-30 bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-slate-700 rounded-xl shadow-lg p-1.5 max-h-64 overflow-y-auto">
                
                {/* Category Options */}
                <div className="text-[10px] font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400 px-2 py-1">
                  Lọc theo chuyên mục:
                </div>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onSelectCategory(cat === 'Tất cả thể loại' ? '' : cat);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      (cat === 'Tất cả thể loại' && !selectedCategory) || selectedCategory === cat
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 font-semibold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{cat}</span>
                    {((cat === 'Tất cả thể loại' && !selectedCategory) || selectedCategory === cat) && (
                      <span className="text-rose-500 text-xs">✓</span>
                    )}
                  </button>
                ))}

                {/* Direct Jump to Novel */}
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 px-2 py-1 mt-2 border-t border-rose-100 dark:border-slate-800">
                  Chuyển nhanh đến tác phẩm:
                </div>
                {novels.map((novel) => (
                  <button
                    key={novel.id}
                    onClick={() => {
                      onSelectNovel(novel);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800 flex items-center gap-1.5 truncate"
                  >
                    <BookMarked className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{novel.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Category Reset Chip */}
          {selectedCategory && (
            <div className="flex items-center justify-between text-xs bg-rose-100/80 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 px-3 py-1 rounded-lg">
              <span>Đang lọc: <strong>{selectedCategory}</strong></span>
              <button
                onClick={() => onSelectCategory('')}
                className="text-rose-600 dark:text-rose-400 hover:underline text-[11px]"
              >
                Bỏ lọc
              </button>
            </div>
          )}
        </div>

        {/* 4. CHƯƠNG MỚI NHẤT ĐƯỢC CẬP NHẬT THEO THỜI GIAN ĐĂNG BÀI */}
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl border-2 border-sky-100 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-500" />
              <h3 className="font-heading-romantic text-base font-bold text-slate-900 dark:text-white">
                Chương Mới Cập Nhật
              </h3>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <div className="divide-y divide-rose-50 dark:divide-slate-800">
            {latestUpdates.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  const targetChapterId = item.chapterId || item.novel.chapters[0]?.id;
                  if (targetChapterId) {
                    onReadChapter(item.novel, targetChapterId);
                  } else {
                    onSelectNovel(item.novel);
                  }
                }}
                className="py-2.5 first:pt-0 last:pb-0 cursor-pointer group"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400 mb-1 gap-2">
                  <span className="font-medium text-rose-600 dark:text-rose-300 truncate flex-1 min-w-0">
                    {item.novel.title}
                  </span>
                  <span className="text-[10px] shrink-0 bg-sky-50 dark:bg-slate-800 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-slate-700 px-1.5 py-0.5 rounded">
                    {item.timeAgo}
                  </span>
                </div>
                <h4 className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors line-clamp-1">
                  {item.chapterTitle}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* 5. BÌNH LUẬN & TIN NHẮN MỚI TỪ ĐỘC GIẢ */}
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl border-2 border-amber-100 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-500" />
              <h3 className="font-heading-romantic text-base font-bold text-slate-900 dark:text-white">
                Bình Luận Mới Nhất
              </h3>
            </div>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-900/60 font-medium">
              Live
            </span>
          </div>

          <div className="divide-y divide-amber-50 dark:divide-slate-800">
            {recentComments.length === 0 ? (
              <div className="py-2 text-center text-xs text-slate-400">
                Chưa có bình luận nào.
              </div>
            ) : (
              recentComments.map((cm) => (
                <div key={cm.id} className="py-2.5 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <span>{cm.avatar}</span>
                      <span className="truncate max-w-[120px]">{cm.name}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">{cm.time.split(' ')[0]}</span>
                  </div>
                  <p className="font-serif-dreamy text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {cm.text}
                  </p>
                  {cm.targetTitle && (
                    <span className="inline-block mt-1 text-[10px] text-amber-600 dark:text-amber-400 truncate max-w-full">
                      📍 {cm.targetTitle}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 6. Trích dẫn mùa hè & Lời nhắn */}
        <div className="rounded-2xl border border-rose-200/70 dark:border-slate-800 bg-gradient-to-br from-rose-50/50 to-amber-50/50 dark:from-slate-900 dark:to-slate-900 p-4 text-center">
          <span className="text-xl">🎐</span>
          <p className="font-serif-dreamy italic text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            "Mong rằng mùa hè của bạn luôn có kem ngọt, gió mát, và người cùng bạn đọc hết những câu chuyện dang dở."
          </p>
          <span className="text-[10px] font-cute text-rose-500 dark:text-rose-400 block mt-1">━ Mellifluous</span>
        </div>
      </div>

    </aside>
  );
};
