import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { UIIcon } from '../icon';
import { UIListItemsViewType } from '.';

export type UIListItemsProps<Item extends Record<string, any>> =
  UIListItemsOptionsType & {
    items: number | Item[];
    itemComponent: FC<{ data: Item; view: UIListItemsViewType }>;
  };

export type UIListItemsOptionsType = {
  view: UIListItemsViewType;
  hideViewSwitch?: boolean;
  listClass?: string;
  gridClass?: string;
};

export function UIListItems<Item extends Record<string, any>>({
  items,
  itemComponent,
  view: defaultView,
  hideViewSwitch = false,
  listClass = 'flex flex-col gap-6',
  gridClass = 'grid grid-cols-1 lg:grid-cols-2 gap-4',
}: UIListItemsProps<Item>) {
  const [view, setView] = useState(defaultView);
  useEffect(() => {
    setView(defaultView);
  }, [defaultView]);
  const renderViewSwitch = () => {
    if (hideViewSwitch) return null;
    return (
      <div className="hidden lg:flex min-w-0 gap-4 justify-end divide-x divide-gray-400">
        <div className="flex gap-4 items-center mb-3">
          <p className="font-lato font-normal text-sm leading-6 text-blue-gray-500 whitespace-nowrap">
            Tampilan :
          </p>
          <button
            className="w-6 h-6 flex items-center justify-center"
            title="Tampilan List"
            onClick={() => setView('list')}
          >
            <UIIcon
              icon="mdi:view-list"
              className={clsx('w-full h-full', {
                'filter grayscale opacity-30': view !== 'list',
              })}
            />
          </button>
          <button
            className="w-6 h-6 flex items-center justify-center"
            title="Tampilan Grid"
            onClick={() => setView('grid')}
          >
            <UIIcon
              icon="mdi:view-grid"
              className={clsx('w-full h-full', {
                'filter grayscale opacity-30': view !== 'grid',
              })}
            />
          </button>
        </div>
      </div>
    );
  };

  const _items = typeof items === 'number' ? [...Array(items)] : items;

  const ItemComponent = itemComponent;
  return (
    <>
      {renderViewSwitch()}
      <div className={clsx(view === 'list' ? listClass : gridClass)}>
        {_items.map((item, index) => {
          return ItemComponent ? (
            <ItemComponent key={index} view={view} data={item} />
          ) : null;
        })}
      </div>
    </>
  );
}
