import { UIModalBase } from '../../components';
import { UIViewApplicationItemDetail } from './item-detail';
import { UIViewApplicationItemLogo } from './item-logo';

export function UIViewApplicationItemDialog({ data, show, setShow }) {
  return (
    <UIModalBase
      show={show}
      setShow={setShow}
      header={
        data ? (
          <div className="flex gap-2 w-full max-w-[550px] border-b border-b-primary-50">
            <div className="w-1/4">
              <UIViewApplicationItemLogo
                data={data}
                className="w-full rounded-r-box bg-primary-50 group-hover:bg-primary-200 p-1 lg:p-3 flex items-center justify-center"
              />
            </div>
            <div className="flex-1 py-1">
              <span
                className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-primary-50 mb-4
        hover:text-primary-700 hover:bg-primary-100"
              >
                {data.slug}
              </span>
              <h1 className="font-roboto font-medium text-[21px] leading-[34px] text-primary-700">
                {data.title}
              </h1>
            </div>
          </div>
        ) : (
          ''
        )
      }
    >
      {data && <UIViewApplicationItemDetail data={data} />}
    </UIModalBase>
  );
}
