'use client';

import Link from 'next/link';
import { useId, useRef, useState, type FormEvent } from 'react';
import { shop } from '@/data/shop';
import { allMunicipalities } from '@/data/areas';
import { CameraIcon, CheckIcon, MailIcon, PhoneIcon } from '@/components/ui/icons';

type Variant = 'estimate' | 'contact';

const purposes = ['庭', '雑草対策', 'ドッグラン', 'ゴルフ', 'マンション専用庭', 'ベランダ・テラス', '駐車場・アプローチ', '法人・施設', 'その他'];
const places = ['戸建ての庭', 'マンション専用庭', 'ベランダ・バルコニー', '屋上', '駐車場・アプローチ', '店舗・施設', 'その他'];
const conditions = ['土', '雑草', '天然芝', '砂利', 'コンクリート・タイル', '古い人工芝', 'その他・わからない'];
const contactTypes = ['相談したい（まだ決めていない）', '見積りをとりたい', 'サンプルがほしい', '商品・DIY用の材料について', '法人・協力施工について', 'その他'];

const MAX_FILES = 5;
const MAX_EDGE = 1600;

/** 端末の写真は数MBあるので、送る前にブラウザ側で縮小する（Vercelの本文サイズ上限とメール添付の両方のため） */
async function shrinkImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 900 * 1024) return file;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
    if (!blob) return file;
    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], name, { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'done' } | { kind: 'error'; message: string } | { kind: 'unconfigured' };

export default function InquiryForm({ variant }: { variant: Variant }) {
  const id = useId();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isEstimate = variant === 'estimate';

  const onFiles = (list: FileList | null) => {
    setFileError(null);
    if (!list) return;
    const next = [...files, ...Array.from(list)].filter((f) => f.type.startsWith('image/'));
    if (next.length > MAX_FILES) {
      setFileError(`写真は${MAX_FILES}枚までお送りいただけます。`);
      setFiles(next.slice(0, MAX_FILES));
      return;
    }
    setFiles(next);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus({ kind: 'sending' });

    const data = new FormData(form);
    data.delete('photos');
    data.set('kind', variant);
    if (isEstimate) {
      const shrunk = await Promise.all(files.map(shrinkImage));
      for (const f of shrunk) data.append('photos', f, f.name);
    }

    try {
      const res = await fetch('/api/inquiry', { method: 'POST', body: data });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; reason?: string; message?: string };
      if (res.ok && json.ok) {
        setStatus({ kind: 'done' });
        form.reset();
        setFiles([]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (res.status === 503 && json.reason === 'not_configured') {
        setStatus({ kind: 'unconfigured' });
        return;
      }
      setStatus({ kind: 'error', message: json.message ?? '送信できませんでした。時間をおいて再度お試しいただくか、お電話・メールでご連絡ください。' });
    } catch {
      setStatus({ kind: 'error', message: '通信エラーが起きました。電波の良い場所で再度お試しいただくか、お電話・メールでご連絡ください。' });
    }
  };

  if (status.kind === 'done') {
    return (
      <div className="hairline bg-wakaba p-6 sm:p-8" role="status">
        <p className="flex items-center gap-3 text-fukami">
          <CheckIcon className="text-[1.3rem]" />
          <span className="display text-[1.2rem]">送信ありがとうございます。</span>
        </p>
        <p className="mt-4 text-[0.95rem] leading-[2] text-sumi-2">
          内容を確認のうえ、{shop.representative}よりメールまたはお電話でご連絡します（受付 {shop.hours.label}）。数日たっても返信がない場合は、お手数ですが {shop.tel} までお電話ください。
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <li>
            <Link href="/works" className="rule-link text-fukami">
              施工事例を見る
            </Link>
          </li>
          <li>
            <Link href="/price" className="rule-link text-fukami">
              費用の考え方
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  const mailtoBody = encodeURIComponent(
    isEstimate
      ? `【写真見積り希望】\nお名前：\n市町村：\n電話番号：\n施工場所：\nおおよその広さ：\n現在の状態：\n用途：\nご要望：\n（このメールに庭の写真を添付してください）`
      : `【ご相談】\nお名前：\n市町村：\n電話番号：\nご相談内容：`,
  );
  const mailto = `mailto:${shop.email}?subject=${encodeURIComponent(isEstimate ? '写真見積りの依頼' : 'ご相談')}&body=${mailtoBody}`;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate={false} className="space-y-8">
      {/* honeypot（人には見えない） */}
      <div className="hidden" aria-hidden>
        <label>
          会社URL
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${id}-name`} label="お名前" required>
          <input id={`${id}-name`} name="name" type="text" required autoComplete="name" className={inputClass} placeholder="山田 花子" />
        </Field>
        <Field id={`${id}-city`} label="市町村" required>
          <input id={`${id}-city`} name="city" type="text" required list={`${id}-cities`} autoComplete="address-level2" className={inputClass} placeholder="沼津市" />
          <datalist id={`${id}-cities`}>
            {allMunicipalities.map((m) => (
              <option key={m} value={m} />
            ))}
          </datalist>
        </Field>
        <Field id={`${id}-tel`} label="電話番号" required>
          <input id={`${id}-tel`} name="tel" type="tel" required autoComplete="tel" inputMode="tel" className={inputClass} placeholder="055-000-0000" />
        </Field>
        <Field id={`${id}-email`} label="メールアドレス" required>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" inputMode="email" className={inputClass} placeholder="example@example.com" />
        </Field>
      </div>

      {isEstimate ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id={`${id}-place`} label="施工場所" required>
              <select id={`${id}-place`} name="place" required className={inputClass} defaultValue="">
                <option value="" disabled>
                  選んでください
                </option>
                {places.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={`${id}-size`} label="おおよその広さ" hint="例：縦5m×横4m、約20㎡、図面あり。わからなければ「不明」で構いません">
              <input id={`${id}-size`} name="size" type="text" className={inputClass} placeholder="縦5m×横4m くらい" />
            </Field>
            <Field id={`${id}-condition`} label="現在の状態" required>
              <select id={`${id}-condition`} name="condition" required className={inputClass} defaultValue="">
                <option value="" disabled>
                  選んでください
                </option>
                {conditions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={`${id}-purpose`} label="用途" required>
              <select id={`${id}-purpose`} name="purpose" required className={inputClass} defaultValue="">
                <option value="" disabled>
                  選んでください
                </option>
                {purposes.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field id={`${id}-photos`} label="写真" hint={`全体がわかる写真と、別アングルの写真があると正確になります（${MAX_FILES}枚まで・送信前に自動で縮小します）`}>
            <label className="hairline flex cursor-pointer flex-col items-center justify-center gap-2 bg-kinari px-4 py-8 text-center text-[0.9rem] text-sumi-2 transition-colors hover:bg-wakaba">
              <CameraIcon className="text-[1.6rem] text-fukami" />
              <span>写真を選ぶ（撮影またはライブラリから）</span>
              <input id={`${id}-photos`} type="file" name="photos" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} />
            </label>
            {files.length > 0 && (
              <ul className="mt-3 space-y-1.5 text-[0.84rem] text-sumi-2">
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 border-b border-sen py-1.5">
                    <span className="truncate">{f.name}</span>
                    <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="shrink-0 text-[0.78rem] text-hai underline underline-offset-4">
                      削除
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {fileError && <p className="mt-2 text-[0.82rem] text-[#b3412a]">{fileError}</p>}
          </Field>

          <Field id={`${id}-message`} label="ご要望・気になっていること" hint="雨のあとに水がたまる場所、犬種、希望の商品、予算の目安など、分かる範囲で">
            <textarea id={`${id}-message`} name="message" rows={5} className={inputClass} placeholder="例：新築で庭が土のままです。子どもと犬が遊べるようにしたいです。予算は20万円くらいまでで考えています。" />
          </Field>
        </>
      ) : (
        <>
          <Field id={`${id}-type`} label="ご相談の種類" required>
            <select id={`${id}-type`} name="type" required className={inputClass} defaultValue="">
              <option value="" disabled>
                選んでください
              </option>
              {contactTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field id={`${id}-message`} label="ご相談内容" required>
            <textarea id={`${id}-message`} name="message" rows={6} required className={inputClass} placeholder="例：三島市の戸建てです。天然芝の手入れが大変で、人工芝にするか砂利にするか迷っています。まず話を聞かせてください。" />
          </Field>
          <label className="flex items-center gap-3 text-[0.9rem] text-sumi-2">
            <input type="checkbox" name="sample" value="希望する" className="h-5 w-5 accent-fukami" />
            人工芝のサンプルを希望する
          </label>
        </>
      )}

      <div className="border-t border-sen pt-6">
        <label className="flex items-start gap-3 text-[0.9rem] leading-[1.8] text-sumi-2">
          <input type="checkbox" name="consent" value="同意する" required className="mt-1 h-5 w-5 shrink-0 accent-fukami" />
          <span>
            <Link href="/privacy" className="py-1 text-fukami underline underline-offset-4">
              個人情報保護方針
            </Link>
            に同意のうえ送信します。お預かりした写真は見積りと施工計画にのみ使い、同意なく公開しません。
          </span>
        </label>
      </div>

      {status.kind === 'error' && (
        <p role="alert" className="hairline bg-[#fbf1ee] p-4 text-[0.9rem] leading-[1.8] text-[#8c3320]">
          {status.message}
        </p>
      )}

      {status.kind === 'unconfigured' && (
        <div role="alert" className="hairline bg-kinari p-5 text-[0.9rem] leading-[1.9] text-sumi-2">
          <p>フォームのメール送信がまだ設定されていません。お手数ですが、メールまたはお電話でご連絡ください。</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href={mailto} className="inline-flex items-center gap-2 text-fukami underline underline-offset-4">
                <MailIcon />
                {shop.email}
              </a>
            </li>
            <li>
              <a href={shop.telHref} className="inline-flex items-center gap-2 text-fukami underline underline-offset-4">
                <PhoneIcon />
                {shop.tel}
              </a>
            </li>
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status.kind === 'sending'} className="btn btn-primary min-w-[16rem] disabled:opacity-60">
          {status.kind === 'sending' ? '送信しています…' : isEstimate ? '写真を送って概算を聞く' : '送信する'}
        </button>
        <p className="text-[0.8rem] leading-[1.8] text-hai">相談・見積りは無料です。しつこい営業はしません。</p>
      </div>
    </form>
  );
}

const inputClass =
  'w-full border border-sen-2 bg-white px-3.5 py-3 text-[0.95rem] text-sumi placeholder:text-hai/60 focus:border-fukami focus:outline-none focus-visible:ring-2 focus-visible:ring-fukami/30 rounded-[2px]';

function Field({ id, label, required, hint, children }: { id: string; label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline gap-2 text-[0.86rem] text-sumi">
        <span className="display">{label}</span>
        {required ? <span className="text-[0.7rem] text-[#b3412a]">必須</span> : <span className="text-[0.7rem] text-hai">任意</span>}
      </label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-1.5 text-[0.76rem] leading-[1.7] text-hai">{hint}</p>}
    </div>
  );
}
