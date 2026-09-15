import React, { useState } from 'react';
import { Search, X, BookOpen, Clock, CheckCircle2, Lock } from 'lucide-react';
import { Novel } from '../types';

interface SearchModalProps {
  novels: Novel[];
  onClose: () => void;
  onSelectNovel: (novel: Novel) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ novels, onClose, onSelectNovel }) => {
  const [keyword, setKeyword] = useState('');

  const filteredNovels = novels.filter((n) => {
    const q = keyword.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) ||
      n.originalTitle.toLowerCase().includes(q) ||
      n.author.toLowerCase().includes(q) ||
      n.summary.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4 sm:p-6">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-slate-700 shadow-2xl overflow-hidden animate-gentle-float">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-rose-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-rose-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Tìm theo tên truyện, tác giả, thể loại (ví dụ: thanh xuân, ngọt sủng)..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full text-sm sm:text-base bg-transparent border-none outline-hidden text-slate-800 dark:text-white placeholder-slate-400"
          />
          {keyword && (
            <button
              onClick={() => setKeyword('')}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-500 hover:text-rose-500 px-2 py-1 rounded-md"
          >
            Đóng [ESC]
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
          {filteredNovels.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <span className="text-3xl">🍃</span>
              <p className="mt-2 text-sm">Không tìm thấy truyện nào với từ khóa "{keyword}"</p>
              <p className="text-xs text-rose-400 mt-1">Thử tìm "thanh xuân" hoặc "ngọt sủng" xem sao nhé!</p>
            </div>
          ) : (
            filteredNovels.map((novel) => (
              <div
                key={novel.id}
                onClick={() => {
                  onSelectNovel(novel);
                  onClose();
                }}
                className="p-3.5 rounded-2xl border border-rose-100 dark:border-slate-800 hover:bg-rose-50/70 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        novel.status === 'completed'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {novel.status === 'completed' ? 'Hoàn thành' : 'Đang tiến hành'}
                    </span>
                    <span className="text-xs text-slate-400">
                      {novel.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {novel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    Tác giả: {novel.author} • {novel.summary}
                  </p>
                </div>

                <span className="text-xs text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                  Xem mục lục ➔
                </span>
              </div>
            ))
          )}
        </div>

        {/* Bottom Search Tip */}
        <div className="p-3 bg-slate-50 dark:bg-slate-850 text-center text-[11px] text-slate-400 border-t border-rose-50 dark:border-slate-800">
          Tìm kiếm tức thì trong toàn bộ kho truyện của blog Better and Better
        </div>

      </div>
    </div>
  );
};
