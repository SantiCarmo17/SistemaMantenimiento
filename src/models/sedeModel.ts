import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";
import { Subsede } from "./subsedeModel";
import { Equipo } from "./equipoModel";

@Entity('sedes')
export class Sede extends BaseEntity{
    @PrimaryGeneratedColumn({name: 'id_sede'})
    idSede: number;

    @Column("varchar", { length: 100 })
    @Length(3, 50, { message: "El nombre de la Sede debe tener entre 3 y 50 caracteres" })
    nombre: string;

    @OneToMany(() => Equipo, (equipo) => equipo.sede)
    equipos: Equipo[];

    @OneToMany(() => Subsede, (subsede) => subsede.sede)
    subsedes: Subsede[];
}