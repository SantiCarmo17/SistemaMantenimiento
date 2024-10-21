"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const equiposController_1 = __importDefault(require("../controllers/equiposController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const rolValidatorMiddleware_1 = __importDefault(require("../middlewares/rolValidatorMiddleware"));
const multerMiddleware_1 = require("../middlewares/multerMiddleware");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const router = express_1.default.Router();
router.post('/', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR']), multerMiddleware_1.uploadImage.single('image'), equiposController_1.default.agregarEquipo);
router.post('/importar', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR']), upload.single('excelEquipos'), equiposController_1.default.importarEquipos);
router.get('/', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), equiposController_1.default.listarEquipos);
router.get('/equiposCV/:serial', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), equiposController_1.default.generarDatosCvEspecifico);
router.route("/:serial")
    .get(authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), equiposController_1.default.obtenerEquipoPorSerial)
    .put(authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR']), equiposController_1.default.modificarEquipo);
exports.default = router;
