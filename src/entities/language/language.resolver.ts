import { Resolver, Query, Args, Mutation, Arg } from 'type-graphql';
import {
  Language,
  NewLanguageInput,
  LanguageListArgs,
} from './language.entity';
import { create, findAll, findOne } from './language.repository';

@Resolver((of) => Language)
class WordResolver {
  @Query((returns) => [Language])
  languageList(@Args() args: LanguageListArgs): Promise<Language[]> {
    return findAll(args.filter);
  }

  @Query((returns) => Language, { nullable: true })
  language(@Arg('id') id: number): Promise<Language> {
    return findOne(id);
  }

  @Mutation((returns) => Language)
  async createLanguage(@Args() args: NewLanguageInput): Promise<Language> {
    return create(args);
  }
}

export default WordResolver;
