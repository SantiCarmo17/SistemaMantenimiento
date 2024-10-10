import { Length } from "class-validator";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dependencia } from "./dependenciaModel";
import { Equipo } from "./equipoModel";


@Entity('ambientes')
export class Ambiente extends BaseEntity{
    @PrimaryGeneratedColumn({ name: 'id_ambiente' })
    idAmbiente: number;

    @Column("varchar", { length: 50 })
    @Length(3, 50, { message: "El nombre del ambiente debe tener entre 3 y 50 caracteres" })
    nombre: string;

    @OneToMany(() => Equipo, (equipo) => equipo.ambiente)
    equipos: Equipo[];

    @ManyToOne(() => Dependencia, (dependencia) => dependencia.ambientes)
    @JoinColumn({name: 'id_dependencia'})
    dependencia: Dependencia;
}