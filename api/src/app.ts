import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';
import { AppDataSource } from "./data-source";
import { routerUsuario } from './routes/usuario';
import { routerCargo } from './routes/cargo';
import { routerDepartamento } from './routes/departamento';
import { routerCentroDeCusto } from './routes/centroDeCusto';
import { Usuario } from './entity/Usuario';

export const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(cookieParser());

app.use(logger('dev'));

AppDataSource.initialize()
    .then(async () => {
        console.log("O banco de dados foi inicializado!")

        const user = await AppDataSource.manager.find(Usuario, {
            where: { email: 'ipdv@email.com'}
        })

        if (user.length === 0) {
            // console.log("Inserting a new user into the database...")
            const usuario = new Usuario()
            usuario.nome = "IPDV Admin"
            usuario.email = "ipdv@email.com"
            usuario.senha = "ipdv"
            await AppDataSource.manager.save(usuario)
            console.log("Saved a new user with id: " + usuario.id)
        }

        // console.log("Loading users from the database...")
        const users = await AppDataSource.manager.find(Usuario)
        console.log("Loaded users: ", users)

        // console.log("Here you can setup and run express / fastify / any other framework.")
    })
    .catch((err) => {
        console.log("Erro: ", err)
        console.error("Erro durante a inicialização do banco de dados", AppDataSource.options)
    });

app.use('/usuario', routerUsuario);
app.use('/cargo', routerCargo);
app.use('/departamento', routerDepartamento);
app.use('/centro-de-custo', routerCentroDeCusto);
app.use('/', (req, res) => {
    res.send(`now: ${new Date().toISOString()}`)
});