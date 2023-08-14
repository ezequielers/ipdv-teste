import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCentroCusto1691074607524 implements MigrationInterface {

    public tableName = "centro_custo"

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
                        name: "nome",
                        type: "varchar",
                        length: '255',
                        isNullable: false,
                    },
                ],
            }),
            true,
        )

        await queryRunner.commitTransaction()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}
