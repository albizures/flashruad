import {
  Resolver,
  Query,
  Args,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Noun, NounListArgs, NewNounInput } from './noun.entity';
import { create, findAll, findOne } from './noun.repository';
import { findOne as findOneWord } from '../word/word.repository';
import { findOne as findOneUser } from '../user/user.repository';

@Resolver((of) => Noun)
class WordResolver {
  @Query((returns) => [Noun])
  wordList(@Args() args: NounListArgs): Promise<Noun[]> {
    return findAll(args.filter);
  }

  @Query((returns) => Noun, { nullable: true })
  word(@Arg('id') id: number): Promise<Noun> {
    return findOne(id);
  }

  @Mutation((returns) => Noun)
  async createWord(@Args() args: NewNounInput): Promise<Noun> {
    return create({
      ...args,
      word: await findOneWord(args.word),
      //TODO: use current user id
      user: await findOneUser(1),
    });
  }
}

export default WordResolver;
