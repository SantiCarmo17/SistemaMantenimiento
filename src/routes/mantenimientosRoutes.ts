import express from 'express';
import mantenimientosController from '../controllers/mantenimientosController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), mantenimientosController.listarMantenimientos);

router.get('/:idMantenimiento/equipos', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), mantenimientosController.listarEquiposAsociadosMantenimiento)

router.post('/', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO']), mantenimientosController.agregarMantenimiento);

router.post('/asociaEquipos', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO']), mantenimientosController.asociarEquipos);

router.get('/informe', verificarToken, validarRol(['ADMINISTRADOR']), mantenimientosController.generarInforme);

router.route("/:idMantenimiento")
    .put(verificarToken, validarRol(['ADMINISTRADOR']), mantenimientosController.modificarInfoMantenimiento)

export default router