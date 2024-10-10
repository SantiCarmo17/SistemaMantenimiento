import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { Usuario } from "../models/usuarioModel";
import { generarToken } from "../helpers/tokenHelper";
import { validate } from "class-validator";

class AuthController{
    constructor(){

    }


  async registrarUsuario(req: Request, res: Response) {
    try {
      const { documento, nombre, fechaInicio, fechaFin, observaciones, correo, contrasenia, roles, estado } = req.body;
  
      //Verificamos si el usuario ya existe
      const usuarioExistente = await Usuario.findOneBy({ documento });
  
      if (usuarioExistente) {
        return res.status(400).json({ error: "Este usuario ya está registrado" });
      }
  
      //Encriptación de contraseña
      const hashedPassword = bcrypt.hashSync(contrasenia, 10);
  
      //Creamos instancia de Usuario
      const usuario = new Usuario();
      usuario.documento = documento;
      usuario.nombre = nombre;
      usuario.fechaInicio = fechaInicio;
      usuario.fechaFin = fechaFin;
      usuario.observaciones = observaciones;
      usuario.correo = correo;
      usuario.contrasenia = hashedPassword;
      usuario.roles = roles;
      usuario.estado = estado;
  
      //Validamos la instancia de Usuario
      const errors = await validate(usuario);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
  
      const registro = await Usuario.save(usuario);
  
      res.status(201).json(registro);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }
  

    //Login de Usuario
    async loginUsuario(req: Request, res: Response){
      const { correo, contrasenia } = req.body;

      try {
            const usuario = await Usuario.findOne({where: { correo }, relations: {roles: true}});

            if(!usuario){
                return res.status(401).json({ error:'Usuario o Contraseña incorrectos' });
            }
            const contraseniaCorrecta = await bcrypt.compare(contrasenia, usuario.contrasenia);

            if(!contraseniaCorrecta){
                return res.status(401).json({ error: 'Usuario o Contraseña incorrectos' });
            }

            //Llamado al Helper
            const token = generarToken(usuario);

            res.send({
                correo: usuario.correo,
                rol: usuario.roles[0].nombre,
                token
            });

        }catch(err){
            res.status(500).json({ error: 'Ha ocurrido un error en la Autenticación.' })
        }
    }

    async saludar(req: Request, res: Response){
        res.send("Saluditos desde  'ruta-protegida' ");
    }
}

export default new AuthController();