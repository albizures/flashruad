import React from 'react';
import { useContextForm } from './Form';

type Ref = React.MutableRefObject<HTMLSelectElement>;

interface Choice {
  value: string | number;
  label: string;
}

interface PropTypes<T> {
  name: string;
  label: string;
  required?: boolean;
  choices: T[];
  disabled?: boolean;
  ref?: Ref;
  parseChoice?: (choice: T) => Choice;
}

const defaultParseChoice = (choice: any): Choice => {
  return {
    value: choice.value,
    label: choice.label,
  };
};

const ChoiceField = <T extends unknown>(props: PropTypes<T>, ref: Ref) => {
  const { updateField } = useContextForm();
  const {
    name,
    choices,
    label,
    disabled,
    parseChoice = defaultParseChoice,
    ...more
  } = props;

  const getSelectOption = (choice: T): React.ReactNode => {
    const { label, value } = parseChoice(choice);

    return (
      <option key={value} value={value}>
        {label}
      </option>
    );
  };

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateField(name, event.target.value);
  };

  const items = choices.map(getSelectOption);

  return (
    <>
      <label
        className="block text-gray-700 text-base font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>

      <div className="relative">
        <select
          onChange={onChange}
          className="block bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          disabled={disabled}
          id={name}
          name={name}
          ref={ref}
          {...more}
        >
          {items}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default React.forwardRef(ChoiceField);
