import { Resolver, Query, Args, Mutation, Arg } from 'type-graphql';
import { Word, WordListArgs, NewWordInput } from './word.entity';
import { create, findAll, findOne } from './word.repository';

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
  createWord(@Args() args: NewWordInput): Promise<Word> {
    return create(args);
  }
}

export default WordResolver;
