import {Component, OnInit} from '@angular/core';
import { AuthService } from './auth/auth.service';
import { FirebaseService } from './data/firebase.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private authService: AuthService, private firebaseService: FirebaseService){

    }

    ngOnInit(): void {
    }

}
