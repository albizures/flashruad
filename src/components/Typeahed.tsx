import React from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { useContextForm } from './Form';

interface PropTypes<T> {
  label: string;
  options: T[];
  getOptions: (text: string) => void;
  renderOption: (item: T) => React.ReactNode;
}

const Typeahed = <T extends unknown>(props: PropTypes<T>) => {
  const { updateField } = useContextForm();
  const { getOptions, renderOption, label, options } = props;
  const [value, setValue] = React.useState<string>('');

  React.useEffect(() => {
    getOptions(value);
  }, [value]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSelect = () => {};

  return (
    <Combobox onSelect={onSelect}>
      <ComboboxInput className="" onChange={onChange} aria-label={label} />

      {options.length > 0 && (
        <ComboboxPopover>
          <ComboboxList aria-labelledby={label}>
            {options.map(renderOption)}
          </ComboboxList>
        </ComboboxPopover>
      )}
    </Combobox>
  );
};

Typeahed.Option = ComboboxOption;

export default Typeahed;
