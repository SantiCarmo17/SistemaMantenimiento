"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cuentaDantesController_1 = __importDefault(require("../controllers/cuentaDantesController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const rolValidatorMiddleware_1 = __importDefault(require("../middlewares/rolValidatorMiddleware"));
const router = express_1.default.Router();
router.post('/', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR']), cuentaDantesController_1.default.agregarCuentaDante);
router.get('/', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), cuentaDantesController_1.default.listarCuentaDantes);
router.route("/:documento")
    .get(authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'USUARIO DE CONSULTA']), cuentaDantesController_1.default.obtenerCuentaDantesPorDocumento)
    .put(authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR']), cuentaDantesController_1.default.modificarDatosCuentadante);
exports.default = router;
