"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tipoEquiposController_1 = __importDefault(require("../controllers/tipoEquiposController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const rolValidatorMiddleware_1 = __importDefault(require("../middlewares/rolValidatorMiddleware"));
const router = express_1.default.Router();
router.get('/', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), tipoEquiposController_1.default.listarTipoEquipos);
router.post('/', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR']), tipoEquiposController_1.default.agregarTipoEquipo);
router.put('/:id', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR']), tipoEquiposController_1.default.modificarTipo);
exports.default = router;
