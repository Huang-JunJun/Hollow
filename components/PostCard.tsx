'use client';

import { HollowPost } from '@/types';
import { formatRelativeTime, truncateText } from '@/lib/utils';
import { MOOD_TAG_LABELS, MOOD_TAG_COLORS } from '@/types';
import { useState } from 'react';
import { toggleUnderstand, isUnderstood } from '@/lib/storage';
import ReplySection from './ReplySection';

interface PostCardProps {
  post: HollowPost;
  showFullContent?: boolean;
  onUnderstandChange?: () => void;
}

export default function PostCard({ post, showFullContent = false, onUnderstandChange }: PostCardProps) {
  const [isExpanded, setIsExpanded] = useState(showFullContent);
  const [understood, setUnderstood] = useState(isUnderstood(post.id));

  const shouldTruncate = post.content.length > 200 && !isExpanded;
  const displayContent = shouldTruncate ? truncateText(post.content, 200) : post.content;

  const handleUnderstand = () => {
    toggleUnderstand(post.id);
    setUnderstood(!understood);
    onUnderstandChange?.();
  };

  return (
    <article className="card animate-fade-in animate-slide-up mb-6">
      {/* 情绪标签 */}
      <div className="mb-3">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${MOOD_TAG_COLORS[post.mood]}`}>
          {MOOD_TAG_LABELS[post.mood]}
        </span>
      </div>

      {/* 内容 */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {displayContent}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-primary-600 text-sm mt-2 hover:underline"
          >
            展开全文
          </button>
        )}
      </div>

      {/* 元信息和交互 */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          {formatRelativeTime(post.createdAt)}
        </span>

        <div className="flex items-center gap-4">
          {post.stats && post.stats.understandCount > 0 && (
            <span className="text-xs text-gray-400">
              已有几个人懂了
            </span>
          )}
          <button
            onClick={handleUnderstand}
            className={`px-4 py-1.5 rounded-button text-sm font-medium transition-all duration-200 ${
              understood
                ? 'bg-primary-100 text-primary-700 border border-primary-300'
                : 'bg-white text-primary-600 border border-primary-300 hover:bg-primary-50'
            }`}
          >
            {understood ? '已懂' : '我懂'}
          </button>
        </div>
      </div>

      {/* 轻回应区域 */}
      <ReplySection postId={post.id} allowReply={post.allowReply} />
    </article>
  );
}

