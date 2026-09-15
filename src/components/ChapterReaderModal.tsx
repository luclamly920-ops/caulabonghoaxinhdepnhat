import React, { useState, useEffect } from 'react';
import { X, Lock, Unlock, Key, ArrowLeft, ArrowRight, Eye, Heart, BookOpen, Share2, Sparkles, Check, MessageSquare, Send, Trash2, CheckCircle2, Star } from 'lucide-react';
import { Chapter, Novel, CommentItem } from '../types';
import {
  getStoredComments,
  addComment,
  toggleLikeComment,
  isCommentLiked,
  deleteComment,
} from '../utils/commentStore';
import {
  recordChapterView,
  toggleChapterLike,
  isChapterLiked,
  rateChapter,
  getUserChapterRating,
} from '../utils/statsStore';

interface ChapterReaderModalProps {
  novel: Novel;
  chapter: Chapter;
  onClose: () => void;
  onSwitchChapter: (chapter: Chapter) => void;
  onOpenPasswordHints: () => void;
}

export const ChapterReaderModal: React.FC<ChapterReaderModalProps> = ({
  novel,
  chapter,
  onClose,
  onSwitchChapter,
  onOpenPasswordHints,
}) => {
  const [enteredPass, setEnteredPass] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(!chapter.isLocked);
  const [passError, setPassError] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [themeMode, setThemeMode] = useState<'cream' | 'white' | 'night'>(() => {
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
      return 'night';
    }
    return 'cream';
  });

  // Chapter Dynamic Stats (Views, Likes, Ratings)
  const [liked, setLiked] = useState(() => isChapterLiked(chapter.id));
  const [likesCount, setLikesCount] = useState(chapter.likes || 0);
  const [chapterRating, setChapterRating] = useState(chapter.rating || 0);
  const [chapterRatingCount, setChapterRatingCount] = useState(chapter.ratingCount || 0);
  const [userRating, setUserRating] = useState(() => getUserChapterRating(chapter.id));
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingSuccess, setRatingSuccess] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Automatically record view and load stats
  useEffect(() => {
    recordChapterView(novel.id, chapter.id);
    setLiked(isChapterLiked(chapter.id));
    setUserRating(getUserChapterRating(chapter.id));
    setLikesCount(chapter.likes || 0);
    setChapterRating(chapter.rating || 0);
    setChapterRatingCount(chapter.ratingCount || 0);
    setIsUnlocked(!chapter.isLocked);
    setEnteredPass('');
    setPassError(false);
  }, [chapter.id, novel.id]);

  useEffect(() => {
    const handleStatsUpdate = () => {
      setLiked(isChapterLiked(chapter.id));
      setUserRating(getUserChapterRating(chapter.id));
    };
    window.addEventListener('blog_stats_updated', handleStatsUpdate);
    return () => window.removeEventListener('blog_stats_updated', handleStatsUpdate);
  }, [chapter.id]);

  const handleToggleLike = () => {
    const result = toggleChapterLike(novel.id, chapter.id);
    setLiked(result.isLiked);
    setLikesCount(result.count);
  };

  const handleRateChapter = (stars: number) => {
    const result = rateChapter(novel.id, chapter.id, stars);
    setUserRating(stars);
    setChapterRating(result.average);
    setChapterRatingCount(result.count);
    setRatingSuccess(`Cảm ơn bạn đã chấm ${stars} sao cho chương này! ✨`);
    setTimeout(() => setRatingSuccess(null), 3000);
  };

  // Chapter Comments State
  const [chapterComments, setChapterComments] = useState<CommentItem[]>([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentAvatar, setCommentAvatar] = useState('🌸');
  const [commentSuccess, setCommentSuccess] = useState<string | null>(null);

  const avatarOptions = ['🌸', '🍓', '🌻', '🍃', '🎐', '🍧', '💌', '🌙', '✨'];
  const ratingLabels = ['', 'Tạm được', 'Hay', 'Khá cuốn', 'Rất xuất sắc', 'Chương đỉnh chóp! ✨'];

  useEffect(() => {
    const loadChapterComments = () => {
      const all = getStoredComments();
      const filtered = all.filter((c) => c.targetId === chapter.id);
      setChapterComments(filtered);
    };

    loadChapterComments();

    const handleUpdate = () => loadChapterComments();
    window.addEventListener('blog_comments_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('blog_comments_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [chapter.id]);

  const handleAddChapterComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')} - ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${now.getFullYear()}`;

    addComment({
      targetId: chapter.id,
      targetTitle: `${novel.title} - ${chapter.title}`,
      name: commentName.trim() || 'Bạn đọc giấu tên',
      avatar: commentAvatar,
      time: `Vừa xong (${timeString})`,
      text: commentText.trim(),
    });

    setCommentText('');
    setCommentSuccess('Bình luận của bạn đã được tự động hiển thị và lưu lại!');
    setTimeout(() => setCommentSuccess(null), 3000);
  };

  const isExtra = chapter.type === 'extra';

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = enteredPass.trim().toLowerCase();
    const correctPass = (chapter.passwordAnswer || 'laclac').toLowerCase();

    if (cleanInput === correctPass) {
      setIsUnlocked(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const currentIdx = novel.chapters.findIndex((c) => c.id === chapter.id);
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx >= 0 && currentIdx < novel.chapters.length - 1;

  const fontClasses = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    xl: 'text-xl leading-loose',
  };

  const themeClasses = {
    cream: 'bg-[#fefaf0] text-[#3e3436]',
    white: 'bg-white text-slate-800',
    night: 'bg-[#181824] text-[#e2e8f0]',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className={`relative w-full max-w-4xl rounded-3xl shadow-2xl border border-rose-200/60 dark:border-slate-700 transition-colors duration-200 overflow-hidden my-auto ${themeClasses[themeMode]}`}>
        
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-rose-100 dark:border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between text-slate-700 dark:text-slate-200">
          <div className="flex items-center gap-3 truncate">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              title="Quay lại"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="truncate">
              <h2 className="text-xs sm:text-sm font-semibold truncate text-rose-600 dark:text-rose-400">
                {novel.title}
              </h2>
              <div className="text-xs text-slate-500 truncate flex items-center gap-1.5">
                {isExtra ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    <Sparkles className="w-2.5 h-2.5" /> Phiên ngoại
                  </span>
                ) : (
                  <span>Chương {chapter.number}:</span>
                )}
                <span>{chapter.title}</span>
              </div>
            </div>
          </div>

          {/* Reading Customization Controls */}
          <div className="flex items-center gap-2">
            {/* Font size switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-xs font-semibold">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded ${fontSize === 'normal' ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-2xs' : 'text-slate-500'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded ${fontSize === 'large' ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-2xs' : 'text-slate-500'}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-1 rounded ${fontSize === 'xl' ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-2xs' : 'text-slate-500'}`}
              >
                A++
              </button>
            </div>

            {/* Background Theme Mode */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setThemeMode('cream')}
                className={`w-5 h-5 rounded-full bg-[#fefaf0] border border-amber-300 ${themeMode === 'cream' ? 'ring-2 ring-rose-400' : ''}`}
                title="Giấy kem ấm"
              />
              <button
                onClick={() => setThemeMode('white')}
                className={`w-5 h-5 rounded-full bg-white border border-slate-300 ${themeMode === 'white' ? 'ring-2 ring-rose-400' : ''}`}
                title="Trắng sáng"
              />
              <button
                onClick={() => setThemeMode('night')}
                className={`w-5 h-5 rounded-full bg-[#181824] border border-slate-700 ${themeMode === 'night' ? 'ring-2 ring-rose-400' : ''}`}
                title="Ban đêm"
              />
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-slate-800 text-slate-500 hover:text-rose-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chapter Body Container */}
        <div className="p-6 sm:p-12 max-w-3xl mx-auto min-h-[500px]">
          
          {/* Chapter Heading */}
          <div className="text-center mb-8 pb-6 border-b border-rose-100/60 dark:border-slate-800">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-xs font-cute text-rose-500 dark:text-rose-400 uppercase tracking-widest">
                {novel.title}
              </span>
              {isExtra && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Phiên Ngoại
                </span>
              )}
            </div>
            <h1 className="font-heading-romantic text-2xl sm:text-3xl font-bold mt-2 mb-3">
              {chapter.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs opacity-75">
              <span>Đăng ngày: {chapter.releaseDate}</span>
              <span>•</span>
              <span>{chapter.wordCount.toLocaleString()} chữ</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium">
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>{chapter.views.toLocaleString()} lượt đọc</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium text-rose-600 dark:text-rose-400">
                <Heart className={`w-3.5 h-3.5 ${likesCount > 0 ? 'fill-rose-500' : ''}`} />
                <span>{likesCount.toLocaleString()} tim</span>
              </span>
              {chapterRating > 0 && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{chapterRating.toFixed(1)} ★</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Locked Chapter Guard */}
          {!isUnlocked ? (
            <div className="my-10 p-6 sm:p-8 rounded-2xl border-2 border-dashed border-rose-300 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-950/30 text-center max-w-md mx-auto">
              <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 dark:bg-rose-900/60 flex items-center justify-center text-rose-500 mb-4 shadow-sm">
                <Lock className="w-7 h-7" />
              </div>
              
              <h3 className="font-heading-romantic text-xl font-bold text-rose-900 dark:text-rose-200 mb-2">
                Chương này được cài mật khẩu
              </h3>
              
              <p className="font-serif-dreamy text-xs text-rose-700/90 dark:text-rose-300 mb-4 leading-relaxed">
                {chapter.passwordHint || 'Vui lòng giải câu đố ở mục Password để lấy khóa mở chương truyện này.'}
              </p>

              <form onSubmit={handleUnlock} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={enteredPass}
                  onChange={(e) => {
                    setEnteredPass(e.target.value);
                    setPassError(false);
                  }}
                  placeholder="Nhập pass (viết thường, không dấu)..."
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                />

                {passError && (
                  <p className="text-xs text-rose-600 font-semibold">
                    Sai mật khẩu rồi bạn ơi! Hãy bấm "Xem gợi ý mật khẩu" bên dưới nhé.
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Mở khóa chương</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenPasswordHints}
                    className="px-4 py-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 font-medium text-xs hover:bg-amber-200 transition-colors flex items-center gap-1"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Xem gợi ý pass</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Unlocked Chapter Reading Content */
            <div className={`font-serif-dreamy ${fontClasses[fontSize]} whitespace-pre-line space-y-4`}>
              {chapter.content}
            </div>
          )}

          {/* Chapter Rating Widget (Đánh giá chương truyện) */}
          {isUnlocked && (
            <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-slate-800/80 border-2 border-amber-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <h4 className="font-heading-romantic text-sm font-bold text-amber-950 dark:text-amber-200">
                    Đánh giá chương truyện này
                  </h4>
                </div>
                <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5 text-center sm:text-left">
                  {chapterRatingCount > 0
                    ? `Điểm chương: ${chapterRating.toFixed(1)} ★ (${chapterRatingCount} bạn đọc chấm điểm)`
                    : 'Chưa có ai chấm điểm cho chương này. Hãy để lại đánh giá của bạn nhé!'}
                </p>
              </div>

              {/* Star controls */}
              <div className="flex flex-col items-center sm:items-end">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating || userRating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => handleRateChapter(star)}
                        className="p-1 transition-transform hover:scale-125 active:scale-95 cursor-pointer"
                        title={`${star} sao - ${ratingLabels[star]}`}
                      >
                        <Star
                          className={`w-5 h-5 transition-colors ${
                            isFilled
                              ? 'text-amber-400 fill-amber-400 drop-shadow-2xs'
                              : 'text-amber-200 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-[11px] font-medium text-amber-900 dark:text-amber-300 mt-0.5">
                  {hoverRating > 0
                    ? ratingLabels[hoverRating]
                    : userRating > 0
                    ? `Bạn đã chấm: ${userRating} sao`
                    : 'Chạm vào sao để đánh giá'}
                </span>
              </div>
            </div>
          )}

          {ratingSuccess && (
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 text-center font-medium animate-fadeIn">
              {ratingSuccess}
            </div>
          )}

          {/* Chapter Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-rose-100/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <button
              disabled={!hasPrev}
              onClick={() => hasPrev && onSwitchChapter(novel.chapters[currentIdx - 1])}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 border ${
                hasPrev
                  ? 'border-rose-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  : 'opacity-40 cursor-not-allowed border-transparent'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Chương trước</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleLike}
                className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                  liked
                    ? 'bg-rose-500 text-white border-rose-500 scale-105'
                    : 'border-rose-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-white' : 'text-rose-500'}`} />
                <span>{liked ? `Đã thả tim (${likesCount})` : `Thả tim (${likesCount})`}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="px-3 py-2 rounded-xl border border-rose-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-800 flex items-center gap-1.5"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Đã sao chép' : 'Chia sẻ'}</span>
              </button>
            </div>

            <button
              disabled={!hasNext}
              onClick={() => hasNext && onSwitchChapter(novel.chapters[currentIdx + 1])}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white shadow-xs ${
                !hasNext ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <span>Chương sau</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Reader Chapter Comments Section */}
          <div className="mt-10 pt-8 border-t border-rose-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading-romantic text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <MessageSquare className="w-4 h-4 text-rose-500" />
                <span>Bình Luận Về Chương Này ({chapterComments.length})</span>
              </h3>
              <span className="text-[11px] text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-0.5 rounded-full border border-rose-200/60 dark:border-rose-900/60 flex items-center gap-1 font-medium">
                <Sparkles className="w-2.5 h-2.5 text-rose-500" /> Tự động lưu & hiển thị
              </span>
            </div>

            {commentSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{commentSuccess}</span>
              </div>
            )}

            {/* Comment Form */}
            <form onSubmit={handleAddChapterComment} className="p-4 rounded-2xl bg-rose-50/40 dark:bg-slate-800/80 border border-rose-200/80 dark:border-slate-700">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Tên hoặc biệt danh của bạn..."
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="flex-1 min-w-[150px] px-3 py-1.5 text-xs rounded-xl border border-rose-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                />
                {/* Sticker options */}
                <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-rose-100 dark:border-slate-700 overflow-x-auto">
                  {avatarOptions.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setCommentAvatar(emoji)}
                      className={`w-6 h-6 rounded-lg text-sm flex items-center justify-center transition-all ${
                        commentAvatar === emoji ? 'bg-rose-100 dark:bg-slate-800 shadow-2xs scale-110 ring-1 ring-rose-400' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={2}
                placeholder="Chia sẻ cảm nghĩ của bạn về chương này (bình luận sẽ tự động lưu và hiển thị ngay lập tức)..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-rose-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-400 mb-2 resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400">
                  ✨ Bình luận sẽ được tự động lưu vĩnh viễn trên blog
                </span>
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                    commentText.trim()
                      ? 'bg-rose-500 hover:bg-rose-600 text-white cursor-pointer'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi bình luận</span>
                </button>
              </div>
            </form>

            {/* List of comments for this chapter */}
            <div className="space-y-2.5">
              {chapterComments.length === 0 ? (
                <div className="text-center py-5 text-xs text-slate-400 italic">
                  Chưa có bình luận nào cho chương này. Hãy để lại vài dòng cảm nhận nhé! 💌
                </div>
              ) : (
                chapterComments.map((cm) => {
                  const likedCm = isCommentLiked(cm.id);
                  return (
                    <div
                      key={cm.id}
                      className="p-3 rounded-xl bg-white dark:bg-slate-850 dark:bg-slate-800/80 border border-rose-100 dark:border-slate-700 flex items-start gap-2.5 transition-all hover:border-rose-300 dark:hover:border-slate-600"
                    >
                      <span className="text-xl shrink-0 select-none">{cm.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                            {cm.name}
                          </span>
                          <span className="text-[10px] text-slate-400">{cm.time}</span>
                        </div>
                        <p className="font-serif-dreamy text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line break-words mb-1.5">
                          {cm.text}
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-rose-50/70 dark:border-slate-750 text-[11px]">
                          <button
                            onClick={() => toggleLikeComment(cm.id)}
                            className={`flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded-md ${
                              likedCm
                                ? 'text-rose-500 font-semibold bg-rose-50 dark:bg-rose-950/40'
                                : 'text-slate-400 hover:text-rose-500'
                            }`}
                          >
                            <Heart className={`w-3 h-3 ${likedCm ? 'fill-rose-500 text-rose-500' : ''}`} />
                            <span>{cm.likes || 0}</span>
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm('Xóa bình luận này?')) {
                                deleteComment(cm.id);
                              }
                            }}
                            className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                            title="Xóa bình luận"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Reader Comment / Warm message */}
          <div className="mt-8 p-4 rounded-2xl bg-rose-50/60 dark:bg-slate-850 dark:bg-slate-800/50 border border-rose-100 dark:border-slate-700 text-center">
            <p className="font-cute text-xs text-rose-600 dark:text-rose-300">
              💌 Cảm ơn bạn đã ghé thăm và ủng hộ bản dịch phi thương mại của Mellifluous!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
