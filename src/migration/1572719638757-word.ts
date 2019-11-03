import {MigrationInterface, QueryRunner} from "typeorm";

export class word1572719638757 implements MigrationInterface {
    name = 'word1572719638757'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "word" ("id" SERIAL NOT NULL, "word" text NOT NULL, "mnemonic" text NOT NULL, CONSTRAINT "UQ_8355d962fea7fe9fef57d58ffff" UNIQUE ("word"), CONSTRAINT "PK_ad026d65e30f80b7056ca31f666" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "word"`, undefined);
    }

}
