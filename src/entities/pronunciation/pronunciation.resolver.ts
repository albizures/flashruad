import {
  Resolver,
  Query,
  Args,
  Mutation,
  Arg,
  FieldResolver,
  ResolverInterface,
  Root,
} from 'type-graphql';
import {
  Pronunciation,
  PronunciationListArgs,
  NewPronunciationInput,
} from './pronunciation.entity';
import { create, findAll, findOne } from './pronunciation.repository';
import { findOne as findOneUser } from '../user/user.repository';
import { User } from '../user/user.entity';

@Resolver((of) => Pronunciation)
class PronunciationResolver implements ResolverInterface<Pronunciation> {
  @Query((returns) => [Pronunciation])
  async pronunciationList(
    @Args() args: PronunciationListArgs,
  ): Promise<Pronunciation[]> {
    return findAll(args.filter);
  }

  @Query((returns) => Pronunciation, { nullable: true })
  pronunciation(@Arg('id') id: number): Promise<Pronunciation> {
    return findOne(id);
  }

  @Mutation((returns) => Pronunciation)
  async createPronunciation(
    @Args() args: NewPronunciationInput,
  ): Promise<Pronunciation> {
    return create({
      ...args,
      //TODO: use current user id
      user: await findOneUser(1),
    });
  }

  @FieldResolver()
  user(@Root() pronunciation: Pronunciation): Promise<User> {
    return findOneUser(pronunciation.id);
  }
}

export default PronunciationResolver;
