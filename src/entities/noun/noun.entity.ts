import {
  Entity,
  Unique,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Int,
  Field,
  ArgsType,
  InputType,
  ObjectType,
  registerEnumType,
} from 'type-graphql';
import { Pronunciation, Language } from '../internals';
import { Gender } from '../../types';

registerEnumType(Gender, {
  name: 'Gender',
});

@Entity()
@ObjectType()
@Unique(['word'])
class Noun {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column('text')
  word: string;

  @Field((type) => Gender)
  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Masculine,
  })
  gender: Gender;

  @Field((type) => Pronunciation)
  @OneToOne((type) => Pronunciation)
  @JoinColumn()
  pronunciation: Pronunciation;

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
class NewNounInput {
  @Field((type) => String)
  word: string;

  @Field((type) => Number)
  language: number;

  @Field((type) => Gender)
  gender: Gender;

  @Field((type) => Number)
  pronunciation: number;
}

@ArgsType()
@InputType()
class FilterNoun {
  @Field((type) => String, { nullable: true })
  word?: string;

  @Field((type) => Number)
  language?: number;

  @Field((type) => Gender, { nullable: true })
  gender?: Gender;
}

@ArgsType()
class NounListArgs {
  @Field((type) => FilterNoun, { nullable: true })
  filter: FilterNoun;
}

export { NounListArgs, FilterNoun, Noun, NewNounInput };
