import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class StoreToken {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    usuario_id: number

    @Column()
    token: string

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    expired_at: Date
}
