import React from 'react';
import { useContextForm } from './Form';

type Ref = React.MutableRefObject<HTMLInputElement>;

interface PropTypes {
  name: string;
  label: string;
  ref?: Ref;
  required?: boolean;
}

const BooleanField: React.FC<PropTypes> = (props, ref: Ref) => {
  const { name, label, ...more } = props;
  const { updateField } = useContextForm();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(name, event.target.checked);
  };

  return (
    <label className="md:w-2/3 block text-gray-500 font-bold" htmlFor={name}>
      <input
        ref={ref}
        className="mr-2 leading-tight"
        type="checkbox"
        id={name}
        onChange={onChange}
        name={name}
        {...more}
      />
      <span className="text-sm">{label}</span>
    </label>
  );
};

export default React.forwardRef(BooleanField);
