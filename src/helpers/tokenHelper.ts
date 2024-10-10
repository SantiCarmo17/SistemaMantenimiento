import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generarToken = (usuario : any ) => {
    //Objeto para codificar
    const usuarioForToken = {
        documento: usuario.documento,
        correo: usuario.correo,
        rol: usuario.roles[0].nombre
    }

    //Firmamos el token 
    return jwt.sign(usuarioForToken, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}
