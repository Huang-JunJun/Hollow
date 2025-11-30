'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部品牌区 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Link href="/" className="block">
            <h1 className="text-2xl font-semibold text-primary-700 mb-1">Hollow</h1>
            <p className="text-sm text-gray-500">你可以不用很坚强，也可以不说完整。</p>
          </Link>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      {/* 底部导航/链接 */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <Link href="/safety" className="hover:text-primary-600 transition-colors">
              安全与说明
            </Link>
            <Link href="/me" className="hover:text-primary-600 transition-colors">
              我的空间
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

