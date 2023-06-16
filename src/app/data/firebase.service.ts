import { Injectable } from "@angular/core";
import {FirebaseApp, initializeApp} from "firebase/app"
import { AssetsService } from "./assets.service";

@Injectable({providedIn: 'root'})
export class FirebaseService {

    configPath = '../../assets/firebase-config.json';
    app: FirebaseApp | undefined;

    constructor(private assetsService: AssetsService){
        this.initFirebase();
    }

    initFirebase(){
        this.assetsService.getJson(this.configPath).subscribe(firebaseConfig => {
            this.app = initializeApp(firebaseConfig);
            console.log('firebase initialized!');
        })
    }
}