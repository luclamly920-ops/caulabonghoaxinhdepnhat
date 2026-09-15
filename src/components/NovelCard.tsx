import React, { useState, useEffect } from 'react';
import { BookOpen, Star, Eye, Heart, Lock, CheckCircle2, Clock } from 'lucide-react';
import { Novel } from '../types';
import { toggleNovelFavorite, isNovelFavorited } from '../utils/statsStore';

interface NovelCardProps {
  novel: Novel;
  onSelect: (novel: Novel) => void;
  onReadFirstChapter: (novel: Novel) => void;
}

export const NovelCard: React.FC<NovelCardProps> = ({
  novel,
  onSelect,
  onReadFirstChapter,
}) => {
  const isCompleted = novel.status === 'completed';
  const [isFav, setIsFav] = useState(() => isNovelFavorited(novel.id));

  useEffect(() => {
    setIsFav(isNovelFavorited(novel.id));
    const handleUpdate = () => {
      setIsFav(isNovelFavorited(novel.id));
    };
    window.addEventListener('blog_stats_updated', handleUpdate);
    return () => window.removeEventListener('blog_stats_updated', handleUpdate);
  }, [novel.id]);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNovelFavorite(novel.id);
  };

  return (
    <article className="group bg-white/90 dark:bg-slate-900/95 rounded-2xl border-2 border-rose-100 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-600/70 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between">
      
      {/* Top Cover Visual with Summer Colors */}
      <div className={`h-36 sm:h-40 bg-gradient-to-br ${novel.coverColor} dark:from-slate-900 dark:via-rose-950/40 dark:to-slate-900 p-4 relative flex flex-col justify-between overflow-hidden border-b border-rose-100 dark:border-slate-800`}>
        {/* Subtle decorative blossom watermark */}
        <div className="absolute -right-4 -bottom-4 text-7xl opacity-25 select-none pointer-events-none group-hover:scale-110 transition-transform duration-500">
          🌸
        </div>

        {/* Status Badge, Password Pill & Quick Favorite */}
        <div className="flex items-center justify-between z-10">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium shadow-xs ${
              isCompleted
                ? 'bg-rose-500 text-white'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3 h-3" />
                <span>Hoàn {novel.totalChapters}c</span>
              </>
            ) : (
              <>
                <Clock className="w-3 h-3" />
                <span>Đang ra ({novel.completedChapters}/{novel.totalChapters}c)</span>
              </>
            )}
          </span>

          <div className="flex items-center gap-1.5">
            {novel.passwordNotice && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900 dark:bg-amber-950/90 dark:text-amber-200 border border-amber-300 dark:border-amber-700/80 shadow-2xs"
                title="Có chương cài mật khẩu"
              >
                <Lock className="w-2.5 h-2.5" />
                <span>Có Pass</span>
              </span>
            )}

            <button
              onClick={handleHeartClick}
              title={isFav ? 'Bỏ yêu thích' : 'Yêu thích truyện'}
              className={`p-1.5 rounded-full transition-transform active:scale-90 shadow-2xs backdrop-blur-xs ${
                isFav
                  ? 'bg-white text-rose-500 shadow-sm'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-400 hover:text-rose-500 hover:bg-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Category & Title on Cover */}
        <div className="z-10 mt-auto">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-800/90 dark:text-rose-300">
            {novel.category}
          </span>
          <h3 className="font-heading-romantic text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors line-clamp-1">
            {novel.title}
          </h3>
          <p className="font-cute text-xs text-slate-700 dark:text-slate-300 line-clamp-1">
            {novel.originalTitle}
          </p>
        </div>
      </div>

      {/* Novel Details & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Author & Translator */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2.5">
            <span>Tác giả: <strong className="text-slate-800 dark:text-slate-200">{novel.author}</strong></span>
            <span>Edit: <strong className="text-rose-600 dark:text-rose-300 font-cute font-bold">{novel.translator}</strong></span>
          </div>

          {/* Short Summary */}
          <p className="font-serif-dreamy text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-3">
            {novel.summary.replace(/\[\/?center(-bold)?\]/g, '').replace(/\*/g, '')}
          </p>

          {/* Tags Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {novel.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-rose-50 dark:bg-slate-800 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-slate-700 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-rose-100/70 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            {/* Rating */}
            <span className="flex items-center gap-1" title={`${novel.ratingCount || 0} lượt đánh giá`}>
              <Star className={`w-3 h-3 ${novel.rating > 0 ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
              <span className="text-slate-700 dark:text-slate-200 font-medium">
                {novel.rating > 0 ? novel.rating.toFixed(1) : '0'}
              </span>
            </span>

            {/* Views */}
            <span className="flex items-center gap-1" title="Lượt xem truyện">
              <Eye className="w-3 h-3 text-slate-400" />
              <span>{novel.views.toLocaleString()}</span>
            </span>

            {/* Favorites */}
            <span className="flex items-center gap-1" title="Lượt yêu thích">
              <Heart className={`w-3 h-3 ${novel.favorites > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
              <span>{novel.favorites.toLocaleString()}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(novel)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-700 transition-colors"
            >
              Mục lục
            </button>
            <button
              onClick={() => onReadFirstChapter(novel)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 active:scale-95 transition-all shadow-xs flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Đọc truyện</span>
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
