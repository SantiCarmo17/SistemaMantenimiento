import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Equipo } from "./equipoModel";
import { Mantenimiento } from "./mantenimientoModel"; 

@Entity('chequeos')
export class Chequeo extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_chequeo' })
    idChequeo: number;

    @Column("varchar", { length: 50 })
    descripcion: string;

    @Column("varchar", { length: 150 })
    observaciones: string;

    @Column("varchar", {name: 'link_evidencia', length: 250 })
    linkEvidencia: string;

    @ManyToOne(() => Equipo, (equipo) => equipo.chequeos)
    @JoinColumn({ name: 'equipo_serial' })
    equipo: Equipo;

    @ManyToOne(() => Mantenimiento, (mantenimiento) => mantenimiento.chequeos)
    @JoinColumn({ name: 'mantenimiento_id' })
    mantenimiento: Mantenimiento;
}