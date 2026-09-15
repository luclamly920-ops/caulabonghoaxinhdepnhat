import React, { useState } from 'react';
import { KeyRound, HelpCircle, CheckCircle2, XCircle, Sparkles, BookOpen, AlertCircle, Copy, Check } from 'lucide-react';
import { PasswordHint } from '../types';

interface PasswordHintSectionProps {
  hints: PasswordHint[];
  onReadNovel: (novelId: string) => void;
}

export const PasswordHintSection: React.FC<PasswordHintSectionProps> = ({
  hints,
  onReadNovel,
}) => {
  const [testInputs, setTestInputs] = useState<Record<string, string>>({});
  const [testResults, setTestResults] = useState<Record<string, 'correct' | 'wrong' | null>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleTestPass = (hintId: string, solvedKey: string) => {
    const input = (testInputs[hintId] || '').trim().toLowerCase();
    if (!input) return;

    if (input === solvedKey.toLowerCase()) {
      setTestResults((prev) => ({ ...prev, [hintId]: 'correct' }));
    } else {
      setTestResults((prev) => ({ ...prev, [hintId]: 'wrong' }));
    }
  };

  const handleCopyKey = (keyText: string, hintId: string) => {
    navigator.clipboard?.writeText(keyText);
    setCopiedKey(hintId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section className="bg-white/90 dark:bg-slate-900/95 rounded-3xl border-2 border-sky-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sky-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-300 shadow-xs">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading-romantic text-2xl font-bold text-slate-900 dark:text-white">
              Gợi Ý Mật Khẩu (Password)
            </h2>
            <p className="font-cute text-xs text-sky-600 dark:text-sky-300">
              Bảo vệ công sức chuyển ngữ phi lợi nhuận của tác giả và dịch giả
            </p>
          </div>
        </div>

        {/* Rule badge */}
        <div className="bg-sky-100/70 dark:bg-slate-800 px-3.5 py-2 rounded-xl text-xs text-sky-900 dark:text-sky-200 border border-sky-200 dark:border-slate-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-sky-600 shrink-0" />
          <span>Quy ước chung: <strong>Chữ thường, không hoa, không dấu, viết liền</strong></span>
        </div>
      </div>

      {/* Hints List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {hints.map((hint, idx) => {
          const currentStatus = testResults[hint.id];

          return (
            <div
              key={hint.id}
              className="relative rounded-2xl border-2 border-sky-100 dark:border-slate-800 bg-white/95 dark:bg-slate-800/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between"
            >
              {/* Top Row: Novel Name & Chapter Range */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/70 px-2.5 py-1 rounded-full border border-sky-200 dark:border-sky-800">
                    Gợi ý #{idx + 1}
                  </span>
                  <span className="text-xs font-cute text-rose-500 dark:text-rose-400 font-semibold">
                    {hint.chapterRange}
                  </span>
                </div>

                <h3 className="font-serif-dreamy text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {hint.novelTitle}
                </h3>

                {/* Question */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-slate-900/80 border border-amber-200/80 dark:border-slate-700 mb-3">
                  <p className="font-serif-dreamy text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
                    ❓ {hint.question}
                  </p>
                </div>

                {/* Format Notice */}
                <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-2">
                  📌 Định dạng: {hint.formatNotice}
                </p>

                {/* Hint Clue */}
                <div className="text-xs text-sky-800 dark:text-sky-200 bg-sky-50/60 dark:bg-slate-900/80 p-2.5 rounded-lg border border-sky-100 dark:border-slate-700 mb-4">
                  💡 <strong>Gợi ý nhỏ:</strong> {hint.hint}
                </div>
              </div>

              {/* Interactive Test Field */}
              <div className="pt-3 border-t border-sky-50 dark:border-slate-700">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Thử kiểm tra mật khẩu của bạn..."
                    value={testInputs[hint.id] || ''}
                    onChange={(e) => {
                      setTestInputs({ ...testInputs, [hint.id]: e.target.value });
                      setTestResults({ ...testResults, [hint.id]: null });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleTestPass(hint.id, hint.solvedKey);
                      }
                    }}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-sky-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-850 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-sky-400"
                  />
                  <button
                    onClick={() => handleTestPass(hint.id, hint.solvedKey)}
                    className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
                  >
                    Kiểm tra
                  </button>
                </div>

                {/* Test Result Feedback */}
                {currentStatus === 'correct' && (
                  <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <span className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Chính xác! Bạn đã tìm ra mật khẩu.
                    </span>
                    <button
                      onClick={() => handleCopyKey(hint.solvedKey, hint.id)}
                      className="text-[11px] underline font-bold flex items-center gap-1"
                    >
                      {copiedKey === hint.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === hint.id ? 'Đã chép' : 'Sao chép pass'}</span>
                    </button>
                  </div>
                )}

                {currentStatus === 'wrong' && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-800">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span>Chưa đúng rồi! Hãy đọc kỹ gợi ý và kiểm tra lại nhé.</span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
