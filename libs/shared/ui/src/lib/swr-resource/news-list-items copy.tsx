import React, { useEffect, useState } from 'react';
import {
  UIListItems,
  UIListItemsOptionsType,
  UIListItemsViewType,
} from '../components/list-items';
import {
  UIViewNewsListItem,
  UIViewNewsListItemSkeleton,
  UIViewNewsListItemType,
} from '../view/news';
import { UIPagination } from '../components/pagination';
import { UISwrResource } from '../components/swr';

export type UISwrResourceNewsListItemsProps = {
  category?: string;
  search?: string;
  view?: UIListItemsViewType;
  listOptions?: Partial<UIListItemsOptionsType>;
  websiteId?: string;
  pathQuery?: string[];
  paramsQuery?: any;
  hideNavigation?: boolean;
  itemOptions?: Partial<UIViewNewsListItemType['props']>;
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
  view: defaultView = 'list',
}: UISwrResourceNewsListItemsProps) {
  const [view, setView] = useState(defaultView);
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
            {...listOptions}
            items={5}
            itemComponent={({ view }) => (
              <UIViewNewsListItemSkeleton view={view} />
            )}
            view={view}
            setView={setView}
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
              {...listOptions}
              view={view}
              setView={setView}
              items={data}
              customizes={{
                listIconName: () => 'mdi:file',
              }}
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
