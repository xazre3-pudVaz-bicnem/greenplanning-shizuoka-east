import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * ブログ（人工芝コラム）のカテゴリ。
 * 検索意図がばらけるように分けています。細かいテーマは tags で持たせ、カテゴリは増やしすぎないこと。
 * scripts/topics.mjs の category と一致させること。
 */
export const blogCategories = {
  basics: { label: '人工芝の基礎知識', description: '人工芝の種類、構造、選び方の前に知っておきたいこと。' },
  shizuoka: { label: '静岡の人工芝', description: '静岡県東部・中部・伊豆で人工芝を検討するときの地域の事情。' },
  weed: { label: '庭・雑草対策', description: '草取りをなくす方法、防草シート、土や砂利の庭の改善。' },
  dog: { label: '犬・ドッグラン', description: '愛犬と暮らす庭、ドッグラン、臭い・排水・お手入れ。' },
  golf: { label: 'ゴルフ', description: '自宅のパター練習グリーン、ゴルフ用人工芝の考え方。' },
  family: { label: '子ども・家族', description: '子どもが遊べる庭、裸足、プール、家族の庭時間。' },
  construction: { label: '施工・下地', description: '下地づくり、転圧、排水、継ぎ目、端部など施工の話。' },
  price: { label: '費用', description: '人工芝の施工費用の考え方、価格が変わる条件。' },
  maintenance: { label: 'メンテナンス', description: 'お手入れ、掃除、耐用年数、長持ちさせる方法。' },
  diy: { label: 'DIY比較', description: 'DIYと業者施工の違い、DIYで失敗しやすいところ。' },
  area: { label: 'エリア情報', description: '沼津・三島・富士など、市町ごとの庭づくりの話。' },
} as const;

export type BlogCategory = keyof typeof blogCategories;

export const blogCategoryKeys = Object.keys(blogCategories) as BlogCategory[];

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: BlogCategory;
  tags: string[];
  /** アイキャッチに使う写真のキー（data/photos.ts） */
  eyecatch?: string;
  /** 想定検索クエリ。1記事1クエリで管理してカニバリを防ぐ */
  intent?: string;
  /** 記事末尾のFAQ */
  faq: { q: string; a: string }[];
  /** 本文（Markdown） */
  content: string;
};

function isCategory(v: unknown): v is BlogCategory {
  return typeof v === 'string' && v in blogCategories;
}

function toDateString(v: unknown, fallback: string): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);
  return fallback;
}

function toFaq(v: unknown): { q: string; a: string }[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const rec = item as Record<string, unknown>;
      const q = typeof rec.q === 'string' ? rec.q.trim() : '';
      const a = typeof rec.a === 'string' ? rec.a.trim() : '';
      return q && a ? { q, a } : null;
    })
    .filter((x): x is { q: string; a: string } => x !== null);
}

let cache: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cache) return cache;
  if (!fs.existsSync(BLOG_DIR)) {
    cache = [];
    return cache;
  }

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const slug = String(data.slug ?? file.replace(/\.mdx?$/, '')).trim();
      const published = toDateString(data.publishedAt, '1970-01-01');

      const post: BlogPost = {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ''),
        publishedAt: published,
        updatedAt: toDateString(data.updatedAt, published),
        category: isCategory(data.category) ? data.category : 'basics',
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        eyecatch: typeof data.eyecatch === 'string' ? data.eyecatch : undefined,
        intent: typeof data.intent === 'string' ? data.intent : undefined,
        faq: toFaq(data.faq),
        content,
      };
      return post;
    })
    .filter((p) => p.title && p.publishedAt !== '1970-01-01')
    .sort((a, b) =>
      a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : a.slug < b.slug ? 1 : -1,
    );

  cache = posts;
  return posts;
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

/** 同カテゴリ → 同じタグ → 新着 の順で埋める。記事を孤立させないための導線 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  const sameCategory = all.filter((p) => p.category === post.category);
  const sharedTag = all.filter(
    (p) => p.category !== post.category && p.tags.some((t) => post.tags.includes(t)),
  );
  const rest = all.filter((p) => !sameCategory.includes(p) && !sharedTag.includes(p));
  return [...sameCategory, ...sharedTag, ...rest].slice(0, limit);
}

/** サービスページなどから、関連カテゴリの記事を引く */
export function getPostsForCategories(categories: BlogCategory[], limit = 3): BlogPost[] {
  const all = getAllPosts();
  const hit = all.filter((p) => categories.includes(p.category));
  const rest = all.filter((p) => !hit.includes(p));
  return [...hit, ...rest].slice(0, limit);
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${y}年${Number(m)}月${Number(d)}日`;
}
