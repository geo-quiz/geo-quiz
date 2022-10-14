import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
    constructor(email: string, passwordHash: string) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.displayName = '';
    }

    @PrimaryGeneratedColumn()
        id: number | undefined;

    @Column()
        email: string;

    @Column()
        passwordHash: string;
    
    @Column() 
        displayName: string;
}
