import express from 'express';
import equiposController from '../controllers/equiposController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/', verificarToken, validarRol(['ADMINISTRADOR']), equiposController.agregarEquipo);

router.post('/importar', verificarToken, validarRol(['ADMINISTRADOR']), upload.single('excelEquipos'),equiposController.importarEquipos);

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), equiposController.listarEquipos);

router.get('/equiposCV', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), equiposController.generarDatosCv);

router.get('/equiposCV/:serial', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), equiposController.generarDatosCvEspecifico);

router.route("/:serial")
    .get(verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), equiposController.obtenerEquipoPorSerial)
    .put(verificarToken, validarRol(['ADMINISTRADOR']), equiposController.modificarEquipo);
    



export default router;