import { Request, Response } from "express";
import { Usuario } from "../models/usuarioModel";
import { Mantenimiento } from "../models/mantenimientoModel";
import { AppDataSource } from "../database/conexion";
import { Equipo } from "../models/equipoModel";
import { In } from "typeorm";

class MantenimientosController{
    constructor(){
    }

    async agregarMantenimiento(req: Request, res: Response){
        try{
            const { usuario } = req.body;

            //Verificación de que exista el usuario
            const usuarioRegistro = await Usuario.findOneBy({documento: usuario});
            if(!usuarioRegistro){
                throw new Error('Usuario no encontrado')
            }

            const registro = await Mantenimiento.save(req.body);
            res.status(201).json(registro);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async listarMantenimientos(req: Request, res: Response){
        try{
            const data = await Mantenimiento.find({relations: {usuario: true, insumos: true}});
            res.status(200).json(data);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async modificarMantenimiento(req: Request, res: Response){
        const { idMantenimiento } = req.params;
        try{
            const data = await Mantenimiento.findOneBy({idMantenimiento: Number(idMantenimiento)});
            if(!data){
                throw new Error('Mantenimiento no encontrado')
            }

            await Mantenimiento.update({idMantenimiento: Number(idMantenimiento)}, req.body);
            const registroActualizado = await Mantenimiento.findOne({where: {idMantenimiento: Number(idMantenimiento)}, relations: {usuario: true}});

            res.status(200).json(registroActualizado);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Método para asociar equipos a un mantenimiento
    async asociarEquipos(req: Request, res: Response) {
        const { idMantenimiento, equipos } = req.body;

        //Extraemos los seriales de los equipos del JSON
        const equipo_seriales = equipos.map((equipo: { serial: string }) => equipo.serial);
        console.log(equipo_seriales);
        
        //Verificamos existencia del mantenimiento
        const mantenimiento = await Mantenimiento.findOne({ where: { idMantenimiento } });
        if (!mantenimiento) {
            return res.status(404).json({ message: 'Mantenimiento no encontrado' });
        }

        //Verifica existencia de los equipos 
        const equiposEncontrados = await Equipo.find({
            where: {
                serial: In(equipo_seriales)
            }
        });

        //Validamos que el número de 'equiposEncontrados' coincida con el número de seriales
        if (equiposEncontrados.length !== equipo_seriales.length) {
            return res.status(404).json({ message: 'Uno o más equipos no fueron encontrados' });
        }

        //Inserta las relaciones en la tabla mantenimientos_equipos
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        //Hacemos una iteración sobre el arreglo de 'equiposEncontrados' e insertamos el serial de cada equipo en la entidad
        try {
            for (const equipo of equiposEncontrados) {
                await queryRunner.manager.createQueryBuilder()
                    .insert()
                    .into('mantenimientos_equipos')
                    .values({
                        equipo_serial: equipo.serial,
                        mantenimiento_id: mantenimiento.idMantenimiento,
                    })
                    .execute();
            }

            await queryRunner.commitTransaction();
            return res.status(201).json({ message: 'Equipos asociados correctamente' });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error(error);
            return res.status(500).json({ message: 'Error al asociar equipos', error });
        } finally {
            await queryRunner.release();
        }
    }
}

export default new MantenimientosController();