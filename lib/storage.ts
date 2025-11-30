import { HollowPost, HollowReply, LocalUserState } from '@/types';

const POSTS_STORAGE_KEY = 'hollow_posts';
const REPLIES_STORAGE_KEY = 'hollow_replies';
const USER_STATE_STORAGE_KEY = 'hollow_user_state';

// 获取所有心事
export function getPosts(): HollowPost[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(POSTS_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// 保存心事
export function savePost(post: HollowPost): void {
  if (typeof window === 'undefined') return;
  const posts = getPosts();
  posts.push(post);
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
}

// 获取公开的心事
export function getPublicPosts(): HollowPost[] {
  return getPosts().filter(post => post.visibility === 'public');
}

// 获取用户的所有心事
export function getUserPosts(): HollowPost[] {
  // 这里简化处理，实际应该根据用户ID过滤
  return getPosts();
}

// 根据ID获取心事
export function getPostById(id: string): HollowPost | null {
  const posts = getPosts();
  return posts.find(post => post.id === id) || null;
}

// 获取回应的存储函数（预留）
export function getRepliesByPostId(postId: string): HollowReply[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(REPLIES_STORAGE_KEY);
  const replies: HollowReply[] = data ? JSON.parse(data) : [];
  return replies.filter(reply => reply.postId === postId);
}

export function saveReply(reply: HollowReply): void {
  if (typeof window === 'undefined') return;
  const allReplies = JSON.parse(localStorage.getItem(REPLIES_STORAGE_KEY) || '[]');
  allReplies.push(reply);
  localStorage.setItem(REPLIES_STORAGE_KEY, JSON.stringify(allReplies));
}

// 用户状态管理
export function getUserState(): LocalUserState {
  if (typeof window === 'undefined') return { understoodPostIds: [] };
  const data = localStorage.getItem(USER_STATE_STORAGE_KEY);
  return data ? JSON.parse(data) : { understoodPostIds: [] };
}

export function saveUserState(state: LocalUserState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_STATE_STORAGE_KEY, JSON.stringify(state));
}

export function toggleUnderstand(postId: string): void {
  const state = getUserState();
  const index = state.understoodPostIds.indexOf(postId);
  if (index > -1) {
    state.understoodPostIds.splice(index, 1);
  } else {
    state.understoodPostIds.push(postId);
  }
  saveUserState(state);
}

export function isUnderstood(postId: string): boolean {
  const state = getUserState();
  return state.understoodPostIds.includes(postId);
}

// 初始化 mock 数据（仅用于开发演示）
export function initMockData(): void {
  if (typeof window === 'undefined') return;
  const existingPosts = getPosts();
  if (existingPosts.length > 0) return; // 已有数据，不初始化

  const mockPosts: HollowPost[] = [
    {
      id: '1',
      content: '今天又下雨了，心情也跟着湿漉漉的。有时候觉得，情绪就像天气一样，不受控制。',
      mood: 'confused',
      visibility: 'public',
      allowReply: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      stats: { understandCount: 3 },
    },
    {
      id: '2',
      content: '感谢今天遇到的每一个善意。虽然很小，但足够温暖。',
      mood: 'grateful',
      visibility: 'public',
      allowReply: true,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      stats: { understandCount: 1 },
    },
    {
      id: '3',
      content: '有时候觉得，一个人待着也挺好的。不需要解释，不需要迎合。',
      mood: 'justWrite',
      visibility: 'public',
      allowReply: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      stats: { understandCount: 5 },
    },
  ];

  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(mockPosts));
}

