import express from 'express';
import authController from '../controllers/authController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';
import validarEstado from '../middlewares/stateValidatorMiddleware';

const router = express.Router();

router.post('/registro', authController.registrarUsuario);


/**
 *  post track
 * @openapi
 * /auth/login:
 *      post:
 *          tags:
 *               - usuarios
 *          sumary: "Registrar equipos"
 *          description: Registro de equipos
 *          requestBody:
 *                  content:
 *                      application/json:
 *                          shcema:
 *                              $ref: "#/components/schemas/equipo"
 *          responses:
 *              '201':
 *                  descripcion: Equipo creado correctamente
 *              '401':
 *                  descripcion: No tiene permiso para acceder a esta ruta
 *             security: 
 *               - bearerAuth: [ ]

 */
router.post('/login', validarEstado(true), authController.loginUsuario);

router.get('/ruta-protegida', authController.saludar);


export default router;