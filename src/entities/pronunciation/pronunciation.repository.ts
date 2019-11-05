import { getRepository } from 'typeorm';
import { Pronunciation, FilterPronunciation } from './pronunciation.entity';
import { createOptional, SimpleLike } from '../../utils';
import { User } from '../user/user.entity';
import { Word } from '../word/word.entity';

interface NewPronunciation {
  file: string;
  user: User;
  word: Word;
}

const create = (pronunciation: NewPronunciation): Promise<Pronunciation> => {
  const repositorty = getRepository(Pronunciation);
  return repositorty.save(pronunciation);
};

const findOne = async (id: number): Promise<Pronunciation> => {
  const repositorty = getRepository(Pronunciation);
  return repositorty.findOne({
    relations: ['user', 'word'],
    where: {
      id,
    },
  });
};

const findAll = (
  filter: FilterPronunciation = {},
): Promise<Pronunciation[]> => {
  const repositorty = getRepository(Pronunciation);
  const where = createOptional<keyof typeof filter>().add(
    'user',
    SimpleLike(filter.user),
  );

  return repositorty.find({
    relations: ['user', 'word'],
    where,
  });
};

export { findOne, findAll, create };
