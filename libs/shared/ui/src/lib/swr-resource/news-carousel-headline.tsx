import {
  UICreateSwrResource,
  IUICreateSwrResourceDefine,
} from '../create/swr-resource';
import {
  UIViewNewsCarouselHeadline,
  UIViewNewsCarouselHeadlineType,
} from '../view/news/carousel-headline';

export type UISwrResourceNewsCarouselHeadlineType = IUICreateSwrResourceDefine<{
  props: {
    customizes?: UIViewNewsCarouselHeadlineType['props']['customizes'];
  };
}>;
export const UISwrResourceNewsCarouselHeadline: UISwrResourceNewsCarouselHeadlineType['returnType'] =
  (props) => {
    return UICreateSwrResource<UISwrResourceNewsCarouselHeadlineType>({
      props,
      resourceKey: 'news',
      EmptyDataComponent: () => (
        <div className={'h-[650px] bg-primary-400'}>
          <div className="flex items-center justify-center min-h-full">
            <div>Belum ada data</div>
          </div>
        </div>
      ),
      LoadingComponent: () => (
        <div className={'h-[650px] bg-primary-400'}>
          <div
            className="w-full h-full animate-pulse"
            style={{
              background:
                'radial-gradient(56.33% 56.33% at 50.59% 43.67%, rgba(0, 23, 28, 0.5) 0%, rgba(0, 11, 14, 0.7) 46.15%, rgba(0, 11, 14, 0.82) 100%)',
            }}
          />
        </div>
      ),
      Component: ({ data, props }) => (
        <UIViewNewsCarouselHeadline
          customizes={props.customizes}
          items={data.data}
        />
      ),
    });
  };
