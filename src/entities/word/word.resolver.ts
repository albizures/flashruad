import {
  Resolver,
  Query,
  Args,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Word, WordListArgs, NewWordInput } from './word.entity';
import { create, findAll, findOne } from './word.repository';
import { findOne as findOneLanguage } from '../language/language.repository';

@Resolver((of) => Word)
class WordResolver {
  @Query((returns) => [Word])
  wordList(@Args() args: WordListArgs): Promise<Word[]> {
    return findAll(args.filter);
  }

  @Query((returns) => Word, { nullable: true })
  word(@Arg('id') id: number): Promise<Word> {
    return findOne(id);
  }

  @Mutation((returns) => Word)
  async createWord(@Args() args: NewWordInput): Promise<Word> {
    return create({
      ...args,
      language: await findOneLanguage(args.language),
    });
  }
}

export default WordResolver;
