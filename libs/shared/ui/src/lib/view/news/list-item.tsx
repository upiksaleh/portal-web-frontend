import Link from 'next/link';
import clsx from 'clsx';
import { UIIcon, UIListItemsViewType, UINextImageBlur } from '../../components';
import {
  IUICreateCustomizableDefine,
  UICreateCustomizable,
} from '../../create';
import { ReactElement, ReactNode } from 'react';

type Props = {
  data: Record<string, any>;
  view: UIListItemsViewType;
  isWebNews?: boolean;
  small?: boolean;
};
export type UIViewNewsListItemType = IUICreateCustomizableDefine<
  Props,
  {
    titleField: string;
    descriptionField: string;
    imageCoverUrlField: string;
    slugField: string;
    publishDateField: string;
    categoryNameField: string;
    urlToRead: string;
    title: ReactNode;
    description: ReactElement;
    linkProps: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  }
>;
export const UIViewNewsListItem: UIViewNewsListItemType['returnType'] = (
  props
) =>
  UICreateCustomizable<UIViewNewsListItemType>({
    props,
    defaults: {
      titleField: ({ data }) => data.title,
      descriptionField: ({ data }) => data.description,
      imageCoverUrlField: ({ data }) => data.image_cover.url,
      slugField: ({ data }) => data.slug,
      publishDateField: ({ data }) => data.publish_date_format,
      categoryNameField: ({ data }) => data.category.name ?? '-',
      urlToRead: ({ render }) => `/berita/${render('slugField')}`,
      linkProps: () => ({}),
      title: ({ render }) => (
        <h1 className="font-lato font-medium text-lg leading-7 text-blue-gray-800 mb-[6px] group-hover:text-primary-700 line-clamp-2">
          {render('titleField')}
        </h1>
      ),
      description: ({ render }) => (
        <p className="font-lato font-normal text-sm leading-6 text-gray-600 mb-2 group-hover:text-blue-gray-600 line-clamp-2">
          {render('descriptionField') === '' ? '' : render('descriptionField')}
        </p>
      ),
    },
    Component({ Render, data, render, view, isWebNews, small }) {
      return (
        <div
          className={clsx(
            'min-w-0 w-full group rounded-xl border border-transparent',
            'transition-all duration-150 ease-out hover:border-gray-200 hover:shadow-sm',
            view === 'grid'
              ? 'flex flex-col min-h-[280px]'
              : 'flex gap-4 min-h-[88px]'
          )}
        >
          <Link
            href={render('urlToRead')}
            aria-label={render('titleField')}
            title={render('titleField')}
            {...render('linkProps')}
          >
            <div
              className={clsx(
                view === 'list'
                  ? 'flex-shrink-0 w-[72px] h-[72px] md:w-[200px] md:h-[130px] overflow-hidden rounded-lg transition-transform duration-300 ease-in-out'
                  : 'w-full h-[150px] mb-2 self-start rounded-lg overflow-hidden flex items-center justify-center bg-gray-50',

                { '!w-[72px] !h-[72px]': view === 'list' && small }
              )}
            >
              <UINextImageBlur
                src={render('imageCoverUrlField')}
                alt={render('titleField')}
                width={72}
                height={72}
                className={clsx(
                  'group-hover:scale-110 transition-all ease-in duration-150 bg-base-200',
                  'w-full h-full object-cover object-center'
                )}
              />
            </div>
          </Link>
          <div
            className={clsx(
              'w-full flex flex-col items-start justify-center',
              view === 'grid' ? 'px-3' : ''
            )}
          >
            <Link
              href={render('urlToRead')}
              aria-label={render('titleField')}
              title={render('titleField')}
              {...render('linkProps')}
            >
              <Render name="title" />
            </Link>
            <Render name="description" />
            <p className="font-normal text-xs leading-5 text-gray-500">
              <span className="capitalize flex items-center justify-center gap-2">
                {isWebNews ? (
                  <>
                    <UIIcon icon="mdi:calendar" className="w-4 h-4" />{' '}
                    {render('publishDateField')}
                  </>
                ) : (
                  `${render('categoryNameField')} | ${render(
                    'publishDateField'
                  )}`
                )}
              </span>
            </p>
          </div>
        </div>
      );
    },
  });
