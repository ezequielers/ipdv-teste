import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateDepartamentoCentroCusto1691074677852 implements MigrationInterface {

    public tableName = "departamento_centro_custo"
    public tableNameCentroCusto = 'centro_custo'
    public tableNameDepartamento = 'departamento'

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
                        name: "centro_custo_id",
                        type: "int",
                        isUnique: true,
                    },
                    {
                        name: "departamento_id",
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
                columnNames: ["centro_custo_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.tableNameCentroCusto,
                onDelete: "CASCADE",
            }),
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

        await queryRunner.commitTransaction()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}
