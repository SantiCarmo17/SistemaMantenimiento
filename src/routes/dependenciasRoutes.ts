import express from 'express'
import dependenciasController from '../controllers/dependenciasController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), dependenciasController.listarDependencias);

router.post('/', verificarToken, validarRol(['ADMINISTRADOR']), dependenciasController.agregarDependencia);

router.put('/:idDependencia', verificarToken, validarRol(['ADMINISTRADOR']), dependenciasController.modificarDependencias);

export default router;