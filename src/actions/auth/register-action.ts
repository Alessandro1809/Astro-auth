import { firebase } from '@/firebase/config';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from 'firebase/auth';

export const registerUser = defineAction({
        accept: 'form',
        input: z.object({
          name: z.string().min(2),
          email: z.string().email(),
          password: z.string().min(6),
          remember_me: z.boolean().optional(),
        }),
        handler: async ({name, email, password, remember_me},{cookies}) => {//primero recibo el imput del que se puede desestructurar en el handler y seguido de ello el context del que se puede sacar informacion de la request o response

            //TODO: Configurar cookies
            if (remember_me) {
                cookies.set('email', email, {
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),//multiplica un segundo por 60 ya que es lo que hay en un segundo luego esos 60 segundos por 60 minutos que hay en una hora, luego esos 60 minutos por 24 horas que hay en un dia, luego esos 24 horas por 365 dias que hay en un año, es decir, que el vencimiento de las cookies es de 1 año
                    path: '/',
                });
            } else {
                cookies.delete('email',{//Se escribe primero la cookie que se queira borrar y luego de eso va el paoth en el que recide
                    path: '/',
                });
            }
          

            //TODO: Guardar el usuario en la base de datos
            try {
                const user = await createUserWithEmailAndPassword(firebase.auth,email,password)//lleva como parametro el objeto de autenticacion y el email y la contraseña

                //actualizar el nombre del usuario
                updateProfile(firebase.auth.currentUser!,{
                    displayName: name,
                });

                //verificar el email
                await sendEmailVerification(firebase.auth.currentUser!,{
                    url: `${import.meta.env.WEBSITE_URL}/protected?emailVerify=true`,
                });//lleva como parametro el objeto de autenticacion
                //regresar el usuario
                return JSON.stringify(user)
            } catch (error) {
                const firebaseError = error as AuthError;

                if (firebaseError.code === 'auth/email-already-in-use') {
                    throw new Error('El correo ya esta registrado');
                }
                
            }

          
          
        }
      });
