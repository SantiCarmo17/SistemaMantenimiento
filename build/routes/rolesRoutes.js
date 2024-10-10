"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Generamos una sección de rutas
const express_1 = __importDefault(require("express"));
const rolesController_1 = __importDefault(require("../controllers/rolesController"));
const router = express_1.default.Router();
//Ruta GET para los Roles
router.get('/', rolesController_1.default.listarRoles);
//Ruta POST para los Roles
router.post('/', rolesController_1.default.agregarRol);
//Ruta POST para los Asociar usuarios
router.post('/asociaUsuarios', rolesController_1.default.asociarUsuario);
exports.default = router;
