import type { Metadata } from 'next';
import { absoluteUrl, allowIndexing, siteName } from '@/lib/site';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';

/** OG画像の寸法を data/photos.ts から引く（寸法を書いておくとSNS側の表示が安定する） */
function ogImageMeta(src: string, url: string) {
  const photo = Object.values(photos).find((p) => p.src === src);
  return {
    url,
    ...(photo ? { width: photo.width, height: photo.height } : {}),
    type: src.endsWith('.png') ? 'image/png' : 'image/jpeg',
    alt: shop.name,
  };
}

type BuildMetaArgs = {
  /** ページ固有のタイトル（サイト名はテンプレートで自動的に付きます） */
  title: string;
  description: string;
  /** '/about' のようなパス */
  path: string;
  /**
   * OG画像に使う絶対パス。省略時は出しません。
   * 本部指定のロゴや提供画像を加工・合成したOG画像は作らないこと（本部チェックリスト「ブランド名・ロゴの使用」）。
   */
  ogImage?: string;
  noindex?: boolean;
};

/**
 * ページごとの metadata を組み立てます。
 * canonical / OG / Twitter は本番URLが設定されているときだけ出力します。
 */
export function buildMetadata({ title, description, path, ogImage, noindex = false }: BuildMetaArgs): Metadata {
  const canonical = absoluteUrl(path);
  const image = ogImage ? absoluteUrl(ogImage) : null;

  const meta: Metadata = {
    title,
    description,
    robots:
      noindex || !allowIndexing
        ? { index: false, follow: false }
        : { index: true, follow: true, 'max-image-preview': 'large' },
  };

  if (canonical) {
    meta.alternates = { canonical };
    meta.openGraph = {
      type: 'website',
      title: `${title}｜${shop.shortName}`,
      description,
      url: canonical,
      siteName,
      locale: 'ja_JP',
      ...(image && ogImage ? { images: [ogImageMeta(ogImage, image)] } : {}),
    };
    meta.twitter = {
      card: image ? 'summary_large_image' : 'summary',
      title: `${title}｜${shop.shortName}`,
      description,
      ...(image ? { images: [image] } : {}),
    };
  }

  return meta;
}
