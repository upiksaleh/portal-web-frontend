import { useEffect, useState } from 'react';
import {
  UIListItems,
  UIListItemsType,
  UIListItemsViewType,
  UIPagination,
  UIPaginationProps,
} from '../components';
import {
  IUICreateSwrResourceDefine,
  UICreateSwrResource,
} from './swr-resource';
import { DirectusItemsListType } from '@portal-web/shared-api';
import { merge } from 'lodash';

export type UICreateSwrResourceListItemsType = IUICreateSwrResourceDefine<{
  resourceKey: 'news';
  props: {
    resourceKey: keyof DirectusItemsListType;
    ItemComponent: UIListItemsType['props']['itemComponent'];
    LoadingComponent: UIListItemsType['props']['itemComponent'];
    customizes?: UIListItemsType['props']['customizes'];
    view?: UIListItemsViewType;
    pagination?: false | Partial<UIPaginationProps>;
  };
}>;

export const UICreateSwrResourceListItems: UICreateSwrResourceListItemsType['returnType'] =
  (props) => {
    const [view, setView] = useState(props.view ?? 'list');
    const [page, setPage] = useState(props?.paramsQuery?.page ?? 1);
    const [limit, setLimit] = useState(props?.paramsQuery?.limit ?? 6);
    useEffect(() => {
      setPage(props?.paramsQuery?.page ?? 1);
    }, [props.paramsQuery, props.pathQuery]);

    const { ItemComponent, pagination } = props;

    props = merge(props, { qu: 'a' });
    return UICreateSwrResource<UICreateSwrResourceListItemsType>({
      props,
      resourceKey: props.resourceKey,
      LoadingComponent({ props }) {
        return (
          <UIListItems
            view={view}
            setView={setView}
            items={4}
            itemComponent={props.LoadingComponent}
          />
        );
      },
      Component({ data }) {
        const { meta } = data;
        return (
          <>
            <UIListItems
              view={view}
              setView={setView}
              items={data.data}
              itemComponent={ItemComponent}
            />
            {pagination !== false && meta ? (
              <div className="mt-6">
                <UIPagination
                  total={
                    meta.filter_count > meta.total_count
                      ? meta.total_count
                      : meta.filter_count
                  }
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  setLimit={setLimit}
                  {...(pagination ?? {})}
                />
              </div>
            ) : null}
          </>
        );
      },
    });
  };
