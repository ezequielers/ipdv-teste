import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUsuarioCargo1691072962779 implements MigrationInterface {

    public tableName = "usuario_cargo"
    public tableNameUsuario = "usuario"
    public tableNameCargo = "cargo"

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
                        name: "cargo_id",
                        type: "int",
                        isUnique: true,
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
        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                columnNames: ["cargo_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.tableNameCargo,
                onDelete: "CASCADE",
            }),
        )

        await queryRunner.commitTransaction()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}
