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
//Recibimos un arreglo con los roles permitidos
const validarEstado = (estadoPermitido) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { correo } = req.body;
        try {
            //Obtenemos repositorio de usuarios
            const usuarioRepo = conexion_1.AppDataSource.getRepository(usuarioModel_1.Usuario);
            //Obtenemos el usuario con su estado
            const usuarioConEstado = yield usuarioRepo.findOne({
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
        }
        catch (error) {
            console.error('Error al verificar estado del usuario:', error);
            res.status(500).json({ error: 'Error al verificar estado del usuario' });
        }
    });
};
exports.default = validarEstado;
