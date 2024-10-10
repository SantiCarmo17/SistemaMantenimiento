import { Request, Response } from "express";
import { Sede } from "../models/sedeModel";
import { DeepPartial } from "typeorm";
import { validate } from "class-validator";

class SedesController{
    constructor(){

    }

    //Método para agregar sedes
    async agregarSede(req: Request, res: Response){
        try{
            const { nombre, equipos, subsedes } = req.body;

            const sede = new Sede();
            sede.nombre = nombre;
            sede.equipos = equipos;
            sede.subsedes = subsedes;
            
            const errors = await validate(sede);
            if (errors.length > 0) {
              return res.status(400).json({ errors });
            }

            const registro = await Sede.save(sede);
            res.status(201).json(registro);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async listarSedes(req: Request, res: Response){
        try{
            const data = await Sede.find();
            res.status(200).json(data)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Método para actualizar Sedes
    async modificarSedes(req: Request, res: Response) {
        const { idSede } = req.params;
        const { ...otherFields } = req.body;
    
        try {
            const sede = await Sede.findOne({ where: { idSede: Number(idSede) } });
    
            if (!sede) {
                throw new Error('Sede no encontrado');
            }
    
            //Asignamos los nuevos valores a las propiedades de la sede
            const sedeModificada: DeepPartial<Sede> = {
                ...sede,
                ...otherFields 
            };
                  
    
            //Guardamos los cambios en la base de datos
            await Sede.save(sedeModificada);
    
            const registroActualizado = await Sede.findOne({
                where: { idSede: Number(idSede) }
            });
    
            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new SedesController();