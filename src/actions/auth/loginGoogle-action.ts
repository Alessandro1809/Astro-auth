
import { firebase } from '@/firebase/config';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

export const logiWithGoogle = defineAction({
        accept: 'json',
        input: z.any(),
        handler: async (credentials) => {

            const credential= GoogleAuthProvider.credentialFromResult(credentials);//verificar credenciales con google Provider
            



           await signInWithCredential(firebase.auth,credential!);//lleva como parametro el objeto de autenticacion y las credenciales para crear la sesion del usuario con google
           return;
          
        }
      });
