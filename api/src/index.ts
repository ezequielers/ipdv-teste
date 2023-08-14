import { AppDataSource } from "./data-source"
import { Usuario } from "./entity/Usuario"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const usuario = new Usuario("IPDV Admin", "ipdv@email.com", "ipdv")
    await AppDataSource.manager.save(usuario)
    console.log("Saved a new user with id: " + usuario.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(Usuario)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
