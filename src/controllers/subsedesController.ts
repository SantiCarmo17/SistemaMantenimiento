import { Request, Response } from "express";
import { Subsede } from "../models/subsedeModel";
import { DeepPartial } from "typeorm";
import { validate } from "class-validator";

class SubsedeController{
    constructor(){

    }

    async agregarSubsede(req: Request, res: Response){
        try{
            const { nombre, equipos, sede, dependencias } = req.body;

            const subsede = new Subsede();
            subsede.nombre = nombre;
            subsede.equipos = equipos;
            subsede.sede = sede;
            subsede.dependencias = dependencias;
            
            const errors = await validate(subsede);
            if (errors.length > 0) {
              return res.status(400).json({ errors });
            }

            const registro = await Subsede.save(subsede);
            res.status(201).json(registro);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async listarSubsedes(req: Request, res: Response){
        try{
            const data = await Subsede.find({ relations: {sede: true, equipos: true, dependencias: true} });
            res.status(200).json(data)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Método para actualizar Subsedes
    async modificarSubsedes(req: Request, res: Response) {
        const { idSubsede } = req.params;
        const { ...otherFields } = req.body;
    
        try {
            const subsede = await Subsede.findOne({ where: { idSubsede: Number(idSubsede) } });
    
            if (!subsede) {
                throw new Error('Subsede no encontrado');
            }
    
            //Asignamos los nuevos valores a las propiedades del Area
            const subsedeModificada: DeepPartial<Subsede> = {
                ...subsede,
                ...otherFields 
            };
                  
    
            //Guardamos los cambios en la base de datos
            await Subsede.save(subsedeModificada);
    
            const registroActualizado = await Subsede.findOne({
                where: { idSubsede: Number(idSubsede) }
            });
    
            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new SubsedeController();