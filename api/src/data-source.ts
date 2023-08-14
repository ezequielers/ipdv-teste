import "reflect-metadata"
import { DataSource } from "typeorm"
import { Cargo } from "./entity/Cargo";
import { CentroDeCusto } from "./entity/CentroDeCusto";
import { Departamento } from "./entity/Departamento";
import { DepartamentoCentroDeCusto } from "./entity/DepartamentoCentroDeCusto";
import { StoreToken } from "./entity/StoreToken";
import { Usuario } from "./entity/Usuario"
import { UsuarioCargo } from "./entity/UsuarioCargo";
import { UsuarioDepartamento } from "./entity/UsuarioDepartamento";
import 'dotenv/config';
import * as path from 'path';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [
        Usuario,
        Cargo,
        Departamento,
        CentroDeCusto,
        UsuarioCargo,
        UsuarioDepartamento,
        DepartamentoCentroDeCusto,
        StoreToken
    ],
    migrations: [
        path.join(__dirname, "db/migrations", "*.*")
    ],
    subscribers: [
        path.join(__dirname, "db/subscribers", "*.*")
    ],
});
