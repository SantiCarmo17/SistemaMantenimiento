"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mantenimientosController_1 = __importDefault(require("../controllers/mantenimientosController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const rolValidatorMiddleware_1 = __importDefault(require("../middlewares/rolValidatorMiddleware"));
const router = express_1.default.Router();
router.get('/', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), mantenimientosController_1.default.listarMantenimientos);
router.get('/:idMantenimiento/equipos', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), mantenimientosController_1.default.listarEquiposAsociadosMantenimiento);
router.post('/', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'TÉCNICO EN CAMPO']), mantenimientosController_1.default.agregarMantenimiento);
router.post('/asociaEquipos', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'TÉCNICO EN CAMPO']), mantenimientosController_1.default.asociarEquipos);
router.get('/informe', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR']), mantenimientosController_1.default.generarInforme);
router.route("/:idMantenimiento")
    .put(authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR']), mantenimientosController_1.default.modificarInfoMantenimiento);
exports.default = router;
