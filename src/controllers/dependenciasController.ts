import { Request, Response } from "express";
import { Sede } from "../models/sedeModel";
import { DeepPartial } from "typeorm";
import { validate } from "class-validator";
import { Dependencia } from "../models/dependenciaModel";

class DependenciasController{
    constructor(){

    }

    //Método para agregar dependencias
    async agregarDependencia(req: Request, res: Response){
        try{
            const { nombre, subsede } = req.body;

            const dependencia = new Dependencia();
            dependencia.nombre = nombre;
            dependencia.subsede = subsede;
            
            const errors = await validate(dependencia);
            if (errors.length > 0) {
              return res.status(400).json({ errors });
            }

            const registro = await Dependencia.save(dependencia);
            res.status(201).json(registro);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async listarDependencias(req: Request, res: Response){
        try{
            const data = await Dependencia.find({relations: {subsede: true, ambientes: true}});
            res.status(200).json(data)
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Método para actualizar Dependencias
    async modificarDependencias(req: Request, res: Response) {
        const { idDependencia } = req.params;
        const { ...otherFields } = req.body;
      
        try {
            const dependencia = await Dependencia.findOne({ where: { idDependencia: Number(idDependencia) } });
    
            if (!dependencia) {
                throw new Error('Dependencia no encontrada');
            }
    
            //Asignamos los nuevos valores a las propiedades del Area
            const dependenciaModificada: DeepPartial<Dependencia> = {
                ...dependencia,
                ...otherFields 
            };
                  
    
            //Guardamos los cambios en la base de datos
            await Dependencia.save(dependenciaModificada);
    
            const registroActualizado = await Dependencia.findOne({
                where: { idDependencia: Number(idDependencia) }
            });
    
            res.status(200).json(registroActualizado);
        } catch (err) {
          console.error('Error al modificar la dependencia:', err);
          if (err instanceof Error) {
            res.status(500).send(err.message);
        }
        }
      }
}

export default new DependenciasController();