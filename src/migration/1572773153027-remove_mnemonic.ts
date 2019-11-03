import {MigrationInterface, QueryRunner} from "typeorm";

export class removeMnemonic1572773153027 implements MigrationInterface {
    name = 'removeMnemonic1572773153027'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "word" DROP COLUMN "mnemonic"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "word" ADD "mnemonic" text`, undefined);
    }

}
