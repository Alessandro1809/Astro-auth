import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const registerUser = defineAction({
        accept: 'form',
        input: z.object({
          name: z.string().min(2),
          email: z.string().email(),
          password: z.string().min(6),
          remember_me: z.boolean().optional(),
        }),
        handler: async ({name, email, password, remember_me},{cookies}) => {//primero recibo el imput del que se puede desestructurar en el handler y seguido de ello el context del que se puede sacar informacion de la request o response
         
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
          
          return {ok:true, msg:'Usuario creado'}
          
        }
      });
