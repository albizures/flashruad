import React from 'react';

type Ref = React.MutableRefObject<HTMLInputElement>;

interface PropTypes {
  name: string;
  label: string;
  ref?: Ref;
  required?: boolean;
}

const BooleanField: React.FC<PropTypes> = React.forwardRef(
  (props, ref: Ref) => {
    const { name, label, ...more } = props;
    return (
      <label className="md:w-2/3 block text-gray-500 font-bold" htmlFor={name}>
        <input
          ref={ref}
          className="mr-2 leading-tight"
          type="checkbox"
          id={name}
          name={name}
          {...more}
        />
        <span className="text-sm">{label}</span>
      </label>
    );
  },
);

export default BooleanField;
