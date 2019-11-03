import { getRepository } from 'typeorm';
import { Word, NewWordInput, FilterWord } from './word.entity';
import { createOptional, SimpleLike } from '../../utils';

const create = (word: NewWordInput): Promise<Word> => {
  const repositorty = getRepository(Word);
  return repositorty.save(word);
};

const findOne = async (id: number): Promise<Word> => {
  const repositorty = getRepository(Word);
  return repositorty.findOne({
    where: {
      id,
    },
  });
};

const findAll = (filter: FilterWord = {}): Promise<Word[]> => {
  const repositorty = getRepository(Word);
  const where = createOptional<keyof typeof filter>().add(
    'word',
    SimpleLike(filter.word),
  );

  return repositorty.find({
    where,
  });
};

export { findOne, findAll, create };
