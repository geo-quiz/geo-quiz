import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account';

@Entity()
export class Token {
    constructor(token: string, account: Account) {
        this.token = token;
        this.account = account;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @OneToOne(() => Account, (user) => user.id)
    account: Account;

    @Column()
    token: string;
}
