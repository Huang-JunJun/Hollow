'use client';

import { useState, useEffect } from 'react';
import { HollowReply } from '@/types';
import { getRepliesByPostId, saveReply } from '@/lib/storage';
import { formatRelativeTime } from '@/lib/utils';
import { containsSensitiveWords } from '@/lib/utils';

interface ReplySectionProps {
  postId: string;
  allowReply: boolean;
}

export default function ReplySection({ postId, allowReply }: ReplySectionProps) {
  const [replies, setReplies] = useState<HollowReply[]>([]);
  const [replyContent, setReplyContent] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadedReplies = getRepliesByPostId(postId);
    // 按时间排序（最新的在前）
    const sortedReplies = [...loadedReplies].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setReplies(sortedReplies);
  }, [postId]);

  const handleSubmitReply = () => {
    if (!replyContent.trim()) {
      return;
    }

    if (replyContent.length > 50) {
      alert('回应内容不能超过 50 字');
      return;
    }

    // 敏感词检查
    if (containsSensitiveWords(replyContent)) {
      alert('内容包含敏感词，请修改后再提交。');
      return;
    }

    setIsSubmitting(true);

    const newReply: HollowReply = {
      id: Date.now().toString(),
      postId,
      content: replyContent.trim(),
      createdAt: new Date().toISOString(),
    };

    saveReply(newReply);
    setReplies([newReply, ...replies]);
    setReplyContent('');
    setShowReplyInput(false);
    setIsSubmitting(false);
  };

  if (!allowReply && replies.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      {/* 回应列表 */}
      {replies.length > 0 && (
        <div className="mb-4 space-y-3">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed animate-fade-in"
            >
              <p className="whitespace-pre-wrap">{reply.content}</p>
              <span className="text-xs text-gray-400 mt-1 block">
                {formatRelativeTime(reply.createdAt)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 添加回应 */}
      {allowReply && (
        <div>
          {!showReplyInput ? (
            <button
              onClick={() => setShowReplyInput(true)}
              className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
            >
              写一条回应
            </button>
          ) : (
            <div className="space-y-2">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="写下你的回应（最多 50 字）"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
                rows={2}
                maxLength={50}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{replyContent.length} / 50</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowReplyInput(false);
                      setReplyContent('');
                    }}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleSubmitReply}
                    disabled={isSubmitting || !replyContent.trim()}
                    className="px-3 py-1 text-sm bg-primary-500 text-white rounded-button hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '提交中...' : '提交'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

