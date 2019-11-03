import React from 'react';
import classNames from 'classnames';

type Ref = React.MutableRefObject<HTMLInputElement>;

interface PropTypes {
  name: string;
  label: string;
  ref?: Ref;
}

const ImageField: React.FC<PropTypes> = React.forwardRef((props, ref: Ref) => {
  const { name, label, ...more } = props;
  const [source, setSource] = React.useState<string>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (target.files && target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event) => {
        setSource(event.target.result.toString());
      };

      reader.readAsDataURL(target.files[0]);
    }
  };

  const onRemove = () => {
    setSource(null);
  };

  const className = classNames(
    'text-center block border-dashed border border-gray-500 bg-gray-100 py-6 rounded',
    {
      hidden: source,
    },
  );

  return (
    <div className="overflow-hidden relative w-full mt-4 mb-4">
      <label htmlFor={name} className={className}>
        {label}
        <input
          ref={ref}
          className="hidden"
          {...more}
          onChange={onChange}
          name={name}
          id={name}
          type="file"
        />
      </label>

      {source && (
        <button
          type="button"
          onClick={onRemove}
          className="shadow appearance-none border rounded relative overflow-hidden"
        >
          <img id="blah" src={source} alt="your image" />
          <div className="flex flex-col justify-center inset-0 opacity-0 absolute hover:bg-gray-800 hover:opacity-25 ">
            <span className="text-center text-6xl text-white">&times;</span>
          </div>
        </button>
      )}
    </div>
  );
});

export default ImageField;
