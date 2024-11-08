import { Request, Response } from "express";
import { CuentaDante } from "../models/cuentaDanteModel";
import { DeepPartial } from "typeorm";
import { validate } from "class-validator";

class PropietariosController{
    constructor(){
    }

    //Método para agregar Cuentadante
    async agregarCuentaDante(req: Request, res: Response){
        try {
            const { documento, nombre, dependencia, departamento, tipoContrato, equipos, estado } = req.body;

            const cuentadante = new CuentaDante();
            cuentadante.documento = documento;
            cuentadante.nombre = nombre;
            cuentadante.dependencia = dependencia;
            cuentadante.departamento = departamento;
            cuentadante.tipoContrato = tipoContrato;
            cuentadante.equipos = equipos;
            cuentadante.estado = estado;

            const errors = await validate(cuentadante);
            if (errors.length > 0) {
              return res.status(400).json({ errors });
            }

            //Verificación existencia del propietario
            const cuentaDanteExistente = await CuentaDante.findOneBy({documento : documento});
            if(cuentaDanteExistente){
                return res.status(400).json({ error: 'Este CuentaDante ya está registrado' });
            }

            const registro = await CuentaDante.save(req.body);

            res.status(201).json(registro);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Listado de Propietarios
    async listarCuentaDantes(req: Request, res: Response){
        try {
            const data = await CuentaDante.find({relations: {equipos: true, estado: true}});

            res.status(200).json(data);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Obtener propietario específcio
    async obtenerCuentaDantesPorDocumento(req: Request, res: Response){
        const { documento } = req.params;
        try {
            const data = await CuentaDante.findOneBy({documento: Number(documento)});
            if(!data){
                throw new Error('CuentaDante no encontrado');
            }
            res.status(200).json(data);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async modificarDatosCuentadante(req: Request, res: Response) {
        const { documento } = req.params;
        const {estado, ...otherFields } = req.body;

        try {
            const cuentadante = await CuentaDante.findOne({ where: { documento: Number(documento) }, relations: ['estado'] });

            if (!cuentadante) {
            throw new Error('Cuentadante no encontrado');
            }

            // Asigna los nuevos valores a las propiedades del cuentadante
            const cuentadanteModificado: DeepPartial<CuentaDante> = {
                ...cuentadante,
                ...otherFields,
                estado
            };
              

            // Guarda los cambios en la base de datos
            await CuentaDante.save(cuentadanteModificado);

            const registroActualizado = await CuentaDante.findOne({
                where: { documento: Number(documento) }
            });

            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new PropietariosController();