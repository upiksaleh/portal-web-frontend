import clsx from 'clsx';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { UIIcon } from '../icon';
import { UIListItemsViewType } from '.';
import {
  IUICreateCustomizableDefine,
  UICreateCustomizable,
} from '../../create';

export type UIListItemsType<
  Item extends Record<string, any> = Record<string, any>
> = IUICreateCustomizableDefine<
  {
    items: number | Item[];
    itemComponent: FC<{ data: Item; view: UIListItemsViewType }>;
    view: UIListItemsViewType;
    setView: Dispatch<SetStateAction<UIListItemsViewType>>;
  },
  {
    listClass: string;
    gridClass: string;
    switchView: ReactNode;
    listIconName: string;
    gridIconName: string;
    noViewSwitch: boolean;
  }
>;

export function UIListItems<I extends Record<string, any>>(
  props: UIListItemsType<I>['props']
) {
  return UICreateCustomizable<UIListItemsType<I>>({
    props,
    defaults: {
      noViewSwitch: () => false,
      listClass: () => 'flex flex-col gap-6',
      gridClass: () => 'grid grid-cols-1 lg:grid-cols-2 gap-4',
      listIconName: () => 'mdi:view-list',
      gridIconName: () => 'mdi:view-grid',
      switchView: ({ view, setView, render }) => {
        if (render('noViewSwitch')) return null;
        return (
          <div className="hidden lg:flex min-w-0 gap-4 justify-end divide-x divide-gray-400">
            <div className="flex gap-4 items-center mb-3">
              <p className="font-lato font-normal text-sm leading-6 text-blue-gray-500 whitespace-nowrap">
                Tampilan :
              </p>
              <button
                className="w-6 h-6 flex items-center justify-center"
                title="Tampilan List"
                aria-label="Tampilan List"
                onClick={() => setView('list')}
              >
                <UIIcon
                  icon={render('listIconName')}
                  className={clsx('w-full h-full', {
                    'filter grayscale opacity-30': view !== 'list',
                  })}
                />
              </button>
              <button
                className="w-6 h-6 flex items-center justify-center"
                title="Tampilan Grid"
                aria-label="Tampilan Grid"
                onClick={() => setView('grid')}
              >
                <UIIcon
                  icon={render('gridIconName')}
                  className={clsx('w-full h-full', {
                    'filter grayscale opacity-30': view !== 'grid',
                  })}
                />
              </button>
            </div>
          </div>
        );
      },
    },
    Component: ({ Render, itemComponent, items, render, view }) => {
      const _items = typeof items === 'number' ? [...Array(items)] : items;

      const ItemComponent = itemComponent;
      return (
        <>
          {render('switchView')}
          <div
            className={clsx(
              'ui-list-items',
              view === 'list' ? render('listClass') : render('gridClass')
            )}
          >
            {_items.map((item, index) => {
              return ItemComponent ? (
                <ItemComponent key={index} view={view} data={item} />
              ) : null;
            })}
          </div>
        </>
      );
    },
  });
}
