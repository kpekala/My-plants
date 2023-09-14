import { Injectable } from "@angular/core";
import { Profile } from "./profile.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ProfileService{ 

    private speciesUrl = 'https://my-plants-bd49c-default-rtdb.europe-west1.firebasedatabase.app/profiles.json';

    constructor(private http: HttpClient){

    }

    createProfile(username: string, email: string): Observable<any>{
        const newProfile = new Profile(email, username, '');
        return this.http.put(this.speciesUrl, newProfile);
    }
}