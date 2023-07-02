import { UISwrResourceGrafikInfoWidget } from '../swr-resource';

export function UIPageGrafikInfoList() {
  return (
    <div className="w-full">
      <UISwrResourceGrafikInfoWidget
        paramsQuery={{ limit: -1 }}
        wrapperComponent={({ children }) => (
          <div className="container bg-gray-200 mx-auto 2xl:px-0 xl:max-w-7xl px-0 max-w-full xl:px-6 rounded-lg">
            {children}
          </div>
        )}
        viewOptions={{
          hideAllButton: true,
          className: 'pt-[50px]',
        }}
      />
    </div>
  );
}
