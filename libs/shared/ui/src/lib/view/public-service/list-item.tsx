import Link from 'next/link';
import { UIIcon, UIListItemsViewType } from '../../components';

export type UIViewPublicServiceListItemProps = {
  data: Record<string, any>;
} & UIViewPublicServiceListItemOptionsProps;
export type UIViewPublicServiceListItemOptionsProps = {
  view: UIListItemsViewType;
};

export function UIViewPublicServiceListItem({
  data,
}: UIViewPublicServiceListItemProps) {
  const LogoComponent = ({ data, className }) => (
    <div className={`${className}`}>
      {data.logo ? (
        <img src={data.logo.url} alt={`Logo ${data.slug}`} className="w-full" />
      ) : (
        <UIIcon
          icon="mdi:service-toolbox"
          className="text-primary-base"
          width={48}
          height={48}
        />
      )}
    </div>
  );
  return (
    <Link
      href={`/layanan-publik/${data.id}`}
      // onClick={() => showModal(item)}
      className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none
min-w-full rounded-xl flex border border-primary-50
p-4 w-full cursor-pointer group hover:bg-primary-50"
    >
      <div className="flex gap-2 items-start h-full">
        <LogoComponent
          data={data}
          className="rounded-box bg-gray-100 group-hover:bg-primary-200 p-1 lg:p-3 w-[50px] md:w-[70px] lg:w-[100px] flex items-center justify-center"
        />
        <div className="">
          <div className="font-lato font-bold text-sm text-blue-gray-800 leading-1 md:text-base">
            {data.title}
          </div>

          {data.type.length ? (
            <div className="flex gap-2 mb-2">
              {data.type.map((t, i) => (
                <span
                  key={i}
                  className="inline-block rounded-md px-2 py-1 text-xs font-semibold text-gray-700 bg-primary-50
group-hover:text-primary-700 group-hover:bg-primary-200"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
          <p className="w-4/4 font-lato text-sm font-normal text-[#415C84] leading-5 line-clamp-3 md:line-clamp-2 mt-3 mb-3">
            {data.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
