"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const usuarioModel_1 = require("../models/usuarioModel");
const tokenHelper_1 = require("../helpers/tokenHelper");
const class_validator_1 = require("class-validator");
class AuthController {
    constructor() {
    }
    registrarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { documento, nombre, fechaInicio, fechaFin, observaciones, correo, contrasenia, roles, estado } = req.body;
                //Verificamos si el usuario ya existe
                const usuarioExistente = yield usuarioModel_1.Usuario.findOneBy({ documento });
                if (usuarioExistente) {
                    return res.status(400).json({ error: "Este usuario ya está registrado" });
                }
                //Encriptación de contraseña
                const hashedPassword = bcrypt.hashSync(contrasenia, 10);
                //Creamos instancia de Usuario
                const usuario = new usuarioModel_1.Usuario();
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
                const errors = yield (0, class_validator_1.validate)(usuario);
                if (errors.length > 0) {
                    return res.status(400).json({ errors });
                }
                const registro = yield usuarioModel_1.Usuario.save(usuario);
                res.status(201).json(registro);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    //Login de Usuario
    loginUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, contrasenia } = req.body;
            try {
                const usuario = yield usuarioModel_1.Usuario.findOne({ where: { correo }, relations: { roles: true } });
                if (!usuario) {
                    return res.status(401).json({ error: 'Usuario o Contraseña incorrectos' });
                }
                const contraseniaCorrecta = yield bcrypt.compare(contrasenia, usuario.contrasenia);
                if (!contraseniaCorrecta) {
                    return res.status(401).json({ error: 'Usuario o Contraseña incorrectos' });
                }
                //Llamado al Helper
                const token = (0, tokenHelper_1.generarToken)(usuario);
                res.send({
                    correo: usuario.correo,
                    rol: usuario.roles[0].nombre,
                    token
                });
            }
            catch (err) {
                res.status(500).json({ error: 'Ha ocurrido un error en la Autenticación.' });
            }
        });
    }
    saludar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send("Saluditos desde  'ruta-protegida' ");
        });
    }
}
exports.default = new AuthController();
