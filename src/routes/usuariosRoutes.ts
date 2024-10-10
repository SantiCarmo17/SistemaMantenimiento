//Generamos una sección de rutas
import express from 'express';
import usuariosController from '../controllers/usuariosController'
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';
const router = express.Router();

//Ruta GET para los usuarios
router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'USUARIO DE CONSULTA', 'TÉCNICO EN CAMPO']), usuariosController.listarUsuarios);

router.put('/:documento/estado', verificarToken, validarRol(['ADMINISTRADOR', 'USUARIO DE CONSULTA']), usuariosController.actualizarEstadoUsuario);

router.post('/recuperar-contrasenia', usuariosController.enviarCorreoRecuperación);

router.post('/recuperar-contrasenia/:token', usuariosController.restablecerContrasenia);

router.route("/:documento")
    .get(verificarToken, validarRol(['ADMINISTRADOR', 'USUARIO DE CONSULTA']), usuariosController.obtenerRolUsuario)
    .put(verificarToken, validarRol(['ADMINISTRADOR']), usuariosController.modificarDatosUsuario);

export default router;