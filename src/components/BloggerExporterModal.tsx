import React, { useState } from 'react';
import { X, Code, Copy, Check, Info, FileCode, CheckCircle2 } from 'lucide-react';
import { BLOGGER_TEMPLATE_SNIPPET } from '../data/blogData';

interface BloggerExporterModalProps {
  onClose: () => void;
}

export const BloggerExporterModal: React.FC<BloggerExporterModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'widget' | 'guide'>('widget');

  const handleCopy = () => {
    navigator.clipboard?.writeText(BLOGGER_TEMPLATE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 dark:from-slate-800 dark:to-slate-900 border-b border-emerald-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading-romantic text-xl font-bold text-slate-800 dark:text-slate-100">
                Mã Code Dành Cho Blogger Bản Miễn Phí (Free)
              </h2>
              <p className="font-cute text-xs text-emerald-700 dark:text-emerald-400">
                Tối ưu hóa sẵn sàng cho người thiết kế web nghiệp dư dễ dàng sao chép
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 pt-3 bg-slate-50 dark:bg-slate-900/50">
          <button
            onClick={() => setSelectedTab('widget')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              selectedTab === 'widget'
                ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Mã HTML/CSS Hoàn Chỉnh Cho Blogger
          </button>
          <button
            onClick={() => setSelectedTab('guide')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              selectedTab === 'guide'
                ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            3 Bước Cài Đặt Vào Blogger (Dễ Dàng)
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {selectedTab === 'widget' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-emerald-500" />
                  Code HTML + CSS + Responsive tương thích 100% Blogger Free
                </span>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Đã sao chép vào bộ nhớ tạm!' : 'Sao chép toàn bộ mã'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed overflow-x-auto max-h-[360px] border border-slate-700">
                  {BLOGGER_TEMPLATE_SNIPPET}
                </pre>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Đoạn mã này đã bao gồm toàn bộ style cánh hoa anh đào, các bức thư tình nghiêng lồng ghép, font chữ Lora / Playfair Display hỗ trợ tiếng Việt và nội dung giới thiệu của bạn.
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-slate-800/80 border border-emerald-200 dark:border-slate-700">
                <h3 className="font-heading-romantic text-base font-bold text-emerald-900 dark:text-emerald-300 mb-2">
                  Hướng Dẫn Cài Đặt Vào Blogger Bản Free:
                </h3>
                <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-slate-900 dark:text-white">Truy cập quản trị Blogger:</strong>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                        Mở <a href="https://blogger.com" target="_blank" rel="noreferrer" className="text-emerald-600 underline">Blogger.com</a> và đăng nhập tài khoản của bạn, chọn trang blog bạn muốn cài đặt.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-slate-900 dark:text-white">Thêm tiện ích (Gadget):</strong>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                        Ở thanh menu bên trái, nhấp vào <strong>Bố cục (Layout)</strong> ➔ Tìm vị trí muốn đặt (ở đầu trang hoặc phần Thân) ➔ Nhấp vào <strong>Thêm tiện ích (Add a Gadget)</strong> ➔ Chọn loại <strong>HTML/JavaScript</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-slate-900 dark:text-white">Dán mã và Lưu:</strong>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                        Nhấn nút <strong>"Sao chép toàn bộ mã"</strong> ở tab bên cạnh, sau đó dán (Paste) vào ô nội dung của tiện ích HTML/JavaScript rồi nhấn <strong>Lưu (Save)</strong>!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleCopy}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Sao chép mã ngay</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
