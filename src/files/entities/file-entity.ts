import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'files'})
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    extension: string;
    @Column()
    MIME_type: string;
    @Column()
    size: number;
    @Column()
    uploaded_date: Date;
    @Column()
    src:string;
}