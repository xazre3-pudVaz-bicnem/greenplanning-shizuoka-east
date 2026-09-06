import type { MetadataRoute } from 'next';
import { shop } from '@/data/shop';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: shop.name,
    short_name: '静岡EAST 人工芝',
    description: shop.tagline,
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#1f5a34',
    lang: 'ja',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
