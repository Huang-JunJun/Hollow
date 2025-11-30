'use client';

import { useState, useEffect, useMemo } from 'react';
import { getPublicPosts } from '@/lib/storage';
import { HollowPost, MoodTag } from '@/types';
import PostCard from '@/components/PostCard';
import MoodTagFilter from '@/components/MoodTagFilter';
import EmptyState from '@/components/EmptyState';

export default function FeedPage() {
  const [posts, setPosts] = useState<HollowPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<MoodTag | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const publicPosts = getPublicPosts();
    // 按时间排序（最新的在前）
    const sortedPosts = [...publicPosts].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setPosts(sortedPosts);
    setLoading(false);
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedTag === 'all') return posts;
    return posts.filter(post => post.mood === selectedTag);
  }, [posts, selectedTag]);

  const handleUnderstandChange = () => {
    // 刷新列表以更新「我懂」状态
    const publicPosts = getPublicPosts();
    const sortedPosts = [...publicPosts].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setPosts(sortedPosts);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-400">加载中...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">公共树洞</h2>
        <p className="text-gray-500 text-sm">看看别人的心事，也许能找到共鸣</p>
      </div>

      <MoodTagFilter selectedTag={selectedTag} onTagChange={setSelectedTag} />

      {filteredPosts.length === 0 ? (
        <EmptyState message="这里暂时还没有心事，可以从你开始。" />
      ) : (
        <div>
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onUnderstandChange={handleUnderstandChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

