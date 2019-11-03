import { getRepository } from 'typeorm';
import { Word, NewWordInput, FilterWord } from './word.entity';
import { createOptional, SimpleLike } from '../../utils';

const create = (word: NewWordInput): Promise<Word> => {
  const wordRepository = getRepository(Word);
  return wordRepository.save(word);
};

const findOne = async (id: number): Promise<Word> => {
  const wordRepository = getRepository(Word);
  return wordRepository.findOne({
    where: {
      id,
    },
  });
};

const findAll = (filter: FilterWord = {}): Promise<Word[]> => {
  const wordRepository = getRepository(Word);
  const where = createOptional<keyof typeof filter>().add(
    'word',
    SimpleLike(filter.word),
  );

  return wordRepository.find({
    where,
  });
};

export { findOne, findAll, create };
