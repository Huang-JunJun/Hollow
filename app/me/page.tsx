'use client';

import { useState, useEffect } from 'react';
import { getUserPosts, getPublicPosts } from '@/lib/storage';
import { HollowPost } from '@/types';
import PostCard from '@/components/PostCard';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';

export default function MePage() {
  const [activeTab, setActiveTab] = useState<'myPosts' | 'understood'>('myPosts');
  const [myPosts, setMyPosts] = useState<HollowPost[]>([]);
  const [understoodPosts, setUnderstoodPosts] = useState<HollowPost[]>([]);

  useEffect(() => {
    // 加载我的心事
    const posts = getUserPosts();
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setMyPosts(sortedPosts);

    // 加载我点亮的「我懂」
    const publicPosts = getPublicPosts();
    const { getUserState } = require('@/lib/storage');
    const userState = getUserState();
    const understood = publicPosts
      .filter((post) => userState.understoodPostIds.includes(post.id))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setUnderstoodPosts(understood);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">我的空间</h2>
        <p className="text-gray-500 text-sm">这里是你写下的所有心事</p>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('myPosts')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'myPosts'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          我的心事
        </button>
        <button
          onClick={() => setActiveTab('understood')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'understood'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          我点亮的 我懂
        </button>
      </div>

      {/* Tab 内容 */}
      {activeTab === 'myPosts' && (
        <div>
          {myPosts.length === 0 ? (
            <EmptyState message="你还没有写过心事，去写一条吧。" />
          ) : (
            <div>
              {myPosts.map((post) => (
                <div key={post.id} className="mb-6">
                  <PostCard post={post} showFullContent={true} />
                  <div className="mt-2 text-xs text-gray-400">
                    {post.visibility === 'private' ? '仅自己可见' : '已公开'}
                  </div>
                </div>
              ))}
            </div>
          )}
          {myPosts.length === 0 && (
            <div className="text-center mt-8">
              <Link href="/write" className="btn-primary inline-block">
                写一条心事
              </Link>
            </div>
          )}
        </div>
      )}

      {activeTab === 'understood' && (
        <div>
          {understoodPosts.length === 0 ? (
            <EmptyState message="你还没有点亮过「我懂」，去公共树洞看看吧。" />
          ) : (
            <div>
              {understoodPosts.map((post) => (
                <PostCard key={post.id} post={post} showFullContent={true} />
              ))}
            </div>
          )}
          {understoodPosts.length === 0 && (
            <div className="text-center mt-8">
              <Link href="/feed" className="btn-primary inline-block">
                去看看别人的心事
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

