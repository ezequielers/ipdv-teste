import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class CreateUsuario1691069837318 implements MigrationInterface {

    public tableName = "usuario"

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
                    {
                        name: "email",
                        type: "varchar",
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: "senha",
                        type: "varchar",
                        length: '255',
                        isNullable: false,
                    },
                ],
            }),
            true,
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_USUARIO_ID",
                columnNames: ["id"],
            }),
        )

        await queryRunner.commitTransaction()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropIndex(this.tableName, 'IDX_USUARIO_ID');
        await queryRunner.dropTable(this.tableName);
    }

}
