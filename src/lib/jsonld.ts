import { shop } from '@/data/shop';
import { allMunicipalities } from '@/data/areas';
import { absoluteUrl, defaultDescription } from '@/lib/site';

export type Crumb = { name: string; href: string };

/** undefined のキーを落とす */
function prune<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}

const postalAddress = () => ({
  '@type': 'PostalAddress',
  postalCode: shop.address.postalCode,
  addressRegion: shop.address.prefecture,
  addressLocality: shop.address.city,
  streetAddress: shop.address.line,
  addressCountry: shop.address.country,
});

/**
 * 店舗そのものを表す主体。
 * HomeAndConstructionBusiness は LocalBusiness の下位型なので、これ1つで LocalBusiness としても解釈されます。
 * 確認できていない項目（レビュー・評価・価格帯）は入れません。
 * 営業日は公式に明記されていないため、dayOfWeek は出さず時間だけを出しています。
 */
export function localBusinessJsonLd() {
  const url = absoluteUrl('/');
  const images = [absoluteUrl('/photos/work-tagata-after.jpg'), absoluteUrl('/photos/garden-house.jpg')].filter(
    (v): v is string => Boolean(v),
  );

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': url ? `${url}#business` : undefined,
    name: shop.name,
    alternateName: shop.shortName,
    description: defaultDescription,
    url: url ?? undefined,
    telephone: shop.tel,
    email: shop.email,
    address: postalAddress(),
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', opens: shop.hours.open, closes: shop.hours.close },
    ],
    areaServed: allMunicipalities.map((name) => ({ '@type': 'City', name: `${shop.address.prefecture}${name}` })),
    founder: { '@type': 'Person', name: shop.representative, jobTitle: '代表' },
    parentOrganization: { '@type': 'Organization', name: shop.hq.name, url: shop.hq.url },
    knowsAbout: ['人工芝施工', '人工芝ドッグラン', 'ゴルフ用人工芝', '雑草対策', '外構工事', '造園工事'],
    sameAs: [shop.instagram, shop.hq.eastPageUrl],
    priceRange: '¥¥',
    image: images.length ? images : undefined,
    logo: absoluteUrl('/icon-512.png') ?? undefined,
  };

  return prune(data);
}

/** 運営主体（店舗と同一）。 */
export function organizationJsonLd() {
  const url = absoluteUrl('/');
  if (!url) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}#organization`,
    name: shop.name,
    url,
    telephone: shop.tel,
    email: shop.email,
    sameAs: [shop.instagram, shop.hq.eastPageUrl],
    logo: absoluteUrl('/icon-512.png') ?? undefined,
    address: postalAddress(),
    parentOrganization: { '@type': 'Organization', name: shop.hq.name, url: shop.hq.url },
  };
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
    description: defaultDescription,
    inLanguage: 'ja',
    publisher: { '@id': `${url}#organization` },
  };
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

/** 画面に出しているFAQと同じ内容だけを渡すこと */
export function faqJsonLd(items: { q: string; a: string }[]) {
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** 用途別サービスページ */
export function serviceJsonLd(args: { name: string; description: string; path: string; image?: string; serviceType?: string }) {
  const url = absoluteUrl(args.path);
  const home = absoluteUrl('/');
  if (!url || !home) return null;
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: args.name,
    serviceType: args.serviceType ?? '人工芝施工',
    description: args.description,
    url,
    image: args.image ? absoluteUrl(args.image) ?? undefined : undefined,
    provider: { '@id': `${home}#business` },
    areaServed: { '@type': 'AdministrativeArea', name: '静岡県東部・中部・伊豆地域' },
  });
}

/** 商品ページ（価格は施工料別のため offers は出さない） */
export function productJsonLd(args: { name: string; description: string; path: string; image: string }) {
  const url = absoluteUrl(args.path);
  if (!url) return null;
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: args.name,
    description: args.description,
    url,
    image: absoluteUrl(args.image) ?? undefined,
    brand: { '@type': 'Brand', name: shop.brand },
    category: '人工芝',
  });
}

/** 記事（ブログ・ガイド） */
export function articleJsonLd(args: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  type?: 'Article' | 'BlogPosting';
}) {
  const url = absoluteUrl(args.path);
  if (!url) return null;
  const home = absoluteUrl('/');
  const image = absoluteUrl(args.image ?? '/og.jpg');

  return prune({
    '@context': 'https://schema.org',
    '@type': args.type ?? 'Article',
    headline: args.title,
    description: args.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    datePublished: args.publishedAt,
    dateModified: args.updatedAt ?? args.publishedAt,
    image: image ? [image] : undefined,
    inLanguage: 'ja',
    author: home
      ? { '@type': 'Organization', name: shop.name, url: home }
      : { '@type': 'Organization', name: shop.name },
    publisher: home ? { '@id': `${home}#organization` } : { '@type': 'Organization', name: shop.name },
  });
}

/** 施工事例。写真を ImageObject として持たせる */
export function workJsonLd(args: {
  title: string;
  description: string;
  path: string;
  date: string;
  area: string;
  images: { src: string; caption: string }[];
}) {
  const url = absoluteUrl(args.path);
  if (!url) return null;
  const home = absoluteUrl('/');
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.title,
    description: args.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    datePublished: args.date,
    dateModified: args.date,
    inLanguage: 'ja',
    contentLocation: { '@type': 'Place', name: args.area },
    image: args.images
      .map((im) => {
        const contentUrl = absoluteUrl(im.src);
        return contentUrl ? { '@type': 'ImageObject', contentUrl, caption: im.caption } : null;
      })
      .filter(Boolean),
    author: home ? { '@type': 'Organization', name: shop.name, url: home } : { '@type': 'Organization', name: shop.name },
    publisher: home ? { '@id': `${home}#organization` } : { '@type': 'Organization', name: shop.name },
  });
}

export function itemListJsonLd(args: { name: string; items: { name: string; href: string }[] }) {
  const list = args.items
    .map((it, i) => {
      const url = absoluteUrl(it.href);
      return url ? { '@type': 'ListItem', position: i + 1, name: it.name, url } : null;
    })
    .filter(Boolean);
  if (list.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: args.name,
    itemListElement: list,
  };
}

/** 代表者（/about） */
export function personJsonLd() {
  const home = absoluteUrl('/');
  if (!home) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${home}#representative`,
    name: shop.representative,
    jobTitle: '代表',
    worksFor: { '@id': `${home}#business` },
    image: absoluteUrl('/photos/representative-takahashi.jpg') ?? undefined,
    knowsAbout: ['人工芝施工', 'ドッグラン', '庭づくり'],
    url: absoluteUrl('/about') ?? undefined,
  };
}
