import Link from 'next/link';
import Image from 'next/image';
import { documentIcon } from '@portal-web/shared-base';
import { UIIcon, UIListItemsViewType } from '../../components';

export type UIViewDocumentListItemProps = {
  data: Record<string, any>;
} & UIViewDocumentListItemOptionsProps;
export type UIViewDocumentListItemOptionsProps = {
  hideCategory?: true;
  view: UIListItemsViewType;
  itemAction?: (data: UIViewDocumentListItemProps['data']) => any;
};

export function UIViewDocumentListItem({
  data,
  itemAction,
  hideCategory,
}: UIViewDocumentListItemProps) {
  return (
    <div className="flex justify-start items-start w-full p-4 gap-4 border border-gray-100 rounded-xl">
      <Image
        src={documentIcon(data.file.type)}
        alt={data.title}
        className="w-[30px] h-[30px] md:w-[60px] md:h-[60px]"
        width={48}
        height={48}
      />
      <div className="text-left flex flex-col">
        {!hideCategory && (
          <div className="flex gap-2">
            <span
              className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-gray-100 mb-2
    hover:text-primary-700 hover:bg-primary-50"
            >
              {data.category?.name}
            </span>
          </div>
        )}
        <h3 className="font-lato text-left font-medium text-lg text-blue-gray-800 mb-2 line-clamp-2">
          {data.title}
        </h3>
        <p className="font-lato font-normal text-sm text-blue-gray-800 line-clamp-2">
          {data.description}
        </p>
        <div className="mt-5 flex  gap-2 items-start md:items-center">
          <button
            type="button"
            onClick={() => {
              if (itemAction) itemAction(data);
            }}
            className="font-lato gap-2 normal-case btn btn-outline btn-sm btn-primary"
          >
            <UIIcon icon="mdi:eye" fontSize="18px" />
            Selengkapnya
          </button>
          <Link
            href={data.file.url}
            target="_blank"
            title={data.title}
            download
            className="font-lato gap-2 normal-case btn text-white btn-sm btn-primary"
          >
            <UIIcon icon="mdi:download" fontSize="18px" />
            Unduh
          </Link>
        </div>
      </div>
    </div>
  );
}
