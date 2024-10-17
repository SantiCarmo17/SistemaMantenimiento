import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { Request, Response } from "express";
import { Equipo } from "../models/equipoModel";
import { CuentaDante } from "../models/cuentaDanteModel";
import { DeepPartial } from "typeorm";
import { validate } from "class-validator";
import { EquipoRow } from "../interfaces/equipo.interface";
import * as XLSX from 'xlsx';


class EquiposController{
    constructor(){
    }

    async agregarEquipo(req: Request, res: Response) {
        try {
            const {
                serial,
                marca,
                referencia,
                fechaCompra,
                placaSena,
                cuentaDante,
                tipoEquipo,
                estado,
                chequeos,
                sede,
                subsede,
                dependencia,
                ambiente,
                mantenimientos
            } = req.body;
    
            //Verificación de equipo con el mismo serial
            const equipoExistente = await Equipo.findOneBy({ serial });
            if (equipoExistente) {
                return res.status(400).json({ error: 'Este Equipo ya está registrado' });
            }
    
            //Verificación de existencia de cuentadante
            const cuentaDanteRegistro = await CuentaDante.findOneBy({ documento: cuentaDante });
            if (!cuentaDanteRegistro) {
                throw new Error('Cuentadante no encontrado');
            }
    
            //Nueva instancia de equipo
            const equipo = new Equipo();
            equipo.serial = serial;
            equipo.marca = marca;
            equipo.referencia = referencia;
            equipo.fechaCompra = fechaCompra;
            equipo.placaSena = placaSena;
            equipo.cuentaDante = cuentaDanteRegistro;
            equipo.tipoEquipo = tipoEquipo;
            equipo.estado = estado;
            equipo.chequeos = chequeos;
            equipo.sede = sede;
            equipo.subsede = subsede;
            equipo.dependencia = dependencia;
            equipo.ambiente = ambiente;
            equipo.mantenimientos = mantenimientos;
    
            //Verificación si hay una imagen en el archivo subido
            if (req.file) {
                equipo.imagenUrl = req.file.path; 
            }
    
            const errors = await validate(equipo);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }
    
            const registro = await Equipo.save(equipo);
            res.status(201).json(registro);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    //Listado de equipos
    async listarEquipos(req: Request, res: Response){
        try {
            const data = await Equipo.find({relations: ['cuentaDante', 'tipoEquipo', 'estado', 'subsede', 'mantenimientos', 'dependencia', 'ambiente', 'chequeos']});

            res.status(200).json(data)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Obtener equipo específcio
    async obtenerEquipoPorSerial(req: Request, res: Response){
        const { serial } = req.params;
        try {
            const registro = await Equipo.findOne({where: {
                serial: serial}, 
                relations: {cuentaDante: true, tipoEquipo: true, subsede: true}
            });
    
            if(!registro){
                throw new Error('Equipo no encontrado')
            }
            res.status(200).json(registro);
        } catch (err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Método para actualizar equipos
    async modificarEquipo(req: Request, res: Response) {
        const { serial } = req.params;
        const { cuentaDante, chequeos, mantenimientos, estados, ...otherFields } = req.body;

        try {
            const equipo = await Equipo.findOne({ where: { serial: serial }, relations: ['cuentaDante', 'tipoEquipo', 'chequeos', 'mantenimientos'] });

            if (!equipo) {
            throw new Error('Equipo no encontrado');
            }

            // Asigna los nuevos valores a las propiedades del equipo
            const equipoModificado: DeepPartial<Equipo> = {
                ...equipo,
                ...otherFields,
                cuentaDante,
                chequeos,
                mantenimientos,
                estados
              };
              

            // Guarda los cambios en la base de datos
            await Equipo.save(equipoModificado);

            const registroActualizado = await Equipo.findOne({
                where: { serial: serial },
                relations: ['cuentaDante', 'tipoEquipo', 'chequeos', 'mantenimientos']
            });

            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async  downloadImage(url: string, filename: string): Promise<string> {
        const filePath = path.join(__dirname, '../../uploads', filename);
    
        // Descargamos la imagen desde la URL
        const response = await axios({
            url,
            responseType: 'stream',
        });
    
        // Guardamos la imagen en la carpeta /uploads
        await new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(filePath);
            response.data.pipe(writeStream);
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });
    
        return filePath; // Devolvemos la ruta de la imagen guardada
    }
    
    async  importarEquipos(req: Request, res: Response) {
        try {
            const file = req.file?.buffer;
    
            if (!file) {
                return res.status(400).json({ message: 'No se subió ningún archivo' });
            }
    
            //Leemos el archivo como un buffer
            const workbook = XLSX.read(file, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
    
            //Convertimos los datos del worksheet a un array de objetos
            const data: EquipoRow[] = XLSX.utils.sheet_to_json(worksheet);
    
            //Iteramos sobre los equipos del archivo Excel
            const equipos: Equipo[] = await Promise.all(
                data.map(async (item) => {
                    let fechaCompra: Date;
    
                    //Verificaciones de fecha
                    if (typeof item.fechaCompra === 'number') {
                        const excelDate = item.fechaCompra;
                        const parsedDate = XLSX.SSF.parse_date_code(excelDate);
                        fechaCompra = new Date(parsedDate.y, parsedDate.m - 1, parsedDate.d);
                    } else if (typeof item.fechaCompra === 'string') {
                        fechaCompra = new Date(item.fechaCompra);
                    } else {
                        fechaCompra = new Date(item.fechaCompra);
                    }
    
                    //Si existe una URL de imagen, descargamos la imagen
                    let imagenUrl = '';
                    if (item.imagenUrl && typeof item.imagenUrl === 'string') {
                        const filename = `${item.serial}-${Date.now()}.jpg`; //Creamos un nombre único para la imagen
                        imagenUrl = await this.downloadImage(item.imagenUrl, filename);
                    }
    
                    //Nueva instancia de equipo
                    return new Equipo({
                        serial: item.serial,
                        marca: item.marca,
                        referencia: item.referencia,
                        fechaCompra: fechaCompra,
                        placaSena: item.placaSena,
                        tipoEquipo: item.tipoEquipo,
                        cuentaDante: item.cuentaDante,
                        sede: item.sede,
                        subsede: item.subsede,
                        dependencia: item.dependencia,
                        ambiente: item.ambiente,
                        imagenUrl, // Guardamos la URL de la imagen
                    });
                })
            );
    
            // Guardamos los equipos en la base de datos
            await Equipo.save(equipos);
    
            res.json({ message: 'Datos importados correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al importar datos' });
        }
    }

    async generarDatosCv(req: Request, res: Response) {
        try {
            const equipos = await Equipo.find({
                select: ['serial', 'marca', 'referencia', 'placaSena']
            })
            
            res.status(200).json(equipos);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async generarDatosCvEspecifico(req: Request, res: Response) {
        const { serial } = req.params; 
    
        try {
            const equipo = await Equipo.findOne({
                where: { serial: serial },
                //select: ['serial', 'marca', 'referencia', 'placaSena', 'fechaCompra'],
                relations: ['cuentaDante', 'mantenimientos', 'mantenimientos.usuario', 'mantenimientos.chequeos.equipo.serial', 'subsede', 'dependencia', 'ambiente', 'tipoEquipo']
            });
    
            if (!equipo) {
                return res.status(404).json({ message: "Equipo no encontrado" });
            }
    
            res.status(200).json(equipo);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    
}

export default new EquiposController();