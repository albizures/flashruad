import { hash, genSalt } from 'bcrypt';
import { Resolver, Query, Args, Mutation, Arg } from 'type-graphql';
import { User, UserListArgs, NewUserInput } from './user.entity';
import { create, findAll, findOne } from './user.repository';

@Resolver((of) => User)
class WordResolver {
  @Query((returns) => [User])
  userList(@Args() args: UserListArgs): Promise<User[]> {
    return findAll(args.filter);
  }

  @Query((returns) => User, { nullable: true })
  user(@Arg('id') id: number): Promise<User> {
    return findOne(id);
  }

  @Mutation((returns) => User)
  async createUser(@Args() args: NewUserInput): Promise<User> {
    const { password } = args;
    const salt = await genSalt(11);

    return create({
      ...args,
      password: await hash(password, salt),
    });
  }
}

export default WordResolver;
