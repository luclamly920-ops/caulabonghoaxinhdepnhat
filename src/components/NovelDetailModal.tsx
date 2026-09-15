import React, { useState, useEffect } from 'react';
import { X, BookOpen, Star, Eye, Lock, CheckCircle2, Clock, Calendar, Heart, Share2, Sparkles, ThumbsUp, Check } from 'lucide-react';
import { Novel, Chapter } from '../types';
import {
  rateNovel,
  getUserNovelRating,
  toggleNovelFavorite,
  isNovelFavorited,
} from '../utils/statsStore';

interface NovelDetailModalProps {
  novel: Novel;
  onClose: () => void;
  onReadChapter: (chapter: Chapter) => void;
}

export const NovelDetailModal: React.FC<NovelDetailModalProps> = ({
  novel,
  onClose,
  onReadChapter,
}) => {
  const [chapterTab, setChapterTab] = useState<'all' | 'main' | 'extra'>('all');
  const isCompleted = novel.status === 'completed';

  // Dynamic user rating and favorite state
  const [userRating, setUserRating] = useState(() => getUserNovelRating(novel.id));
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingMessage, setRatingMessage] = useState<string | null>(null);
  const [isFav, setIsFav] = useState(() => isNovelFavorited(novel.id));
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setUserRating(getUserNovelRating(novel.id));
    setIsFav(isNovelFavorited(novel.id));

    const handleUpdate = () => {
      setUserRating(getUserNovelRating(novel.id));
      setIsFav(isNovelFavorited(novel.id));
    };

    window.addEventListener('blog_stats_updated', handleUpdate);
    return () => window.removeEventListener('blog_stats_updated', handleUpdate);
  }, [novel.id]);

  const handleRate = (stars: number) => {
    const result = rateNovel(novel.id, stars);
    setUserRating(stars);
    setRatingMessage(`Cảm ơn bạn đã đánh giá ${stars} sao cho "${novel.title}"! ✨`);
    setTimeout(() => setRatingMessage(null), 3500);
  };

  const handleToggleFav = () => {
    toggleNovelFavorite(novel.id);
  };

  const mainChapters = novel.chapters.filter((c) => c.type !== 'extra');
  const extraChapters = novel.chapters.filter((c) => c.type === 'extra');

  const filteredChapters = novel.chapters.filter((c) => {
    if (chapterTab === 'main') return c.type !== 'extra';
    if (chapterTab === 'extra') return c.type === 'extra';
    return true;
  });

  const ratingLabels = ['', 'Tạm được', 'Bình thường', 'Khá hay', 'Rất hay', 'Tuyệt phẩm! ✨'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-slate-700 shadow-2xl overflow-hidden my-auto">
        
        {/* Header Banner */}
        <div className={`p-6 sm:p-8 bg-gradient-to-r ${novel.coverColor} dark:from-slate-800 dark:via-rose-950/40 dark:to-slate-900 border-b border-rose-100 dark:border-slate-800 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white text-slate-600 dark:text-slate-300 shadow-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                isCompleted ? 'bg-rose-500 text-white' : 'bg-emerald-600 text-white'
              }`}
            >
              {isCompleted ? 'Trọn bộ (Hoàn)' : 'Đang tiến hành'}
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {novel.category}
            </span>
          </div>

          <h2 className="font-heading-romantic text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">
            {novel.title}
          </h2>
          <p className="font-cute text-sm text-slate-700 dark:text-slate-300">
            {novel.originalTitle}
          </p>

          <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-600 dark:text-slate-300">
            <span>Tác giả: <strong>{novel.author}</strong></span>
            <span>•</span>
            <span>Chuyển ngữ: <strong>{novel.translator}</strong></span>
            <span>•</span>
            <span>Cập nhật: <strong>{novel.lastUpdated}</strong></span>
          </div>

          {/* Quick Realtime Stats Row & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-rose-200/50 dark:border-slate-700/60">
            <div className="flex items-center gap-4 text-xs text-slate-700 dark:text-slate-200">
              <span className="flex items-center gap-1 font-semibold" title="Lượt đọc truyện">
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>{novel.views.toLocaleString()}</span> <span className="font-normal text-slate-500">lượt đọc</span>
              </span>

              <span className="flex items-center gap-1 font-semibold" title="Lượt yêu thích">
                <Heart className={`w-3.5 h-3.5 ${novel.favorites > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
                <span>{novel.favorites.toLocaleString()}</span> <span className="font-normal text-slate-500">yêu thích</span>
              </span>

              <span className="flex items-center gap-1 font-semibold" title="Điểm đánh giá trung bình">
                <Star className={`w-3.5 h-3.5 ${novel.rating > 0 ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
                <span>{novel.rating > 0 ? novel.rating.toFixed(1) : '0.0'}</span>
                <span className="font-normal text-slate-500">({novel.ratingCount || 0} đánh giá)</span>
              </span>
            </div>

            {/* Favorite & Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleFav}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs ${
                  isFav
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : 'text-rose-500'}`} />
                <span>{isFav ? 'Đã yêu thích' : 'Thả tim truyện'}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-white flex items-center gap-1 transition-colors"
                title="Sao chép liên kết"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Đã chép' : 'Chia sẻ'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Summary */}
          <div>
            <h3 className="font-heading-romantic text-base font-bold text-slate-800 dark:text-slate-100 mb-3">
              Giới thiệu nội dung
            </h3>
            <div className="space-y-3 font-serif-dreamy text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {novel.summary.split('\n').map((paragraph, idx) => {
                const trimmed = paragraph.trim();
                if (!trimmed) {
                  return <div key={idx} className="h-1" />;
                }
                
                // Centered bold line
                if (trimmed.startsWith('[center-bold]') && trimmed.endsWith('[/center-bold]')) {
                  const content = trimmed.slice(13, -14);
                  return (
                    <p key={idx} className="text-center font-bold text-slate-800 dark:text-slate-100 my-2">
                      {content}
                    </p>
                  );
                }

                // Centered line
                if (trimmed.startsWith('[center]') && trimmed.endsWith('[/center]')) {
                  const content = trimmed.slice(8, -9);
                  return (
                    <p key={idx} className="text-center text-slate-700 dark:text-slate-200 my-1">
                      {content}
                    </p>
                  );
                }

                // Italic line
                if ((trimmed.startsWith('*') && trimmed.endsWith('*')) || (trimmed.startsWith('_') && trimmed.endsWith('_'))) {
                  const content = trimmed.slice(1, -1);
                  return (
                    <p key={idx} className="italic text-slate-600 dark:text-slate-300">
                      {content}
                    </p>
                  );
                }

                return (
                  <p key={idx}>
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {novel.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-slate-800 text-rose-700 dark:text-rose-300 border border-rose-100 dark:border-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Interactive Star Rating Widget for Novel */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border-2 border-amber-200/80 dark:border-amber-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <h4 className="font-heading-romantic text-sm font-bold text-amber-950 dark:text-amber-200">
                  Đánh giá tác phẩm
                </h4>
              </div>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                {novel.ratingCount && novel.ratingCount > 0
                  ? `Điểm trung bình: ${novel.rating.toFixed(1)} / 5.0 (${novel.ratingCount} lượt đánh giá)`
                  : 'Chưa có đánh giá nào. Hãy là người đầu tiên chấm sao nhé!'}
              </p>
            </div>

            {/* Interactive Stars */}
            <div className="flex flex-col items-center sm:items-end">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || userRating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRate(star)}
                      className="p-1 transition-transform hover:scale-125 active:scale-95 cursor-pointer"
                      title={`${star} sao - ${ratingLabels[star]}`}
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          isFilled
                            ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                            : 'text-amber-300/60 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-[11px] font-medium text-amber-900 dark:text-amber-300 h-4 mt-0.5">
                {hoverRating > 0
                  ? ratingLabels[hoverRating]
                  : userRating > 0
                  ? `Bạn đã chấm: ${userRating} sao`
                  : 'Bấm sao để chấm điểm'}
              </span>
            </div>
          </div>

          {ratingMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 text-center font-medium animate-fadeIn">
              {ratingMessage}
            </div>
          )}

          {/* Password Notice */}
          {novel.passwordNotice && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{novel.passwordNotice}</span>
            </div>
          )}

          {/* Chapter Table of Contents */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="font-heading-romantic text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-rose-500" />
                <span>Mục Lục ({novel.chapters.length})</span>
              </h3>

              {/* Sub-tabs for Main vs Extra if Extra exists */}
              {extraChapters.length > 0 && (
                <div className="flex items-center gap-1.5 bg-rose-50/80 dark:bg-slate-800 p-1 rounded-xl text-xs">
                  <button
                    onClick={() => setChapterTab('all')}
                    className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                      chapterTab === 'all'
                        ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-2xs font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-rose-500'
                    }`}
                  >
                    Tất cả ({novel.chapters.length})
                  </button>
                  <button
                    onClick={() => setChapterTab('main')}
                    className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                      chapterTab === 'main'
                        ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-2xs font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-rose-500'
                    }`}
                  >
                    Chính truyện ({mainChapters.length})
                  </button>
                  <button
                    onClick={() => setChapterTab('extra')}
                    className={`px-2.5 py-1 rounded-lg transition-colors font-medium flex items-center gap-1 ${
                      chapterTab === 'extra'
                        ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-2xs font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-purple-500'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-purple-500" />
                    <span>Phiên ngoại ({extraChapters.length})</span>
                  </button>
                </div>
              )}
            </div>

            <div className="divide-y divide-rose-50 dark:divide-slate-800 border border-rose-100 dark:border-slate-800 rounded-2xl overflow-hidden">
              {filteredChapters.map((ch) => {
                const isExtra = ch.type === 'extra';
                return (
                  <div
                    key={ch.id}
                    onClick={() => {
                      onReadChapter(ch);
                      onClose();
                    }}
                    className={`p-3.5 cursor-pointer flex items-center justify-between transition-colors group ${
                      isExtra
                        ? 'hover:bg-purple-50/70 dark:hover:bg-purple-950/30 bg-purple-50/20'
                        : 'hover:bg-rose-50/70 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isExtra ? (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shrink-0 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> PN
                        </span>
                      ) : (
                        <span className="w-6 text-xs font-bold text-rose-500 text-center shrink-0">
                          #{ch.number}
                        </span>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors line-clamp-1">
                            {ch.title}
                          </h4>
                          {isExtra && (
                            <span className="hidden sm:inline-block text-[10px] font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-1.5 py-0.2 rounded border border-purple-100 dark:border-purple-900">
                              Phiên ngoại
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span>{ch.releaseDate}</span>
                          <span>•</span>
                          <span>{ch.wordCount.toLocaleString()} chữ</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-slate-500 dark:text-slate-400">
                            <Eye className="w-2.5 h-2.5" /> {ch.views.toLocaleString()}
                          </span>
                          {(ch.likes || 0) > 0 && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-0.5 text-rose-500">
                                <Heart className="w-2.5 h-2.5 fill-rose-500" /> {ch.likes}
                              </span>
                            </>
                          )}
                          {(ch.rating || 0) > 0 && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-0.5 text-amber-500">
                                <Star className="w-2.5 h-2.5 fill-amber-500" /> {ch.rating}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {ch.isLocked && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Có pass
                        </span>
                      )}
                      <span className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity ${isExtra ? 'text-purple-500' : 'text-rose-500'}`}>
                        Đọc ngay ➔
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
