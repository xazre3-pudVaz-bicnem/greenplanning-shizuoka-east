import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import GoogleMap from '@/components/ui/GoogleMap';
import JsonLd from '@/components/ui/JsonLd';
import Reveal from '@/components/ui/Reveal';
import ShopInfoTable from '@/components/ui/ShopInfoTable';
import InquiryForm from '@/components/forms/InquiryForm';
import { InstagramIcon, MailIcon, PhoneIcon } from '@/components/ui/icons';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { shop } from '@/data/shop';

export const metadata: Metadata = buildMetadata({
  title: 'お問い合わせ',
  description: `${shop.name}へのお問い合わせ。電話 ${shop.tel}（${shop.hours.label}）、メール、お問い合わせフォームで受け付けています。`,
  path: '/contact',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: 'お問い合わせ', href: '/contact' },
];

export default function ContactPage() {
  return (
    <>
      <header className="bg-shiro pt-24 sm:pt-32">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="display mt-8 text-[1.75rem] leading-[1.4] sm:text-[2.3rem]">お問い合わせ</h1>
          <p className="mt-5 max-w-[40rem] text-[0.95rem] leading-[2] text-sumi-2">
            電話・メール・下のフォームで受け付けています。
          </p>
        </div>
      </header>

      <section className="cv bg-shiro py-12 sm:py-16">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <Reveal>
              <h2 className="display text-[1.3rem] sm:text-[1.5rem]">お問い合わせフォーム</h2>
              <div className="mt-8">
                <InquiryForm />
              </div>
            </Reveal>
            <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={100}>
                <h2 className="eyebrow">電話・メール・Instagram</h2>
                <ul className="mt-5 space-y-3 text-[0.92rem] text-sumi-2">
                  <li>
                    <a href={shop.telHref} className="inline-flex items-center gap-2 py-1 text-fukami underline underline-offset-4">
                      <PhoneIcon />
                      <span className="num">{shop.tel}</span>
                    </a>
                    <span className="ml-2 text-[0.78rem] text-hai">{shop.hours.label}</span>
                  </li>
                  <li>
                    <a href={`mailto:${shop.email}`} className="inline-flex items-center gap-2 break-all py-1 text-fukami underline underline-offset-4">
                      <MailIcon />
                      {shop.email}
                    </a>
                  </li>
                  <li>
                    <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-1 text-fukami underline underline-offset-4">
                      <InstagramIcon />
                      {shop.instagramHandle}
                    </a>
                  </li>
                </ul>
              </Reveal>
              <Reveal delay={150}>
                <h2 className="eyebrow">店舗情報</h2>
                <div className="mt-4">
                  <ShopInfoTable compact />
                </div>
              </Reveal>
              <Reveal delay={200}>
                <GoogleMap />
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
