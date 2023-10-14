import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'state'})
export class StateEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name:'name', nullable: false})
    name: string; 

    @CreateDateColumn({name:'created_at', nullable: false})
    createdAt: Date;

    @UpdateDateColumn({name:'updated_at', nullable: false})
    updatedAt: Date; 
}