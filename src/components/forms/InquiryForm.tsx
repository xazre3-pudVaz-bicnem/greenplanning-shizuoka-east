'use client';

import Link from 'next/link';
import { useId, useState, type FormEvent } from 'react';
import { shop } from '@/data/shop';
import { allMunicipalities } from '@/data/areas';
import { CameraIcon, CheckIcon, MailIcon, PhoneIcon } from '@/components/ui/icons';

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

/**
 * お問い合わせフォーム（1種類だけ）。
 * 入力は連絡に必要な項目とお問い合わせ内容に絞り、写真は任意で添付できるようにしています。
 * 静岡EASTに確認できていない約束（無料・返信の早さなど）は画面に書きません。
 */
export default function InquiryForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

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
    const shrunk = await Promise.all(files.map(shrinkImage));
    for (const f of shrunk) data.append('photos', f, f.name);

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
      setStatus({ kind: 'error', message: '通信エラーが起きました。時間をおいて再度お試しいただくか、お電話・メールでご連絡ください。' });
    }
  };

  if (status.kind === 'done') {
    return (
      <div className="hairline bg-wakaba p-6 sm:p-8" role="status">
        <p className="flex items-center gap-3 text-fukami">
          <CheckIcon className="text-[1.3rem]" />
          <span className="display text-[1.2rem]">送信しました。</span>
        </p>
        <p className="mt-4 text-[0.95rem] leading-[2] text-sumi-2">
          内容を確認のうえ、ご連絡します。お急ぎの場合は {shop.tel}（{shop.hours.label}）までお電話ください。
        </p>
        <Link href="/" className="rule-link mt-6 text-fukami">
          トップへ戻る
        </Link>
      </div>
    );
  }

  const mailto = `mailto:${shop.email}?subject=${encodeURIComponent('お問い合わせ')}&body=${encodeURIComponent('お名前：\n市町村：\n電話番号：\nお問い合わせ内容：\n')}`;

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* honeypot（人には見えない） */}
      <div className="hidden" aria-hidden>
        <label>
          会社URL
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${id}-name`} label="お名前" required>
          <input id={`${id}-name`} name="name" type="text" required autoComplete="name" className={inputClass} />
        </Field>
        <Field id={`${id}-city`} label="市町村" required>
          <input id={`${id}-city`} name="city" type="text" required list={`${id}-cities`} autoComplete="address-level2" className={inputClass} />
          <datalist id={`${id}-cities`}>
            {allMunicipalities.map((m) => (
              <option key={m} value={m} />
            ))}
          </datalist>
        </Field>
        <Field id={`${id}-tel`} label="電話番号" required>
          <input id={`${id}-tel`} name="tel" type="tel" required autoComplete="tel" inputMode="tel" className={inputClass} />
        </Field>
        <Field id={`${id}-email`} label="メールアドレス" required>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" inputMode="email" className={inputClass} />
        </Field>
      </div>

      <Field id={`${id}-message`} label="お問い合わせ内容" required>
        <textarea id={`${id}-message`} name="message" rows={6} required className={inputClass} />
      </Field>

      <Field id={`${id}-photos`} label="写真" hint={`場所の写真があれば添付できます（${MAX_FILES}枚まで・送信前に自動で縮小します）`}>
        <label className="hairline flex cursor-pointer flex-col items-center justify-center gap-2 bg-kinari px-4 py-7 text-center text-[0.9rem] text-sumi-2 transition-colors hover:bg-wakaba">
          <CameraIcon className="text-[1.5rem] text-fukami" />
          <span>写真を選ぶ</span>
          <input id={`${id}-photos`} type="file" name="photos" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} />
        </label>
        {files.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-[0.84rem] text-sumi-2">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 border-b border-sen py-1.5">
                <span className="truncate">{f.name}</span>
                <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="shrink-0 py-1 text-[0.78rem] text-hai underline underline-offset-4">
                  削除
                </button>
              </li>
            ))}
          </ul>
        )}
        {fileError && <p className="mt-2 text-[0.82rem] text-[#b3412a]">{fileError}</p>}
      </Field>

      <div className="border-t border-sen pt-6">
        <label className="flex items-start gap-3 text-[0.9rem] leading-[1.8] text-sumi-2">
          <input type="checkbox" name="consent" value="同意する" required className="mt-0.5 h-6 w-6 shrink-0 accent-fukami" />
          <span>
            <Link href="/privacy" className="py-1 text-fukami underline underline-offset-4">
              個人情報保護方針
            </Link>
            に同意のうえ送信します。
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
              <a href={mailto} className="inline-flex items-center gap-2 break-all text-fukami underline underline-offset-4">
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

      <button type="submit" disabled={status.kind === 'sending'} className="btn btn-primary min-w-[14rem] disabled:opacity-60">
        {status.kind === 'sending' ? '送信しています…' : '送信する'}
      </button>
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
