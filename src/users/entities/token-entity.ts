import {Column, Entity, OneToOne, PrimaryColumn} from "typeorm";
import {UserEntity} from "./user-entity";

@Entity({name: 'token'})
export class TokenEntity {
    @PrimaryColumn()
    @OneToOne(() => UserEntity, (user) => user.id)
    user: string;
    @Column()
    refreshToken:string
}
