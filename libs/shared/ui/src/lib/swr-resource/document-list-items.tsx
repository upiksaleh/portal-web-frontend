import { useEffect, useState } from 'react';
import {
  UIViewDocumentItemDialog,
  UIViewDocumentListItem,
  UIViewDocumentListItemOptionsProps,
  UIViewDocumentListItemSkeleton,
} from '../view';
import {
  UIListItems,
  UIListItemsOptionsType,
  UIPagination,
  UISwrResource,
} from '../components';

export type UISwrResourceDocumentListItemsProps = {
  category?: string;
  search?: string;
  listOptions?: Partial<UIListItemsOptionsType>;
  organizationId?: string;
  hideNavigation?: boolean;
  itemOptions?: Partial<UIViewDocumentListItemOptionsProps>;
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
          Untuk sementara belum ada dokumen <SearchComp />
        </p>
      </section>
    </section>
  );
}

export function UISwrResourceDocumentListItems({
  organizationId,
  category,
  search,
  listOptions,
  itemOptions,
  hideNavigation,
}: UISwrResourceDocumentListItemsProps) {
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [selengkapnyaShow, setSelengkapnyaShow] = useState(false);
  const [current, setCurrent] = useState<any>();
  useEffect(() => {
    setPage(1);
  }, [category, search]);
  const filter = {};

  const resourceKey = organizationId ? 'organization_documents' : 'documents';
  let pathQuery = organizationId
    ? ['byOrganizationId', organizationId]
    : undefined;

  if (!organizationId && category) {
    pathQuery = ['byCategoryId', category];
  }
  if (organizationId && category) {
    filter['category'] = { _eq: category };
  }

  return (
    <UISwrResource
      resourceKey={resourceKey}
      loadingComponent={() => {
        return (
          <UIListItems
            items={5}
            itemComponent={({ view }) => (
              <UIViewDocumentListItemSkeleton view={view} />
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
                <UIViewDocumentListItem
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
                  total={meta.filter_count}
                  page={page}
                  limit={perPage}
                  setLimit={setPerPage}
                  setPage={setPage}
                />
              </div>
            )}
            <div className="flex items-end justify-end">
              <UIViewDocumentItemDialog
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
