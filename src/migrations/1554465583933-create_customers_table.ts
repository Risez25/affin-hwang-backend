import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomersTable1554465583933 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE "customers"
            (
                "id"            serial,
                "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
                "name"    character varying,
                "email"     character varying,
                "dob"        character varying,
                "address"          character varying,
                "phone"         character varying,
                "password"      character varying
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE "customers"');
    }
}
