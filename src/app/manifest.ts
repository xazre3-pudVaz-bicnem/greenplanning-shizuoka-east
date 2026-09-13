import type { MetadataRoute } from 'next';
import { shop } from '@/data/shop';

/** アイコンは src/app/icon.png（本部提供のアイコンを無加工でコピー）を Next.js が自動で出力します */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: shop.name,
    short_name: shop.shortName,
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#1f5a34',
    lang: 'ja',
    icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }],
  };
}
