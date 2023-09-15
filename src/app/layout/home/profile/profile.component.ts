import { Component, Input, OnInit } from '@angular/core';
import { Profile } from './profile.model';
import { FirebaseStorageService } from 'src/app/data/firebase-storage.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  @Input() profile: Profile; 

  imagePath = '';

  showImageInput = false;

  constructor(private storageService: FirebaseStorageService,
              private profileService: ProfileService){

  }

  ngOnInit(): void {
    this.showImage();
  }

  showImage(){
    let imageSub = null;
    if(this.profile.imagePath === ''){
      imageSub = this.storageService.getDefaultProfileImageUrl();
    }else{
      imageSub = this.storageService.getImageDownloadUrl(this.profile.imagePath);
    }
    
    imageSub.then(imagePath => {
      this.imagePath = imagePath;
    })
  }

  onImageChosen(event) {
    const file = event.target.files[0];
    this.storageService.uploadImage(file).then(
      (snapshot) => {
        this.profile.imagePath = snapshot.metadata.fullPath;
        this.showImage();
        this.showImageInput = false;
        this.profileService.updateProfile(this.profile).subscribe();
      }
    );
  }

  onImageClick(){ 
    this.showImageInput = true;
  }
}
