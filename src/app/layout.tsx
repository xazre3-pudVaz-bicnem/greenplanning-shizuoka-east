import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBar from '@/components/layout/MobileBar';
import JsonLd from '@/components/ui/JsonLd';
import RevealObserver from '@/components/ui/RevealObserver';
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/jsonld';
import { defaultDescription, gaId, gscVerification, homeTitle, isPublic, siteName, siteUrl } from '@/lib/site';
import { shop } from '@/data/shop';

/*
 * フォントの方針
 *
 * 本文のゴシックはWebフォントを使わず、端末標準（ヒラギノ／游ゴシック等）に任せています。
 * 見出し用のゴシックだけを自前でホストし（scripts/fetch-fonts.mjs → public/fonts）、
 * レンダリングをブロックしないように media="print" → onload で切り替えて読み込みます。
 * next/font/google に日本語フォントを渡すと、unicode-range 分割の @font-face が
 * 数百個ぶんページCSSに入ってレンダリングブロックCSSが数百KBになるため、使いません。
 */
const FONT_CSS = '/fonts/zen-kaku-gothic-new.css';

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: homeTitle,
    template: `%s｜${shop.shortName}`,
  },
  description: defaultDescription,
  applicationName: shop.shortName,
  authors: [{ name: shop.name }],
  creator: shop.name,
  publisher: shop.name,
  formatDetection: { telephone: true, address: false, email: false },
  robots: isPublic
    ? { index: true, follow: true, 'max-image-preview': 'large' }
    : { index: false, follow: false },
  ...(gscVerification ? { verification: { google: gscVerification } } : {}),
  ...(isPublic
    ? {
        openGraph: {
          type: 'website',
          siteName,
          locale: 'ja_JP',
          url: siteUrl!,
          title: homeTitle,
          description: defaultDescription,
          images: [{ url: '/og.jpg', width: 1200, height: 630, alt: shop.name }],
        },
        twitter: { card: 'summary_large_image', images: ['/og.jpg'] },
        alternates: {
          types: { 'application/rss+xml': `${siteUrl}/feed.xml` },
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: '#1f5a34',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: 下の script が hydration 前に <html> へ .js を付けるため
    <html lang="ja" suppressHydrationWarning>
      <head>
        <noscript>
          <link rel="stylesheet" href={FONT_CSS} media="(min-width: 1024px)" />
        </noscript>
      </head>
      <body className="pb-14 lg:pb-0">
        {/*
          1. JSが動く環境でだけ <html> に .js を付ける（.reveal はこのクラスの下でだけ要素を隠す）。
          2. 見出しフォントのCSSは、幅1024px以上（PC）でだけ、media="print" で足して読み終わってから media="all" にする。
             スマホは端末標準のゴシックに任せ、フォントCSS（約100KB）のダウンロードそのものを省く（モバイルのFCP/LCPのため）。
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              `(function(){if(!window.matchMedia||!matchMedia('(min-width:1024px)').matches)return;var l=document.createElement('link');l.rel='stylesheet';l.href='${FONT_CSS}';l.media='print';l.onload=function(){l.media='all'};document.head.appendChild(l)})();`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-fukami focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <RevealObserver />
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
