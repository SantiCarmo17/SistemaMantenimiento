import { Ambiente } from "../models/ambienteModel";
import { CuentaDante } from "../models/cuentaDanteModel";
import { Dependencia } from "../models/dependenciaModel";
import { Sede } from "../models/sedeModel";
import { Subsede } from "../models/subsedeModel";
import { TipoEquipo } from "../models/tipoEquipoModel";
import multer from "multer";

export interface EquipoRow {
    serial: string;
    marca: string;
    referencia: string;
    fechaCompra: Date;
    placaSena: string;
    tipoEquipo?: TipoEquipo;                
    cuentaDante?: CuentaDante; 
    sede?: Sede;               
    subsede?: Subsede;            
    dependencia?: Dependencia;       
    ambiente?: Ambiente;       
}
