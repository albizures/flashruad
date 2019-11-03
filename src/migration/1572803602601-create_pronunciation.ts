import {MigrationInterface, QueryRunner} from "typeorm";

export class createPronunciation1572803602601 implements MigrationInterface {
    name = 'createPronunciation1572803602601'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "pronunciation" ("id" SERIAL NOT NULL, "file" text NOT NULL, "userId" integer, CONSTRAINT "UQ_f7d17ef43e30d8d39c0fed532f9" UNIQUE ("file"), CONSTRAINT "REL_534d4a259991e843e878acb68e" UNIQUE ("userId"), CONSTRAINT "PK_03d09e54a54345f930fc5288b11" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation" ADD CONSTRAINT "FK_534d4a259991e843e878acb68ed" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pronunciation" DROP CONSTRAINT "FK_534d4a259991e843e878acb68ed"`, undefined);
        await queryRunner.query(`DROP TABLE "pronunciation"`, undefined);
    }

}
