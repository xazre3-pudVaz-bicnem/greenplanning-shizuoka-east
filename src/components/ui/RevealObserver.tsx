'use client';

import { useEffect } from 'react';

/**
 * ページ全体で1つだけ置く、軽い「動き」の担当。
 *
 * 1. [data-visible="false"] を IntersectionObserver で監視し、画面に入ったら "true" にする（.reveal の表示）。
 *    React の state を経由しないので、要素が画面に入るたびに再レンダリングが走りません。
 *    クライアント遷移で足された要素は MutationObserver で拾います。
 *
 * 2. URLの #フラグメント で飛ぶとき、飛び先より上にある .cv（content-visibility: auto）を先に描画させます。
 *    .cv は画面外のあいだ仮の高さ（contain-intrinsic-size）で置かれているため、そのまま飛ぶと
 *    あとから上の区画が本当の高さで描画されて位置がずれます。上を先に描画してから合わせ直します。
 */
export default function RevealObserver() {
  useEffect(() => {
    const all = () => document.querySelectorAll<HTMLElement>('[data-visible="false"]');

    /* ── 1. スクロールで現れる ── */
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    let raf = 0;

    if (typeof IntersectionObserver === 'undefined') {
      all().forEach((el) => {
        el.dataset.visible = 'true';
      });
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.visible = 'true';
              io?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
      );
      const scan = () => all().forEach((el) => io?.observe(el));
      scan();
      mo = new MutationObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(scan);
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    /* ── 2. #フラグメントの位置合わせ ── */
    const settleHash = () => {
      let id = '';
      try {
        id = decodeURIComponent(location.hash.slice(1));
      } catch {
        return;
      }
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      for (const el of document.querySelectorAll<HTMLElement>('.cv')) {
        // el が target より前にある（祖先を含む）なら、仮の高さをやめて本当の高さで描画させる
        if (el.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING) {
          el.style.contentVisibility = 'visible';
        }
      }
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    };
    settleHash();
    window.addEventListener('hashchange', settleHash);

    return () => {
      cancelAnimationFrame(raf);
      mo?.disconnect();
      io?.disconnect();
      window.removeEventListener('hashchange', settleHash);
    };
  }, []);

  return null;
}
