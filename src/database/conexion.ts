import { DataSource } from "typeorm";
import { Equipo } from "../models/equipoModel";
import { TipoEquipo } from "../models/tipoEquipoModel";
import { CuentaDante } from "../models/cuentaDanteModel";
import { Mantenimiento } from "../models/mantenimientoModel";
import { Usuario } from "../models/usuarioModel";
import { Rol } from "../models/rolModel";
import { Estado } from "../models/estadoModel";
import { Chequeo } from "../models/chequeoModel";
import { Sede } from "../models/sedeModel";
import { Subsede } from "../models/subsedeModel";
import { Dependencia } from "../models/dependenciaModel";
import { Ambiente } from "../models/ambienteModel";
import { config } from "dotenv";
config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: true,
    entities: [Equipo, TipoEquipo, CuentaDante, Mantenimiento, Usuario, Rol, Estado, Chequeo, Sede, Subsede, Dependencia, Ambiente],
    synchronize: false
})

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source ha sido inicializada!');
    })
    .catch((err) => {
        console.error('Ha ocurrido un error en la Data Source:', err);
    });