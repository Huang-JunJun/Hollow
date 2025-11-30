'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { initMockData } from '@/lib/storage';

export default function HomePage() {
  useEffect(() => {
    // 初始化 mock 数据
    initMockData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold text-primary-700 mb-4">Hollow</h1>
        <p className="text-lg text-gray-600 mb-8">你可以不用很坚强，也可以不说完整。</p>
        <p className="text-gray-500 text-sm">今天也可以只对自己诚实。</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link href="/write" className="btn-primary text-center">
          写一条心事
        </Link>
        <Link href="/feed" className="btn-secondary text-center">
          先看看别人的
        </Link>
      </div>
    </div>
  );
}

