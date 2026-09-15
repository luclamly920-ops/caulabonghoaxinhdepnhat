export interface Chapter {
  id: string;
  number: number;
  title: string;
  releaseDate: string;
  isLocked: boolean;
  passwordHint?: string;
  passwordAnswer?: string;
  wordCount: number;
  views: number;
  likes?: number;
  rating?: number;
  ratingCount?: number;
  content: string;
  type?: 'main' | 'extra'; // 'main' = Chính truyện (mặc định), 'extra' = Phiên ngoại
}

export interface Novel {
  id: string;
  title: string;
  originalTitle: string;
  author: string;
  translator: string;
  status: 'completed' | 'ongoing'; // 'completed' = Đã hoàn thành, 'ongoing' = Chưa hoàn thành
  category: string; // e.g., 'Thanh xuân vườn trường', 'Ngọt sủng', 'Chữa lành'
  tags: string[];
  coverColor: string;
  coverImage?: string;
  summary: string;
  totalChapters: number;
  completedChapters: number;
  rating: number;
  ratingCount?: number;
  views: number;
  favorites: number;
  lastUpdated: string;
  passwordNotice?: string;
  chapters: Chapter[];
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  badge: string;
  badgeColor: string;
  content: string;
  isPinned?: boolean;
}

export interface PasswordHint {
  id: string;
  novelId: string;
  novelTitle: string;
  chapterRange: string;
  question: string;
  formatNotice: string;
  hint: string;
  solvedKey: string;
}

export interface VisitorStats {
  onlineCount: number;
  todayViews: number;
  totalViews: number;
}

export interface CommentItem {
  id: string;
  targetId: string; // 'guestbook' hoặc ID chương (ví dụ 'c6-1')
  targetTitle?: string; // Tên vị trí (ví dụ 'Sổ lưu bút mùa hè' hoặc 'Khắc tên anh lên bia mộ của em - Chương 1')
  name: string;
  avatar: string;
  time: string;
  createdAt: number;
  text: string;
  likes: number;
}
