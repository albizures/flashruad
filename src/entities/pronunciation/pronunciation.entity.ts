import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int, ArgsType, InputType } from 'type-graphql';
import { User } from '../user/user.entity';

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
}

@ArgsType()
class NewPronunciationInput {
  @Field((type) => String)
  file: string;

  @Field((type) => Number)
  user: number;
}

@ArgsType()
@InputType()
class FilterPronunciation {
  @Field((type) => Number, { nullable: true })
  user?: string;
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
