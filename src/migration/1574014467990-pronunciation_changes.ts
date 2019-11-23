import {MigrationInterface, QueryRunner} from "typeorm";

export class pronunciationChanges1574014467990 implements MigrationInterface {
    name = 'pronunciationChanges1574014467990'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pronunciation" DROP CONSTRAINT "FK_2c1fe61321575a9a313e32cc2a4"`, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation" DROP COLUMN "wordId"`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ADD "pronunciationId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ADD CONSTRAINT "UQ_de7fbf43621f40641ca4b589ccc" UNIQUE ("pronunciationId")`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" ADD CONSTRAINT "FK_de7fbf43621f40641ca4b589ccc" FOREIGN KEY ("pronunciationId") REFERENCES "pronunciation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "noun" DROP CONSTRAINT "FK_de7fbf43621f40641ca4b589ccc"`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" DROP CONSTRAINT "UQ_de7fbf43621f40641ca4b589ccc"`, undefined);
        await queryRunner.query(`ALTER TABLE "noun" DROP COLUMN "pronunciationId"`, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation" ADD "wordId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation" ADD CONSTRAINT "FK_2c1fe61321575a9a313e32cc2a4" FOREIGN KEY ("wordId") REFERENCES "word"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
