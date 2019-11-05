import { getRepository } from 'typeorm';
import { Language, NewLanguageInput, FilterLanguage } from './language.entity';
import { createOptional, SimpleLike } from '../../utils';

const create = (language: NewLanguageInput): Promise<Language> => {
  const repositorty = getRepository(Language);
  console.log('eeeeeerrr', language);

  return repositorty.save(language);
};

const findOne = async (id: number): Promise<Language> => {
  const repositorty = getRepository(Language);
  return repositorty.findOne({
    where: {
      id,
    },
  });
};

const findAll = (filter: FilterLanguage = {}): Promise<Language[]> => {
  const repositorty = getRepository(Language);
  const where = createOptional<keyof typeof filter>().add(
    'name',
    SimpleLike(filter.name),
  );

  return repositorty.find({
    where,
  });
};

export { findOne, findAll, create };
