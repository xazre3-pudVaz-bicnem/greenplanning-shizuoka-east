import { NextResponse, type NextRequest } from 'next/server';

/**
 * アクセス制限（Basic認証）。
 *
 * 本部から、テストサイトを一般公開しない（アクセス制限をかける）よう依頼を受けています。
 * 本部の確認・承認を得て公開するまでは、すべてのページ・画像・API にBasic認証をかけます。
 *
 *   - 開発中（next dev）                         … 認証なし
 *   - 公開が許可されている（NEXT_PUBLIC_ALLOW_INDEXING=true） … 認証なし
 *     ※ 公開の条件は src/lib/publish-guard.ts でビルド時に検査しています
 *   - BASIC_AUTH_USER / BASIC_AUTH_PASSWORD がある … その ID・パスワードで認証
 *   - どちらも無い本番環境                         … 誰も見られない（401 を返すだけ）
 *
 * 環境変数の設定漏れで公開されてしまうことが無いように、「設定が無ければ閉じる」側にしています。
 */
const REALM = 'Restricted';

const allowIndexing =
  Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()) && process.env.NEXT_PUBLIC_ALLOW_INDEXING?.trim() === 'true';

/** 長さの違いも含めて、比較にかかる時間から中身を推測されないようにする */
function safeEqual(a: string, b: string) {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  }
  return diff === 0;
}

function unauthorized() {
  return new NextResponse('認証が必要です。', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== 'production' || allowIndexing) {
    return NextResponse.next();
  }

  const user = process.env.BASIC_AUTH_USER?.trim();
  const password = process.env.BASIC_AUTH_PASSWORD?.trim();
  if (!user || !password) return unauthorized();

  const header = request.headers.get('authorization') ?? '';
  const [scheme, encoded] = header.split(' ');
  if (scheme?.toLowerCase() !== 'basic' || !encoded) return unauthorized();

  let decoded = '';
  try {
    decoded = new TextDecoder().decode(Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0)));
  } catch {
    return unauthorized();
  }
  // パスワードに「:」が含まれていてもよいように、最初の「:」だけで分ける
  const sep = decoded.indexOf(':');
  if (sep < 0) return unauthorized();
  const okUser = safeEqual(decoded.slice(0, sep), user);
  const okPassword = safeEqual(decoded.slice(sep + 1), password);
  if (!(okUser && okPassword)) return unauthorized();

  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export const config = {
  // 画像・静的ファイル・API を含むすべてのリクエストを対象にする
  matcher: '/:path*',
};
