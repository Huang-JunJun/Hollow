'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoodTag, MOOD_TAG_LABELS, Visibility } from '@/types';
import { savePost } from '@/lib/storage';
import { containsSensitiveWords } from '@/lib/utils';

export default function WritePage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodTag>('justWrite');
  const [visibility, setVisibility] = useState<Visibility>('public');
  const [allowReply, setAllowReply] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 验证内容
    if (!content.trim()) {
      alert('请写下你的心事');
      return;
    }

    if (content.length > 1000) {
      alert('心事内容不能超过 1000 字');
      return;
    }

    // 敏感词检查
    if (containsSensitiveWords(content)) {
      alert('内容包含敏感词，请修改后再提交。如有强烈自伤念头，请联系专业机构或热线。');
      return;
    }

    setIsSubmitting(true);

    // 创建心事
    const newPost = {
      id: Date.now().toString(),
      content: content.trim(),
      mood,
      visibility,
      allowReply,
      createdAt: new Date().toISOString(),
      stats: {
        understandCount: 0,
      },
    };

    // 保存到本地存储
    savePost(newPost);

    // 清空表单
    setContent('');
    setMood('justWrite');
    setVisibility('public');
    setAllowReply(true);

    setIsSubmitting(false);
    setShowSuccess(true);

    // 延迟跳转
    setTimeout(() => {
      router.push('/me');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">写一条心事</h2>
        <p className="text-gray-500 text-sm">有些话，不一定要说给别人听。</p>
      </div>

      {showSuccess && (
        <div className="card mb-6 bg-primary-50 border border-primary-200 animate-fade-in">
          <p className="text-primary-700 text-center">好了，今天就先写到这儿。</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card">
        {/* 文本输入 */}
        <div className="mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="有些话，不一定要说给别人听。"
            className="textarea"
            maxLength={1000}
            rows={10}
          />
          <div className="mt-2 flex justify-between items-center text-sm text-gray-400">
            <span>{content.length} / 1000</span>
          </div>
        </div>

        {/* 情绪标签选择 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            选择情绪标签
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(MOOD_TAG_LABELS) as MoodTag[]).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setMood(tag)}
                className={`px-4 py-2 rounded-button text-sm font-medium transition-all duration-200 ${
                  mood === tag
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-primary-50 hover:border-primary-300'
                }`}
              >
                {MOOD_TAG_LABELS[tag]}
              </button>
            ))}
          </div>
        </div>

        {/* 可见范围 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            可见范围
          </label>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === 'public'}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
                className="mr-3"
              />
              <span className="text-gray-700">公开给陌生人</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === 'private'}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
                className="mr-3"
              />
              <span className="text-gray-700">只给自己看</span>
            </label>
          </div>
        </div>

        {/* 允许回应 */}
        <div className="mb-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={allowReply}
              onChange={(e) => setAllowReply(e.target.checked)}
              className="mr-3"
            />
            <span className="text-gray-700">允许轻回应</span>
          </label>
        </div>

        {/* 提交按钮 */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="btn-primary flex-1"
          >
            {isSubmitting ? '提交中...' : '发布'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}

