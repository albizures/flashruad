import { getRepository } from 'typeorm';
import { Noun, FilterNoun, NewNounInput } from './noun.entity';
import { createOptional, SimpleLike } from '../../utils';
import { Word } from '../word/word.entity';
import { User } from '../user/user.entity';
import { Pronunciation } from '../pronunciation/pronunciation.entity';

type NewPronunciation = Omit<Omit<NewNounInput, 'word'>, 'pronunciation'> & {
  user: User;
  word: Word;
  pronunciation: Pronunciation;
};

const create = (pronunciation: NewPronunciation): Promise<Noun> => {
  const repositorty = getRepository(Noun);
  return repositorty.save(pronunciation);
};

const findOne = async (id: number): Promise<Noun> => {
  const repositorty = getRepository(Noun);
  return repositorty.findOne({
    relations: ['user', 'word', 'pronunciation'],
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
    relations: ['user', 'word', 'pronunciation'],
    where: {
      ...filter,
      ...where,
    },
  });
};

export { findOne, findAll, create };
