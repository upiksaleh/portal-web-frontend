import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { UIIcon } from '../icon/icon';

function SelectPerPage({ items, value, onChange, showSearch = true }) {
  return (
    <div className="mx-1">
      <Listbox value={value} onChange={onChange}>
        <div className="relative w-full max-w-max">
          <Listbox.Button className="btn btn-sm btn-ghost w-full cursor-default rounded-lg bg-white pl-1 pr-7 text-left shadow-md sm:text-sm">
            <span className="block truncate">{value}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
              <UIIcon
                icon="base:unfold-more-horizontal"
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={'div'}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute z-[50] mb-1 w-full rounded-md bg-white shadow-lg top-full"
          >
            <Listbox.Options className="bg-white mt-1 w-full rounded-md shadow-lg">
              <div className="max-h-60 overflow-auto">
                {items.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none text-center p-1 ${
                        active
                          ? 'bg-primary-100 text-amber-900'
                          : 'text-gray-900'
                      }`
                    }
                    value={item}
                    title={item}
                  >
                    {({ selected }) => (
                      <span
                        className={`block truncate ${
                          selected ? 'font-bold' : 'font-normal'
                        }`}
                      >
                        {item}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </div>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export type UIPaginationProps = {
  total: number;
  page: number;
  limit: number;
  setLimit: any;
  setPage: any;
  customPerPages?: number[];
};
export function UIPagination({
  total,
  limit,
  page,
  setLimit,
  setPage,
  customPerPages,
}: UIPaginationProps) {
  const perPages = customPerPages ?? [5, 10, 20, 25, 50, 100];
  const total_pages = Math.ceil(total / limit);

  return (
    <div className="w-full border-t-2 border-t-primary-base p-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 text-sm gap-4">
        <div className="flex items-center justify-center lg:justify-start">
          <span>Tampilkan</span>
          <SelectPerPage value={limit} onChange={setLimit} items={perPages} />
          <div className="ml-1 border-l pl-1">total {total}</div>
        </div>
        <div className="text-right flex items-center justify-end">
          Halaman
          <SelectPerPage
            value={page}
            onChange={setPage}
            items={Array.from({ length: total_pages }, (_, i) => i + 1)}
          />
          <span className="border-r ml-1 mr-2 pr-2">
            dari <strong>{total_pages}</strong>
          </span>
          <button
            className={clsx('btn btn-sm btn-outline', {
              'btn-disabled': page <= 1,
            })}
            onClick={() => setPage(page - 1)}
            aria-label="Prev"
          >
            <UIIcon icon="base:chevron-left" className="w-6 h-6 font-bold" />
          </button>
          <button
            className={clsx('ml-1 btn btn-sm btn-outline', {
              'btn-disabled': page >= total_pages,
            })}
            onClick={() => setPage(page + 1)}
            aria-label="Next"
          >
            <UIIcon icon="base:chevron-right" className="w-6 h-6 font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
