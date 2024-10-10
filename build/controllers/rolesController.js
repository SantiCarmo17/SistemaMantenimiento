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
const rolModel_1 = require("../models/rolModel");
const usuarioModel_1 = require("../models/usuarioModel");
const conexion_1 = require("../database/conexion");
class RolesController {
    constructor() {
    }
    //Consultar listado de roles
    listarRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield rolModel_1.Rol.find();
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    agregarRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registro = yield rolModel_1.Rol.save(req.body);
                res.status(201).json(registro);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    asociarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario_documento, rol_id } = req.body;
                const usuario = yield usuarioModel_1.Usuario.findOne({ where: { documento: usuario_documento } });
                if (!usuario) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
                const rol = yield rolModel_1.Rol.findOne({ where: { id: rol_id } });
                if (!rol) {
                    return res.status(404).json({ message: 'Rol no encontrado' });
                }
                //Creamos consulta usando un 'QueryBuilder'
                yield conexion_1.AppDataSource.createQueryBuilder()
                    .insert()
                    .into('roles_usuarios')
                    .values({
                    usuario_documento: usuario.documento,
                    rol_id: rol.id
                })
                    .execute();
                res.status(200).json({ message: 'Rol asignado al usuario correctamente' });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    ;
}
exports.default = new RolesController;
