import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskTable1764528451199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await queryRunner.query('CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" VARCHAR(256) NOT NULL, "description" VARCHAR(256), "status" VARCHAR(50) NOT NULL DEFAULT \'PENDING\', "expiration_date" TIMESTAMP NOT NULL, CONSTRAINT task_pk PRIMARY KEY (id));');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS "task";');
    }

}
