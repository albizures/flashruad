import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ObjectType, Field, Int, ArgsType, InputType } from 'type-graphql';

@Entity()
@ObjectType()
@Unique(['email'])
class User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column('text')
  email: string;

  @Column('text')
  password: string;
}

@ArgsType()
class NewUserInput {
  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;
}

@ArgsType()
@InputType()
class FilterUser {
  @Field((type) => String, { nullable: true })
  email?: string;
}

@ArgsType()
class UserListArgs {
  @Field((type) => FilterUser, { nullable: true })
  filter: FilterUser;
}

export { UserListArgs, FilterUser, User, NewUserInput };
