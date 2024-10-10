import express from 'express';
import authController from '../controllers/authController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';
import validarEstado from '../middlewares/stateValidatorMiddleware';

const router = express.Router();

router.post('/registro',  authController.registrarUsuario);

router.post('/login', validarEstado(true), authController.loginUsuario);

router.get('/ruta-protegida', authController.saludar);


export default router;