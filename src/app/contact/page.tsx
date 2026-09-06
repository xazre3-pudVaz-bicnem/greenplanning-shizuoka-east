import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import GoogleMap from '@/components/ui/GoogleMap';
import JsonLd from '@/components/ui/JsonLd';
import Reveal from '@/components/ui/Reveal';
import ShopInfoTable from '@/components/ui/ShopInfoTable';
import InquiryForm from '@/components/forms/InquiryForm';
import { CameraIcon, InstagramIcon, MailIcon, PhoneIcon } from '@/components/ui/icons';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { shop } from '@/data/shop';

const title = 'お問い合わせ・無料相談｜電話・メール・フォーム';
const description =
  'グリーンプランニング静岡EASTへのお問い合わせ。人工芝が向いているかの相談、サンプル希望、DIY用の材料、法人・協力施工のご相談まで。電話055-953-9777（9:00〜17:00）、メール、フォーム。写真がある方は写真見積りフォームへ。';

export const metadata: Metadata = buildMetadata({
  title,
  description,
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
          <p className="eyebrow mt-8">お問い合わせ・無料相談</p>
          <h1 className="display mt-4 text-[1.75rem] leading-[1.4] sm:text-[2.3rem]">まずは、話を聞かせてください。</h1>
          <p className="mt-6 max-w-[40rem] text-[0.98rem] leading-[2.05] text-sumi-2">
            人工芝が向いているか分からない、砂利や天然芝と迷っている、サンプルを見たい、DIY用の材料だけほしい、法人として相談したい。どんな段階でも構いません。相談・見積り・現地調査は無料です。
          </p>
          <div className="mt-8 hairline bg-wakaba p-5 sm:p-6">
            <p className="display text-[1.02rem] text-fukami">庭の写真がある方は、写真見積りフォームが早いです</p>
            <p className="mt-2 text-[0.9rem] leading-[1.9] text-sumi-2">写真と広さから、費用の目安と向いている商品をお返事します。</p>
            <Link href="/estimate" className="btn btn-primary mt-4">
              <CameraIcon />
              写真で概算見積り
            </Link>
          </div>
        </div>
      </header>

      <section className="cv bg-shiro py-14 sm:py-20">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <Reveal>
              <h2 className="display text-[1.3rem] sm:text-[1.5rem]">お問い合わせフォーム</h2>
              <div className="mt-8">
                <InquiryForm variant="contact" />
              </div>
            </Reveal>
            <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={100}>
                <h2 className="eyebrow">電話・メール・Instagram</h2>
                <ul className="mt-5 space-y-3 text-[0.92rem] text-sumi-2">
                  <li>
                    <a href={shop.telHref} className="inline-flex items-center gap-2 text-fukami underline underline-offset-4">
                      <PhoneIcon />
                      <span className="num">{shop.tel}</span>
                    </a>
                    <span className="ml-2 text-[0.78rem] text-hai">{shop.hours.label}</span>
                  </li>
                  <li>
                    <a href={`mailto:${shop.email}`} className="inline-flex items-center gap-2 break-all text-fukami underline underline-offset-4">
                      <MailIcon />
                      {shop.email}
                    </a>
                  </li>
                  <li>
                    <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-fukami underline underline-offset-4">
                      <InstagramIcon />
                      {shop.instagramHandle}
                    </a>
                    <span className="ml-2 text-[0.78rem] text-hai">DMでも受け付けています</span>
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
