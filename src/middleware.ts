import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const protectedPaths = ["/protected"];



export const onRequest = defineMiddleware( async ({url, request}, next) => {

    const authHeaders = request.headers.get("Authorization")??"";

    
   
    if (protectedPaths.includes( url.pathname)) {
        return checkLocalAuth(authHeaders, next);
        
    }
    return next();
});



const checkLocalAuth =( authHeaders:string, next:MiddlewareNext)=>{

    if (authHeaders) {
       
        const authValue = authHeaders.split(" ").at(-1) ?? 'user:pass';
        const decodedValue =atob(authValue).split(":");
        const [user, password] = decodedValue;
        
        if( user === "admin" || password === "admin") {
           return next();
        }

    }

    return new Response("Unauthorized", { status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
     });
    

}