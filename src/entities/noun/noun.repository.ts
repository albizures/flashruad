import { getRepository } from 'typeorm';
import { Noun, FilterNoun, NewNounInput } from './noun.entity';
import { createOptional, SimpleLike } from '../../utils';
import { User } from '../user/user.entity';
import { Pronunciation } from '../pronunciation/pronunciation.entity';
import { Language } from '../language/language.entity';

type NewPronunciation = Omit<
  Omit<NewNounInput, 'pronunciation'>,
  'language'
> & {
  user: User;
  pronunciation: Pronunciation;
  language: Language;
};

const create = (pronunciation: NewPronunciation): Promise<Noun> => {
  const repositorty = getRepository(Noun);
  return repositorty.save(pronunciation);
};

const findOne = async (id: number): Promise<Noun> => {
  const repositorty = getRepository(Noun);
  return repositorty.findOne({
    relations: ['user', 'pronunciation', 'language'],
    where: {
      id,
    },
  });
};

const findAll = (filter: FilterNoun = {}): Promise<Noun[]> => {
  const repositorty = getRepository(Noun);
  const where = createOptional<keyof typeof filter>()
    .add('gender', SimpleLike(filter.gender))
    .add('word', SimpleLike(filter.word));

  return repositorty.find({
    relations: ['user', 'word', 'pronunciation'],
    where: {
      ...filter,
      ...where,
    },
  });
};

export { findOne, findAll, create };
