import {Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LocalStorageService {

    public saveData(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    
    public getData(key: string): string | null {
        console.log(localStorage.getItem(key));
        return localStorage.getItem(key);
    }
    public removeData(key: string) {
        localStorage.removeItem(key);
    }
}