import { Request, Response } from "express";
import { Usuario } from "../models/usuarioModel";
import { Estado } from "../models/estadoModel";
import { DeepPartial } from "typeorm";
import { transporter } from "../helpers/emailHelper";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';


import dotenv from 'dotenv';

dotenv.config();

class UsuariosController {
    constructor(){

    }

    //Listado de usuarios del sistema
    async listarUsuarios(req: Request, res:Response) {
        try {
            const data = await Usuario.find({relations: {roles:true, estado: true}});
            res.status(200).json(data)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Obtener Usuario específcio
    async obtenerUsuarioPorDocumento(req: Request, res: Response){
        const { documento } = req.params;
        try {
            const data = await Usuario.findOneBy({documento: Number(documento)});
            if(!data){
                throw new Error('Usuario no encontrado');
            }
            res.status(200).json(data);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
    
    async modificarDatosUsuario(req: Request, res: Response){
        const { documento } = req.params;
        const { estado, ...otherFields } = req.body;

        try {
            const usuario = await Usuario.findOne({ where: { documento: Number(documento) }, relations: ['estado'] });

            if (!usuario) {
            throw new Error('usuario no encontrado');
            }

            // Asigna los nuevos valores a las propiedades del usuario
            const usuarioModificado: DeepPartial<Usuario> = {
                ...usuario,
                ...otherFields,
                estado
              };
              

            // Guarda los cambios en la base de datos
            await Usuario.save(usuarioModificado);

            const registroActualizado = await Usuario.findOne({
                where: { documento: Number(documento) },
                relations: ['estado']
            });

            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    //Actualizar estado del Usuario
    async actualizarEstadoUsuario(req: Request, res: Response) {
        const { documento } = req.params;
    
        try {
            const usuario = await Usuario.findOne({ where: { documento: Number(documento) }, relations: ["estado"] });
    
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            const nuevoEstadoValor = !usuario.estado.estado;
            let nuevoEstado = await Estado.findOne({ where: { estado: nuevoEstadoValor } });
    
            if (!nuevoEstado) {
                nuevoEstado = Estado.create({ estado: nuevoEstadoValor });
                await Estado.save(nuevoEstado);
            }
    
            // Actualizo usuario con el nuevo estado
            usuario.estado = nuevoEstado;
            const usuarioActualizado = await Usuario.save(usuario);
    
            return res.status(200).json(usuarioActualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }    

    async obtenerRolUsuario(req: Request, res: Response){
        try {
            const { documento } = req.params;
            const usuario = await Usuario.findOne({ where: {documento : Number(documento)}, relations: ['roles'] });
    
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            //Seleccionamos primer rol del usuario
            const rol = usuario.roles.length > 0 ? usuario.roles[0].nombre : null;
    
            res.json({ rol });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el rol del usuario', error });
        }    
    }

    async enviarCorreoRecuperación(req: Request, res: Response){
        const { correo } = req.body;

        try{
            const usuario = await Usuario.findOne({ where: { correo } });
            if (!usuario){ 
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const token = jwt.sign({ userId: usuario.documento }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            usuario.tokenRestablecerContrasenia = token;
            usuario.tokenRestablecerExpiracion = new Date(Date.now() + 3600000);
            await usuario.save();

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: usuario.correo,
                subject: 'Restablecimiento de contraseña',
                html: `
                <h2>Hola ${usuario.nombre},</h2>
                    <p>Haz clic en el siguiente enlace para cambiar tu contraseña en el sistema de gestión:</p>
                    <a href="https://mantenimiento-front.vercel.app/usuarios/recuperar-contraseña/${token}">Restablecer contraseña</a>
                `
            };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ message: 'Error al enviar el correo' });
                } else {
                    res.json({ message: 'Se ha enviado un email de restablecimiento' });
                }
            });
    
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async restablecerContrasenia(req: Request, res: Response){
        const { token } = req.params;
        const { password } = req.body;

        try{
            const tokenDecod = jwt.verify(token, process.env.JWT_SECRET as string);

            const usuario = await Usuario.findOneBy({ tokenRestablecerContrasenia: token });

            if(!usuario){
                return res.status(400).json({ message: 'Token inválido o expirado' });
            }

            const salt = await bcrypt.genSalt(10);
            const contraseniaCifrada = await bcrypt.hash(password, salt);

            usuario.contrasenia = contraseniaCifrada;
            
            usuario.tokenRestablecerContrasenia = '';

            res.json({ message: 'Contraseña actualizada correctamente' });

            await usuario.save();
        }catch(error){
            console.error(error);
            res.status(400).json({ message: 'Error en el sistema' });
        }
    }
}

export default new UsuariosController();