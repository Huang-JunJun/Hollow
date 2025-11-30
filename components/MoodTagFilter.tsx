'use client';

import { MoodTag, MOOD_TAG_LABELS } from '@/types';

interface MoodTagFilterProps {
  selectedTag: MoodTag | 'all';
  onTagChange: (tag: MoodTag | 'all') => void;
}

export default function MoodTagFilter({ selectedTag, onTagChange }: MoodTagFilterProps) {
  const tags: (MoodTag | 'all')[] = ['all', ...Object.keys(MOOD_TAG_LABELS) as MoodTag[]];
  const tagLabels: Record<MoodTag | 'all', string> = {
    all: '全部',
    ...MOOD_TAG_LABELS,
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={`px-4 py-2 rounded-button text-sm font-medium transition-all duration-200 ${
            selectedTag === tag
              ? 'bg-primary-500 text-white'
              : 'bg-white text-gray-600 border border-gray-300 hover:bg-primary-50 hover:border-primary-300'
          }`}
        >
          {tagLabels[tag]}
        </button>
      ))}
    </div>
  );
}

