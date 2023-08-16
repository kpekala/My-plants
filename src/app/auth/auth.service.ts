import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LocalStorageService } from "../data/local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private USER_LOGGED_IN_KEY = "USER_LOGGED_IN_KEY";

    constructor(private localStorageService: LocalStorageService){

    }
    
    isLoggedIn(): Observable<boolean>{
        return of(this.localStorageService.getData(this.USER_LOGGED_IN_KEY) != null);
    }

    login(email: string, password: string){
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                this.saveUserData(userCredential);
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
                this.saveUserData(userCredential);
                console.log(`User ${user} is created`);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`User failed to log in. Reason: ${errorMessage}`);
                return error;
            });
    }
    saveUserData(userCredential: UserCredential) {
        this.localStorageService.saveData(this.USER_LOGGED_IN_KEY, 'true');
    }
}
