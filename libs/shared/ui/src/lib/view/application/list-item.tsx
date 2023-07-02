import { UIIcon, UIListItemsViewType } from '../../components';

export type UIViewApplicationListItemProps = {
  data: Record<string, any>;
} & UIViewApplicationListItemOptionsProps;
export type UIViewApplicationListItemOptionsProps = {
  view: UIListItemsViewType;
  itemAction(data: UIViewApplicationListItemProps['data']): any;
};
export function UIViewApplicationListItem({
  data,
  itemAction: onAction,
}: UIViewApplicationListItemProps) {
  const LogoComponent = ({ data, className }) => (
    <div className={`${className}`}>
      {data.logo.url ? (
        <img src={data.logo.url} alt={`Logo ${data.slug}`} className="w-full" />
      ) : (
        <UIIcon
          icon="carbon:application"
          className="text-primary"
          width={48}
          height={48}
        />
      )}
    </div>
  );
  return (
    <div
      onClick={() => onAction(data)}
      className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none
min-w-full flex border border-primary-50
p-4 w-full cursor-pointer group hover:bg-primary-50 rounded-lg"
    >
      <div className="flex gap-2 items-start h-full">
        <LogoComponent
          data={data}
          className="rounded-box bg-gray-100 group-hover:bg-primary-200 p-1 lg:p-3 w-[50px] md:w-[70px] lg:w-[100px] flex items-center justify-center"
        />
        <div className="flex-1">
          <div className="">
            <span
              className="inline-block rounded-md px-2 py-1 text-xs font-semibold text-gray-700 bg-primary-50
group-hover:text-primary-700 group-hover:bg-primary-200"
            >
              {data.slug}
            </span>
          </div>
          <div className="font-lato font-bold text-sm text-blue-gray-800 leading-1 md:text-base">
            {data.title}
          </div>

          <p className="w-4/4 font-lato text-sm font-normal text-[#415C84] leading-5 line-clamp-3 md:line-clamp-2 mt-3 mb-3">
            {data.description}
          </p>
          {data.categories.map((category, i) => {
            return (
              <div
                key={i}
                className="inline-block rounded-lg py-1 px-2 text-xs font-normal text-gray-700 bg-gray-100
group-hover:text-primary-700 group-hover:bg-primary-100 mr-2"
              >
                {category.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
