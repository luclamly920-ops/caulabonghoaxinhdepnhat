import React, { useState } from 'react';
import { Heart, Users, Activity, Eye, Compass, Feather, RotateCcw, Check } from 'lucide-react';
import { VisitorStats } from '../types';
import { resetAllDynamicStats } from '../utils/statsStore';

interface FooterProps {
  stats: VisitorStats;
  onOpenBloggerCode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ stats, onOpenBloggerCode }) => {
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleReset = () => {
    resetAllDynamicStats();
    setResetConfirm(true);
    setTimeout(() => setResetConfirm(false), 2500);
  };
  return (
    <footer className="mt-20 border-t-2 border-rose-200/70 dark:border-slate-800 bg-gradient-to-b from-rose-50/60 via-amber-50/40 to-pink-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 py-12 transition-colors duration-300 relative overflow-hidden isolate w-full max-w-full">
      
      {/* Decorative blossom branch background hint */}
      <div className="absolute -bottom-10 left-10 text-8xl opacity-10 select-none pointer-events-none">
        🌸
      </div>
      <div className="absolute -bottom-10 right-10 text-8xl opacity-10 select-none pointer-events-none">
        🎐
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        
        {/* Top Section: Brand + Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-rose-100 dark:border-slate-800 text-center md:text-left">
          
          {/* Col 1: Blog Identity */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-xl">🌸</span>
              <h3 className="font-heading-romantic text-xl font-bold text-rose-600 dark:text-rose-300">
                better and better
              </h3>
            </div>
            <p className="font-cute text-xs text-amber-700 dark:text-amber-400 mb-2">
              ━ Một chiếc thuyền nhỏ lênh đênh ngược gió
            </p>
            <p className="font-serif-dreamy text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              Trang phụ chia sẻ các bộ truyện ngôn tình thanh xuân, học đường, tình cảm mùa hè ngọt ngào và chữa lành tâm hồn.
            </p>
          </div>

          {/* Col 2: PHẦN LIÊN HỆ: Facebook, WordPress, Wattpad */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-heading-romantic text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Feather className="w-4 h-4 text-rose-500" />
              <span>Ghé Thăm Mellifluous Tại</span>
            </h4>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3">
              {/* Facebook Icon Button */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 shadow-2xs hover:shadow-sm transition-all"
                title="Facebook Trang Chính"
              >
                <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600">Facebook</span>
              </a>

              {/* WordPress Icon Button */}
              <a
                href="https://wordpress.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-sky-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 shadow-2xs hover:shadow-sm transition-all"
                title="WordPress Blog Nhà Chính"
              >
                <svg className="w-4 h-4 fill-[#21759B]" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm-1.077 18.397L7.33 8.358c.884-.047 1.722-.14 1.722-.14.698-.093.605-1.117-.093-1.07 0 0-2.093.186-3.442.186-.326 0-.745-.047-1.163-.093C6.326 4.372 8.977 2.79 12 2.79c2.418 0 4.605.977 6.186 2.558-.093 0-.186.047-.28.047-1.162.511-1.906 1.488-1.906 2.65 0 .977.558 1.815 1.116 2.745.419.744.79 1.628.79 2.79 0 .838-.325 1.815-.651 2.977l-2.418 7.256c.093.047.186.093.28.14-1.024.372-2.14.605-3.303.605-1.163 0-2.279-.233-3.302-.605l.418-.14zm-5.767-6.397c0 1.256.326 2.465.884 3.535l4.372-12.047c-3.116 1.442-5.256 4.744-5.256 8.512zm13.116 3.674c.605-1.72.93-3.627.93-5.209 0-1.814-.418-3.488-1.163-4.977l3.814 10.744c-.93 1.488-2.186 2.698-3.581 3.582l-.001-.14 0-.001-.001.001z"/>
                </svg>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-sky-600">WordPress</span>
              </a>

              {/* Wattpad Icon Button */}
              <a
                href="https://wattpad.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-500 shadow-2xs hover:shadow-sm transition-all"
                title="Wattpad @Mellifluous"
              >
                <span className="w-4 h-4 rounded-full bg-[#FF6122] text-white flex items-center justify-center text-[10px] font-bold">W</span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-orange-600">Wattpad</span>
              </a>
            </div>

            <button
              onClick={onOpenBloggerCode}
              className="mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>✦ Bạn là người thiết kế web? Lấy mã Blogger tại đây</span>
            </button>
          </div>

          {/* Col 3: BỘ ĐẾM NGƯỜI TRUY CẬP (Visitor counter) */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-heading-romantic text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>Bộ Đếm Người Truy Cập</span>
            </h4>

            <div className="bg-white/95 dark:bg-slate-800/90 rounded-2xl border-2 border-rose-100 dark:border-slate-700 p-3.5 shadow-xs w-full max-w-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Đang online:</span>
                </span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  {stats.onlineCount} bạn đọc
                </strong>
              </div>

              <div className="flex items-center justify-between text-xs pt-1.5 border-t border-rose-50 dark:border-slate-700/60">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <Eye className="w-3.5 h-3.5 text-rose-500" />
                  <span>Lượt ghé hôm nay:</span>
                </span>
                <strong className="text-slate-800 dark:text-slate-100 font-mono font-bold">
                  {stats.todayViews.toLocaleString()}
                </strong>
              </div>

              <div className="flex items-center justify-between text-xs pt-1.5 border-t border-rose-50 dark:border-slate-700/60">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <Users className="w-3.5 h-3.5 text-sky-500" />
                  <span>Tổng lượt truy cập:</span>
                </span>
                <strong className="text-rose-600 dark:text-rose-300 font-mono font-bold">
                  {stats.totalViews.toLocaleString()}
                </strong>
              </div>
            </div>

            {/* Đưa tất cả về '0' button */}
            <div className="mt-2 text-right w-full max-w-xs">
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 flex items-center gap-1 justify-end ml-auto transition-colors"
                title="Đặt lại toàn bộ lượt đọc, lượt truy cập, đánh giá, yêu thích về 0"
              >
                {resetConfirm ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Đã đưa tất cả về 0!</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3 h-3" />
                    <span>Đưa tất cả chỉ số về "0"</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2 text-center sm:text-left">
          <p>
            © 2026 <strong className="text-rose-600 dark:text-rose-400">better and better</strong> ━ Mellifluous. All rights reserved.
          </p>
          <p className="font-cute text-rose-500 dark:text-rose-400">
            Truyện chuyển ngữ phi thương mại dưới sự đồng ý của tác giả. Không reup.
          </p>
        </div>

      </div>
    </footer>
  );
};
