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
            name: 'allowedMenus',
            type: 'json',
          },
        ],
      }),
      true,
    );

     await queryRunner.query(`
      INSERT INTO roles (id, name, allowedMenus) 
      VALUES 
        (UUID(), 'admin', '["dashboard","users","settings","analytics"]'),
        (UUID(), 'superadmin', '["dashboard","users","settings","analytics"]')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
  }
}
