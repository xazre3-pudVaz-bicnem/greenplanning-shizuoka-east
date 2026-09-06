import { NextResponse } from 'next/server';
import { shop } from '@/data/shop';

/**
 * お問い合わせ・写真見積りフォームの送信先。
 *
 * メールは Resend（https://resend.com）の REST API で送ります。SDKは足していません。
 * 環境変数 RESEND_API_KEY が無いときは 503 を返し、画面側で電話・メールの案内に切り替えます。
 *
 *   RESEND_API_KEY … 必須
 *   MAIL_FROM      … 送信元（Resend で認証済みのドメイン）。省略時は onboarding@resend.dev（テスト用）
 *   MAIL_TO        … 受信先。省略時は shop.email
 */
export const runtime = 'nodejs';

const MAX_FILES = 5;
const MAX_FILE_BYTES = 3 * 1024 * 1024;
const MAX_TOTAL_BYTES = 6 * 1024 * 1024;

function str(form: FormData, key: string, max = 2000): string {
  const v = form.get(key);
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return bad('送信内容を読み取れませんでした。');
  }

  // honeypot: 人には見えない欄が埋まっていたら、成功したふりをして捨てる
  if (str(form, 'website')) return NextResponse.json({ ok: true });

  const kind = str(form, 'kind') === 'estimate' ? 'estimate' : 'contact';
  const name = str(form, 'name', 100);
  const city = str(form, 'city', 100);
  const tel = str(form, 'tel', 40);
  const email = str(form, 'email', 200);
  const consent = str(form, 'consent');

  if (!name || !city || !tel || !email) return bad('必須項目が入力されていません。');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad('メールアドレスの形式を確認してください。');
  if (!consent) return bad('個人情報保護方針への同意が必要です。');

  const lines: string[] = [];
  lines.push(kind === 'estimate' ? '【写真見積りの依頼】' : '【お問い合わせ】', '');
  lines.push(`お名前: ${name}`);
  lines.push(`市町村: ${city}`);
  lines.push(`電話番号: ${tel}`);
  lines.push(`メール: ${email}`);

  if (kind === 'estimate') {
    lines.push(`施工場所: ${str(form, 'place', 100)}`);
    lines.push(`おおよその広さ: ${str(form, 'size', 200) || '（未記入）'}`);
    lines.push(`現在の状態: ${str(form, 'condition', 100)}`);
    lines.push(`用途: ${str(form, 'purpose', 100)}`);
  } else {
    lines.push(`ご相談の種類: ${str(form, 'type', 100)}`);
    lines.push(`サンプル: ${str(form, 'sample', 20) || '希望なし'}`);
  }
  lines.push('', 'ご要望・ご相談内容:', str(form, 'message', 4000) || '（未記入）');
  lines.push('', `送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}`);

  // 写真（画像のみ・枚数と容量を制限）
  const attachments: { filename: string; content: string }[] = [];
  const files = form.getAll('photos').filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) return bad(`写真は${MAX_FILES}枚までです。`);
  let total = 0;
  for (const [i, f] of files.entries()) {
    if (!f.type.startsWith('image/')) return bad('写真は画像ファイルのみ送れます。');
    if (f.size > MAX_FILE_BYTES) return bad('写真1枚あたりの容量が大きすぎます（3MBまで）。');
    total += f.size;
    if (total > MAX_TOTAL_BYTES) return bad('写真の合計容量が大きすぎます（6MBまで）。');
    const buf = Buffer.from(await f.arrayBuffer());
    const ext = f.type === 'image/png' ? 'png' : f.type === 'image/webp' ? 'webp' : 'jpg';
    attachments.push({ filename: `photo-${i + 1}.${ext}`, content: buf.toString('base64') });
  }
  if (attachments.length) lines.push(`添付写真: ${attachments.length}枚`);

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  }

  const from = process.env.MAIL_FROM?.trim() || 'onboarding@resend.dev';
  const to = process.env.MAIL_TO?.trim() || shop.email;
  const subject = `${kind === 'estimate' ? '写真見積り' : 'お問い合わせ'}：${name}様（${city}）`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text: lines.join('\n'),
        attachments: attachments.length ? attachments : undefined,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('Resend error', res.status, detail);
      return bad('メールの送信に失敗しました。時間をおいて再度お試しください。', 502);
    }
  } catch (err) {
    console.error('Resend request failed', err);
    return bad('メールの送信に失敗しました。時間をおいて再度お試しください。', 502);
  }

  return NextResponse.json({ ok: true });
}
