import {
  UIViewNewsListItem,
  UIViewNewsListItemSkeleton,
  UIViewNewsListItemSkeletonType,
  UIViewNewsListItemType,
} from '../view/news';
import {
  IUICreateListItemsSwrResourceDefine,
  UICreateListItemsSwrResource,
  UICreateSwrResource,
  UICreateSwrResourceListItems,
} from '../create';

export type UISwrResourceNewsListItemsType =
  IUICreateListItemsSwrResourceDefine<{
    props: { a: string };
    resourceKey: 'news' | 'web_news';
    skeletonComponentType: UIViewNewsListItemSkeletonType;
    itemComponentType: UIViewNewsListItemType;
  }>;

export const UISwrResourceNewsListItems: UISwrResourceNewsListItemsType['returnType'] =
  (props) =>
    UICreateSwrResourceListItems<UISwrResourceNewsListItemsType>({
      props,
      resourceKey: 'news',
      skeletonComponent: UIViewNewsListItemSkeleton,
      itemComponent: UIViewNewsListItem,
      emptyDataComponent: () => (
        <section className="w-full flex flex-col items-center justify-center bg-white pb-8">
          <section className="text-center">
            <p className="font-lato text-sm leading-relaxed text-gray-700 text-center mb-0.5">
              Untuk sementara belum ada berita
            </p>
          </section>
        </section>
      ),
    });
