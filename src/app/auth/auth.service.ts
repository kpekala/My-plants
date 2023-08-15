import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    isLoggedIn(): Observable<boolean>{
        return of(false);
    }

    login(email: string, password: string){
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(`User ${user} is logged in`);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`User failed to log in. Reason: ${errorMessage}`);
                return error;
            });
    }

    register(email: string, password: string){
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(`User ${user} is created`);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`User failed to log in. Reason: ${errorMessage}`);
                return error;
            });
    }
}