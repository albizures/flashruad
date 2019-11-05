import {MigrationInterface, QueryRunner} from "typeorm";

export class addTimestamps1572956365897 implements MigrationInterface {
    name = 'addTimestamps1572956365897'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pronunciation" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "word" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "word" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "word" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "word" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation" DROP COLUMN "createdAt"`, undefined);
    }

}
