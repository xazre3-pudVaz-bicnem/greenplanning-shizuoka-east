import { shop } from '@/data/shop';

/**
 * Googleマップの埋め込み。
 * loading="lazy" にして、地図が原因で初期表示が遅くならないようにしています。
 */
export default function GoogleMap({ className = '' }: { className?: string }) {
  return (
    <div className={`map-frame hairline relative aspect-[4/3] w-full overflow-hidden bg-kinari sm:aspect-[16/9] ${className}`}>
      <iframe
        title={`${shop.shortName}の地図（沼津市泉町）`}
        src={shop.mapEmbedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
