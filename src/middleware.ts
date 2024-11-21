import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const protectedPaths = ["/protected"];
const publicPaths = ["/login", "/register"];


export const onRequest = defineMiddleware( async ({url, request, locals, redirect}, next) => {

    const isLoggedIn = !!firebase.auth.currentUser;//esta logueado el usuario? --> detecta si hay una sesion
    const user = firebase.auth.currentUser//obtiene la informacion del usuario

    locals.isLoguedIn = isLoggedIn;
    if (user) {
        user.reload();
        locals.user = {//crea un objeto con la informacion del usuario
            email: user.email!,
            name: user.displayName!,
            photoURL: user.photoURL ?? '',
            emailVerified: user.emailVerified,
    }
    }
    if (!isLoggedIn && protectedPaths.includes(url.pathname)) {
        return redirect('/');
    }
    if (isLoggedIn && publicPaths.includes(url.pathname)) {
        return redirect('/');
    }


    

    return next();
});
