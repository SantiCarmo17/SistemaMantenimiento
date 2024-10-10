import { Request, Response } from "express";
import { Usuario } from "../models/usuarioModel";
import { Mantenimiento } from "../models/mantenimientoModel";
import { AppDataSource } from "../database/conexion";
import { Equipo } from "../models/equipoModel";
import { DeepPartial, In } from "typeorm";
import { validate } from "class-validator";
import xlsx from 'xlsx';

class MantenimientosController{
    constructor(){
    }

    async agregarMantenimiento(req: Request, res: Response){
        try{
            const { objetivo, tipoMantenimiento, fechaProxMantenimiento, fechaUltimoMantenimiento, usuario, equipos, chequeosMantenimiento } = req.body;

            //Verificación de que exista el usuario
            const usuarioRegistro = await Usuario.findOneBy({documento: usuario});
            if(!usuarioRegistro){
                throw new Error('Usuario no encontrado')
            }

            const mantenimiento = new Mantenimiento();
            mantenimiento.objetivo = objetivo;
            mantenimiento.tipoMantenimiento = tipoMantenimiento;
            mantenimiento.fechaProxMantenimiento = fechaProxMantenimiento;
            mantenimiento.fechaUltimoMantenimiento = fechaUltimoMantenimiento;
            mantenimiento.usuario = usuario;
            mantenimiento.equipos = equipos;

            const errors = await validate(mantenimiento);
            if (errors.length > 0) {
              return res.status(400).json({ errors });
            }

            const registro = await Mantenimiento.save(mantenimiento);
            res.status(201).json(registro);
        }catch(err){
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }


    async listarMantenimientos(req: Request, res: Response) {
        try {
            const usuario = (req as any).user; //Extraemos la información del usuario desde el token
            console.log(usuario);
    
            let mantenimientos;
    
            //Verificamos si el rol del usuario es 'TÉCNICO EN CAMPO'
            if (usuario.rol === 'TÉCNICO EN CAMPO') {
                //Filtramos los mantenimientos por el correo del usuario que inició sesión
                mantenimientos = await Mantenimiento.find({
                    where: { usuario: { correo: usuario.correo } },
                    relations: [
                        'equipos', 'usuario', 'chequeos', 
                        'equipos.cuentaDante', 'equipos.tipoEquipo', 'equipos.subsede',
                        'equipos.estado', 'equipos.chequeos', 'equipos.chequeos.equipo', 'equipos.subsede', 'chequeos.equipo'
                    ]
                });
            } else {
                // Si el usuario no es 'TÉCNICO EN CAMPO', listamos todos los mantenimientos
                mantenimientos = await Mantenimiento.find({
                    relations: [
                        'equipos', 'usuario', 'chequeos', 
                        'equipos.cuentaDante', 'equipos.tipoEquipo', 'equipos.subsede',
                        'equipos.estado', 'equipos.chequeos', 'equipos.subsede', 'chequeos.equipo'
                    ]
                });
            }
    
            res.status(200).json(mantenimientos);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    

    async modificarInfoMantenimiento(req: Request, res: Response) {
        const { idMantenimiento } = req.params;
        const { usuario, equipos, chequeos, chequeosMantenimiento, ...otherFields } = req.body;

        try {
            const mantenimiento = await Mantenimiento.findOne({where: {idMantenimiento: Number(idMantenimiento)}, relations: ['usuario', 'chequeos']});

            if(!mantenimiento){
                throw new Error('Mantenimiento no encontrado');
            }

            const mantenimientoModificado: DeepPartial<Mantenimiento> = {
                ...mantenimiento,
                ...otherFields,
                usuario,
                equipos,
                chequeos,
                chequeosMantenimiento
            };

            await Mantenimiento.save(mantenimientoModificado);

            const registroActualizado = await Mantenimiento.findOne({where: { idMantenimiento: Number(idMantenimiento) }, relations: ['usuario']
            });

            res.status(200).json(registroActualizado);
        } catch (err) {
            if(err instanceof Error) {
                res.status(500)
            }
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

    async listarEquiposAsociadosMantenimiento(req: Request, res: Response){
        const { idMantenimiento } = req.params;

        try {
          const mantenimiento = await AppDataSource.getRepository(Mantenimiento).findOne({
            where: { idMantenimiento: parseInt(idMantenimiento) },
            relations: ['equipos', 'equipos.cuentaDante', 'equipos.tipoEquipo', 'equipos.estado', 'equipos.chequeos', 'equipos.subsede', 'equipos.chequeos.mantenimiento','equipos.mantenimientos'],
          });
      
          if (!mantenimiento) {
            return res.status(404).json({ message: 'Mantenimiento no encontrado' });
          }
      
          res.json(mantenimiento.equipos); 
        } catch (error) {
          console.error('Error al obtener los equipos:', error);
          res.status(500).json({ message: 'Error al obtener los equipos' });
        }      
    }

    async generarInforme(req: Request, res: Response){
        try {
            //Consultamos a la base de datos
            const data = await Mantenimiento.find();
        
            //Convertimos los datos a formato de hoja de cálculo
            const worksheet = xlsx.utils.json_to_sheet(data);
            const workbook = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');
        
            //Generamos el archivo Excel
            xlsx.writeFile(workbook, 'report.xlsx');
        
            //Enviamos el archivo al cliente
            res.download('report.xlsx');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al generar el informe');
        }
    }

    async generarInformeEspecifico(req: Request, res: Response) {
        const { idMantenimiento } = req.params;
      
        try {
          const mantenimiento = await Mantenimiento.findOne({
            where: { idMantenimiento: Number(idMantenimiento) },
            relations: { equipos: true },
          });
      
          if (!mantenimiento) {
            return res.status(404).send('Mantenimiento no encontrado');
          }
      
          // Función auxiliar para aplanar los datos (si es necesario)
          function aplanarDatos(data: Mantenimiento) {
            const datosAplanados: any[] = []; // Ajusta el tipo según tus necesidades
            // Lógica para aplanar los datos, por ejemplo:
            datosAplanados.push({
              // Propiedades del mantenimiento
              idMantenimiento: data.idMantenimiento,
              objetivo: data.objetivo,
              // ...
            });
            data.equipos.forEach(equipo => {
              datosAplanados.push({
                // Propiedades del equipo
                serial: equipo.serial,
                // ...
              });
            });
            return datosAplanados;
          }
      
          const datosAplanados = aplanarDatos(mantenimiento);
      
          //Crear la hoja de cálculo con las columnas deseadas
          const worksheet = xlsx.utils.json_to_sheet(datosAplanados, {
            skipHeader: true,
          });
          //Agregar encabezados personalizados
          const headers = ['ID Mantenimiento', 'Fecha', 'Nombre Equipo', '...'];
          worksheet['!ref'] = `A1:${String.fromCharCode(65 + headers.length - 1)}${datosAplanados.length + 1}`;
          worksheet['1'] = headers;
      
          //Resto del código para generar el archivo Excel
          const workbook = xlsx.utils.book_new();
          xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');
          xlsx.writeFile(workbook, 'report.xlsx');
          res.download('report.xlsx');
        } catch (err) {
          if (err instanceof Error) {
            res.status(500).send(err.message);
          }
        }
    }
}

export default new MantenimientosController();