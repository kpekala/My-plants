import { Injectable } from "@angular/core";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FirebaseService } from "./firebase.service";

@Injectable({providedIn: 'root'})
export class FirebaseStorageService {

    private storage: any;
    private gsPath = 'gs://my-plants-bd49c.appspot.com/';

    constructor(private firebaseService: FirebaseService){
        this.storage = getStorage();
    }

    getImageDownloadUrl(imagePath: string) {
        const pathReference = ref(this.storage, imagePath);
        return getDownloadURL(pathReference);;
    }

    getDefaultProfileImageUrl(){
        return this.getImageDownloadUrl('profile/Placeholderportrait.jpg');
    }

    uploadImage(file: File){
        const fileRef = ref(this.storage, `profile/${file.name}`);
        return uploadBytes(fileRef, file).then(
            (snapshot) => {
                return snapshot;
            }
        );
    }
}