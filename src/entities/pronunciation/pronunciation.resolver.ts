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
import { findOne as findOneWord } from '../word/word.repository';
import { User } from '../user/user.entity';
import { Word } from '../word/word.entity';

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
      user: await findOneUser(args.user),
    });
  }

  @FieldResolver()
  user(@Root() pronunciation: Pronunciation): Promise<User> {
    return findOneUser(pronunciation.id);
  }

  @FieldResolver()
  word(@Root() pronunciation: Pronunciation): Promise<Word> {
    return findOneWord(pronunciation.id);
  }
}

export default PronunciationResolver;
