import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
    constructor(token: string) {
        this.token = token;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    token: string;
}
