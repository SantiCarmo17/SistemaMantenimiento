import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, Length, IsDate, IsDateString } from "class-validator";
import { Rol } from "./rolModel";
import { Mantenimiento } from "./mantenimientoModel";
import { Estado } from "./estadoModel";
import { IsBefore } from "../validators/IsBeforeConstraint";

@Entity('usuarios')
export class Usuario extends BaseEntity{
    @PrimaryColumn()
    documento: number;

    @Column("varchar", { length: 80 })
    @Length(4, 20, { message: "El nombre de usuario debe tener entre 4 y 20 caracteres" })
    nombre: string;

    @Column('date', { name: 'fecha_inicio' })
    @IsBefore('fechaFin', { message: "La fecha de inicio debe ser anterior a la fecha de fin" })
    fechaInicio: Date;

    @Column('date', { name: 'fecha_fin' })
    fechaFin: Date;

    @Column('text')
    observaciones: String;

    @Column("varchar", { length: 80 })
    @IsEmail({}, { message: "Debe proporcionar un correo electrónico válido" })
    correo: string;

    @Column()
    @Length(6, 100, { message: "La contraseña debe tener al menos 6 caracteres" })
    contrasenia: string;

    @Column()
    tokenRestablecerContrasenia: string;

    @Column('date')
    tokenRestablecerExpiracion: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Rol, rol => rol.usuarios)
    @JoinTable({
        name: 'roles_usuarios',
        joinColumn: { name: 'usuario_documento', referencedColumnName: 'documento' },
        inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'id' }
    })
    roles: Rol[];

    @OneToMany(() => Mantenimiento, (mantenimiento) => mantenimiento.usuario)
    mantenimientos: Mantenimiento[];

    @ManyToOne(() => Estado, (estado) => estado.usuario)
    @JoinColumn({name: 'estado_id' })
    estado: Estado;
}