import { Injectable } from "@angular/core";
import { Profile } from "./profile.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map, tap } from "rxjs";
import { getStorage, ref } from "firebase/storage";
import { LocalStorageService } from "src/app/data/local-storage.service";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({providedIn: 'root'})
export class ProfileService{ 

    private profileUrl = 'https://my-plants-bd49c-default-rtdb.europe-west1.firebasedatabase.app/profiles';

    constructor(private http: HttpClient, 
                private localStorageService: LocalStorageService,
                private authService: AuthService){

    }

    createProfile(userId: string, username: string, email: string): Observable<any>{
        const newProfile = new Profile(email, username, '');
        return this.http.put(`${this.profileUrl}/${userId}.json`, newProfile)
            .pipe(tap((result) => {
                this.localStorageService.saveData('profile-id',userId);
            }));
    }

    getProfile(): Observable<any>{
        const userId = this.authService.getUserId();
        return this.http.get<any>(`${this.profileUrl}/${userId}.json`)
                    .pipe(map((profileObject: Object) => {
                        return profileObject;
                    }));
    }

    updateProfile(profile: Profile) {
        const userId = this.authService.getUserId();
        return this.http.patch(`${this.profileUrl}/${userId}.json`, profile)
            .pipe(tap((result) => {
            }));
    }
}