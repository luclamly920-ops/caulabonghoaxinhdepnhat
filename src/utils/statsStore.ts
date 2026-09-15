import { Novel, Chapter, VisitorStats } from '../types';

const STATS_STORAGE_KEY = 'mellifluous_blog_stats_v2';
const INTERACTIONS_STORAGE_KEY = 'mellifluous_user_interactions_v2';
const VISITOR_STORAGE_KEY = 'mellifluous_visitor_stats_v2';

export interface ChapterStats {
  views: number;
  likes: number;
  ratingSum: number;
  ratingCount: number;
}

export interface NovelStats {
  views: number;
  favorites: number;
  ratingSum: number;
  ratingCount: number;
  chapterStats: Record<string, ChapterStats>;
}

export interface AllNovelStats {
  [novelId: string]: NovelStats;
}

export interface UserInteractions {
  favoritedNovels: string[];
  likedChapters: string[];
  ratedNovels: Record<string, number>;
  ratedChapters: Record<string, number>;
}

interface StoredVisitorStats {
  todayViews: number;
  totalViews: number;
  lastDate: string;
}

// Get current date string YYYY-MM-DD
const getTodayDateString = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
};

// 1. VISITOR STATS (Lượt ghé thăm website)
export const getVisitorStats = (): VisitorStats => {
  try {
    const raw = localStorage.getItem(VISITOR_STORAGE_KEY);
    const todayStr = getTodayDateString();
    if (!raw) {
      return {
        onlineCount: 1,
        todayViews: 0,
        totalViews: 0,
      };
    }
    const parsed: StoredVisitorStats = JSON.parse(raw);
    const isSameDay = parsed.lastDate === todayStr;
    return {
      onlineCount: 1,
      todayViews: isSameDay ? parsed.todayViews : 0,
      totalViews: parsed.totalViews || 0,
    };
  } catch {
    return {
      onlineCount: 1,
      todayViews: 0,
      totalViews: 0,
    };
  }
};

export const recordSiteVisit = (): VisitorStats => {
  const todayStr = getTodayDateString();
  let current = getVisitorStats();
  
  // Increment visit counts
  const newTodayViews = current.todayViews + 1;
  const newTotalViews = current.totalViews + 1;

  const toSave: StoredVisitorStats = {
    todayViews: newTodayViews,
    totalViews: newTotalViews,
    lastDate: todayStr,
  };

  try {
    localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(toSave));
    window.dispatchEvent(new Event('blog_stats_updated'));
  } catch (err) {
    console.error('Error saving visitor stats:', err);
  }

  return {
    onlineCount: 1,
    todayViews: newTodayViews,
    totalViews: newTotalViews,
  };
};

// 2. USER INTERACTIONS (Lưu các truyện đã tim, đã đánh giá trên thiết bị này)
export const getUserInteractions = (): UserInteractions => {
  try {
    const raw = localStorage.getItem(INTERACTIONS_STORAGE_KEY);
    if (!raw) {
      return {
        favoritedNovels: [],
        likedChapters: [],
        ratedNovels: {},
        ratedChapters: {},
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      favoritedNovels: [],
      likedChapters: [],
      ratedNovels: {},
      ratedChapters: {},
    };
  }
};

const saveUserInteractions = (interactions: UserInteractions) => {
  try {
    localStorage.setItem(INTERACTIONS_STORAGE_KEY, JSON.stringify(interactions));
    window.dispatchEvent(new Event('blog_stats_updated'));
  } catch (err) {
    console.error('Error saving user interactions:', err);
  }
};

// 3. NOVEL DYNAMIC STATS (Lưu lượt xem, tim, đánh giá tất cả tác phẩm và chương)
export const getStoredNovelStats = (): AllNovelStats => {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const saveStoredNovelStats = (stats: AllNovelStats) => {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    window.dispatchEvent(new Event('blog_stats_updated'));
  } catch (err) {
    console.error('Error saving novel stats:', err);
  }
};

const ensureNovelStats = (allStats: AllNovelStats, novelId: string): NovelStats => {
  if (!allStats[novelId]) {
    allStats[novelId] = {
      views: 0,
      favorites: 0,
      ratingSum: 0,
      ratingCount: 0,
      chapterStats: {},
    };
  }
  return allStats[novelId];
};

const ensureChapterStats = (novelStats: NovelStats, chapterId: string): ChapterStats => {
  if (!novelStats.chapterStats[chapterId]) {
    novelStats.chapterStats[chapterId] = {
      views: 0,
      likes: 0,
      ratingSum: 0,
      ratingCount: 0,
    };
  }
  return novelStats.chapterStats[chapterId];
};

// Record view on a novel (khi nhấp vào truyện xem mục lục)
export const recordNovelView = (novelId: string) => {
  const allStats = getStoredNovelStats();
  const novel = ensureNovelStats(allStats, novelId);
  novel.views += 1;
  saveStoredNovelStats(allStats);
};

// Record view on a specific chapter (khi mở đọc chương truyện)
export const recordChapterView = (novelId: string, chapterId: string) => {
  const allStats = getStoredNovelStats();
  const novel = ensureNovelStats(allStats, novelId);
  const chapter = ensureChapterStats(novel, chapterId);
  
  chapter.views += 1;
  novel.views += 1; // reading a chapter also increments novel total views
  saveStoredNovelStats(allStats);
};

// Toggle favorite on novel (Thả tim truyện)
export const toggleNovelFavorite = (novelId: string): { isFavorited: boolean; count: number } => {
  const user = getUserInteractions();
  const allStats = getStoredNovelStats();
  const novel = ensureNovelStats(allStats, novelId);

  const isFavorited = user.favoritedNovels.includes(novelId);
  if (isFavorited) {
    user.favoritedNovels = user.favoritedNovels.filter((id) => id !== novelId);
    novel.favorites = Math.max(0, novel.favorites - 1);
  } else {
    user.favoritedNovels.push(novelId);
    novel.favorites += 1;
  }

  saveUserInteractions(user);
  saveStoredNovelStats(allStats);

  return {
    isFavorited: !isFavorited,
    count: novel.favorites,
  };
};

export const isNovelFavorited = (novelId: string): boolean => {
  const user = getUserInteractions();
  return user.favoritedNovels.includes(novelId);
};

// Rate a novel (Đánh giá sao cho tác phẩm 1 - 5 sao)
export const rateNovel = (
  novelId: string,
  stars: number
): { average: number; count: number } => {
  const clampedStars = Math.max(1, Math.min(5, Math.round(stars)));
  const user = getUserInteractions();
  const allStats = getStoredNovelStats();
  const novel = ensureNovelStats(allStats, novelId);

  const previousUserRating = user.ratedNovels[novelId];

  if (previousUserRating !== undefined) {
    // User already rated, update their vote
    novel.ratingSum = novel.ratingSum - previousUserRating + clampedStars;
  } else {
    // New vote
    novel.ratingSum += clampedStars;
    novel.ratingCount += 1;
  }

  user.ratedNovels[novelId] = clampedStars;

  saveUserInteractions(user);
  saveStoredNovelStats(allStats);

  const avg = novel.ratingCount > 0 ? Number((novel.ratingSum / novel.ratingCount).toFixed(1)) : 0;

  return {
    average: avg,
    count: novel.ratingCount,
  };
};

export const getUserNovelRating = (novelId: string): number => {
  const user = getUserInteractions();
  return user.ratedNovels[novelId] || 0;
};

// Toggle like on chapter (Thả tim chương)
export const toggleChapterLike = (
  novelId: string,
  chapterId: string
): { isLiked: boolean; count: number } => {
  const user = getUserInteractions();
  const allStats = getStoredNovelStats();
  const novel = ensureNovelStats(allStats, novelId);
  const chapter = ensureChapterStats(novel, chapterId);

  const isLiked = user.likedChapters.includes(chapterId);
  if (isLiked) {
    user.likedChapters = user.likedChapters.filter((id) => id !== chapterId);
    chapter.likes = Math.max(0, chapter.likes - 1);
  } else {
    user.likedChapters.push(chapterId);
    chapter.likes += 1;
  }

  saveUserInteractions(user);
  saveStoredNovelStats(allStats);

  return {
    isLiked: !isLiked,
    count: chapter.likes,
  };
};

export const isChapterLiked = (chapterId: string): boolean => {
  const user = getUserInteractions();
  return user.likedChapters.includes(chapterId);
};

// Rate a chapter (Đánh giá sao cho chương truyện 1 - 5 sao)
export const rateChapter = (
  novelId: string,
  chapterId: string,
  stars: number
): { average: number; count: number } => {
  const clampedStars = Math.max(1, Math.min(5, Math.round(stars)));
  const user = getUserInteractions();
  const allStats = getStoredNovelStats();
  const novel = ensureNovelStats(allStats, novelId);
  const chapter = ensureChapterStats(novel, chapterId);

  const previousRating = user.ratedChapters[chapterId];
  if (previousRating !== undefined) {
    chapter.ratingSum = chapter.ratingSum - previousRating + clampedStars;
  } else {
    chapter.ratingSum += clampedStars;
    chapter.ratingCount += 1;
  }

  user.ratedChapters[chapterId] = clampedStars;

  saveUserInteractions(user);
  saveStoredNovelStats(allStats);

  const avg = chapter.ratingCount > 0 ? Number((chapter.ratingSum / chapter.ratingCount).toFixed(1)) : 0;
  return {
    average: avg,
    count: chapter.ratingCount,
  };
};

export const getUserChapterRating = (chapterId: string): number => {
  const user = getUserInteractions();
  return user.ratedChapters[chapterId] || 0;
};

// Enhance a base Novel object with real-time dynamic stats (views, favorites, ratings)
export const enhanceNovel = (baseNovel: Novel, allStats?: AllNovelStats): Novel => {
  const stats = (allStats && typeof allStats === 'object') ? allStats : getStoredNovelStats();
  const novelDynamic = stats[baseNovel.id];

  const views = novelDynamic ? novelDynamic.views : 0;
  const favorites = novelDynamic ? novelDynamic.favorites : 0;
  const ratingCount = novelDynamic ? novelDynamic.ratingCount : 0;
  const rating =
    ratingCount > 0 && novelDynamic
      ? Number((novelDynamic.ratingSum / ratingCount).toFixed(1))
      : 0;

  // Enhance chapters
  const enhancedChapters: Chapter[] = baseNovel.chapters.map((ch) => {
    const chDynamic = novelDynamic?.chapterStats?.[ch.id];
    const chViews = chDynamic ? chDynamic.views : 0;
    const chLikes = chDynamic ? chDynamic.likes : 0;
    const chRatingCount = chDynamic ? chDynamic.ratingCount : 0;
    const chRating =
      chRatingCount > 0 && chDynamic
        ? Number((chDynamic.ratingSum / chRatingCount).toFixed(1))
        : 0;

    return {
      ...ch,
      views: chViews,
      likes: chLikes,
      rating: chRating,
      ratingCount: chRatingCount,
    };
  });

  return {
    ...baseNovel,
    views,
    favorites,
    rating,
    ratingCount,
    chapters: enhancedChapters,
  };
};

// Reset all stats to zero (chủ động làm mới toàn bộ dữ liệu về 0)
export const resetAllStatsToZero = () => {
  try {
    localStorage.removeItem(STATS_STORAGE_KEY);
    localStorage.removeItem(INTERACTIONS_STORAGE_KEY);
    localStorage.removeItem(VISITOR_STORAGE_KEY);
    window.dispatchEvent(new Event('blog_stats_updated'));
  } catch (err) {
    console.error('Error resetting stats:', err);
  }
};

export const resetAllDynamicStats = resetAllStatsToZero;
