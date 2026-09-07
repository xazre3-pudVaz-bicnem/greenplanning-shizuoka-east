import { shop } from '@/data/shop';
import { regions } from '@/data/areas';

/** 店舗情報の表。トップ・/about・/contact で使う。NAPは data/shop.ts から */
export default function ShopInfoTable({ compact = false }: { compact?: boolean }) {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: '店舗名', value: shop.name },
    { label: '代表', value: shop.representative },
    { label: '所在地', value: shop.address.full },
    {
      label: '直通電話',
      value: (
        <a href={shop.telHref} className="num inline-block py-1 underline underline-offset-4">
          {shop.tel}
        </a>
      ),
    },
    {
      label: 'メール',
      value: (
        <a href={`mailto:${shop.email}`} className="inline-block break-all py-1 underline underline-offset-4">
          {shop.email}
        </a>
      ),
    },
    { label: '受付時間', value: shop.hours.note },
    {
      label: 'Instagram',
      value: (
        <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="inline-block py-1 underline underline-offset-4">
          {shop.instagramHandle}
        </a>
      ),
    },
  ];

  if (!compact) {
    rows.push(
      { label: '事業内容', value: shop.business.join('・') },
      { label: '対応するお客様', value: shop.customers.join('・') },
      {
        label: '対応エリア',
        value: (
          <span className="block space-y-1">
            {regions.map((r) => (
              <span key={r.key} className="block">
                <span className="text-hai">{r.label}：</span>
                {r.municipalities.join('・')}
              </span>
            ))}
          </span>
        ),
      },
      {
        label: 'ブランド',
        value: (
          <span>
            <a href={shop.hq.url} target="_blank" rel="noopener noreferrer" className="inline-block py-1 underline underline-offset-4">
              {shop.hq.name}
            </a>
            の静岡県東部・中部・伊豆地域を担当する加盟店
          </span>
        ),
      },
    );
  }

  return (
    <div className="table-scroll">
      <table className="spec-table">
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td className="text-sumi-2">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
