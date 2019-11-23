import {MigrationInterface, QueryRunner} from "typeorm";

export class makeNounIndependentOfWord1574530929372 implements MigrationInterface {
    name = 'makeNounIndependentOfWord1574530929372'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "noun" DROP CONSTRAINT "FK_cd77158db2805fe35d6e6bc9c7f"`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" DROP CONSTRAINT "REL_cd77158db2805fe35d6e6bc9c7"`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" DROP COLUMN "wordId"`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ADD "word" text NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ADD CONSTRAINT "UQ_f369b158ecbbfd072bf9086e067" UNIQUE ("word")`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ADD "languageId" integer`, undefined);
        await queryRunner.query(`ALTER TYPE "public"."noun_gender_enum" RENAME TO "noun_gender_enum_old"`, undefined);
        await queryRunner.query(`CREATE TYPE "noun_gender_enum" AS ENUM('male', 'female', 'neuter')`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ALTER COLUMN "gender" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ALTER COLUMN "gender" TYPE "noun_gender_enum" USING "gender"::"text"::"noun_gender_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ALTER COLUMN "gender" SET DEFAULT 'male'`, undefined);
        await queryRunner.query(`DROP TYPE "noun_gender_enum_old"`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ADD CONSTRAINT "FK_63384d4e23728aa6a042cc0194a" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "noun" DROP CONSTRAINT "FK_63384d4e23728aa6a042cc0194a"`, undefined);
        await queryRunner.query(`CREATE TYPE "noun_gender_enum_old" AS ENUM('male', 'female', 'Neuter')`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ALTER COLUMN "gender" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ALTER COLUMN "gender" TYPE "noun_gender_enum_old" USING "gender"::"text"::"noun_gender_enum_old"`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ALTER COLUMN "gender" SET DEFAULT 'male'`, undefined);
        await queryRunner.query(`DROP TYPE "noun_gender_enum"`, undefined);
        await queryRunner.query(`ALTER TYPE "noun_gender_enum_old" RENAME TO  "noun_gender_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" DROP COLUMN "languageId"`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" DROP CONSTRAINT "UQ_f369b158ecbbfd072bf9086e067"`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" DROP COLUMN "word"`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ADD "wordId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ADD CONSTRAINT "REL_cd77158db2805fe35d6e6bc9c7" UNIQUE ("wordId")`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ADD CONSTRAINT "FK_cd77158db2805fe35d6e6bc9c7f" FOREIGN KEY ("wordId") REFERENCES "word"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
