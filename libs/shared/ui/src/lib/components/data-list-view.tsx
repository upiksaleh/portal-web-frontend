import {ComponentPropsWithoutRef, ReactElement} from "react";
import {UIPagination, UIPaginationProps} from "../index";

export interface UIDataListProps {
  items: Record<string, any>[]
  children: any,
  noItemsComponent?: ReactElement,
  pagination?: UIPaginationProps,
  header?: ReactElement
}

export function UIDataList(
  {
    items, children, noItemsComponent, pagination, header, className, ...props
  }:
    UIDataListProps & Omit<ComponentPropsWithoutRef<'div'>, 'children'>
) {
  if (!items.length) {
    return noItemsComponent ?? <div>Belum ada data untuk ditampilkan.</div>
  }

  return (
    <>
      <div {...props} className={className ?? "flex-auto w-full flex flex-col gap-5 md:gap-6"}>
        {header}
        {items.map((item, index) => {
          return children({item, index})
        })}
      </div>
      {pagination &&
        <UIPagination
          total={pagination.total}
          page={pagination.page}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}/>
      }
    </>
  )

}
