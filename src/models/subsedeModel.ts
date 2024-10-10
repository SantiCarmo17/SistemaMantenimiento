import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Equipo } from "./equipoModel";
import { Length } from "class-validator";
import { Dependencia } from "./dependenciaModel";
import { Sede } from "./sedeModel";

@Entity('subsedes')
export class Subsede extends BaseEntity{
    @PrimaryGeneratedColumn({name: 'id_subsede'})
    idSubsede: number;

    @Column("varchar", { length: 100 })
    @Length(3, 50, { message: "El nombre de la subsede debe tener entre 3 y 50 caracteres" })
    nombre: string;

    @OneToMany(() => Equipo, (equipo) => equipo.subsede)
    equipos: Equipo[];

    @ManyToOne(() => Sede, (sede) => sede.subsedes)
    @JoinColumn({name: 'id_sede'})
    sede: Sede;

    @OneToMany(() => Dependencia, (dependencia) => dependencia.subsede)
    dependencias: Dependencia[];
}