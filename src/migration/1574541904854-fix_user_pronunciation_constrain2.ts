import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUserPronunciationConstrain21574541904854 implements MigrationInterface {
    name = 'fixUserPronunciationConstrain21574541904854'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "pronunciation_user_user" ("pronunciationId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_bbabf777b330b7bda29731e0054" PRIMARY KEY ("pronunciationId", "userId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_2a3dc31aa9bb33266f5ed15a9f" ON "pronunciation_user_user" ("pronunciationId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b3676c8f12dc770c5d9a9a500b" ON "pronunciation_user_user" ("userId") `, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation_user_user" ADD CONSTRAINT "FK_2a3dc31aa9bb33266f5ed15a9f0" FOREIGN KEY ("pronunciationId") REFERENCES "pronunciation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation_user_user" ADD CONSTRAINT "FK_b3676c8f12dc770c5d9a9a500be" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pronunciation_user_user" DROP CONSTRAINT "FK_b3676c8f12dc770c5d9a9a500be"`, undefined);
        await queryRunner.query(`ALTER TABLE "pronunciation_user_user" DROP CONSTRAINT "FK_2a3dc31aa9bb33266f5ed15a9f0"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b3676c8f12dc770c5d9a9a500b"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_2a3dc31aa9bb33266f5ed15a9f"`, undefined);
        await queryRunner.query(`DROP TABLE "pronunciation_user_user"`, undefined);
    }

}
