import Breadcrumbs from './Breadcrumbs';
import Photo from './Photo';
import type { Photo as PhotoData } from '@/data/photos';
import type { Crumb } from '@/lib/jsonld';

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  photo: PhotoData;
  position?: string;
  crumbs: Crumb[];
  /** 写真の代替テキストを差し替えたいとき */
  alt?: string;
};

/**
 * 下層ページの見出し。
 * 元写真が800px幅までしかないため、画面いっぱいに引き伸ばさず、
 * 左に文章・右に写真の分割レイアウトにしています（スマホでは縦積み）。
 */
export default function PageHero({ eyebrow, title, lead, photo, position, crumbs, alt }: Props) {
  return (
    <header className="bg-shiro pt-20 sm:pt-24">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="pb-2 pt-6 lg:pb-10 lg:pt-10">
            <Breadcrumbs crumbs={crumbs} />
            {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
            <h1 className="display mt-4 text-[1.75rem] leading-[1.4] sm:text-[2.3rem] lg:text-[2.6rem]">{title}</h1>
            {lead && <p className="mt-6 max-w-[36rem] text-[0.98rem] leading-[2.05] text-sumi-2">{lead}</p>}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-kinari hero-photo lg:aspect-[5/4]">
            <Photo photo={photo} fill sizes="(min-width: 1024px) 50vw, 100vw" priority quality={78} position={position} alt={alt} />
          </div>
        </div>
      </div>
    </header>
  );
}
