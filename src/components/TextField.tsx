import React from 'react';

type Ref = React.MutableRefObject<HTMLInputElement>;

interface PropTypes {
  name: string;
  label: string;
  required?: boolean;
  ref?: Ref;
}

const Field: React.FC<PropTypes> = React.forwardRef((props, ref: Ref) => {
  const { name, label, ...more } = props;
  return (
    <>
      <label
        className="block text-gray-700 text-base font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        ref={ref}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        id={name}
        name={name}
        {...more}
      />
    </>
  );
});

export default Field;
