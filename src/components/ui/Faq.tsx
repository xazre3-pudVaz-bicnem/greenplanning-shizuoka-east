import Reveal from './Reveal';

type Item = { q: string; a: string };

/**
 * よくある質問。
 * details/summary で作っているので、JSがなくても開閉できます。
 * 中身は最初から HTML に含まれているため、検索エンジンにもAIにも読まれます。
 * （dl の中に details を置くと HTML として不正になるため、div で組んでいます）
 */
export default function Faq({ items, defaultOpenFirst = false }: { items: Item[]; defaultOpenFirst?: boolean }) {
  return (
    <div className="border-t border-sen">
      {items.map((item, i) => (
        <Reveal as="div" key={item.q} delay={Math.min(i, 6) * 50}>
          <details className="group border-b border-sen" open={defaultOpenFirst && i === 0}>
            <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden sm:gap-5 sm:py-6">
              <span aria-hidden className="num mt-[0.3em] shrink-0 text-[0.8rem] text-fukami">
                Q
              </span>
              <span className="display flex-1 text-[1rem] leading-[1.7] sm:text-[1.06rem]">{item.q}</span>
              <span
                aria-hidden
                className="relative mt-[0.65em] h-3 w-3 shrink-0 text-fukami transition-transform duration-500 group-open:rotate-45"
              >
                <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current" />
              </span>
            </summary>
            <div className="flex gap-4 pb-6 pr-7 text-[0.94rem] leading-[1.95] text-sumi-2 sm:gap-5">
              <span aria-hidden className="num mt-[0.15em] shrink-0 text-[0.8rem] text-fukami">
                A
              </span>
              <p>{item.a}</p>
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
