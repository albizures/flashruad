import React from 'react';

type Ref = React.MutableRefObject<HTMLTextAreaElement>;

interface PropTypes {
  name: string;
  label: string;
  ref?: Ref;
  required?: boolean;
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
      <textarea
        ref={ref}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        name={name}
        {...more}
      />
    </>
  );
});

export default Field;
