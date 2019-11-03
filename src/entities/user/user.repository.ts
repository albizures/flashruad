import { getRepository } from 'typeorm';
import { User, NewUserInput, FilterUser } from './user.entity';
import { createOptional, SimpleLike } from '../../utils';

const create = (user: NewUserInput): Promise<User> => {
  const repositorty = getRepository(User);
  return repositorty.save(user);
};

const findOne = async (id: number): Promise<User> => {
  const repositorty = getRepository(User);
  return repositorty.findOne({
    where: {
      id,
    },
  });
};

const findAll = (filter: FilterUser = {}): Promise<User[]> => {
  const repositorty = getRepository(User);
  const where = createOptional<keyof typeof filter>().add(
    'email',
    SimpleLike(filter.email),
  );

  return repositorty.find({
    where,
  });
};

export { findOne, findAll, create };
