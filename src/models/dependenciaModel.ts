import { Length } from "class-validator";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subsede } from "./subsedeModel";
import { Equipo } from "./equipoModel";
import { Ambiente } from "./ambienteModel";


@Entity('dependencias')
export class Dependencia extends BaseEntity{
    @PrimaryGeneratedColumn({name: 'id_dependencia'})
    idDependencia: number;
    
    @Column("varchar", { length: 100 })
    @Length(3, 50, { message: "El nombre de la dependencia debe tener entre 3 y 50 caracteres" })
    nombre: string;
    
    @ManyToOne(() => Subsede, (subsede) => subsede.dependencias)
    @JoinColumn({name: 'id_subsede'})
    subsede: Subsede;

    @OneToMany(() => Equipo, (equipo) => equipo.dependencia)
    equipos: Equipo[];

    @OneToMany(() => Ambiente, (ambiente) => ambiente.dependencia)
    ambientes: Ambiente[];
}