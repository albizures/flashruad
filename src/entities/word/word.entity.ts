import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ObjectType, Field, Int, ArgsType, InputType } from 'type-graphql';

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

  @Column('text', { nullable: true })
  @Field((type) => String)
  mnemonic?: string;
}

@ArgsType()
class NewWordInput {
  @Field((type) => String)
  word: string;

  @Field((type) => String)
  mnemonic?: string;
}

@ArgsType()
@InputType()
class FilterWord {
  @Field((type) => String, { nullable: true })
  id?: number;

  @Field((type) => String, { nullable: true })
  word?: string;

  @Field((type) => String, { nullable: true })
  mnemonic?: string;
}

@ArgsType()
class WordListArgs {
  @Field((type) => FilterWord, { nullable: true })
  filter: FilterWord;
}

export { WordListArgs, FilterWord, Word, NewWordInput };
