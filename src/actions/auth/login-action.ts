
import { firebase } from '@/firebase/config';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { signInWithEmailAndPassword, type AuthError } from 'firebase/auth';

export const lolgIn = defineAction({
        accept: 'form',
        input: z.object({
            email: z.string().email(),
            password: z.string().min(6),
            remember_me: z.boolean().optional(),
          }),
        handler: async ({email, password, remember_me},{cookies}) => {
            //comprobar la cookie
            if (remember_me) {
                cookies.set('email', email, {
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
                    path: '/',
                })
            }else{
                cookies.delete('email', {path: '/'})
            }
            //hacer que el usuario inicie sesion con firebase
            try {
                const user = await signInWithEmailAndPassword(firebase.auth,email,password)//lleva como parametro el objeto de autenticacion y el email y la contraseña
                return JSON.stringify(user)
            } catch (error) {
               const firebaseError= error as AuthError;

               if (firebaseError.code === 'auth/wrong-password') {
                throw new Error('Contrseña incorrecta');
               }
               throw new Error('Error al iniciar sesion');
            }
          
        }
      });
