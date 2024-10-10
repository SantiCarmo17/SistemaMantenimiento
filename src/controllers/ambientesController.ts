import { Request, Response } from "express";
import { Ambiente } from "../models/ambienteModel";
import { validate } from "class-validator";
import { DeepPartial } from "typeorm";

class AmbientesController{
    constructor(){

    }

    //Método para agregar Ambientes
    async agregarAmbiente(req: Request, res: Response){
        try{
            const { nombre, dependencia } = req.body;

            const ambiente = new Ambiente();
            ambiente.nombre = nombre;
            ambiente.dependencia = dependencia;

            const errors = await validate(ambiente);
            if (errors.length > 0) {
              return res.status(400).json({ errors });
            }

            const registro = await Ambiente.save(ambiente);
            res.status(201).json(registro);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Método para listar ambientes
    async listarAmbientes(req: Request, res: Response){
        try{
            const data = await Ambiente.find({ relations: {dependencia: true, equipos: true} })
            res.status(200).json(data)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Método para actualizar Ambientes
    async modificarAmbientes(req: Request, res: Response) {
        const { idAmbiente } = req.params;
        const { ...otherFields } = req.body;
        
        try {
            const ambiente = await Ambiente.findOne({ where: { idAmbiente: Number(idAmbiente) } });
        
            if (!ambiente) {
                throw new Error('Ambiente no encontrado');
            }
        
            //Asignamos los nuevos valores a las propiedades de la sede
            const ambienteModificado: DeepPartial<Ambiente> = {
                ...ambiente,
                ...otherFields                 
            };
                      
        
            //Guardamos los cambios en la base de datos
            await Ambiente.save(ambienteModificado);
        
            const registroActualizado = await Ambiente.findOne({
                where: { idAmbiente: Number(idAmbiente) }
            });
        
            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new AmbientesController();