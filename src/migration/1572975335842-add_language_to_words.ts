import {MigrationInterface, QueryRunner} from "typeorm";

export class addLanguageToWords1572975335842 implements MigrationInterface {
    name = 'addLanguageToWords1572975335842'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "word" ADD "languageId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "word" ADD CONSTRAINT "FK_9b8ff0cdbf69e21261ad4af8a83" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "word" DROP CONSTRAINT "FK_9b8ff0cdbf69e21261ad4af8a83"`, undefined);
        await queryRunner.query(`ALTER TABLE "word" DROP COLUMN "languageId"`, undefined);
    }

}
