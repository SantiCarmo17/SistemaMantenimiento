"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ambientesController_1 = __importDefault(require("../controllers/ambientesController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const rolValidatorMiddleware_1 = __importDefault(require("../middlewares/rolValidatorMiddleware"));
const router = express_1.default.Router();
router.get('/', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), ambientesController_1.default.listarAmbientes);
router.post('/', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR']), ambientesController_1.default.agregarAmbiente);
router.put('/:idAmbiente', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR']), ambientesController_1.default.modificarAmbientes);
exports.default = router;
