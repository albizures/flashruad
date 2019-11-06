import React from 'react';

type Value = string | number;

interface Field {
  name: string;
  value: Value;
}

export interface Fields {
  [key: string]: Field;
}

interface FormContext {
  fields: Fields;
  updateField: (name: string, value: Value) => void;
}

const Context = React.createContext<FormContext>({
  fields: {},
  updateField() {},
});

interface Utils {
  clean: () => void;
}

type OnSubmit = (event: React.FormEvent, value: Fields, utils: Utils) => void;

type PropTypes = {
  onSubmit: OnSubmit;
} & Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'>;

const Form: React.FC<PropTypes> = (props) => {
  const { children, onSubmit, ...more } = props;
  const [fields, setFields] = React.useState<Fields>({});
  const updateField = (name: string, value: Value) => {
    setFields((fields) => ({
      ...fields,
      [name]: {
        name,
        value,
      },
    }));
  };
  const value = { fields, updateField };
  const clean = () => {
    const cleanedFields = Object.keys(fields).reduce((fields, name) => {
      return {
        ...fields,
        [name]: {
          name,
          value: '',
        },
      };
    }, {});

    setFields(cleanedFields);
  };

  const submitHandler = (event: React.FormEvent) => {
    onSubmit(event, fields, {
      clean,
    });
  };

  return (
    <form onSubmit={submitHandler} {...more}>
      <Context.Provider value={value}>{children}</Context.Provider>
    </form>
  );
};

const useContextForm = () => React.useContext(Context);

export { useContextForm };
export default Form;
