/// <reference path="../.astro/types.d.ts" />
interface User{
    email:string;
    name:string;
    photoURL:string;
    emailVerified: boolean;
}
declare namespace App {
    interface Locals{
        isLoguedIn: boolean;
        user: User | null;
    }
}