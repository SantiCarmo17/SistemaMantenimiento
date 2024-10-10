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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
//Middleware para validar Token
const verificarToken = (req, res, next) => {
    //Obtenemos la autorización (Headers)
    const authorization = req.get('authorization');
    let token = '';
    //Definimos el Token
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado o  es inválido' });
    }
    //Decodificamos el Token obtenido de la 'authorization'
    try {
        const decodedToken = jwt.verify(token, 'Token-Auth');
        console.log(decodedToken);
        req.user = decodedToken; //Asigno el Payload al req.user y esto hace que la información del usuario esté disponible en el objeto de solicitud req para los siguientes middlewares y controladores (Mucho texto, pero esta parte debe quedar clara 😅)
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Token inválido o ha expirado' });
    }
};
exports.default = verificarToken;
