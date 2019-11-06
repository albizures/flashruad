import {MigrationInterface, QueryRunner} from "typeorm";

export class createNoun1573065350521 implements MigrationInterface {
    name = 'createNoun1573065350521'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "noun_gender_enum" AS ENUM('male', 'female', 'Neuter')`, undefined);
        await queryRunner.query(`CREATE TABLE "noun" ("id" SERIAL NOT NULL, "gender" "noun_gender_enum" NOT NULL DEFAULT 'male', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "wordId" integer, CONSTRAINT "REL_cd77158db2805fe35d6e6bc9c7" UNIQUE ("wordId"), CONSTRAINT "PK_9b35a46e6ff688d9dd025474aa1" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ADD CONSTRAINT "FK_cd77158db2805fe35d6e6bc9c7f" FOREIGN KEY ("wordId") REFERENCES "word"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "noun" DROP CONSTRAINT "FK_cd77158db2805fe35d6e6bc9c7f"`, undefined);
        await queryRunner.query(`DROP TABLE "noun"`, undefined);
        await queryRunner.query(`DROP TYPE "noun_gender_enum"`, undefined);
    }

}
