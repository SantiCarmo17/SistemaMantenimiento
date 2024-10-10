import express from 'express'
import sedesController from '../controllers/sedesController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), sedesController.listarSedes);

router.post('/', verificarToken, validarRol(['ADMINISTRADOR']), sedesController.agregarSede);

router.put('/:idSede', verificarToken, validarRol(['ADMINISTRADOR']), sedesController.modificarSedes);

export default router;