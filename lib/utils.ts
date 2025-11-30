import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

// 格式化相对时间
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: zhCN });
  } catch {
    return '未知时间';
  }
}

// 敏感词过滤（简单版本）
const SENSITIVE_WORDS = [
  '自杀', '自伤', '自残', '跳楼', '割腕',
  // 可以根据需要扩展
];

export function containsSensitiveWords(text: string): boolean {
  return SENSITIVE_WORDS.some(word => text.includes(word));
}

// 截断文本
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

