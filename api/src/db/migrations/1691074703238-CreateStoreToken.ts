import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateStoreToken1691074703238 implements MigrationInterface {

    public tableName = "store_token"
    public tableNameUsuario = 'usuario'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.startTransaction()

        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "usuario_id",
                        type: "int",
                        isUnique: true,
                    },
                    {
                        name: "token",
                        type: "varchar",
                        length: "1000",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "expired_at",
                        type: "timestamp",
                        default: "null",
                        isNullable: true,
                    },
                ],
            }),
            true,
        )

        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                columnNames: ["usuario_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.tableNameUsuario,
                onDelete: "CASCADE",
            }),
        )

        await queryRunner.commitTransaction()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}
