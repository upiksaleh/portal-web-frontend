import React, { useEffect, useState } from 'react';
import { UIListItems, UIListItemsOptionsType } from '../components/list-items';
import { UIPagination } from '../components/pagination';
import { UISwrResource } from '../components/swr';
import {
  UIViewPublicServiceListItem,
  UIViewPublicServiceListItemOptionsProps,
  UIViewPublicServiceListItemSkeleton,
} from '../view';

export type UISwrResourcePublicServiceListItemsProps = {
  category?: string;
  search?: string;
  listOptions?: Partial<UIListItemsOptionsType>;
  pathQuery?: string[];
  paramsQuery?: any;
  hideNavigation?: boolean;
  itemOptions?: Partial<UIViewPublicServiceListItemOptionsProps>;
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
          Untuk sementara belum ada data layanan publik <SearchComp />
        </p>
      </section>
    </section>
  );
}

export function UISwrResourcePublicServiceListItems({
  category,
  search,
  listOptions,
  pathQuery,
  paramsQuery,
  hideNavigation,
  itemOptions,
}: UISwrResourcePublicServiceListItemsProps) {
  const [perPage, setPerPage] = useState(paramsQuery?.limit ?? 6);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [category, search]);
  const filter = {};

  return (
    <UISwrResource
      resourceKey={'public_services'}
      loadingComponent={() => {
        return (
          <UIListItems
            items={5}
            itemComponent={({ view }) => (
              <UIViewPublicServiceListItemSkeleton view={view} />
            )}
            view={'list'}
            {...listOptions}
          />
        );
      }}
      noItemsComponent={() => <EmptyItems search={search} />}
      pathQuery={pathQuery}
      paramsQuery={{
        limit: perPage,
        page: page,
        search: search,
        filter,
        ...paramsQuery,
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
                <UIViewPublicServiceListItem
                  {...itemOptions}
                  data={data}
                  view={view}
                />
              )}
            />
            {!hideNavigation && (
              <div className="mt-6">
                <UIPagination
                  total={meta.filter_count}
                  page={page}
                  limit={perPage}
                  setLimit={setPerPage}
                  setPage={setPage}
                />
              </div>
            )}
          </div>
        );
      }}
    </UISwrResource>
  );
}
