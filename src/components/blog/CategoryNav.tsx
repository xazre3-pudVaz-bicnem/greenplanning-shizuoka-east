import Link from 'next/link';
import { blogCategories, blogCategoryKeys, getPostsByCategory, type BlogCategory } from '@/lib/blog';

export default function CategoryNav({ current }: { current?: BlogCategory }) {
  const withPosts = blogCategoryKeys.filter((k) => getPostsByCategory(k).length > 0);
  return (
    <nav aria-label="コラムのカテゴリ" className="flex flex-wrap gap-x-6 gap-y-3 border-b border-sen pb-5 text-[0.88rem]">
      <Link href="/blog" className={current ? 'text-sumi-2 underline-offset-4 hover:text-fukami hover:underline' : 'text-fukami'} aria-current={current ? undefined : 'page'}>
        すべて
      </Link>
      {withPosts.map((k) => (
        <Link
          key={k}
          href={`/blog/category/${k}`}
          className={k === current ? 'text-fukami' : 'text-sumi-2 underline-offset-4 hover:text-fukami hover:underline'}
          aria-current={k === current ? 'page' : undefined}
        >
          {blogCategories[k].label}（{getPostsByCategory(k).length}）
        </Link>
      ))}
    </nav>
  );
}
