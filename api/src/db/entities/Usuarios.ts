import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { UsuarioCargo } from "../../entity/UsuarioCargo";
import { UsuarioDepartamento } from "../../entity/UsuarioDepartamento";

@Entity()
export class Usuarios {

    constructor(nome: string, email: string, senha: string) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    senha: string

    @OneToMany(() => UsuarioCargo, (usuarioCargo) => usuarioCargo.usuario, {
        onDelete: 'CASCADE'
    })
    cargo: UsuarioCargo[]

    @OneToMany(() => UsuarioDepartamento, (usuarioDepartamento) => usuarioDepartamento.usuario, {
        onDelete: 'CASCADE'
    })
    departamento: UsuarioDepartamento[]
}
