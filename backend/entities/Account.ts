import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';


@Entity()
export class Account {
    constructor(email: string, passwordHash: string,) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.displayName = '';
        this.role = 1;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    displayName: string;

    @ManyToOne(() => Role, ((role) => role.id))
    role: Role | 1;
}
