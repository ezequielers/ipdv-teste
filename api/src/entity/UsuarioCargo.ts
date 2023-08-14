import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";
import { Cargo } from "./Cargo";

@Entity()
export class UsuarioCargo {

    constructor(usuario: Usuario, cargo: Cargo) {
        this.usuario = usuario;
        this.cargo = cargo;
    }

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Usuario, (usuario) => usuario.id, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario

    @ManyToOne(() => Cargo, (cargo) => cargo.id, {
        onDelete: 'CASCADE'
    })
    cargo: Cargo

}
