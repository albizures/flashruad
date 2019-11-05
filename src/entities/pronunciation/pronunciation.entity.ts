import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int, ArgsType, InputType } from 'type-graphql';
import { User, Word } from '../internals';

@Entity()
@ObjectType()
@Unique(['file'])
class Pronunciation {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column('text')
  file: string;

  @Field((type) => User)
  @OneToOne((type) => User)
  @JoinColumn()
  user: User;

  @Field((type) => Word)
  @ManyToOne((type) => Word, (word: Word) => word.pronunciations)
  @JoinColumn()
  word: Word;

  @Field((type) => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

@ArgsType()
class NewPronunciationInput {
  @Field((type) => String)
  file: string;

  @Field((type) => Number)
  word: number;
}

@ArgsType()
@InputType()
class FilterPronunciation {
  @Field((type) => Number, { nullable: true })
  user?: string;

  @Field((type) => Number, { nullable: true })
  word?: string;
}

@ArgsType()
class PronunciationListArgs {
  @Field((type) => FilterPronunciation, { nullable: true })
  filter: FilterPronunciation;
}

export {
  PronunciationListArgs,
  FilterPronunciation,
  Pronunciation,
  NewPronunciationInput,
};
