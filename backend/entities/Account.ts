import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';

@Entity()
export class Account {
    constructor(email: string, passwordHash: string) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.displayName = '';
        this.profilePicture = '';
        this.leaderboardParticipation = true;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    displayName: string;

    @Column()
    profilePicture: string;

    @Column()
    leaderboardParticipation: boolean;

    @ManyToOne(() => Role, (role) => role.id)
    role: Role | undefined;
}
