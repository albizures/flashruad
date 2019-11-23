import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int, ArgsType, InputType } from 'type-graphql';
import { Language } from '../internals';

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

  @Field((type) => Language)
  @ManyToOne((type) => Language)
  language: Language;

  @Field((type) => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

@ArgsType()
class NewWordInput {
  @Field((type) => String)
  word: string;

  @Field((type) => Number)
  language: number;
}

@ArgsType()
@InputType()
class FilterWord {
  @Field((type) => String, { nullable: true })
  word?: string;

  @Field((type) => Number, { nullable: true })
  language?: number;
}

@ArgsType()
class WordListArgs {
  @Field((type) => FilterWord, { nullable: true })
  filter: FilterWord;
}

export { WordListArgs, FilterWord, Word, NewWordInput };
