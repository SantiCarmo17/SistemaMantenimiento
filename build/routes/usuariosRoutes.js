"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Generamos una sección de rutas
const express_1 = __importDefault(require("express"));
const usuariosController_1 = __importDefault(require("../controllers/usuariosController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const rolValidatorMiddleware_1 = __importDefault(require("../middlewares/rolValidatorMiddleware"));
const router = express_1.default.Router();
//Ruta GET para los usuarios
router.get('/', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'USUARIO DE CONSULTA', 'TÉCNICO EN CAMPO']), usuariosController_1.default.listarUsuarios);
router.put('/:documento/estado', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'USUARIO DE CONSULTA']), usuariosController_1.default.actualizarEstadoUsuario);
router.post('/recuperar-contrasenia', usuariosController_1.default.enviarCorreoRecuperación);
router.post('/recuperar-contrasenia/:token', usuariosController_1.default.restablecerContrasenia);
router.route("/:documento")
    .get(authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'USUARIO DE CONSULTA']), usuariosController_1.default.obtenerRolUsuario)
    .put(authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR']), usuariosController_1.default.modificarDatosUsuario);
exports.default = router;
