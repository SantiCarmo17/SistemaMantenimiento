import express from 'express'
import subsedeController from '../controllers/subsedesController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), subsedeController.listarSubsedes);

router.post('/', verificarToken, validarRol(['ADMINISTRADOR']), subsedeController.agregarSubsede);

router.put('/:idSubsede', verificarToken, validarRol(['ADMINISTRADOR']), subsedeController.modificarSubsedes);

export default router;