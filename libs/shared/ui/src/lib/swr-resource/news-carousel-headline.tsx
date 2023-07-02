import {
  UISwrComponentProps,
  UISwrResource,
  UISwrResourceProps,
} from '../components';
import { UIViewNewsCarouselHeadline } from '../view/news/carousel-headline';
export type UISwrResourceNewsCarouselHeadlineProps<K extends never> = Partial<
  UISwrResourceProps<K>
>;
export function UISwrResourceNewsCarouselHeadline<K extends never>({
  pathQuery,
  paramsQuery,
}: UISwrResourceNewsCarouselHeadlineProps<K>) {
  const loadingComponent: UISwrComponentProps['loadingComponent'] = () => {
    return (
      <div className={'h-[650px] bg-primary-400'}>
        <div
          className="w-full h-full animate-pulse"
          style={{
            background:
              'radial-gradient(56.33% 56.33% at 50.59% 43.67%, rgba(0, 23, 28, 0.5) 0%, rgba(0, 11, 14, 0.7) 46.15%, rgba(0, 11, 14, 0.82) 100%)',
          }}
        />
      </div>
    );
  };
  const noItemsComponent: UISwrComponentProps['noItemsComponent'] = () => {
    return (
      <div className={'h-[650px] bg-primary-400'}>
        <div className="flex items-center justify-center min-h-full">
          <div>Belum ada data</div>
        </div>
      </div>
    );
  };

  return (
    <UISwrResource
      resourceKey="news"
      loadingComponent={loadingComponent}
      noItemsComponent={noItemsComponent}
      pathQuery={pathQuery}
      paramsQuery={{ ...{ limit: 5 }, ...(paramsQuery ?? {}) }}
    >
      {({ data }) => {
        return <UIViewNewsCarouselHeadline items={data} />;
      }}
    </UISwrResource>
  );
}
