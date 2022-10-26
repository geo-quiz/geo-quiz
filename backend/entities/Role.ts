import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account';

@Entity()
export class Role {
    constructor(name: string) {
        this.name = name;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    name: string;

    @OneToMany(() => Account, ((account) => account.id))
    role: Account | undefined;
}
