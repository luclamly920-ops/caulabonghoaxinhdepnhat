import { CommentItem } from '../types';

const STORAGE_KEY = 'mellifluous_blog_comments_v1';
const LIKED_COMMENTS_KEY = 'mellifluous_liked_comments_v1';

const INITIAL_GUESTBOOK_COMMENTS: CommentItem[] = [
  {
    id: 'seed-1',
    targetId: 'guestbook',
    targetTitle: 'Sổ lưu bút mùa hè',
    name: 'Hạ Vy',
    avatar: '🍓',
    time: '14:20 hôm nay',
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    text: 'Ghé thăm nhà của Mellifluous! Giao diện hoa anh đào rơi và những lá thư nghiêng nghiêng xinh xỉu luôn á!',
    likes: 12,
  },
  {
    id: 'seed-2',
    targetId: 'guestbook',
    targetTitle: 'Sổ lưu bút mùa hè',
    name: 'Nắng Tháng Sáu',
    avatar: '🌻',
    time: 'Hôm qua',
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    text: 'Bộ "Khắc tên anh lên bia mộ của em" văn án bánh cuốn thực sự. Cảm ơn Mellifluous đã chăm chỉ dịch truyện cho tụi mình nhé!',
    likes: 8,
  },
  {
    id: 'seed-3',
    targetId: 'guestbook',
    targetTitle: 'Sổ lưu bút mùa hè',
    name: 'Tiểu Mộc',
    avatar: '🍃',
    time: '3 ngày trước',
    createdAt: Date.now() - 1000 * 60 * 60 * 72,
    text: 'Pass chú mèo Lạc Lạc đáng yêu ghê. Đặt gạch hóng thêm các chương mới của bộ Bức Thư Tình Mười Bảy Tuổi nha!',
    likes: 15,
  },
  {
    id: 'seed-c6-1',
    targetId: 'c6-1',
    targetTitle: 'Khắc tên anh lên bia mộ của em - Chương 1',
    name: 'Mây Mùa Thu',
    avatar: '🎐',
    time: 'Vừa xong',
    createdAt: Date.now() - 1000 * 60 * 30,
    text: 'Mở đầu bí ẩn và cuốn hút quá! Hóng chương tiếp theo từng ngày luôn ạ 🌸',
    likes: 6,
  },
];

export const getStoredComments = (): CommentItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GUESTBOOK_COMMENTS));
      return INITIAL_GUESTBOOK_COMMENTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_GUESTBOOK_COMMENTS;
  } catch (err) {
    console.error('Error reading comments from localStorage:', err);
    return INITIAL_GUESTBOOK_COMMENTS;
  }
};

export const saveComments = (comments: CommentItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    window.dispatchEvent(new Event('blog_comments_updated'));
  } catch (err) {
    console.error('Error saving comments to localStorage:', err);
  }
};

export const addComment = (
  newCommentData: Omit<CommentItem, 'id' | 'createdAt' | 'likes'>
): CommentItem => {
  const current = getStoredComments();
  const newComment: CommentItem = {
    ...newCommentData,
    id: `cm-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    createdAt: Date.now(),
    likes: 0,
  };

  const updated = [newComment, ...current];
  saveComments(updated);
  return newComment;
};

export const toggleLikeComment = (commentId: string): { liked: boolean; count: number } => {
  try {
    const rawLiked = localStorage.getItem(LIKED_COMMENTS_KEY);
    const likedSet = new Set<string>(rawLiked ? JSON.parse(rawLiked) : []);

    const comments = getStoredComments();
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return { liked: false, count: 0 };

    let isLiked = false;
    if (likedSet.has(commentId)) {
      likedSet.delete(commentId);
      comment.likes = Math.max(0, comment.likes - 1);
      isLiked = false;
    } else {
      likedSet.add(commentId);
      comment.likes += 1;
      isLiked = true;
    }

    localStorage.setItem(LIKED_COMMENTS_KEY, JSON.stringify(Array.from(likedSet)));
    saveComments(comments);
    return { liked: isLiked, count: comment.likes };
  } catch (err) {
    console.error('Error toggling like on comment:', err);
    return { liked: false, count: 0 };
  }
};

export const isCommentLiked = (commentId: string): boolean => {
  try {
    const rawLiked = localStorage.getItem(LIKED_COMMENTS_KEY);
    if (!rawLiked) return false;
    const likedSet = new Set<string>(JSON.parse(rawLiked));
    return likedSet.has(commentId);
  } catch {
    return false;
  }
};

export const deleteComment = (commentId: string) => {
  const current = getStoredComments();
  const updated = current.filter((c) => c.id !== commentId);
  saveComments(updated);
};
