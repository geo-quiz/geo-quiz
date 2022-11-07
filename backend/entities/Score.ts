import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Account } from './Account';

@Entity()
export class Score {
    constructor(points: number, time: number, account: Account) {
        this.points = points;
        this.time = time;
        this.account = account;
    }

    @PrimaryGeneratedColumn()
        id: number | undefined;

    @Column()
        points: number;

    @Column()
        time: number;

    @ManyToOne(() => Account, (account) => account.id)
        account: Account | undefined;
    
}
