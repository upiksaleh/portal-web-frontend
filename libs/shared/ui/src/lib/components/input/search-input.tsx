import { FC, useEffect, useState } from 'react';
import { UIIcon } from '../icon/icon';

interface UISearchInputProps {
  currentValue?: string;
  type?: string;
  placeholder?: string;
  onSubmit: (value: string) => void;
  onClear?: () => void;
}

export const UISearchInput: FC<UISearchInputProps> = ({
  currentValue,
  placeholder = 'Temukan Informasi',
  onSubmit,
  onClear,
}) => {
  const [value, setValue] = useState(currentValue ?? '');
  useEffect(() => {
    if (currentValue) setValue(currentValue);
  }, [currentValue]);
  const _onSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form
      className="focus-within:border-primary relative flex items-center gap-2 rounded-lg bg-white border border-base-200 px-[9px] w-full py-[6px]"
      onSubmit={_onSubmit}
    >
      <UIIcon icon="mdi:magnify" className="w-6 h-6 text-gray-400" />
      <input
        type="text"
        name="q"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        className="min-w-0 placeholder-gray-600 border-none flex-grow focus:outline-none"
      />
      {value && (
        <button
          onClick={(event) => {
            if (onClear) onClear();
            setValue('');
          }}
          type="button"
          className="text-base-content"
        >
          <UIIcon icon="mdi:close" />
        </button>
      )}
      <button
        type="submit"
        className="btn btn-primary text-white normal-case btn-sm "
      >
        Cari
      </button>
    </form>
  );
};
