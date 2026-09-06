import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JsonLd from '@/components/ui/JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { shop } from '@/data/shop';

export const metadata: Metadata = buildMetadata({
  title: '個人情報保護方針',
  description: `${shop.name}の個人情報保護方針。お問い合わせ・写真見積りでお預かりする個人情報と写真の取り扱い、利用目的、第三者提供、アクセス解析について。`,
  path: '/privacy',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '個人情報保護方針', href: '/privacy' },
];

const sections = [
  {
    h: '1. 事業者',
    p: [`${shop.name}（所在地：${shop.address.full}、代表：${shop.representative}）は、お客様の個人情報を以下の方針に基づいて取り扱います。`],
  },
  {
    h: '2. 取得する情報',
    p: [
      'お問い合わせ・写真見積りフォーム、電話、メールを通じて、お名前、住所（市町村・番地）、電話番号、メールアドレス、施工場所の写真・図面、ご相談内容をお預かりします。',
      'Webサイトの閲覧にあたり、アクセス解析のためにCookie等を利用して閲覧情報を取得する場合があります（個人を特定するものではありません）。',
    ],
  },
  {
    h: '3. 利用目的',
    p: [
      'お問い合わせへの回答、お見積りの作成、現地調査・施工の日程調整、施工後のアフターフォロー、サンプルの送付に利用します。',
      'お預かりした写真・図面は、お見積りと施工計画の作成にのみ利用し、お客様の同意なく施工事例等として公開することはありません。',
    ],
  },
  {
    h: '4. 第三者への提供',
    p: [
      '法令に基づく場合を除き、お客様の同意なく第三者に提供しません。施工に必要な範囲で、グリーンプランニング本部および協力会社と情報を共有することがあります。',
      'フォームの送信には外部のメール配信サービスを利用しており、送信内容は当店へのメール送信のために同サービスを経由します。',
    ],
  },
  {
    h: '5. 安全管理',
    p: ['個人情報への不正アクセス、紛失、漏えいを防ぐため、適切な管理を行います。'],
  },
  {
    h: '6. 開示・訂正・削除',
    p: ['ご本人からの開示・訂正・削除のご希望には、ご本人であることを確認のうえ対応します。下記の連絡先までご連絡ください。'],
  },
  {
    h: '7. アクセス解析',
    p: ['本サイトでは、Google Analyticsなどのアクセス解析ツールを利用する場合があります。これらのツールはCookieを利用して閲覧情報を収集しますが、個人を特定する情報は含まれません。'],
  },
  {
    h: '8. お問い合わせ窓口',
    p: [`${shop.name}／電話 ${shop.tel}（${shop.hours.label}）／メール ${shop.email}`],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-shiro px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-[44rem]">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="display mt-8 text-[1.7rem] sm:text-[2.2rem]">個人情報保護方針</h1>
          <p className="mt-5 text-[0.92rem] leading-[2] text-sumi-2">制定日：2026年9月6日</p>
          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="display text-[1.15rem]">{s.h}</h2>
                <div className="mt-3 space-y-3">
                  {s.p.map((t, i) => (
                    <p key={i} className="text-[0.93rem] leading-[2] text-sumi-2">
                      {t}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
