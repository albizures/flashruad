import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int, ArgsType, InputType } from 'type-graphql';
import { Pronunciation } from '../internals';

@Entity()
@ObjectType()
@Unique(['word'])
class Word {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column('text')
  word: string;

  @Field((type) => [Pronunciation])
  @OneToMany(
    (type) => Pronunciation,
    (pronunciation: Pronunciation) => pronunciation.word,
  )
  pronunciations: Pronunciation[];
}

@ArgsType()
class NewWordInput {
  @Field((type) => String)
  word: string;
}

@ArgsType()
@InputType()
class FilterWord {
  @Field((type) => String, { nullable: true })
  word?: string;
}

@ArgsType()
class WordListArgs {
  @Field((type) => FilterWord, { nullable: true })
  filter: FilterWord;
}

export { WordListArgs, FilterWord, Word, NewWordInput };
