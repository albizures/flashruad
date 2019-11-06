import { getRepository } from 'typeorm';
import { Noun, FilterNoun, NewNounInput } from './noun.entity';
import { createOptional, SimpleLike } from '../../utils';
import { Word } from '../word/word.entity';
import { User } from '../user/user.entity';

type NewPronunciation = Omit<NewNounInput, 'word'> & {
  user: User;
  word: Word;
};

const create = (pronunciation: NewPronunciation): Promise<Noun> => {
  const repositorty = getRepository(Noun);
  return repositorty.save(pronunciation);
};

const findOne = async (id: number): Promise<Noun> => {
  const repositorty = getRepository(Noun);
  return repositorty.findOne({
    relations: ['user', 'word'],
    where: {
      id,
    },
  });
};

const findAll = (filter: FilterNoun = {}): Promise<Noun[]> => {
  const repositorty = getRepository(Noun);
  const where = createOptional<keyof typeof filter>().add(
    'gender',
    SimpleLike(filter.gender),
  );

  return repositorty.find({
    relations: ['user', 'word'],
    where: {
      ...filter,
      ...where,
    },
  });
};

export { findOne, findAll, create };
