import {
  Entity,
  Column,
  OneToOne,
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
import { Word } from '../internals';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NEUTER = 'Neuter',
}

registerEnumType(Gender, {
  name: 'Gender',
});

@Entity()
@ObjectType()
class Noun {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Word)
  @OneToOne((type) => Word)
  @JoinColumn()
  word: Word;

  @Field((type) => Gender)
  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;

  @Column((type) => Boolean)
  isPlural: boolean;

  @Field((type) => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

@ArgsType()
class NewNounInput {
  @Field((type) => Number)
  word: number;

  @Field((type) => Number)
  language: number;
}

@ArgsType()
@InputType()
class FilterNoun {
  @Field((type) => Number, { nullable: true })
  word?: number;

  @Field((type) => Boolean, { nullable: true })
  isPlural?: boolean;

  @Field((type) => Gender, { nullable: true })
  gender?: Gender;
}

@ArgsType()
class NounListArgs {
  @Field((type) => FilterNoun, { nullable: true })
  filter: FilterNoun;
}

export { NounListArgs, FilterNoun, Noun, NewNounInput };
