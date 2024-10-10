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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuarioModel_1 = require("../models/usuarioModel");
const estadoModel_1 = require("../models/estadoModel");
const emailHelper_1 = require("../helpers/emailHelper");
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UsuariosController {
    constructor() {
    }
    //Listado de usuarios del sistema
    listarUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield usuarioModel_1.Usuario.find({ relations: { roles: true, estado: true } });
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    //Obtener Usuario específcio
    obtenerUsuarioPorDocumento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { documento } = req.params;
            try {
                const data = yield usuarioModel_1.Usuario.findOneBy({ documento: Number(documento) });
                if (!data) {
                    throw new Error('Usuario no encontrado');
                }
                res.status(200).json(data);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(500).send(err.message);
            }
        });
    }
    modificarDatosUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { documento } = req.params;
            const _a = req.body, { estado } = _a, otherFields = __rest(_a, ["estado"]);
            try {
                const usuario = yield usuarioModel_1.Usuario.findOne({ where: { documento: Number(documento) }, relations: ['estado'] });
                if (!usuario) {
                    throw new Error('usuario no encontrado');
                }
                // Asigna los nuevos valores a las propiedades del usuario
                const usuarioModificado = Object.assign(Object.assign(Object.assign({}, usuario), otherFields), { estado });
                // Guarda los cambios en la base de datos
                yield usuarioModel_1.Usuario.save(usuarioModificado);
                const registroActualizado = yield usuarioModel_1.Usuario.findOne({
                    where: { documento: Number(documento) },
                    relations: ['estado']
                });
                res.status(200).json(registroActualizado);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    //Actualizar estado del Usuario
    actualizarEstadoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { documento } = req.params;
            try {
                const usuario = yield usuarioModel_1.Usuario.findOne({ where: { documento: Number(documento) }, relations: ["estado"] });
                if (!usuario) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                const nuevoEstadoValor = !usuario.estado.estado;
                let nuevoEstado = yield estadoModel_1.Estado.findOne({ where: { estado: nuevoEstadoValor } });
                if (!nuevoEstado) {
                    nuevoEstado = estadoModel_1.Estado.create({ estado: nuevoEstadoValor });
                    yield estadoModel_1.Estado.save(nuevoEstado);
                }
                // Actualizo usuario con el nuevo estado
                usuario.estado = nuevoEstado;
                const usuarioActualizado = yield usuarioModel_1.Usuario.save(usuario);
                return res.status(200).json(usuarioActualizado);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    obtenerRolUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { documento } = req.params;
                const usuario = yield usuarioModel_1.Usuario.findOne({ where: { documento: Number(documento) }, relations: ['roles'] });
                if (!usuario) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
                //Seleccionamos primer rol del usuario
                const rol = usuario.roles.length > 0 ? usuario.roles[0].nombre : null;
                res.json({ rol });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener el rol del usuario', error });
            }
        });
    }
    enviarCorreoRecuperación(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo } = req.body;
            try {
                const usuario = yield usuarioModel_1.Usuario.findOne({ where: { correo } });
                if (!usuario) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
                const token = jwt.sign({ userId: usuario.documento }, process.env.JWT_SECRET, { expiresIn: '1h' });
                usuario.tokenRestablecerContrasenia = token;
                usuario.tokenRestablecerExpiracion = new Date(Date.now() + 3600000);
                yield usuario.save();
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
                emailHelper_1.transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({ message: 'Error al enviar el correo' });
                    }
                    else {
                        res.json({ message: 'Se ha enviado un email de restablecimiento' });
                    }
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        });
    }
    restablecerContrasenia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const { password } = req.body;
            try {
                const tokenDecod = jwt.verify(token, process.env.JWT_SECRET);
                const usuario = yield usuarioModel_1.Usuario.findOneBy({ tokenRestablecerContrasenia: token });
                if (!usuario) {
                    return res.status(400).json({ message: 'Token inválido o expirado' });
                }
                const salt = yield bcrypt.genSalt(10);
                const contraseniaCifrada = yield bcrypt.hash(password, salt);
                usuario.contrasenia = contraseniaCifrada;
                usuario.tokenRestablecerContrasenia = '';
                res.json({ message: 'Contraseña actualizada correctamente' });
                yield usuario.save();
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ message: 'Error en el sistema' });
            }
        });
    }
}
exports.default = new UsuariosController();
