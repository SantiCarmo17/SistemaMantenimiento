import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "./usuarioModel";
import { Equipo } from "./equipoModel";
import { IsNotEmpty, Length } from "class-validator";
import { IsBefore } from "../validators/IsBeforeConstraint";
import { Chequeo } from "./chequeoModel";

@Entity('mantenimientos')
export class Mantenimiento extends BaseEntity{
    @PrimaryGeneratedColumn({name: 'id_mantenimiento' })
    idMantenimiento: number;

    @Column('text')
    @Length(5, 200, { message: "El objetivo debe tener entre 5 y 200 caracteres" })
    objetivo: string;

    @Column("varchar", { length: 50 })
    tipoMantenimiento: string;

    @Column('date', {name: 'fecha_prox_mantenimiento'})
    fechaProxMantenimiento: Date;

    @Column('date', {name: 'fecha_ultimo_mantenimiento'})
    @IsBefore('fechaProxMantenimiento', { message: "La fecha debe ser anterior a la fecha del próximo mantenimiento" })
    fechaUltimoMantenimiento: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.mantenimientos)
    @JoinColumn({name: 'usuario_documento' })
    usuario: Usuario;

    @ManyToMany(() => Equipo, equipo => equipo.mantenimientos)
    equipos: Equipo[];

    @OneToMany(() => Chequeo, chequeo => chequeo.mantenimiento)
    chequeos: Chequeo[];


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}