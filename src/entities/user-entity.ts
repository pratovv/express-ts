import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: "users"})
export class UserEntity {
    @PrimaryColumn()
    id: string;
    @Column()
    password: string;
}

export default UserEntity;