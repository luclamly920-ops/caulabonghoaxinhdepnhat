import React, { useState, useEffect } from 'react';
import { HeartHandshake, MessageSquare, Send, Sparkles, HelpCircle, Heart, Star, Trash2, CheckCircle2 } from 'lucide-react';
import { CommentItem } from '../types';
import {
  getStoredComments,
  addComment,
  toggleLikeComment,
  isCommentLiked,
  deleteComment,
} from '../utils/commentStore';

export const OtherSection: React.FC = () => {
  const [guestComments, setGuestComments] = useState<CommentItem[]>([]);
  const [inputName, setInputName] = useState('');
  const [inputText, setInputText] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🌸');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const avatarOptions = ['🌸', '🍓', '🌻', '🍃', '🎐', '🍧', '💌', '🌙', '🐱', '✨'];

  // Load comments and subscribe to updates
  useEffect(() => {
    const loadComments = () => {
      const all = getStoredComments();
      // Filter guestbook comments
      const filtered = all.filter((c) => c.targetId === 'guestbook' || !c.targetId);
      setGuestComments(filtered);
    };

    loadComments();

    const handleUpdate = () => loadComments();
    window.addEventListener('blog_comments_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('blog_comments_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')} - ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${now.getFullYear()}`;

    addComment({
      targetId: 'guestbook',
      targetTitle: 'Sổ lưu bút mùa hè',
      name: inputName.trim() || 'Bạn đọc giấu tên',
      avatar: selectedAvatar,
      time: `Vừa xong (${timeString})`,
      text: inputText.trim(),
    });

    setInputText('');
    setToastMessage('Lời nhắn của bạn đã được tự động lưu và hiển thị công khai!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLike = (id: string) => {
    toggleLikeComment(id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
      deleteComment(id);
    }
  };

  return (
    <section className="bg-white/90 dark:bg-slate-900/95 rounded-3xl border-2 border-amber-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-amber-100 dark:border-slate-800">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-300 shadow-xs text-2xl">
          💌
        </div>
        <div>
          <h2 className="font-heading-romantic text-2xl font-bold text-slate-900 dark:text-white">
            Một Số Mục Khác: Lưu Bút & Góc Tâm Sự
          </h2>
          <p className="font-cute text-xs text-amber-700 dark:text-amber-300">
            Nơi gửi gắm những lời nhắn dịu dàng và những câu hỏi thường gặp
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        
        {/* Left Column: FAQ Card */}
        <div className="space-y-4">
          <h3 className="font-heading-romantic text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-rose-500" />
            <span>Câu Hỏi Thường Gặp (FAQ)</span>
          </h3>

          <div className="p-4 rounded-2xl bg-white/95 dark:bg-slate-800/90 border border-amber-100 dark:border-slate-700 space-y-3 text-xs">
            <div>
              <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                Q1: Tại sao truyện có mật khẩu?
              </h4>
              <p className="text-slate-600 dark:text-slate-300 font-serif-dreamy leading-relaxed">
                Mật khẩu chỉ áp dụng ở các chương cao trào hoặc ngoại truyện để hạn chế các trang reup tự động đánh cắp bản dịch, bảo vệ công sức người dịch.
              </p>
            </div>

            <div className="pt-2 border-t border-amber-50 dark:border-slate-700">
              <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                Q2: Blog có thu phí đọc truyện không?
              </h4>
              <p className="text-slate-600 dark:text-slate-300 font-serif-dreamy leading-relaxed">
                Hoàn toàn KHÔNG! Tất cả truyện được chuyển ngữ phi thương mại. Bạn chỉ cần giải các câu đố gợi ý vui vẻ là có thể đọc miễn phí 100%.
              </p>
            </div>

            <div className="pt-2 border-t border-amber-50 dark:border-slate-700">
              <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                Q3: Tớ có thể xin phép mang truyện đi nơi khác không?
              </h4>
              <p className="text-slate-600 dark:text-slate-300 font-serif-dreamy leading-relaxed">
                Tớ không đồng ý reup dưới bất kỳ hình thức nào. Vui lòng tôn trọng quyền sở hữu trí tuệ của tác giả và người dịch.
              </p>
            </div>
          </div>
        </div>

        {/* Middle & Right: Guestbook (Lưu bút) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading-romantic text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-500" />
              <span>Sổ Lưu Bút Mùa Hè ({guestComments.length})</span>
            </h3>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-900/60 flex items-center gap-1 font-medium">
              <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Tự động lưu & hiển thị
            </span>
          </div>

          {toastMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 transition-all">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Form to leave a message */}
          <form onSubmit={handleAddComment} className="p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-800/90 border border-amber-200 dark:border-slate-700 shadow-xs">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <input
                type="text"
                placeholder="Tên hoặc biệt danh của bạn..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="flex-1 min-w-[160px] px-3 py-1.5 text-xs rounded-xl border border-amber-200 dark:border-slate-700 bg-amber-50/40 dark:bg-slate-900 text-slate-850 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-300"
              />
              {/* Sticker selector */}
              <div className="flex items-center gap-1 bg-amber-50/70 dark:bg-slate-900 p-1 rounded-xl border border-amber-100 dark:border-slate-700 overflow-x-auto">
                {avatarOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedAvatar(emoji)}
                    className={`w-6 h-6 rounded-lg text-sm flex items-center justify-center transition-all ${
                      selectedAvatar === emoji ? 'bg-white dark:bg-slate-800 shadow-2xs scale-110 ring-1 ring-amber-400' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={2}
              placeholder="Gửi vài lời nhắn dịu dàng tới Mellifluous (lưu bút sẽ được lưu và hiển thị ngay lập tức)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-amber-200 dark:border-slate-700 bg-amber-50/40 dark:bg-slate-900 text-slate-850 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-300 mb-2 resize-none"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400">
                ✨ Bình luận sẽ được tự động lưu vĩnh viễn trên blog
              </span>
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                  inputText.trim()
                    ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi lời nhắn</span>
              </button>
            </div>
          </form>

          {/* Comment list */}
          <div className="space-y-3">
            {guestComments.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400 italic">
                Chưa có lời nhắn nào. Hãy là người đầu tiên để lại dấu ấn nhé! 🌸
              </div>
            ) : (
              guestComments.map((comment) => {
                const liked = isCommentLiked(comment.id);
                return (
                  <div
                    key={comment.id}
                    className="p-3.5 rounded-xl bg-white/95 dark:bg-slate-850 dark:bg-slate-800/90 border border-amber-100 dark:border-slate-700 flex items-start gap-3 transition-all hover:border-amber-300 dark:hover:border-slate-600"
                  >
                    <span className="text-2xl shrink-0 select-none">{comment.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          {comment.name}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-400">
                          {comment.time}
                        </span>
                      </div>
                      <p className="font-serif-dreamy text-xs text-slate-700 dark:text-slate-300 leading-relaxed break-words whitespace-pre-line mb-2">
                        {comment.text}
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-amber-50/80 dark:border-slate-750 text-[11px]">
                        <button
                          onClick={() => handleLike(comment.id)}
                          className={`flex items-center gap-1 transition-colors px-2 py-0.5 rounded-md ${
                            liked
                              ? 'text-rose-500 font-semibold bg-rose-50 dark:bg-rose-950/40'
                              : 'text-slate-400 hover:text-rose-500'
                          }`}
                        >
                          <Heart className={`w-3 h-3 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                          <span>{comment.likes || 0}</span>
                        </button>

                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1 rounded-sm"
                          title="Xóa bình luận này"
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

      </div>

    </section>
  );
};
