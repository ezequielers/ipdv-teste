import { Usuario } from "../entity/Usuario";
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UsuarioCargo } from "../entity/UsuarioCargo";

import { AppDataSource } from "../data-source";
import { StoreToken } from "../entity/StoreToken";
import { UsuarioDepartamento } from "../entity/UsuarioDepartamento";

export class UsuarioController {
    private saltOrRounds = 10;
    async login(email: string, senha: string) {
        const repository = AppDataSource.getRepository(Usuario);
        console.log('email', email)
        console.log('senha', senha)
        const usuario = await AppDataSource.manager.findOneBy(Usuario, { //await repository.findOneBy({
            email: email,
        });
        if (!usuario) {
            return { error: 'Usuário e ou senha incorretos' };
        }
        if (bcrypt.compareSync(senha, usuario.senha) === false) {
            return { error: 'Usuário e ou senha incorretos' };
        }

        console.log('usuario', usuario)

        const accessToken = sign({
            id: usuario.id
        }, process.env.SECRET, {
            expiresIn: '1w'
        });

        const expired_at = new Date();
        expired_at.setDate(expired_at.getDate() + 7);

        await AppDataSource.getRepository(StoreToken).save({
            usuario_id: usuario.id,
            token: accessToken,
            expired_at: expired_at
        });

        return { accessToken: accessToken };
    }
    async salvar(usuario: Usuario) {
        const hash = bcrypt.hashSync(usuario.senha, this.saltOrRounds);
        usuario.senha = hash;
        return await AppDataSource.manager.save(usuario);
    }
    async usuarios() {
        return await AppDataSource.manager.find(Usuario);
    }
    async get(id: number) {
        const repository = AppDataSource.getRepository(Usuario);
        const usuario = await repository.findOne({
            where: {
                id: id
            },
            relations: {
                cargo: true,
                departamento: true
            }
        });

        return usuario;
    }
    async update(id: number, nome: string | null, email: string | null, senha: string | null) {
        const usuarioData = { nome: undefined, email: undefined, senha: undefined };
        if (nome !== "" && nome !== null) {
            usuarioData.nome = nome;
        }
        if (email !== "" && email !== null) {
            usuarioData.email = email;
        }
        if (senha !== "" && senha !== null) {
            const hash = bcrypt.hashSync(senha, parseInt(process.env.SALT_PASSWD));
            usuarioData.senha = hash;
        }
        const usuarioUpdated = await (await AppDataSource.manager.update(Usuario, id, usuarioData)).affected;
        if (usuarioUpdated === 1) {
            return this.get(id);
        } else {
            return { error: 'Erro ao atualizar usuário' };
        }
    }
    async delete(id: number) {
        const repository = AppDataSource.getRepository(Usuario);
        const usuario = await repository.findOneBy({
            id: id
        });
        return await repository.remove(usuario);
    }
    //Vincular usuario a cargo
    async addCargo(usuarioCargo: UsuarioCargo) {
        return await AppDataSource.manager.save(usuarioCargo);
    }
    //Vincular usuario a departamento
    async addDepartamento(usuarioDepartamento: UsuarioDepartamento) {
        return await AppDataSource.manager.save(usuarioDepartamento);
    }
}