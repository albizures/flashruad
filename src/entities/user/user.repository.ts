import { getRepository } from 'typeorm';
import { User, NewUserInput, FilterUser } from './user.entity';
import { createOptional, SimpleLike } from '../../utils';

const create = (word: NewUserInput): Promise<User> => {
  const wordRepository = getRepository(User);
  return wordRepository.save(word);
};

const findOne = async (id: number): Promise<User> => {
  const wordRepository = getRepository(User);
  return wordRepository.findOne({
    where: {
      id,
    },
  });
};

const findAll = (filter: FilterUser = {}): Promise<User[]> => {
  const wordRepository = getRepository(User);
  const where = createOptional<keyof typeof filter>().add(
    'email',
    SimpleLike(filter.email),
  );

  return wordRepository.find({
    where,
  });
};

export { findOne, findAll, create };
