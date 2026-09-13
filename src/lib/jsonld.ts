import { shop } from '@/data/shop';
import { regions } from '@/data/areas';
import { absoluteUrl, defaultDescription } from '@/lib/site';

export type Crumb = { name: string; href: string };

/** undefined のキーを落とす */
function prune<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}

/**
 * 店舗そのものを表す主体。
 * HomeAndConstructionBusiness は LocalBusiness の下位型なので、これ1つで LocalBusiness としても解釈されます。
 *
 * 載せるのは店舗の事実だけです。
 * 評価・価格帯・本部の実績・本部との親子関係（本部直営と誤認されるおそれ）は入れません。
 * 営業日は確認できていないため、dayOfWeek は出さず時間だけを出しています。
 */
export function localBusinessJsonLd() {
  const url = absoluteUrl('/');
  return prune({
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': url ? `${url}#business` : undefined,
    name: shop.name,
    description: defaultDescription,
    url: url ?? undefined,
    telephone: shop.tel,
    email: shop.email,
    address: {
      '@type': 'PostalAddress',
      postalCode: shop.address.postalCode,
      addressRegion: shop.address.prefecture,
      addressLocality: shop.address.city,
      streetAddress: shop.address.line,
      addressCountry: shop.address.country,
    },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', opens: shop.hours.open, closes: shop.hours.close }],
    areaServed: regions.map((r) => ({ '@type': 'AdministrativeArea', name: r.label })),
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
