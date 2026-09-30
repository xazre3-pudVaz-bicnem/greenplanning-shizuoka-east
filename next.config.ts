import path from 'node:path';
import type { NextConfig } from 'next';

/**
 * 検索エンジンにインデックスさせてよいか（src/lib/site.ts の allowIndexing と同じ条件）。
 * ここでは HTML 以外（画像・RSS・llms.txt など、meta タグを置けないもの）に
 * X-Robots-Tag を付けるために判定しています。
 */
const allowIndexing =
  Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()) && process.env.NEXT_PUBLIC_ALLOW_INDEXING?.trim() === 'true';

const nextConfig: NextConfig = {
  // このリポジトリ単体をルートとして扱う（親ディレクトリの lockfile を拾わせない）
  turbopack: { root: path.resolve(process.cwd()) },
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // 62=サムネイル / 70=大きな背景写真 / 78=本文中の写真
    qualities: [62, 70, 78],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [96, 128, 200, 256, 320, 384, 480],
    // 最適化済み画像をCDNに長く置く（元画像を差し替えるときはファイル名を変える）
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // 公開前は HTML 以外（画像・RSS・llms.txt）もインデックスさせない
          ...(allowIndexing ? [] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]),
        ],
      },
      {
        // 写真・ロゴ。1日キャッシュし、その後1週間は再検証しながら前回の画像を表示する
        source: '/:dir(photos|brand)/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
      {
        // 自前ホストのフォント。内容が変わることはないので長期キャッシュ
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
