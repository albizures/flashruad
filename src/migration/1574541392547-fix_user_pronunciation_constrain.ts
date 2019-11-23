import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUserPronunciationConstrain1574541392547 implements MigrationInterface {
    name = 'fixUserPronunciationConstrain1574541392547'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pronunciation" DROP CONSTRAINT "FK_534d4a259991e843e878acb68ed"`, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation" DROP CONSTRAINT "REL_534d4a259991e843e878acb68e"`, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation" DROP COLUMN "userId"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pronunciation" ADD "userId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation" ADD CONSTRAINT "REL_534d4a259991e843e878acb68e" UNIQUE ("userId")`, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation" ADD CONSTRAINT "FK_534d4a259991e843e878acb68ed" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
