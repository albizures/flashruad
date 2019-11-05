import {MigrationInterface, QueryRunner} from "typeorm";

export class addLanguage1572963061224 implements MigrationInterface {
    name = 'addLanguage1572963061224'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "language" ("id" SERIAL NOT NULL, "name" text NOT NULL, "code" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c89a5b8dee726f705c238ace807" UNIQUE ("name", "code"), CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "language"`, undefined);
    }

}
