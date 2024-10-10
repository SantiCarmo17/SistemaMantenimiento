import express from 'express'
import ambientesController from '../controllers/ambientesController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), ambientesController.listarAmbientes);

router.post('/', verificarToken, validarRol(['ADMINISTRADOR']), ambientesController.agregarAmbiente);

router.put('/:idAmbiente', verificarToken, validarRol(['ADMINISTRADOR']), ambientesController.modificarAmbientes);

export default router;