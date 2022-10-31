import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Continent {
    constructor(name: string) {
        this.name = name;
    }

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    name: string;
}
