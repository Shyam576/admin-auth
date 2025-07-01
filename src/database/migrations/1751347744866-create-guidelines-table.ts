import { Table, type MigrationInterface, type QueryRunner } from 'typeorm';

export class CreateGuidelinesTable1751347744866 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'guidelines',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar(100)',
          },
          {
            name: 'description',
            type: 'varchar(255)',
          },
          {
            name: 'files',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'link',
            type: 'varchar(255)',
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
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('guidelines');
  }
}
