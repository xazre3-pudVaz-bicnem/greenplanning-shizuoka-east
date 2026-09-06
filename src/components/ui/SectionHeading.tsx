import Reveal from './Reveal';

type Props = {
  /** 小さなラベル（日本語） */
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  /** 見出しレベル */
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  className?: string;
  tone?: 'light' | 'dark';
};

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  as = 'h2',
  id,
  className = '',
  tone = 'light',
}: Props) {
  const Tag = as;
  const center = align === 'center';
  const titleColor = tone === 'dark' ? 'text-white' : 'text-sumi';
  const leadColor = tone === 'dark' ? 'text-white/80' : 'text-sumi-2';
  const eyebrowColor = tone === 'dark' ? 'text-shiba-2' : '';

  return (
    <Reveal variant="line" className={`${center ? 'mx-auto max-w-[40rem] text-center' : ''} ${className}`}>
      {eyebrow && <p className={`eyebrow ${eyebrowColor} ${center ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <Tag
        id={id}
        className={`display mt-4 text-[1.55rem] leading-[1.45] sm:text-[2rem] lg:text-[2.2rem] ${titleColor}`}
      >
        {title}
      </Tag>
      {lead && <p className={`mt-5 text-[0.96rem] leading-[2] ${leadColor}`}>{lead}</p>}
    </Reveal>
  );
}
