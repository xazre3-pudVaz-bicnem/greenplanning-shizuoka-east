import { shop } from '@/data/shop';
import { regions } from '@/data/areas';
import { photos } from '@/data/photos';
import { type Work, workTitle } from '@/data/works';
import { absoluteUrl, defaultDescription } from '@/lib/site';

export type Crumb = { name: string; href: string };

/** undefined のキーを落とす */
function prune<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}

const businessId = () => {
  const url = absoluteUrl('/');
  return url ? `${url}#business` : undefined;
};

/**
 * 店舗そのものを表す主体。
 * HomeAndConstructionBusiness は LocalBusiness の下位型なので、これ1つで LocalBusiness としても解釈されます。
 *
 * 載せるのは店舗の事実だけです。
 * 評価・価格帯・本部の実績・本部との親子関係（本部直営と誤認されるおそれ）は入れません。
 * 営業日は「定休日を特に定めていない」ことしか分かっていないため、dayOfWeek は出さず時間だけを出しています。
 */
/** 実際の担当エリア（data/areas.ts）だけを City として並べる */
const areaServed = () =>
  regions.flatMap((r) => r.municipalities.map((m) => ({ '@type': 'City', name: `${shop.address.prefecture}${m}` })));

export function localBusinessJsonLd() {
  const url = absoluteUrl('/');
  const image = [photos.kannamiGardenAfter.src, photos.kannamiGardenBefore.src]
    .map((src) => absoluteUrl(src))
    .filter((v): v is string => Boolean(v));

  return prune({
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': businessId(),
    name: shop.name,
    description: defaultDescription,
    url: url ?? undefined,
    // 国際表記にしておくと、検索エンジン側で電話番号として確実に解釈される
    telephone: shop.telE164,
    email: shop.email,
    hasMap: shop.mapLinkUrl,
    logo: absoluteUrl('/brand/logo-shizuoka-east.jpg') ?? undefined,
    image: image.length ? image : undefined,
    address: {
      '@type': 'PostalAddress',
      // 番地は公開しない（オーナー様のご希望）。町名までを streetAddress に入れる
      postalCode: shop.address.postalCode,
      addressRegion: shop.address.prefecture,
      addressLocality: shop.address.city,
      streetAddress: shop.address.town,
      addressCountry: shop.address.country,
    },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', opens: shop.hours.open, closes: shop.hours.close }],
    areaServed: areaServed(),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '事業内容',
      // 実際に行っている業務だけ。提供者と対応地域をサービス単位でも示す
      itemListElement: shop.business.map((name) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
          serviceType: name,
          provider: { '@id': businessId() },
          // サービス単位では担当エリアをまとめて示す（市町の一覧は店舗情報側に1回だけ）
          areaServed: { '@type': 'AdministrativeArea', name: shop.areaLabel },
        },
      })),
    },
    sameAs: [shop.instagram],
  });
}

export function websiteJsonLd() {
  const url = absoluteUrl('/');
  if (!url) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url,
    name: shop.name,
    inLanguage: 'ja',
    publisher: { '@id': `${url}#business` },
  };
}

/** ページの種類（AboutPage / ContactPage / CollectionPage など） */
export function webPageJsonLd(args: {
  type: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  name: string;
  description: string;
  path: string;
  /** そのページを代表する画像（data/photos.ts の src） */
  primaryImage?: string;
}) {
  const url = absoluteUrl(args.path);
  const home = absoluteUrl('/');
  if (!url || !home) return null;
  return prune({
    '@context': 'https://schema.org',
    '@type': args.type,
    '@id': `${url}#webpage`,
    url,
    name: args.name,
    description: args.description,
    inLanguage: 'ja',
    isPartOf: { '@id': `${home}#website` },
    about: { '@id': `${home}#business` },
    primaryImageOfPage: args.primaryImage ? imageObject(args.primaryImage) : undefined,
  });
}

/** 画像1点を ImageObject で表す（寸法を添えると画像検索で扱いやすい） */
export function imageObject(src: string, caption?: string) {
  const contentUrl = absoluteUrl(src);
  if (!contentUrl) return undefined;
  const photo = Object.values(photos).find((p) => p.src === src);
  return prune({
    '@type': 'ImageObject',
    contentUrl,
    url: contentUrl,
    width: photo?.width,
    height: photo?.height,
    caption: caption ?? photo?.alt,
  });
}

/** 代表者（/about）。名前・肩書き・写真だけ */
export function personJsonLd() {
  const home = absoluteUrl('/');
  if (!home) return null;
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${home}#representative`,
    name: shop.representative,
    jobTitle: '代表',
    worksFor: { '@id': `${home}#business` },
    image: absoluteUrl(photos.representative.src) ?? undefined,
    url: absoluteUrl('/about') ?? undefined,
  });
}

/** 施工事例1件。写真を ImageObject として持たせる */
export function workJsonLd(work: Work) {
  const url = absoluteUrl(`/works/${work.slug}`);
  const home = absoluteUrl('/');
  if (!url || !home) return null;
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: workTitle(work),
    description: work.request,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    inLanguage: 'ja',
    contentLocation: { '@type': 'Place', name: work.area, address: { '@type': 'PostalAddress', addressRegion: '静岡県', addressLocality: work.area.replace(/^静岡県/, ''), addressCountry: 'JP' } },
    image: work.photos.map(({ photo, caption }) => imageObject(photos[photo].src, caption)).filter(Boolean),
    author: { '@id': `${home}#business` },
    publisher: { '@id': `${home}#business` },
  });
}

/**
 * 取り扱い商品（/products）。
 * 価格・在庫は載せていないので offers は出しません。名前・写真・説明と、扱っている店舗だけを示します。
 */
export function productsJsonLd(items: { name: string; anchor: string; description: string; image: string; kind: 'turf' | 'material' }[]) {
  const page = absoluteUrl('/products');
  const home = absoluteUrl('/');
  if (!page || !home) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '取り扱い商品',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: prune({
        '@type': 'Product',
        name: item.name,
        description: item.description,
        image: absoluteUrl(item.image) ?? undefined,
        url: `${page}#${item.anchor}`,
        category: item.kind === 'material' ? '人工芝充填材' : '人工芝',
        brand: { '@type': 'Brand', name: shop.hq.name },
        offers: undefined,
        seller: { '@id': `${home}#business` },
      }),
    })),
  };
}

export function itemListJsonLd(args: { name: string; items: { name: string; href: string }[] }) {
  const list = args.items
    .map((it, i) => {
      const url = absoluteUrl(it.href);
      return url ? { '@type': 'ListItem', position: i + 1, name: it.name, url } : null;
    })
    .filter(Boolean);
  if (list.length === 0) return null;
  return { '@context': 'https://schema.org', '@type': 'ItemList', name: args.name, itemListElement: list };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => {
      const item = absoluteUrl(c.href);
      return item
        ? { '@type': 'ListItem', position: i + 1, name: c.name, item }
        : { '@type': 'ListItem', position: i + 1, name: c.name };
    }),
  };
}
