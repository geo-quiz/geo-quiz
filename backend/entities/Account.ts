import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';

@Entity()
export class Account {
    constructor(email: string, displayName: string, passwordHash: string) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.displayName = displayName;
        this.profilePicture = 'default.svg';
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

    @Column({ type: 'tinyint' })
    leaderboardParticipation: 0 | 1;

    @ManyToOne(() => Role, (role) => role.id)
    role: Role | undefined;
}
