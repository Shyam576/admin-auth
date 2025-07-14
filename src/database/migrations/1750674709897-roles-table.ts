import { Table, type MigrationInterface, type QueryRunner } from 'typeorm';

export class RolesTable1750674709897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(255)',
          },
          {
            name: 'description',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'allowed_menus',
            type: 'json',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: true
          },
        ],
      }),
      true,
    );

     await queryRunner.query(`
      INSERT INTO roles (id, name, allowed_menus, created_at, updated_at) 
      VALUES 
        (UUID(), 'admin', '["dashboard","users","settings","analytics"]', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (UUID(), 'superadmin', '["dashboard","users","settings","analytics"]', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
  }
}
