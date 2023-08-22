import { Injectable } from "@angular/core";
import {FirebaseApp, initializeApp} from "firebase/app"

@Injectable({providedIn: 'root'})
export class FirebaseService {

    firebaseConfig = {
        apiKey: "AIzaSyDgvYUYfvgpUojN2mCIJT2CIWYXRXnTiNc",
        authDomain: "my-plants-bd49c.firebaseapp.com",
        projectId: "my-plants-bd49c",
        storageBucket: "my-plants-bd49c.appspot.com",
        messagingSenderId: "995838760830",
        appId: "1:995838760830:web:7f3809120cd23d3edd852f"
    };

    app: FirebaseApp | undefined;

    constructor(){
        this.initFirebase();
    }
    initFirebase(){
        this.app = initializeApp(this.firebaseConfig);
    }
}
