import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';
import { Score } from './Score';

@Entity()
export class Account {
    constructor(email: string, displayName: string, passwordHash: string) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.displayName = displayName;
        this.profilePicture = 'images/default.svg';
        this.leaderboardParticipation = 1;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @Column({ unique: true })
    displayName: string;

    @Column()
    profilePicture: string;

    @ManyToOne(() => Role, (role) => role.id)
    role: Role | undefined;

    @OneToMany(() => Score, (scores) => scores.id)
    scores: Score | undefined;

    @Column({ type: 'tinyint' })
    leaderboardParticipation: 0 | 1;
}
