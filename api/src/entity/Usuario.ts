import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate, AfterLoad, BaseEntity, JoinTable } from "typeorm"
import { UsuarioCargo } from "./UsuarioCargo";
import { UsuarioDepartamento } from "./UsuarioDepartamento";

@Entity()
export class Usuario {

    // constructor(nome: string, email: string, senha: string) {
    //     this.nome = nome;
    //     this.email = email;
    //     this.senha = senha;
    // }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    senha: string


    // @AfterLoad()
    // private loadTempPassword(): void {
    //     console.log('Entramos')
    // }

    // @BeforeUpdate()
    // private encryptPassword(): void {
    //     if (this.tempPassword !== this.senha) {
    //         //
    //     }
    // }

    @OneToMany(() => UsuarioCargo, (usuarioCargo) => usuarioCargo.usuario, {
        onDelete: 'CASCADE'
    })
    @JoinTable()
    cargo: UsuarioCargo[]

    @OneToMany(() => UsuarioDepartamento, (usuarioDepartamento) => usuarioDepartamento.usuario, {
        onDelete: 'CASCADE'
    })
    departamento: UsuarioDepartamento[]

    // @BeforeInsert()
    // generateAuthorEmail (): void {
    //     // 'this' will refer to our entity
    //     if (!this.email) {
    //         this.email = `author-${this.id}@example.com`;
    //     }
    // }

    // @BeforeInsert()
    // hashPassword(): void {
    //     if (!this.email) {
    //     // async hashPassword(): Promise<void> {
    //         console.log('senha 1', this.senha)
    //         // this.senha = bcrypt.hashSync(this.senha, process.env.SALT_PASSWD);
    //     }
    // }
}
