import { Column, Entity,ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Leaderboard } from './Leaderboard';


@Entity()
export class Account {
    constructor(email: string, passwordHash: string) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.displayName = '';
        this.leaderboard= undefined;
    }

    @PrimaryGeneratedColumn()
        id: number | undefined;

    @Column()
        email: string;

    @Column()
        passwordHash: string;
    
    @Column() 
        displayName: string;

    @ManyToOne(() => Leaderboard, (leaderboard) => leaderboard.id)
    leaderboard: Leaderboard| undefined;
}
