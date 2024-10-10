import { Request, Response } from "express";
import { Chequeo } from '../models/chequeoModel';
import { Equipo } from '../models/equipoModel';
import { Mantenimiento } from '../models/mantenimientoModel';


export class ChequeosController{
    constructor(){

    }

    async addOrUpdateChequeo(req: Request, res: Response){
        const { equipoSerial, mantenimientoId, descripcion, observaciones } = req.body;
    
        try {
            // Buscar si ya existe un chequeo para el equipo y mantenimiento dado
            let chequeo = await Chequeo.findOne({
                where: { equipo: { serial: equipoSerial }, mantenimiento: { idMantenimiento: mantenimientoId } },
                relations: ['equipo', 'mantenimiento']
            });
    
            if (chequeo) {
                //Si existe chequeo, actualizamos la descripción y observaciones
                chequeo.descripcion = descripcion;
                chequeo.observaciones = observaciones;
            } else {
                //Si no existe, cremos uno nuevo
                const equipo = await Equipo.findOne({ where: { serial: equipoSerial } });
                const mantenimiento = await Mantenimiento.findOne({ where: { idMantenimiento: mantenimientoId } });
    
                if (!equipo || !mantenimiento) {
                    return res.status(404).json({ message: 'Equipo o Mantenimiento no encontrado' });
                }
    
                chequeo = new Chequeo();
                chequeo.descripcion = descripcion;
                chequeo.observaciones = observaciones;
                chequeo.equipo = equipo;
                chequeo.mantenimiento = mantenimiento;
            }
    
            //Guardamos el chequeo en la base de datos
            await chequeo.save();
    
            res.status(200).json({ message: 'Chequeo guardado correctamente', chequeo });
        }catch (error) {
            console.error('Error al guardar el chequeo:', error);
            res.status(500).json({ message: 'Error al guardar el chequeo' });
        }
    };

    async getChequeosByMantenimiento(req: Request, res: Response) {
        const { mantenimientoId } = req.params;
    
        try {
            const chequeos = await Chequeo.find({
                where: { mantenimiento: { idMantenimiento: Number(mantenimientoId) } },
                relations: ['equipo', 'mantenimiento']
            });
    
            if (!chequeos.length) {
                return res.status(404).json({ message: 'No se encontraron chequeos para el mantenimiento especificado' });
            }
    
            res.status(200).json(chequeos);
        } catch (error) {
            console.error('Error al obtener los chequeos:', error);
            res.status(500).json({ message: 'Error al obtener los chequeos' });
        }
    };
}

export default new ChequeosController();
