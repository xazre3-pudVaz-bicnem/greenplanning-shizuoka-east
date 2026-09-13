import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JsonLd from '@/components/ui/JsonLd';
import Pending from '@/components/ui/Pending';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { shop } from '@/data/shop';

export const metadata: Metadata = buildMetadata({
  title: '個人情報保護方針',
  description: `${shop.name}の個人情報保護方針。お問い合わせでお預かりする個人情報の取り扱いについて。`,
  path: '/privacy',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '個人情報保護方針', href: '/privacy' },
];

/*
 * 本部や協力会社との情報共有の有無など、静岡EASTに確認できていない運用は書いていません。
 * 公開前に、静岡EASTの実際の運用と合っているかを確認してもらいます。
 */
const sections = [
  {
    h: '1. 事業者',
    p: [`${shop.name}（所在地：${shop.address.full}、代表：${shop.representative}）は、お客様の個人情報を以下の方針に基づいて取り扱います。`],
  },
  {
    h: '2. 取得する情報',
    p: [
      'お問い合わせフォーム・電話・メールを通じて、お名前、市町村、電話番号、メールアドレス、お問い合わせ内容、添付された写真をお預かりします。',
      'アクセス解析を利用する場合、Cookie等により閲覧情報を取得することがあります。',
    ],
  },
  {
    h: '3. 利用目的',
    p: ['お問い合わせへの回答、お見積り、ご依頼いただいた工事に関するご連絡のために利用します。'],
  },
  {
    h: '4. 第三者への提供',
    p: [
      '法令に基づく場合を除き、お客様の同意なく第三者に提供しません。',
      'フォームの送信には外部のメール配信サービスを利用しており、送信内容はメール送信のために同サービスを経由します。',
    ],
  },
  {
    h: '5. 安全管理',
    p: ['個人情報への不正アクセス、紛失、漏えいを防ぐため、適切な管理を行います。'],
  },
  {
    h: '6. 開示・訂正・削除',
    p: ['ご本人からの開示・訂正・削除のご希望には、ご本人であることを確認のうえ対応します。下記の窓口までご連絡ください。'],
  },
  {
    h: '7. お問い合わせ窓口',
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
          <div className="mt-6">
            <Pending block>内容が静岡EASTの実際の運用と合っているか、制定日</Pending>
          </div>
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
