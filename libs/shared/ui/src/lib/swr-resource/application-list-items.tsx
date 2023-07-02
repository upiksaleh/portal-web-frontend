import { useEffect, useState } from 'react';

import {
  UIListItems,
  UIListItemsOptionsType,
  UIPagination,
  UISwrResource,
} from '../components';
import {
  UIViewApplicationItemDialog,
  UIViewApplicationListItem,
  UIViewApplicationListItemOptionsProps,
  UIViewApplicationListItemSkeleton,
} from '../view';

export type UISwrResourceApplicationListItemsProps = {
  search?: string;
  categories: string[];
  listOptions?: Partial<UIListItemsOptionsType>;
  hideNavigation?: boolean;
  itemOptions?: Partial<UIViewApplicationListItemOptionsProps>;
};

function EmptyItems({ search }) {
  const SearchComp = () => {
    if (!search) return null;
    return (
      <span>
        untuk hasil pencarian <strong>{search}</strong>
      </span>
    );
  };
  return (
    <section className="w-full flex flex-col items-center justify-center bg-white pb-8">
      <section className="text-center">
        <p className="font-lato text-sm leading-relaxed text-gray-700 text-center mb-0.5">
          Untuk sementara belum ada data aplikasi <SearchComp />
        </p>
      </section>
    </section>
  );
}

export function UISwrResourceApplicationListItems({
  categories,
  search,
  listOptions,
  itemOptions,
  hideNavigation,
}: UISwrResourceApplicationListItemsProps) {
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [selengkapnyaShow, setSelengkapnyaShow] = useState(false);
  const [current, setCurrent] = useState<any>();
  useEffect(() => {
    setPage(1);
  }, [categories, search]);

  return (
    <UISwrResource
      resourceKey={'applications'}
      loadingComponent={() => {
        return (
          <UIListItems
            items={5}
            itemComponent={({ view }) => (
              <UIViewApplicationListItemSkeleton view={view} />
            )}
            view={'list'}
            {...listOptions}
          />
        );
      }}
      noItemsComponent={() => <EmptyItems search={search} />}
      pathQuery={['byCategories', categories.join('|')]}
      paramsQuery={{
        limit: perPage,
        page: page,
        search: search,
      }}
    >
      {({ data, meta }) => {
        return (
          <div className="w-full">
            <UIListItems
              view={'list'}
              {...listOptions}
              items={data}
              itemComponent={({ data, view }) => (
                <UIViewApplicationListItem
                  {...itemOptions}
                  data={data}
                  view={view}
                  itemAction={(data) => {
                    setCurrent(data);
                    setSelengkapnyaShow(true);
                  }}
                />
              )}
            />
            {!hideNavigation && (
              <div className="mt-6">
                <UIPagination
                  total={
                    meta.filter_count > meta.total_count
                      ? meta.total_count
                      : meta.filter_count
                  }
                  page={page}
                  limit={perPage}
                  setLimit={setPerPage}
                  setPage={setPage}
                />
              </div>
            )}
            <div className="flex items-end justify-end">
              <UIViewApplicationItemDialog
                data={current}
                show={selengkapnyaShow}
                setShow={setSelengkapnyaShow}
              />
            </div>
          </div>
        );
      }}
    </UISwrResource>
  );
}
