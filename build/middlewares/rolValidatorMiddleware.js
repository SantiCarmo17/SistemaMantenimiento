"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const conexion_1 = require("../database/conexion");
const usuarioModel_1 = require("../models/usuarioModel");
//Recibimos un Areglo con los roles permitidos
const validarRol = (rolesPermitidos) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //Accedemos al Request que viene del cuerpo de la solicitud
        const usuario = req.user;
        console.log(usuario);
        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no autenticado.' });
        }
        try {
            //Obtenemos repositorio de usuarios
            const usuarioRepo = conexion_1.AppDataSource.getRepository(usuarioModel_1.Usuario);
            //Obtenemos el usuario con sus roles
            const usuarioConRoles = yield usuarioRepo.findOne({ where: { documento: usuario.documento }, relations: ['roles']
            });
            console.log(usuarioConRoles);
            if (!usuarioConRoles) {
                return res.status(401).json({ error: 'Usuario no encontrado' });
            }
            //Verificamos si el 'usuarioConRoles' tiene al menos uno de los roles permitidos
            const tieneRolPermitido = usuarioConRoles.roles.some(rol => rolesPermitidos.includes(rol.nombre));
            if (!tieneRolPermitido) {
                return res.status(403).json({ error: 'No tiene permiso para acceder a esta ruta' });
            }
            next();
        }
        catch (error) {
            res.status(500).json({ error: 'Error al verificar los roles del usuario' });
        }
    });
};
exports.default = validarRol;
