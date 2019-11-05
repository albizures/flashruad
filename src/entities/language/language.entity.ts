import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int, ArgsType, InputType } from 'type-graphql';

@Entity()
@ObjectType()
@Unique(['name', 'code'])
class Language {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column('text')
  name: string;

  @Field((type) => String)
  @Column('text')
  code: string;

  @Field((type) => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

@ArgsType()
class NewLanguageInput {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  code: string;
}

@ArgsType()
@InputType()
class FilterLanguage {
  @Field((type) => String, { nullable: true })
  name?: string;
}

@ArgsType()
class LanguageListArgs {
  @Field((type) => FilterLanguage, { nullable: true })
  filter: FilterLanguage;
}

export { LanguageListArgs, FilterLanguage, Language, NewLanguageInput };
