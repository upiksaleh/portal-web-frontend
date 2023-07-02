import React, { useEffect, useState } from 'react';
import { UIListItems, UIListItemsOptionsType } from '../components/list-items';
import {
  UIViewNewsListItem,
  UIViewNewsListItemOptionsProps,
  UIViewNewsListItemSkeleton,
} from '../view/news';
import { UIPagination } from '../components/pagination';
import { UISwrResource } from '../components/swr';

export type UISwrResourceNewsListItemsProps = {
  category?: string;
  search?: string;
  listOptions?: Partial<UIListItemsOptionsType>;
  websiteId?: string;
  pathQuery?: string[];
  paramsQuery?: any;
  hideNavigation?: boolean;
  itemOptions?: Partial<UIViewNewsListItemOptionsProps>;
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
          Untuk sementara belum ada berita <SearchComp />
        </p>
      </section>
    </section>
  );
}

export function UISwrResourceNewsListItems({
  websiteId,
  category,
  search,
  listOptions,
  pathQuery,
  paramsQuery,
  hideNavigation,
  itemOptions,
}: UISwrResourceNewsListItemsProps) {
  const [perPage, setPerPage] = useState(paramsQuery?.limit ?? 6);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [category, search]);
  const filter = {};

  const resourceKey = websiteId ? 'web_news' : 'news';
  if (!pathQuery) {
    pathQuery = websiteId ? ['byWebId', websiteId] : undefined;

    if (!websiteId && category) {
      pathQuery = ['byCategorySlug', category];
    }
    if (websiteId && category) {
      filter['category'] = { _eq: category };
    }
  }
  if (websiteId) {
    itemOptions = { ...itemOptions, ...{ isWebNews: true } };
  }
  return (
    <UISwrResource
      resourceKey={resourceKey}
      loadingComponent={() => {
        return (
          <UIListItems
            items={5}
            itemComponent={({ view }) => (
              <UIViewNewsListItemSkeleton view={view} />
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
                <UIViewNewsListItem {...itemOptions} data={data} view={view} />
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
