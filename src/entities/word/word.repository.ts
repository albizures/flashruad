import { getRepository } from 'typeorm';
import { Word, NewWordInput, FilterWord } from './word.entity';
import { createOptional, SimpleLike } from '../../utils';
import { Language } from '../language/language.entity';

type NewWord = Omit<NewWordInput, 'language'> & {
  language: Language;
};

const create = (word: NewWord): Promise<Word> => {
  const repositorty = getRepository(Word);
  return repositorty.save(word);
};

const findOne = async (id: number): Promise<Word> => {
  const repositorty = getRepository(Word);
  return repositorty.findOne({
    relations: ['language'],
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
    relations: ['language'],
    where,
  });
};

export { findOne, findAll, create };
