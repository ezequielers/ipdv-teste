import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateDepartamentoUsuario1691074685798 implements MigrationInterface {

    public tableName = "departamento_usuario"
    public tableNameDepartamento = 'departamento'
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
                        name: "departamento_id",
                        type: "int",
                        isUnique: true,
                    },
                    {
                        name: "usuario_id",
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
                columnNames: ["departamento_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.tableNameDepartamento,
                onDelete: "CASCADE",
            }),
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
