import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database/conexion";
import { Usuario } from "../models/usuarioModel";

//Recibimos un arreglo con los roles permitidos
const validarEstado = (estadoPermitido: boolean) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { correo } = req.body;

        try {
            //Obtenemos repositorio de usuarios
            const usuarioRepo = AppDataSource.getRepository(Usuario);

            //Obtenemos el usuario con su estado
            const usuarioConEstado = await usuarioRepo.findOne({
                where: { correo },
                relations: ['estado']
            });

            if (!usuarioConEstado) {
                return res.status(401).json({ error: 'Usuario no encontrado' });
            }

            const tieneEstadoPermitido = usuarioConEstado.estado.estado === estadoPermitido;
            
            if (!tieneEstadoPermitido) {
                return res.status(403).json({ error: 'Usted se encuentra desactivado en el sistema' });
            }

            next();
        } catch (error) {
            console.error('Error al verificar estado del usuario:', error);
            res.status(500).json({ error: 'Error al verificar estado del usuario' });
        }
    };
};

export default validarEstado;
