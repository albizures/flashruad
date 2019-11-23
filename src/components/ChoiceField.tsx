import React from 'react';
import { useContextForm } from './Form';

export interface Choice {
  value: string | number;
  label: string;
}

export enum ChoiceType {
  RADIO = 'radio',
}

interface PropTypes {
  name: string;
  legend: string;
  required?: boolean;
  choices: Choice[];
  type: ChoiceType;
}

const ChoiceField: React.FC<PropTypes> = (props) => {
  const { name, type, choices, legend, ...more } = props;
  const { updateField } = useContextForm();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(name, event.target.value);
  };

  const items = choices.map((choice) => {
    const { label, value } = choice;
    return (
      <div key={choice.value}>
        <label
          className="md:w-2/3 block text-gray-500 font-bold"
          htmlFor={name}
        >
          <input
            onChange={onChange}
            className="mr-2 leading-tight"
            type={type}
            id={value.toString()}
            name={name}
            value={value}
            {...more}
          />
          <span className="text-sm">{label}</span>
        </label>
      </div>
    );
  });

  return (
    <fieldset className="w-full" {...more}>
      <legend className="block text-gray-700 text-base font-bold mb-2">
        {legend}
      </legend>
      {items}
    </fieldset>
  );
};

export default ChoiceField;
