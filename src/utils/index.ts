import { Like, FindOperator } from 'typeorm';

const SimpleLike = (
  value: string | number,
): FindOperator<string | number> | undefined => value && Like(`%${value}%`);

interface OptionalPropsObject<Keys> {
  [key: string]: any;
  add: <T>(
    name: Keys,
    value: T,
    isValid?: boolean,
  ) => OptionalPropsObject<Keys>;
}

const createOptional = <Keys extends string>(): OptionalPropsObject<Keys> => {
  const obj: {
    [key in Keys]?: any;
  } = {};

  function Add<T>(name: Keys, value: T, isValid = Boolean(value)): object {
    if (isValid) {
      obj[name] = value;
    }

    return obj;
  }

  Object.defineProperty(obj, 'add', {
    enumerable: false,
    value: Add,
  });

  return obj as OptionalPropsObject<Keys>;
};

export { createOptional, SimpleLike };
