/* eslint-disable canonical/no-unused-exports */
import {
  type MigrationInterface,
  type QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserSettingsTable1696957687716 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_settings',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },

          {
            name: 'is_email_verified',
            type: 'tinyint',
            default: 0,
          },
          {
            name: 'is_phone_verified',
            type: 'tinyint',
            default: 0,
          },
          {
            name: 'user_id',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            precision: 6,
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            precision: 6,
            default: 'CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)',
          },
        ],
      }),
      true,
    );


    // Add foreign key constraint (optional)
    await queryRunner.createForeignKey(
      'user_settings',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.getTable('user_settings');
    await queryRunner.dropIndex(
      'user_settings',
      'REL_4ed056b9344e6f7d8d46ec4b30',
    );
    await queryRunner.dropTable('user_settings');
  }
}