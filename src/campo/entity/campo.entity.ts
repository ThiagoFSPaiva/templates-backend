import { TemplateEntity } from "src/template/entity/template.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity ({name: 'campo'})
export class CampoEntity {
 
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'template_id', nullable: true})
    templateId: number;

    @Column({name: 'name', nullable: true})
    name: string;

    @Column({name: 'tipo', nullable: true})
    tipo: string;

    @Column({name: 'isNulo', nullable: false, default: false})
    isNulo: boolean;

    @ManyToOne(() => TemplateEntity, template => template.campo)
    @JoinColumn({name:'template_id', referencedColumnName:'id'})
    template?: TemplateEntity;
}