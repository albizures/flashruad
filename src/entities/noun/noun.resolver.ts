import { Resolver, Query, Args, Mutation, Arg } from 'type-graphql';
import { Noun, NounListArgs, NewNounInput } from './noun.entity';
import { create, findAll, findOne } from './noun.repository';
import { findOne as findOneUser } from '../user/user.repository';
import { findOne as findOneLanguage } from '../language/language.repository';
import { findOne as findOnePronunciation } from '../pronunciation/pronunciation.repository';

@Resolver((of) => Noun)
class NounResolver {
  @Query((returns) => [Noun])
  nounList(@Args() args: NounListArgs): Promise<Noun[]> {
    return findAll(args.filter);
  }

  @Query((returns) => Noun, { nullable: true })
  noun(@Arg('id') id: number): Promise<Noun> {
    return findOne(id);
  }

  @Mutation((returns) => Noun)
  async createNoun(@Args() args: NewNounInput): Promise<Noun> {
    return create({
      ...args,
      language: await findOneLanguage(args.language),
      pronunciation: await findOnePronunciation(args.pronunciation),
      //TODO: use current user id
      user: await findOneUser(1),
    });
  }
}

export default NounResolver;
