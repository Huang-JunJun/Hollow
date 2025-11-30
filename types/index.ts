export type MoodTag = 'anxious' | 'confused' | 'angry' | 'grateful' | 'justWrite';

export type Visibility = 'public' | 'private';

export interface HollowPost {
  id: string;
  content: string;
  mood: MoodTag;
  visibility: Visibility;
  allowReply: boolean;
  createdAt: string; // ISO string
  stats?: {
    understandCount: number;
  };
}

export interface HollowReply {
  id: string;
  postId: string;
  content: string;
  createdAt: string;
}

export interface LocalUserState {
  understoodPostIds: string[];
}

export const MOOD_TAG_LABELS: Record<MoodTag, string> = {
  anxious: '焦虑',
  confused: '迷茫',
  angry: '愤怒',
  grateful: '感恩',
  justWrite: '只是想写写',
};

export const MOOD_TAG_COLORS: Record<MoodTag, string> = {
  anxious: 'bg-orange-50 text-orange-700 border-orange-200',
  confused: 'bg-blue-50 text-blue-700 border-blue-200',
  angry: 'bg-red-50 text-red-700 border-red-200',
  grateful: 'bg-green-50 text-green-700 border-green-200',
  justWrite: 'bg-gray-50 text-gray-700 border-gray-200',
};

