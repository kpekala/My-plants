import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {LocalStorageService} from "../data/local-storage.service";
import {Router} from "@angular/router";
import {FirebaseService} from "../data/firebase.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private USER_LOGGED_IN_KEY = "USER_LOGGED_IN_KEY";

  constructor(private localStorageService: LocalStorageService, 
    private router: Router, 
    private firebaseService: FirebaseService) {
    this.registerUserStateChangeListener();
    console.log(firebaseService.app);
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable(subscriber => {
      getAuth().onAuthStateChanged(user => {
        subscriber.next(user != null);
      });
    });
  }

  login(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`User ${user} is logged in`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(`User failed to log in. Reason: ${errorMessage}`);
        return error;
      });
  }

  register(email: string, password: string) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`User ${user} is created`);
      });
  }

  signOut() {
    getAuth().signOut().then(() => {
      console.log('Signed Out');
    }, (error) => {
      console.error('Sign Out Error', error);
    });
  }

  private registerUserStateChangeListener() {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem(this.USER_LOGGED_IN_KEY, 'true');
      } else {
        localStorage.removeItem(this.USER_LOGGED_IN_KEY);
        this.router.navigate(['auth/login']);
      }
    });
  }

  getUserId(){
    return getAuth().currentUser.uid;
  }
}
