import { Router } from "express";
import { UsuarioController } from "../controller/UsuarioController";
import { CargoController } from "../controller/CargoController";
import { UsuarioCargo } from "../entity/UsuarioCargo";
import { sign, verify } from 'jsonwebtoken';
import { AppDataSource } from "../data-source";
import { StoreToken } from "../entity/StoreToken";
import { MoreThanOrEqual } from "typeorm";

export const routerUsuario = Router();
const usuarioCtrl = new UsuarioController();
//Usuario logout
routerUsuario.get('/logout', async (req, res) => {
    const token = req.cookies['token'];
    await AppDataSource.getRepository(StoreToken).delete({ token: token });
    res.cookie('token', '', { maxAge: 0 });

    res.send({
        success: true
    });
});
//Usuario logado
routerUsuario.get('/logged', async (req, res) => {
    try {
        const accessToken = req.query.token ? req.query.token.toLocaleString() : (req.header('Authorization')?.split(' ')[1] || "");
        const payload: any = verify(accessToken, process.env.SECRET)

        if (!payload) {
            return res.status(401).send({
                error: 'Não autenticado'
            });
        }
        const usuario = await usuarioCtrl.get(parseInt(payload.id));
        if (!usuario) {
            return res.status(401).send({
                error: 'Não autenticado'
            });
        }
        const { senha, ...data } = usuario;
        res.send(data);
    } catch (e) {
        return res.status(401).send({
            error: 'Não autenticado'
        });
    }
});

//Atualiza token
routerUsuario.post('/refresh', async (req, res) => {
    try {
        const refreshToekn = req.cookies['refreshToekn'];
        const payload: any = verify(refreshToekn, 'refresh_secret');
        if (!payload) {
            return res.status(401).send({
                error: 'Não autenticado'
            });
        }

        const dbToken = await AppDataSource.getRepository(StoreToken).findOneBy({
            usuario_id: payload.id,
            expired_at: MoreThanOrEqual(new Date())
        });

        if (!dbToken) {
            return res.status(401).send({
                error: 'Não autenticado'
            });
        }

        const accessToken = sign({
            id: payload.id
        }, 'access_secret', {
            expiresIn: '30s'
        });

        res.send({
            accessToken
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Não autenticado'
        });
    }
});

//Login do usuário
routerUsuario.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const response = await usuarioCtrl.login(email, senha);

    if (!response.error) {
        res.cookie('token', response.accessToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
        });
    }

    res.json(response.error ? response.error : { token: response.accessToken });
});

//Adiciona usuario a carho
routerUsuario.post('/cargo', async (req, res) => {
    const { cargoId, usuarioId } = req.body;
    const cargoCtrl = new CargoController();
    const usuario = await usuarioCtrl.get(parseInt(usuarioId));
    const cargo = await cargoCtrl.get(parseInt(cargoId));
    if (usuario === null) {
        res.status(404).json({ error: 'Usuário não encontrado' });
    } else if (cargo === null) {
        res.status(404).json({ error: 'Cargo não encontrado' });
    } else {
        const usuarioCargoSalvo = await usuarioCtrl.addCargo(new UsuarioCargo(usuario, cargo));
        res.json(usuarioCargoSalvo);
    }
});

//Atualiza usuario
routerUsuario.put('/', async (req, res) => {
    const { id, nome, email, senha } = req.body;
    const usuario = await usuarioCtrl.update(id, nome, email, senha);
    res.json(usuario);
});
//Seleciona usuario
routerUsuario.get('/:id', async (req, res) => {
    const usuario = await usuarioCtrl.get(parseInt(req.params.id));
    res.json(usuario);
});
//Lista todos os usuários
routerUsuario.get('/', async (req, res) => {
    const usuarios = await usuarioCtrl.usuarios();
    res.json(usuarios);
});
//Deleta usuario
routerUsuario.delete('/:id', async (req, res) => {
    const usuarios = await usuarioCtrl.delete(parseInt(req.params.id));
    res.json(usuarios);
});